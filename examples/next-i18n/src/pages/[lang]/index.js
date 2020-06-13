import React from 'react'
import Head from "next/head";
import { withLayout,  getI18nStaticProps, withI18nPaths } from 'onekijs-next';
import SiteLayout from '../../layout/siteLayout';
import { useTranslation } from 'onekijs-next';
import fs from 'fs';
import path from 'path';

const i18nNamespaces = ['users', 'common'];

export async function getStaticProps(context) {
  const result = getI18nStaticProps(fs, path, context.params.lang, i18nNamespaces);
  return result;
}

export async function getStaticPaths() {
  return {
    paths: withI18nPaths(fs, path),
    fallback: false
  }
}

const IndexPage = () => {
  // const name = "Franki";
  // const MyElement = <div>{t("toto", <>Welcome <button alt={t("this is the alt")}>{{name}}</button></>)} {t("hello {{name}}")}</div>;
  const [T, t] = useTranslation(i18nNamespaces);
  const lastname = "Franki";
  const firstname = "Bruno2";
  const date = new Date();
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <div><T alias="hello">Hello <b><i>mister</i> {{firstname}} {{lastname}} <i>male</i></b> <u>address</u></T></div>
      <div><T count={2}>Hello <b><i>mister</i> {{firstname}} {{lastname}} <i>male</i></b> <u>address</u></T></div>
      <div><T>Welcome {{ lastname }} on Flora</T></div>
      <div><T>Welcome {{ lastname }} on Flora. Current date = {{date}}</T></div>
      <div title={t("Welcome")}><T>Welcome</T></div>

      <div><T>Hello <b><i>mister</i> {{firstname}} {{lastname}} <i>male</i></b> <u>address</u> <span title={t("Welcome")}>Welcome</span></T></div>
      <div><T alias="common:user">user</T></div>
      <div><T count={2}>user</T></div>
    </>
  );
}

export default withLayout(IndexPage, SiteLayout);
