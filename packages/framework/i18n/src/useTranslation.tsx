import { useAppContext, useGlobalProp } from '@oneki/app';
import { DefaultBasicError } from '@oneki/core';
import { AnonymousObject } from '@oneki/types';
import { get, stringifyJsx } from '@oneki/utils';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { TranslationProps } from './typings';
import useI18nService from './useI18nService';
import useLocale from './useLocale';
import { buildJsx } from './utils';

const useTranslation = (
  namespaces: string | string[] = [],
): [FC<TranslationProps>, (content: string | JSX.Element, alias?: string, count?: number) => any, string, boolean] => {
  const locale: string = useLocale();
  const appContextTranslations = get(useAppContext(), 'i18n.translations');
  const reduxTranslations = useGlobalProp(`i18n.translations.${locale}`);

  const translations: AnonymousObject = useMemo(() => {
    return Object.assign({}, appContextTranslations, reduxTranslations);
  }, [appContextTranslations, reduxTranslations]);

  const appContextNs = get(useAppContext(), 'i18n.ns');
  const reduxNs = useGlobalProp(`i18n.ns.${locale}`);

  const nsLoaded = useMemo(() => {
    return Array.from(new Set([...(appContextNs || []), ...(reduxNs || [])]));
  }, [appContextNs, reduxNs]);

  const i18nService = useI18nService();

  const nsRequired = useMemo<string[]>(() => {
    let nsRequired = namespaces || [];
    if (typeof namespaces === 'string') {
      nsRequired = [namespaces];
    }
    if (!nsRequired.includes('common')) {
      (nsRequired as string[]).push('common');
    }
    return nsRequired as string[];
  }, [namespaces]);

  const nsNotLoaded = useMemo(() => {
    return nsRequired.filter((ns) => !nsLoaded.includes(ns));
  }, [nsRequired, nsLoaded]);
  const nsFetching: AnonymousObject = useGlobalProp(`i18n.fetching.${locale}`, {});
  const fetching = !!Object.keys(nsFetching).find((ns) => nsFetching[ns] && nsNotLoaded.includes(ns));
  const t = useCallback(
    (content: string | JSX.Element, alias?: string, count = 1) => {
      if (fetching) return null;
      let key = alias;

      let aliasNs: string;
      if (alias) {
        // check if alias contains a namespace
        const aliasTokens = alias.split(':');
        if (aliasTokens.length > 2) {
          throw new DefaultBasicError(`The i18n alias '${alias}' is invalid. It can't contain the character ':'`);
        } else if (aliasTokens.length === 2) {
          aliasNs = aliasTokens[0];
          if (!nsRequired.includes(aliasNs)) {
            throw new DefaultBasicError(
              `The i18n alias '${alias}' is invalid. The namespace ${aliasNs} is not declared as a namespace by useTranslation`,
            );
          }
          key = aliasTokens[1];
        }
      }

      const ctx = {};
      let jsx = null;
      const candidateKeys: string[] = [];

      if (typeof content !== 'string') {
        jsx = content;
        const [jsxKey] = stringifyJsx(content, ctx);
        if (!alias) {
          key = jsxKey;
        }
      } else {
        if (!alias) {
          key = content;
        }
      }

      if (count >= 1) {
        const prefix = count > 1 ? 'plural' : 'singular';
        // candidateKeys.push(`${prefix}::${key}`);
        nsRequired.forEach((ns) => {
          if (!aliasNs || aliasNs === ns) {
            candidateKeys.push(`${ns}:${prefix}::${key}`);
          }
        });
      }
      // candidateKeys.push(key as string);

      nsRequired.forEach((ns) => {
        if (!aliasNs || aliasNs === ns) {
          candidateKeys.push(`${ns}:${key}`);
        }
      });

      for (const candidateKey of candidateKeys) {
        if (translations[candidateKey] !== undefined)
          return buildJsx(translations[candidateKey], ctx, jsx, i18nService, locale);
      }
      return null;
    },
    [fetching, translations, nsRequired, i18nService, locale],
  );

  const T = useCallback<FC<TranslationProps>>(
    ({ alias, count, children }) => {
      return t(<>{children}</>, alias, count) as any;
    },
    [t],
  );
  useEffect(() => {
    if (nsNotLoaded.length > 0 && !fetching) {
      i18nService.fetchTranslations(locale, nsNotLoaded);
    }
  }, [nsNotLoaded, i18nService, locale, fetching]);

  return [T, t, locale, fetching || nsNotLoaded.length > 0];
};

export default useTranslation;
