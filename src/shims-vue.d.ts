import { App } from "vue";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare type SFCWithInstall<T> = T & {
  install(app: App): void;
};

import powerfulTable from "el-plus-powerful-table";
declare const _powerfulTable: SFCWithInstall<typeof powerfulTable>;
export default _powerfulTable;
