import type { App, Plugin } from 'vue';
import components from './components';
import PowerfulTable from './powerful-table';
import fComponents from './filter';
import BtnPlus from './btn-plus';
export * from './btn-plus';
export * from './filter';
export * from './powerful-table';
export * from './components';
const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: import('../typings').InjectProps) => {
    components.forEach((c) => {
      app.use(c)
    })
    app.provide('powerfulTable', options ? options : {})
  }

  return install
}
export default {
    install: makeInstaller([...components, ...fComponents, BtnPlus, PowerfulTable])
}