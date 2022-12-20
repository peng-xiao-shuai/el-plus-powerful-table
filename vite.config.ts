import path, { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from './package.json'

// 如果开启压缩banner and footer将只能简单英文文字
const banner = `/**
  license: ${pkg.license}
  author: ${pkg.author}
  email: ${pkg.bugs.email}
  name: ${pkg.name}
  version: ${pkg.version}
*/`

export default defineConfig(({ mode }) => {
  const common = {
    plugins: [
      vue(),
      dts({
        entryRoot: '.',
        noEmitOnError: true,
        skipDiagnostics: false,
        logDiagnostics: true,
        outputDir: [
          resolve(__dirname, './lib/es'),
          resolve(__dirname, './lib/cjs'),
        ],
        //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
        tsConfigFilePath: './tsconfig.json',
        compilerOptions: {
          types: [],
        },
      }),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '~': path.resolve('./packages'),
      },
    },
    base: mode === 'production' ? '/el-plus-powerful-table/' : '/',
    // 控制台打印
    // logLevel: "silent",
    server: {
      hmr: {
        overlay: false,
      },
      host: '0.0.0.0',
      port: 3001,
      // 是否自动在浏览器打开
      open: false,
      // 是否开启 https
      https: false,
      proxy: {
        //   '/api': {
        // target: 'https://blog.csdn.net/weixin_45292658',
        // changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
        //   }
      },
    },
  }
  if (mode === 'lib') {
    return {
      ...common,
      build: {
        target: 'modules',
        //打包文件目录
        outDir: 'es',
        //压缩
        minify: true,
        //css分离
        //cssCodeSplit: true,
        rollupOptions: {
          //忽略打包vue文件
          external: ['vue'],
          input: ['./packages/index.ts'],
          output: [
            {
              banner,
              format: 'es',
              //不用打包成.es.js,这里我们想把它打包成.js
              entryFileNames: '[name].mjs',
              //让打包目录和我们目录对应
              preserveModules: true,
              exports: 'named',
              //配置打包根目录
              dir: resolve(__dirname, './lib/es'),
            },
            {
              format: 'cjs',
              //不用打包成.cjs
              entryFileNames: '[name].js',
              //让打包目录和我们目录对应
              preserveModules: true,
              exports: 'named',
              //配置打包根目录
              dir: resolve(__dirname, './lib/cjs'),
            },
          ],
        },
        lib: {
          entry: './packages/index.ts',
          name: 'el-plus-powerful-table-ts',
        },
      },
    }
  } else {
    return {
      ...common,
    }
  }
})
