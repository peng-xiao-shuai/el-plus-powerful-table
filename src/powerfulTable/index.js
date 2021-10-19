import powerfulTable from "./powerful-table.vue"
powerfulTable.install = (app, option) => {
  app.component(powerfulTable.name, powerfulTable)
  app.provide('powerfulTable', option)
}
export default powerfulTable
