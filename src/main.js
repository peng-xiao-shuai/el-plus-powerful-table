import Vue from 'vue'
import ElementUI from 'element-ui'
import powerfulTable from "../lib/powerful-table.common.js"
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(powerfulTable)

new Vue({
  el: '#app',
  render: h => h(App)
})
