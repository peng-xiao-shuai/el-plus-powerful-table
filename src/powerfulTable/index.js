import powerfulTable from "./powerful-table.vue"
powerfulTable.install = (app) => {
  app.component(powerfulTable.name, powerfulTable)
}
export default powerfulTable
