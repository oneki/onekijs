/* eslint-disable no-undef */
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const withCSS = require('@zeit/next-css')

dotenvLoad();

const withNextEnv = nextEnv({
  staticPrefix: 'NEXT_',
  publicPrefix: 'PUBLIC_',
});

module.exports = withNextEnv(withCSS({
}));