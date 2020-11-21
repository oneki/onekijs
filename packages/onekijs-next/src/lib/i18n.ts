/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// export const getI18nStaticProps = (fs: any, path: any, lang: string, namespaces: string[] = []): any => {
//   return {
//     props: {
//       translations: getI18nTranslations(fs, path, lang, namespaces),
//       locale: lang,
//     },
//   };
// }

// export function getI18nTranslations(fs, path, lang, namespaces = []) {
//   if (!namespaces.includes('common')) namespaces.push('common');
//   // eslint-disable-next-line
//   const localeDirectory = path.join(process.cwd(), `public/locales/${lang}`)
//   const translations = {};
//   namespaces.forEach((ns) => {
//     const filePath = path.join(localeDirectory, `${ns}.json`);
//     translations[ns] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//   });
//   return translations;
// }

// export function withI18nPaths(fs, path, paths = [], attribute = 'lang') {
//   // eslint-disable-next-line
//   const localeDirectory = path.join(process.cwd(), 'public/locales');
//   const files = fs.readdirSync(localeDirectory);
//   const locales = [];
//   files.forEach((file) => {
//     if (fs.statSync(localeDirectory + '/' + file).isDirectory()) {
//       locales.push(file);
//     }
//   });

//   if (paths.length === 0) {
//     return locales.map((locale) => {
//       return {
//         params: {
//           [attribute]: locale,
//         },
//       };
//     });
//   }

//   const nextPaths = [];
//   paths.forEach((p) => {
//     locales.forEach((locale) => {
//       nextPaths.push({
//         params: Object.assign({}, p.params, { lang: locale }),
//       });
//     });
//   });

//   return nextPaths;
// }
