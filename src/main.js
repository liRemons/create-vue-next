import { createApp } from 'vue';
import store from './store'
import App from './App';
import ElementPlus from 'element-plus'
const app = createApp(App);
app.use(store)
app.use(ElementPlus)
app.mount('#container')