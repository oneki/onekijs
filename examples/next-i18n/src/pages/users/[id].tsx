import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation, withLayout } from 'onekijs-next';
import React from 'react';
import SiteLayout from '../../layout/SiteLayout';

const i18nNamespaces = ['users', 'common'];

const IndexPage: NextPage = () => {
  const [, t] = useTranslation(i18nNamespaces);
  const lastname = 'Franki';
  const firstname = 'Bruno';
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
          </>,
        )}
      </div>
      <div>{t(<>Welcome {{ lastname }} on Oneki.js</>)}</div>
    </>
  );
};

export default withLayout(IndexPage, SiteLayout);
