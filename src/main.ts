import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
// import powerfulTable from "../lib/powerful-table.umd.min.js"
import powerfulTable from "./powerfulTable/index"
// import powerfulTable from 'el-plus-powerful-table-ts'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import "element-plus/theme-chalk/src/index.scss"

const app = createApp(App)
app.use(ElementPlus)
app.use(powerfulTable, {
	// btnSlot: 'all',
	// locale: zhCn
})
app.mount("#app")