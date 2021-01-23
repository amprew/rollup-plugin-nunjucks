import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'esm' }
  ],
  plugins: [
    resolve({ preferBuiltins: false }),
    babel({ babelHelpers: 'bundled' })
  ],
  external: ['nunjucks', 'fs-extra', 'fs', 'path']
};
