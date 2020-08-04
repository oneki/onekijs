import { all, call } from 'redux-saga/effects';
import { AppSettings } from '../app/typings';
import { reducer, saga, service } from '../core/annotations';
import GlobalService from '../core/GlobalService';
import { AnonymousObject, Collection, SagaEffect } from '../core/typings';
import { append, get, set } from '../core/utils/object';
import { isFunction } from '../core/utils/type';
import { asyncGet } from '../fetch/utils';
import NotificationService from '../notification/NotificationService';
import { flattenTranslations } from './utils';

@service
export default class I18nService extends GlobalService {
  notificationService: NotificationService;
  modifiers: Collection<any>;

  constructor(notificationService: NotificationService) {
    super();
    this.modifiers = {};
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
    yield this.setLocale(locale);
    yield this.context.settings.i18n.changeLocale(locale, this.context);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *fetchTranslations(locale: string, namespaces: string[], options: { onError?: any } = {}) {
    // TODO description options
    const { settings } = this.context;
    try {
      yield this.setFetchingTranslations(true);
      const results = yield all(
        namespaces.map((ns) => {
          return call(asyncGet, this.getLocaleUrl(locale, ns, settings), options);
        }),
      );
      const translations: AnonymousObject = {};
      namespaces.forEach((ns, i) => (translations[ns] = results[i]));
      yield this.setTranslations(translations, locale); // to update the store and trigger a re-render.
      yield this.setFetchingTranslations(false);
    } catch (e) {
      yield this.setFetchingTranslations(false);
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
  setFetchingTranslations(fetching: boolean): void {
    set(this.state, 'i18n.fetching', fetching);
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
