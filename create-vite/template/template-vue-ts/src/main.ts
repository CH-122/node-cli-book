import { createApp } from 'vue';
import { initQstTheme } from '@itshixun/qst-ui-system';
import { initQstRequest } from './utils/requestUtils.js';

import App from '@/App.vue';
import { router } from '@/router/index';
import pinia from '@/store';

// element-plus css variables
import 'element-plus/theme-chalk/el-var.css';
// element-plus darkmode css variables
import 'element-plus/theme-chalk/dark/css-vars.css';
// 对于仅使用组件API的组件，需要手动导入样式
import 'element-plus/theme-chalk/el-dialog.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-loading.css';

import 'uno.css';

initQstTheme();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');

initQstRequest();
