import type { App, Component } from 'vue'

// 這裡統一引入組件
import SvgIcon  from './SvgIcon.vue'
import HelloWorld from './HelloWorld.vue'

// 將引入組件放入Components
const Components: {
  [propName: string]: Component
} = { SvgIcon,HelloWorld }

export default {
  install: (app: App) => {
    Object.keys(Components).forEach((key) => {
      app.component(key, Components[key])
    })
  },
}