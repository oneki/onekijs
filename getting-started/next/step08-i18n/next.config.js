module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['fr', 'en', 'za'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',

    domains: [
      {
        domain: 'oneki.dom',
        defaultLocale: 'en',
      },
      {
        domain: 'fr.oneki.dom',
        defaultLocale: 'fr',
      },
      {
        domain: 'za.oneki.dom',
        defaultLocale: 'za',
      },
    ],
  },
};
