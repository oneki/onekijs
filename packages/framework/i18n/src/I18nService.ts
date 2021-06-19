import { DefaultGlobalService } from '@oneki/app';
import { asyncGet, reducer, saga, service } from '@oneki/core';
import { NotificationService } from '@oneki/notification';
import { AnonymousObject, AppSettings, SagaEffect } from '@oneki/types';
import { append, flattenTranslations, get, isFunction, isLocaleSimple, set } from '@oneki/utils';
import { all, call } from 'redux-saga/effects';

@service
export default class I18nService extends DefaultGlobalService {
  notificationService: NotificationService;
  modifiers: AnonymousObject<any>;

  constructor(notificationService: NotificationService) {
    super();
    this.modifiers = {};
    this.fetching = {};
    this.notificationService = notificationService;
  }

  init(): void {
    const { settings } = this.context;
    this.modifiers = {
      locale: (value: string | number | Date, locale: string) => {
        return value ? value.toLocaleString(locale) : value;
      },
    };
    if (settings.i18n && settings.i18n.modifiers) {
      Object.assign(this.modifiers, settings.i18n.modifiers);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *changeLocale(locale: string) {
    const { router } = this.context;
    const location = router.location;
    if (isLocaleSimple(this.context.settings)) {
      yield this.setLocale(locale);
    } else {
      yield router.push(location, { locale });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Every)
  *fetchTranslations(locale: string, namespaces: string[], options: { onError?: any } = {}) {
    // TODO description options
    const { settings } = this.context;
    const nsToFetch = namespaces.filter((ns) => !get<boolean>(this.state, `i18n.fetching.${locale}.${ns}`, false));
    try {
      yield this.setFetchingTranslations(true, locale, nsToFetch);
      const results: AnonymousObject[] = yield all(
        nsToFetch.map((ns) => {
          return call(asyncGet, this.getLocaleUrl(locale, ns, settings), options);
        }),
      );
      const translations: AnonymousObject = {};
      nsToFetch.forEach((ns, i) => (translations[ns] = results[i]));
      yield this.setTranslations(translations, locale); // to update the store and trigger a re-render.
      yield this.setFetchingTranslations(false, locale, nsToFetch);
    } catch (e) {
      yield this.setFetchingTranslations(false, locale, nsToFetch);
      const onError = options.onError;
      if (onError) {
        yield onError(e);
      } else {
        yield this.notificationService.error(e);
      }
    }
  }

  getLocaleUrl(locale: string, ns: string, settings: AppSettings): string {
    if (isFunction(settings.i18n.url)) {
      return settings.i18n.url(locale, ns);
    }
    return `${settings.i18n.url}/${locale}/${ns}.json`;
  }

  @reducer
  setFetchingTranslations(fetching: boolean, locale: string, namespaces: string[]): void {
    namespaces.forEach((ns) => set(this.state, `i18n.fetching.${locale}.${ns}`, fetching));
  }

  @reducer
  setLocale(locale: string): void {
    set(this.state, 'i18n.locale', locale);
  }

  @reducer
  setTranslations(translations: AnonymousObject, locale: string): void {
    set(
      this.state,
      `i18n.translations.${locale}`,
      Object.assign(get(this.state, `i18n.translations.${locale}`, {}), flattenTranslations(translations)),
    );
    Object.keys(translations).forEach((ns) => append(this.state, `i18n.ns.${locale}`, ns));
  }
}
