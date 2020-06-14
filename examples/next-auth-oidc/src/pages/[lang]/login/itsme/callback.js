import {
  useLoginCallbackService,
  useOnekiRouter,
  getI18nStaticProps,
  withI18nPaths,
} from 'onekijs-next';
import React from 'react';
import { useEffect } from 'react';
import fs from 'fs';
import path from 'path';

export async function getStaticProps(context) {
  return getI18nStaticProps(fs, path, context.params.lang);
}

export async function getStaticPaths() {
  return {
    paths: withI18nPaths(fs, path),
    fallback: false,
  };
}

const ItsmeCallbackPage = React.memo(() => {
  const [error] = useLoginCallbackService('itsme');
  const router = useOnekiRouter();

  // Redirect to login page if there is an error
  useEffect(() => {
    if (error) {
      router.push('/login');
    }
  }, [error]);

  return null;

  // Example below show how to handle error directly in this page
  // if (!error) {
  //   return null;
  // }

  // return (
  //   <div>An error occured:
  //     <ul>
  //       <li><b>Error code</b>: {error.code}</li>
  //       <li><b>Error message</b>: {error.message}</li>
  //     </ul>
  //   </div>
  // )
});

ItsmeCallbackPage.displayName = 'ItsmeCallbackPage';

export default ItsmeCallbackPage;
