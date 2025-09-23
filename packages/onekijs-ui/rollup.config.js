import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import packageJson from './package.json' assert { type: 'json' };

const config = [
  {
    input: 'src/index.ts',
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
      'react-icons',
      'react-popper',
      'react-popper-tooltip',
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
        name: 'onekijs-framework',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }) /*, terser()*/],
  },
];

export default config;
