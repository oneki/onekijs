export default {
  i18n: {
    locales: [
      {
        locale: 'en',
        path: '/en',
      },
      {
        locale: 'fr',
        path: '/fr',
      },
    ],
    defaultLocale: 'en',
    url: '/locales',
    modifiers: {
      uppercase: (value?: string): string | undefined => (value ? value.toUpperCase() : value),
      locale: (value: string | undefined, locale: string): string | undefined =>
        value ? value.toLocaleString() : value,
    },
  },
};
