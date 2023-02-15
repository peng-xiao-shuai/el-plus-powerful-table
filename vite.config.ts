import path, { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ mode }) => {
  const common = {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '~': path.resolve('./packages'),
        '@': path.resolve('./typings'),
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
    // 添加dts 插件
    common.plugins.push(
      dts({
        entryRoot: '.',
        noEmitOnError: true,
        skipDiagnostics: false,
        outputDir: [resolve(__dirname, './es'), resolve(__dirname, './lib')],
        //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
        tsConfigFilePath: './tsconfig.json',
        compilerOptions: {
          types: [],
        },
        beforeWriteFile: (filePath, content) => ({
          filePath: filePath.replace('\\packages', ''),
          content,
        }),
      })
    )
    return {
      ...common,
      build: {
        target: 'modules',
        //打包文件目录
        // sourcemap: 'hidden',
        //压缩
        minify: true,
        //css分离
        // cssCodeSplit: true,
        rollupOptions: {
          //忽略打包vue文件
          external: ['vue', /^element-plus*/],
          input: ['./packages/index.ts'],
          output: [
            {
              format: 'es',
              //不用打包成.es.js,这里我们想把它打包成.js
              entryFileNames: '[name].mjs',
              //让打包目录和我们目录对应
              preserveModules: true,
              exports: 'named',
              //配置打包根目录
              dir: resolve(__dirname, './es'),
              compact: true,
              sourcemap: true,
            },
            {
              format: 'cjs',
              //不用打包成.cjs
              entryFileNames: '[name].js',
              //让打包目录和我们目录对应
              preserveModules: true,
              exports: 'named',
              //配置打包根目录
              dir: resolve(__dirname, './lib'),
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
