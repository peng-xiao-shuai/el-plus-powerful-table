import { createApp } from "vue";
import App from "./App.vue";

// import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { components,plugins } from './element';

// import powerfulTable from 'el-plus-powerful-table'
// import copyButton from 'element-plus-copy-button'


const app = createApp(App)

// app.use(powerfulTable)
// app.use(copyButton)

components.forEach((component:any) => {
    app.component(component.name, component);
});

plugins.forEach(plugin => {
    app.use(plugin);
});

app.mount("#app")