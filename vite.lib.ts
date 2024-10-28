import path, { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(() => {
  const common = {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
        ],
        imports: ['vue'],
        dirs: [],
        resolvers: [ElementPlusResolver()],
      }),
      dts({
        entryRoot: './packages',
        outDir: [resolve(__dirname, './es'), resolve(__dirname, './lib')],
        //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
        tsconfigPath: './tsconfig.json',
        include: [
          'packages',
          'typings',
          'global.d.ts',
          'auto-imports.d.ts',
          'components.d.ts',
        ],
        beforeWriteFile: (filePath, content) => {
          let upContent = content
            .replace(/'..\/typings/gi, "'./typings")
            .replace(/\/..\/typings/gi, '/typings')
          // 修改typings文件夹中的内容
          if (filePath.includes('\\typings')) {
            upContent = upContent.replace(/\/packages/g, '')
          }
          return {
            // 处理文件名
            filePath: filePath.replace('\\packages', ''),
            // 处理typings路径
            content: upContent,
          }
        },
      }),
      Components({
        globs: ['**/src/*.{tsx|vue}'],
        include: [/\.(vue|tsx)$/, /\.vue\?vue/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      (function injectCss() {
        return {
          name: 'injectCss',
          transform(code: string, id: string) {
            if (id.includes('packages/index.ts')) {
              let scssUrl = ''
              // 使用到的scss文件
              ;[
                'button-group',
                'message',
                'message-box',
                'popover',
                'checkbox',
                'scrollbar',
                'tooltip',
                'button',
                'image',
                'input',
                'link',
                'rate',
                'switch',
                'tag',
              ].forEach((item) => {
                scssUrl += `import 'element-plus/es/components/${item}/style/index'\n`
              })
              scssUrl += `import './style.css'\n`
              code = scssUrl + code
            }

            return { code, map: null }
          },
        }
      })(),
    ],
    resolve: {
      alias: {
        '~': path.resolve('./packages'),
        '@': path.resolve('./typings'),
      },
    },
    // 控制台打印
    // logLevel: "silent",
  }

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
        external: ['vue', './style.css', /^(@e|e)lement-plus*/],
        input: ['./packages/index.ts'],
        output: [
          {
            format: 'es' as const,
            //不用打包成.es.js,这里我们想把它打包成.js
            entryFileNames: '[name].mjs',
            //让打包目录和我们目录对应
            preserveModules: true,
            exports: 'named' as const,
            //配置打包根目录
            dir: resolve(__dirname, './es'),
            compact: true,
            sourcemap: true,
          },
          {
            format: 'cjs' as const,
            //不用打包成.cjs
            entryFileNames: '[name].js',
            //让打包目录和我们目录对应
            preserveModules: true,
            exports: 'named' as const,
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
})
