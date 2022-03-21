import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import babel from "@rollup/plugin-babel";
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-porter'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import jsx from "acorn-jsx";
import pkg from './package.json'
const deps = Object.keys(pkg.dependencies)

export default {
  input: path.resolve(__dirname, './packages/powerful-table/index.ts'),
  output: [{
    format: 'es',
    file: pkg.module
  },
  // {
  //   format: 'umd',
  //   file: pkg.main
  // }
],
  plugins: [
    nodeResolve(),
    vue({
      target: 'browser',
      exposeFilename: true
    }),
    css(),
    terser(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true
        },
        include: [
          'packages/**/*',
          'typings/shims-vue.d.ts',
          'typings/powerful-table.d.ts',
          'typings/components.d.ts',
        ],
        exclude: [
          'demo',
          'node_modules'
        ]
      },
      abortOnError: false
    }),
    babel({ babelHelpers: "bundled", extensions: [".ts", ".js", ".tsx"] }),
  ],
  acornInjectPlugins: [jsx()],
  external(id) {
   return /^vue/.test(id) || deps.some(k => new RegExp('^' + k).test(id)) 
  }
}