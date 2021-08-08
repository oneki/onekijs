import { NextPage } from 'next';
import Head from 'next/head';
import { Link, useRouter, useTranslation, withLayout } from 'onekijs';
import { useParams } from 'onekijs/next';
import { withI18nStaticProps } from 'onekijs/next-ssr';
import React from 'react';
import SiteLayout from '../layout/SiteLayout';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  locale = locale || defaultLocale || 'en';
  return withI18nStaticProps(locale, {});
};

const IndexPage: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const [T] = useTranslation();
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div>About: id = {params.id}</div>
      <button onClick={() => router.push('/about?id=1', { shallow: true })}>id1</button> |
      <button onClick={() => router.push('/about?id=2', { shallow: true })}>id2</button>
      <br />
      <Link href="/about?id=1" shallow={true}>
        id1
      </Link>{' '}
      |
      <Link href="/about?id=2" shallow={true}>
        id2
      </Link>
      <T>Welcome</T>
    </>
  );
};

export default withLayout(IndexPage, SiteLayout);
