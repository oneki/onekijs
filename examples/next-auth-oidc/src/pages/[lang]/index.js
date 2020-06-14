/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import React from 'react';
import MainLayout from '../../layout/mainLayout';
import { withLayout, getI18nStaticProps, withI18nPaths } from 'onekijs-next';
import fs from 'fs';
import path from 'path';

// export async function getStaticProps(context) {
//   return {
//     props: {name: "Franki"}, // will be passed to the page component as props
//   }
// }

export async function getStaticProps(context) {
  return getI18nStaticProps(fs, path, context.params.lang);
}

export async function getStaticPaths() {
  return {
    paths: withI18nPaths(fs, path),
    fallback: false,
  };
}

const Main = () => {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <h3>
        The index page is accessible to anyone. The admin page is only
        accessible to authenticated users.
      </h3>
      <p>The authentication follows this scenario:</p>
      <ul>
        <li>The user clicks on "login" link or on the "admin" link</li>
        <li>He's redirected to the /login page</li>
        <li>
          The /login page checks the configuration defined in "settings.js".
          <br />
          In this example, the settings indicates that the authentication is
          done by an external OIDC provider (AWS Cognito) via Authorization code
        </li>
        <li>
          The /login page redirects the user to AWS Cognito login page (with the
          correct query parameters)
        </li>
        <li>
          AWS Cognito displays a login form, so the users can enter the username
          / password
        </li>
        <li>
          If the user is successfully authenticated, Cognito redirects the user
          to our website via /login/callback with an authorization code (the
          path can be specified in settings.js)
        </li>
        <li>
          The /login/callback sends a request to the back end server with the
          authorization code (backend is defined in src/pages/api/...)
        </li>
        <li>
          The back end uses the authorization code to receive an id token /
          access token / refresh token from AWS Cognito and stores all these
          tokens in a secure "httpOnly" cookie
          <br />
        </li>
        <li>
          The /login/callback does a second query to the backend to retrieve the
          content of the id token (via /userinfo endpoint)
          <br />
          Indeed, the /login/callback can't have access to the content of the
          cookie as it's an secure httpOnly one
        </li>
      </ul>
      <ul>
        <li>{process.env.NEXT_TEST_CRED}</li>
        <li>{process.env.NEXT_GOOGLE_AUTHORIZE_ENDPOINT}</li>
      </ul>
    </>
  );
};

export default withLayout(Main, MainLayout);
