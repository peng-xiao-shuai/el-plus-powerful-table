import powerful from './src/powerful-table.vue'
import type { App } from 'vue'

// 定义 install 方法， App 作为参数
powerful.install = (app: App): void => {
  app.component(powerful.name, powerful)
}
export const PowerfulTable = powerful as import('@/index').SFCWithInstall<
  typeof powerful
>

export default PowerfulTable
