import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
// import PowerfulTable from "../lib/es/packages/index"
import PowerfulTable from "~/index"
// import powerfulTable from 'el-plus-powerful-table-ts'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import "element-plus/theme-chalk/src/index.scss"
// import "../lib/es/style.css"

const app = createApp(App)
app.use(ElementPlus, {
  // locale: zhCn
})
app.use(PowerfulTable, {
  size: 'default',
  locale: en
})
app.mount("#app")
console.log(app);
