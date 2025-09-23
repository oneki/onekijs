import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';

import packageJson from './package.json' assert { type: 'json' };

const config = [
  {
    input: 'src/index.tsx',
    external: [
      '@popperjs/core',
      'immer',
      'query-string',
      'react',
      'react-dom',
      'react-redux',
      'react-transition-group',
      'redux',
      'redux-saga',
      'reflect-metadata',
      'rfc4648',
      '@popperjs/core',
      'onekijs-framework',
      'onekijs-ui',
      'react-icons',
      'react-popper',
      'react-popper-tooltip',
      'react-virtual',
      'react-virtualized-auto-sizer',
      'react-window',
      'react-window-infinite-loader',
      'styled-components',
      '@clr/city',
    ],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'clarity',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), css() /*, terser()*/],
  },
  {
    input: 'src/next.tsx',
    external: [
      '@popperjs/core',
      'immer',
      'query-string',
      'react',
      'react-dom',
      'react-redux',
      'react-transition-group',
      'redux',
      'redux-saga',
      'reflect-metadata',
      'rfc4648',
      '@popperjs/core',
      'onekijs-framework',
      'onekijs-ui',
      'react-icons',
      'react-popper',
      'react-popper-tooltip',
      'react-virtual',
      'react-virtualized-auto-sizer',
      'react-window',
      'react-window-infinite-loader',
      'styled-components',
      '@clr/city',
    ],
    output: [
      {
        file: 'dist/next.js',
        format: 'cjs',
        sourcemap: true,
        name: 'clarity-next',
      },
      {
        file: 'dist/next.module.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), css() /*, terser()*/],
  },
];

export default config;
