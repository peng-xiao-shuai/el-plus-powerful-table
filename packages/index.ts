import type { App, Plugin } from 'vue';
import components from './components/index';
import PowerfulTable from './powerful-table/index';
import fComponents from './filter/index';
import BtnPlus from './btn-plus/index';
export * from './btn-plus/index';
export * from './filter/index';
export * from './powerful-table/index';
export * from './components/index';
const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options: {}) => {
    components.forEach((c) => {
      app.use(c)
    })
    app.provide('powerfulTable', options)
  }

  return install
}
// export const install = makeInstaller([...Components]).install
export default makeInstaller([...components, ...fComponents, BtnPlus, PowerfulTable])