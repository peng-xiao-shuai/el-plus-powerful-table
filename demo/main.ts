import { createApp } from 'vue'
import ElementPlus from 'element-plus/es'
import en from 'element-plus/lib/locale/lang/en'
import PowerfulTable from '../lib/es/packages/index.mjs'
import App from './App.vue'
import { langPackages } from './indexData'
// import PowerfulTable from '~/index'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import "../lib/es/style.css"
const app = createApp(App)
app.use(ElementPlus, {
  size: 'small',
  locale: en,
})
app.use(PowerfulTable, {
  locale: langPackages,
})
app.mount('#app')
