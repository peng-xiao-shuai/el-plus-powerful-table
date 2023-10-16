import PowerfulTableComponent from './src/powerful-table.vue'
import type { App } from 'vue'

// 定义 install 方法， App 作为参数
PowerfulTableComponent.install = (app: App): void => {
  app.component(PowerfulTableComponent.name, PowerfulTableComponent)
}
const PowerfulTable =
  PowerfulTableComponent as import('@/index').SFCWithInstall<
    typeof PowerfulTableComponent
  >

export { PowerfulTableComponent, PowerfulTable, PowerfulTable as default }
