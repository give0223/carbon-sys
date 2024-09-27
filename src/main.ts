import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import  'normalize.css'
import 'element-plus/dist/index.css'
import'element-plus/theme-chalk/dark/css-vars.css';
import App from './App.vue'
import i18n from './plugins/i18n'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import registerGlobComp from './components' //全域註冊組件
import pinia from '@/store';
import router from '@/router';
// 加入異步路由
import '@/router/initDynamicRouter.ts'
import directives from '@/directives/index'; //引入註冊自訂指令


const app = createApp(App)

// 導入全部Element-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
.use(i18n)
.use(registerGlobComp)
.use(pinia)
.use(router)
.use(directives)
.mount('#app')
