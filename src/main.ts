import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
import powerfulTable from "./powerfulTable/index"

import "element-plus/lib/theme-chalk/index.css"

const app = createApp(App)
app.use(ElementPlus)
app.use(powerfulTable as any)
app.mount("#app")