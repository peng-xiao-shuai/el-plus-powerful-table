import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
import powerfulTable from "../lib/index"
// import powerfulTable from "~/index"
// import powerfulTable from 'el-plus-powerful-table-ts'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import "element-plus/theme-chalk/src/index.scss"
import "../lib/index.min.css"

const app = createApp(App)
app.use(ElementPlus)
app.use(powerfulTable, {
  // size: 'small'
})
app.mount("#app")