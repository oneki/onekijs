import React, { useCallback, useContext, useMemo, useEffect } from "react";
import { all, call, cancel, fork } from "redux-saga/effects";
import { AppContext } from "./context";
import { notificationService } from "./notification";
import { delayLoading, latest } from "./saga";
import { useReduxService } from "./service";
import { useReduxSelector } from "./store";
import { get, set, append } from "./utils/object";
import { isFunction } from "./utils/type";
import { asyncGet } from "./xhr";


export const url2locale = (pathname, contextPath, candidates) => {
  const length = contextPath.endsWith("/")
    ? contextPath.length
    : contextPath.length + 1;
  const locale = pathname.substring(length).split("/")[0];
  if (candidates.includes(locale)) return locale;
  return null;
};

export const flattenTranslations = (translations) => {
  /* Example:
  Input:
  {
    "product": {
      "key": "value" 
    },
    "common": {
      "key1": "value1"
    }
  }

  Output:
  { 
    "product:key": "value", 
    "common:key1": "value1" 
  }
  */
  const result = {};
  Object.keys(translations).forEach((ns) => {
    Object.keys(translations[ns]).reduce((accumulator, key) => {
      accumulator[`${ns}:${key}`] = translations[ns][key];
      return accumulator;
    }, result);
  });
  return result;
};

export const useLocale = () => {
  return get(useContext(AppContext), 'i18n.locale');
};

const getLocaleUrl = (locale, ns, settings) => {
  if (isFunction(settings.i18n.url)) {
    return settings.i18n.url(locale, ns);
  }
  return `${settings.i18n.url}/${locale}/${ns}.json`;
};

export const i18nService = {
  name: "i18n",
  reducers: {
    setLocale: (state, locale) => {
      set(state, "i18n.locale", locale);
    },
    setTranslations: (state, { translations, locale }) => {
      set(
        state,
        `i18n.translations.${locale}`,
        Object.assign(
          get(state, `i18n.translations.${locale}`, {}),
          flattenTranslations(translations)
        )
      );
      Object.keys(translations).forEach(ns => append(state, `i18n.ns.${locale}`, ns));
    },
    setFetchingTranslations: (state, fetching) => {
      set(state, 'i18n.fetching', fetching);
    }
  },
  sagas: {
    fetchTranslations: latest(function* (
      { locale, namespaces, options = {} },
      { settings }
    ) {
      try {
        yield call(this.setFetchingTranslations, true);
        const results = yield all(
          namespaces.map((ns) => {
            return call(asyncGet, getLocaleUrl(locale, ns, settings), options);
          })
        );
        const translations = {};
        namespaces.forEach((ns, i) => (translations[ns] = results[i]));
        yield call(this.setTranslations, {translations, locale}); // to update the store and trigger a re-render.
        yield call(this.setFetchingTranslations, false);
      } catch (e) {
        yield call(this.setFetchingTranslations, false);
        const onError = options.onError;
        if (onError) {
          yield call(onError, e);
        } else {
          yield call(this.notificationService.error, e);
        }
      }
    }),
  },
  inject: {
    notificationService,
  },
};

export const use18nService = () => {
  return useReduxService(i18nService);
};

const stringifyJsx = (reactElement, idx=1) => { 
  const children = [].concat(reactElement.props.children);
  const str = children.reduce((accumulator, child) => {
    if (typeof child === 'string') return `${accumulator}${child}`;
    if (React.isValidElement(child)) {
      const [childStr, nextIdx] = stringifyJsx(child, idx+1);
      const str = `${accumulator}<${idx}>${childStr}</${idx}>`;
      idx = nextIdx;
      return str;
    } else {
      return `${accumulator}{{${Object.keys(child)[0]}}}`;
    }
  }, '');
  return [str, idx];
}

const regexIndexOf = (str, regex, startpos=0) => {
  var indexOf = str.substring(startpos).search(regex);
  return (indexOf >= 0) ? (indexOf + startpos) : indexOf;
}

const parseJsx = (str, startPos=0) => {
  const result = [];
  do {
    const [content, idx, start, end] = extractTag(str, startPos);
    if (content === undefined) {
      const element = str.substring(startPos);
      if (element.length > 0) {
        result.push(element);
      }
      break;
    }
    
    if (start > startPos) {
      result.push(str.substring(startPos, start));
    }

    break;
  } while (true)

  return result;
}

const extractTag = (str, startPos) => {
  const openingStart = regexIndexOf(str, /<[1-9][0-9]*>/, startPos);
  if (openingStart > -1) {
    const openingEnd = str.indexOf('>', openingStart);
    const idx = str.substring(openingStart+1, openingEnd);
    
    const closingStart = str.indexOf(`</${idx}>`, openingEnd);
    const content = str.substring(openingEnd+1, closingStart);
    return [content, idx, openingStart, closingStart + `</${idx}>`.length]
  }
  return [];
}

export const useTranslation = (namespaces, options) => {
  const locale = useLocale();
  const appContextTranslations =  get(useContext(AppContext), "i18n.translations");
  const reduxTranslations = useReduxSelector(`i18n.translations.${locale}`);

  const translations = useMemo(() => {
    return Object.assign({}, appContextTranslations, reduxTranslations)
  }, [appContextTranslations, reduxTranslations]);

  const appContextNs = get(useContext(AppContext), "i18n.ns");
  const reduxNs = useReduxSelector(`i18n.ns.${locale}`);

  const nsLoaded = useMemo(() => {
    return [
      ...new Set([
        ...appContextNs || [],
        ...reduxNs || [],
      ]),
    ];
  }, [appContextNs, reduxNs])

  const i18nService = use18nService();

  const nsRequired = useMemo(() => {
    let nsRequired = namespaces || [];
    if (typeof namespaces === "string") {
      nsRequired = [namespaces];
    }
    if (!nsRequired.includes("common")) {
      nsRequired.push("common");
    }
    return nsRequired;
  }, []);
  
  const nsNotLoaded = useMemo(() => {
    return nsRequired.filter((ns) => !nsLoaded.includes(ns)); 
  }, [nsRequired, nsLoaded])
  
  const fetching = useReduxSelector("i18.fetching", false);
  
  const t = useCallback(
    (key) => {
      
      if (fetching) return null;

      if (typeof key !== 'string') {
        const [str] = stringifyJsx(key);
        console.log("str", str);
        console.log(parseJsx(str));
      }

      if (translations[key] !== undefined) return translations[key];
      for (let ns of nsRequired) {
        const nsKey = `${ns}:${key}`;
        if (translations[nsKey] !== undefined) return translations[nsKey];
      }
      return null;
    },
    [fetching, translations, nsRequired]
  );

  useEffect(() => {
    
    if (nsNotLoaded.length > 0  && !fetching) {
      i18nService.fetchTranslations({ locale, namespaces: nsNotLoaded });
    }
  }, [nsNotLoaded, i18nService, locale, fetching]);

  return [t, locale, fetching || nsNotLoaded.length > 0];
};
