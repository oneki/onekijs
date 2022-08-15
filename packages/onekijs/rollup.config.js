import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import packageJson from './package.json';

// const packageJson = require('./package.json');

const config = [
  {
    input: 'src/index.ts',
    external: [
      'react',
      'react-dom',
      'onekijs-framework',
      'react-router',
      'react-router-dom',
      'history',
      'react-transition-group',
    ],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'onekijs',
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
