import { App } from "vue";

declare type SFCWithInstall<T> = T & {
  install(app: App): void;
};

import powerfulTable from "el-plus-powerful-table";
declare const _powerfulTable: SFCWithInstall<typeof powerfulTable>;
export default _powerfulTable;

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
