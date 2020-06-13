import fs from 'fs';
import Head from "next/head";
import { getI18nStaticProps, I18nLink, useOnekiRouter, useParams, withI18nPaths, withLayout } from 'onekijs-next';
import path from 'path';
import React from 'react';
import SiteLayout from '../../layout/siteLayout';

export async function getStaticProps(context) {
  const result = getI18nStaticProps(fs, path, context.params.lang)
  return result;
}

export async function getStaticPaths() {
  return {
    paths: withI18nPaths(fs, path),
    fallback: false
  }
}

const IndexPage = () => {
  const params = useParams();
  const router = useOnekiRouter();
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div>About: id = {params.id}</div>
      <button onClick={() => router.push('/about?id=1', null, {shallow:true})}>id1</button> | 
      <button onClick={() => router.push('/about?id=2', '/about?id=2', {shallow:true})}>id2</button>
      <br/>
      <I18nLink href="/about?id=1" shallow={true}><a>id1</a></I18nLink> | 
      <I18nLink href="/about?id=2" shallow={true}><a>id2</a></I18nLink>
    </>
  );
}

export default withLayout(IndexPage, SiteLayout);
