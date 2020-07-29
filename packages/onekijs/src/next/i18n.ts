import { AnonymousObject } from '../lib/core/typings';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getI18nStaticProps(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fs: any,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  path: any,
  lang: string,
  namespaces: string[] = [],
): {
  props: {
    translations: AnonymousObject;
    locale: string;
  };
} {
  return {
    props: {
      translations: getI18nTranslations(fs, path, lang, namespaces),
      locale: lang,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getI18nTranslations(fs: any, path: any, lang: string, namespaces: string[] = []): AnonymousObject {
  if (!namespaces.includes('common')) namespaces.push('common');
  // eslint-disable-next-line
  const localeDirectory = path.join(process.cwd(), `public/locales/${lang}`);
  const translations: AnonymousObject = {};
  namespaces.forEach((ns) => {
    const filePath = path.join(localeDirectory, `${ns}.json`);
    translations[ns] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });
  return translations;
}

export function withI18nPaths(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fs: any,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  path: any,
  paths: any[] = [],
  attribute = 'lang',
): {
  params: {
    [x: string]: string;
  };
}[] {
  // eslint-disable-next-line
  const localeDirectory = path.join(process.cwd(), 'public/locales');
  const files: string[] = fs.readdirSync(localeDirectory);
  const locales: string[] = [];
  files.forEach((file) => {
    if (fs.statSync(localeDirectory + '/' + file).isDirectory()) {
      locales.push(file);
    }
  });

  if (paths.length === 0) {
    return locales.map((locale) => {
      return {
        params: {
          [attribute]: locale,
        },
      };
    });
  }

  const nextPaths: {
    params: {
      [x: string]: string;
    };
  }[] = [];
  paths.forEach((p) => {
    locales.forEach((locale) => {
      nextPaths.push({
        params: Object.assign({}, p.params, { lang: locale }),
      });
    });
  });

  return nextPaths;
}
