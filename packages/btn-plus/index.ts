import BtnPlus from './src/btn-plus'
import type { App } from 'vue'

// 定义 install 方法， App 作为参数
BtnPlus.install = (app: App): void => {
  app.component(BtnPlus.name!, BtnPlus)
}

export const PTBtnPlus = BtnPlus as import('@/index').SFCWithInstall<
  typeof BtnPlus
>

export default PTBtnPlus
