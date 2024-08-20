import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import i18n from './plugins/i18n'
// import router from './routetr';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import registerGlobComp from './components' //全域註冊組件
import pinia from '@/store';
import router from '@/routetr';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
.use(i18n)
.use(registerGlobComp)
.use(pinia)
.use(router)
.mount('#app')
