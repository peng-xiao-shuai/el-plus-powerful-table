/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'el-plus-powerful-table-ts' {
  import type { App } from 'vue'
  const PowerfulTable: {
    install: (app: App<any>, opt: any) => void;
  }
  export default PowerfulTable
}