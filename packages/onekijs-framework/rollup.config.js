import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

import packageJson from './package.json';

const config = [
  {
    input: 'src/index.ts',
    external: [
      'history',
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
      'text-encoding-shim',
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
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
  },
];

export default config;
