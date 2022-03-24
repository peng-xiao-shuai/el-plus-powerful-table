import { nodeResolve } from '@rollup/plugin-node-resolve'
import { copyFiles } from './build/copyFiles';
import path from 'path'
import babel from "@rollup/plugin-babel";
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-porter'
import typescript from 'rollup-plugin-typescript2'
// import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue'
import jsx from "acorn-jsx";
import pkg from './package.json'
const deps = Object.keys(pkg.dependencies)

copyFiles(path.resolve(__dirname, './typings'), path.resolve(__dirname, './lib/typings'))
console.log("\x1b[32m", '✨文件夹创建完成✨')
// 如果开启压缩banner and footer将只能简单英文文字
const banner = 
`/**
  license: ${pkg.license}
  author: ${pkg.author}
  email: ${pkg.bugs.email}
  name: ${pkg.name}
  version: ${pkg.version}
*/`

export default {
  input: path.resolve(__dirname, './packages/index.ts'),
  output: [
    {
      format: 'esm',
      file: pkg.module,
      banner,
      globals: {
        vue: 'Vue'
      },
    }
  ],
  plugins: [
    nodeResolve(),
    vue({
      target: 'browser',
      css: false,
      exposeFilename: true,
    }),
    css({
      raw: false,
      minified: pkg.style
    }),
    // alias({
    //   entries: [
    //     { find: '$u', replacement: path.resolve(__dirname, './utils')}
    //   ],
    //   customResolver: nodeResolve({
    //     extensions: ['.vue', '.tsx', '.ts']
    //   })
    // }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
        include: [
          'packages/**/*',
          'typings/*',
          'shims-vue.d.ts'
        ],
        exclude: [
          'demo',
          'node_modules'
        ]
      },
      clean: true,
      abortOnError: false
    }),
    terser(),
    babel({ babelHelpers: "bundled", extensions: [".ts", ".js", ".tsx"] }),
  ],
  acornInjectPlugins: [jsx()],
  external(id) {
   return /^vue/.test(id) || deps.some(k => new RegExp('^' + k).test(id)) 
  },
  treeshake: false
}