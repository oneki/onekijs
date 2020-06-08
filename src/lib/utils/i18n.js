import { get } from "./object";
import { isBrowser } from "./browser";
import { toLocation } from "./url";

export function detectLocale(location, reduxLocale, settings, initialLocale) {
  let locale = initialLocale;
  if (!locale && location) {
    locale = settings.i18n.localeFromLocation(location, settings);
  }
  if (!locale) {
    locale = reduxLocale;
    
  }
  if (!locale && isBrowser()) {
    locale = localStorage.getItem('onekijs.locale');
    if (!locale) {
      const languages = navigator.languages;
      if (languages && languages.length > 0) {
        locale = languages.find(language => settings.i18n.locales.includes(language.slice(0,2)))
        if (locale) return locale.slice(0,2);
      } 
      else if (navigator.language) locale = navigator.language.slice(0,2);
      else if (navigator.userLanguage) locale = navigator.userLanguage.slice(0,2);
    }
  }
  if (locale && settings.i18n.locales.includes(locale)) {
    return locale;
  }
  return get(settings, 'i18n.defaultLocale');
}

export const toI18nLocation = (urlOrLocation, { i18n, settings }, route) => {
  let location = urlOrLocation;
  if (typeof urlOrLocation === "string") {
    location = toLocation(urlOrLocation);
    location.route = route;
  }
  if (settings && i18n.locale) {
    location = settings.i18n.addLocaleToLocation(
      i18n.locale,
      location,
      settings
    );
  }
  return location;
};