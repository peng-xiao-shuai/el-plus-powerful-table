import type { App, Plugin } from 'vue';
import Components from './Components';
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
export default makeInstaller([...Components])