export default {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: null,
    url: '/locales',
    modifiers: {
      uppercase: (value: string|null|undefined) => (value ? value.toUpperCase() : value),
      locale: (value: string|null|undefined) => (value ? value.toLocaleString() : value),
    },
  },
};
