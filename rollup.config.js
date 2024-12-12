import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
import { defineConfig } from 'rollup';
import pkg from './package.json' with {type:'json'}

export default defineConfig([{
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        entryFileNames: '[name].js'
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        entryFileNames: '[name].js'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled'
      }),
      terser()
    ],
    external: Object.keys(pkg.peerDependencies || {})
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/types',
      format: 'esm'
    },
    plugins: [
      dts()
    ]
  }]);