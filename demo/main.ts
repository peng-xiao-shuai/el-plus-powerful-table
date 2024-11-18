import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import Empty from './empty'
// import en from 'element-plus/lib/locale/lang/en'
// import zh from 'element-plus/lib/locale/lang/zh-cn'
// import PowerfulTable from '../es'
import App from './App.vue'
import { langPackages } from './indexData'
import PowerfulTable from '~/index'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
// app.use(ElementPlus, {
//   size: 'large',
//   locale: zh,
// })
app.use(PowerfulTable, {
  locale: langPackages,
  emptyElement: Empty,
  listRequest: {
    totalKey: 'total',
    pageNoKey: 'pageNo',
    pageSizeKey: 'pageSize',
    responseKey: 'data.result',
    listsKey: 'rows',
  },
})
app.mount('#app')
