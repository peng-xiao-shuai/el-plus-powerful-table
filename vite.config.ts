import path, { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
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
    ],
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
    common.plugins = [
      ...common.plugins,
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
              code = scssUrl + code
            }

            return { code, map: null }
          },
        }
      })(),
    ]

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
          external: ['vue', /^(@e|e)lement-plus*/],
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
    common.plugins = [
      ...common.plugins,
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
    ]
    return common
  }
})
