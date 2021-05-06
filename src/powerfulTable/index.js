import powerfulTable from "./powerful-table.vue"
powerfulTable.install = function (Vue) {
  Vue.component(powerfulTable.name, powerfulTable)
}
if (typeof window !== 'undefined' && window.Vue) {
  powerfulTable.install(window.Vue)
}
export default powerfulTable
