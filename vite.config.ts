import path from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
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
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
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
  return common
})
