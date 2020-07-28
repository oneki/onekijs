export default {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: null,
    url: '/locales',
    modifiers: {
      uppercase: (value) => (value ? value.toUpperCase() : value),
      locale: (value, locale) => (value ? value.toLocaleString(locale) : value),
    },
  },
};
