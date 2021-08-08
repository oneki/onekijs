/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AnonymousObject } from '@oneki/types';
import fs from 'fs';
import path from 'path';

interface StaticProps extends AnonymousObject {
  props?: AnonymousObject;
}

export const withI18nStaticProps = (locale: string, staticProps?: StaticProps, namespaces: string[] = []): any => {
  staticProps = staticProps || {};
  staticProps.props = staticProps.props || {};
  staticProps.props.translations = getI18nTranslations(locale, namespaces);
  return staticProps;
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
