import { App, Plugin } from 'vue';
import { SFCWithInstall } from '#/powerful-table';
export const withInst = <T>(component: T)  => {
  (component as T & Plugin).install = (app: App) => {
    app.component((component as any).name, component)
  }

  return component as SFCWithInstall<T>
}