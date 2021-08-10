/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from 'fs';
import { AnonymousObject } from 'onekijs-framework';
import path from 'path';

interface StaticProps {
  props?: AnonymousObject;
}

interface StaticPaths {
  params: AnonymousObject;
  locale?: string;
}

export const withI18nStaticProps = (locale: string, staticProps?: StaticProps, namespaces: string[] = []): any => {
  staticProps = staticProps || {};
  staticProps.props = staticProps.props || {};
  staticProps.props.translations = getI18nTranslations(locale, namespaces);
  return staticProps;
};

export const withI18nStaticPaths = (staticPaths: StaticPaths[], locales?: string[]): any => {
  if (!locales) return staticPaths;
  return staticPaths.flatMap((staticPath) => {
    return locales.map((locale) => {
      return {
        params: staticPath.params,
        locale,
      };
    });
  });
};

function getI18nTranslations(locale: string, namespaces: string[] = []): AnonymousObject {
  if (!namespaces.includes('common')) namespaces.push('common');
  // eslint-disable-next-line
  const localeDirectory = path.join(process.cwd(), `public/locales/${locale}`);
  const translations: AnonymousObject = {};
  namespaces.forEach((ns) => {
    const filePath = path.join(localeDirectory, `${ns}.json`);
    translations[ns] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });
  return translations;
}
