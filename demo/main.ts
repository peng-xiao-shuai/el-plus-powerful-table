import { createApp } from 'vue'

import ElementPlus from 'element-plus/es'
// import PowerfulTable from "../lib/es/packages/index.mjs"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import App from './App.vue'
import PowerfulTable from '~/index'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import "../lib/es/style.css"

const app = createApp(App)
app.use(ElementPlus, {
  // locale: zhCn
})
app.use(PowerfulTable, {
  size: 'default',
  locale: en,
})
app.mount('#app')
