import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
import powerfulTable from "../lib/powerful-table.umd.min.js"

import "element-plus/lib/theme-chalk/index.css"

const app = createApp(App)
app.use(ElementPlus)
app.use(powerfulTable)
app.mount("#app")