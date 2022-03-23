import { App } from 'vue'
import { SFCWithInstall } from '../../typings';
import BtnPlus from './src/btn-plus.vue'

// 定义 install 方法， App 作为参数
BtnPlus.install = (app: App): void => {
    app.component(BtnPlus.name, BtnPlus)
}

export const PTBtnPlus = BtnPlus as SFCWithInstall<typeof BtnPlus>

export default PTBtnPlus