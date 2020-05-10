export function getI18nStaticProps(fs, path, lang, namespaces=[]) {
  return {
    props: { 
      translations: getI18nTranslations(fs, path, lang, namespaces)
     }
  }
}

export function getI18nTranslations(fs, path, lang, namespaces=[]) {
  if (!namespaces.includes("common")) namespaces.push("common");
  const localeDirectory = path.join(process.cwd(), `public/locales/${lang}`)
  const translations = {};
  namespaces.forEach(ns => {
    const filePath = path.join(localeDirectory, `${ns}.json`);
    translations[ns] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  })
  return translations;
}

export function withI18nPaths(fs, path, paths=[], attribute="lang") {
  const localeDirectory = path.join(process.cwd(), 'public/locales');
  const files = fs.readdirSync(localeDirectory);
  const locales = [];
  files.forEach(file => {
    if (fs.statSync(localeDirectory + "/" + file).isDirectory()) {
      locales.push(file);
    }
  });

  if (paths.length === 0) {
    return locales.map(locale => {
      return {
        params: {
          lang: locale
        }
      }
    })
  }

  const nextPaths = [];
  paths.forEach(p => {
    locales.forEach(locale => {
      nextPaths.push({
        params: Object.assign({}, p.params, { lang: locale })
      })
    })
  })

  return nextPaths;
}