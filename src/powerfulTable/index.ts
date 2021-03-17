import { App } from "vue";
import powerfulTable from "./powerful-table.vue";

powerfulTable.install = (app: App): void => {
  app.component(powerfulTable.name, powerfulTable);
};

export default powerfulTable;
