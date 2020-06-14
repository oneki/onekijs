import Head from 'next/head';
import { useTranslation, withLayout } from 'onekijs-next';
import React from 'react';
import SiteLayout from '../../layout/siteLayout';

const i18nNamespaces = ['users', 'common'];

const IndexPage = () => {
  const [, t] = useTranslation(i18nNamespaces);
  const lastname = 'Franki';
  const firstname = 'Bruno1 ID';
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <div>
        {t(
          <>
            Hello{' '}
            <b>
              <i>mister</i> {{ firstname }} {{ lastname }} <i>male</i>
            </b>{' '}
            <u>address</u>
          </>
        )}
      </div>
      <div>{t(<>Welcome {{ lastname }} on Flora</>)}</div>
    </>
  );
};

export default withLayout(IndexPage, SiteLayout);
