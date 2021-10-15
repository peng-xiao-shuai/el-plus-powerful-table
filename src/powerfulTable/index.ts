import type { App } from 'vue';
import { SFCWithInstall } from '../../types/powerful-table'
import PowerfulTable from "./powerful-table.vue"
PowerfulTable.install = (app: App, option: {}): void => {
  app.component(PowerfulTable.name, PowerfulTable)

  app.provide('powerfulTable', option)
}
const _PowerfulTable = PowerfulTable as SFCWithInstall<typeof PowerfulTable>

export default _PowerfulTable
