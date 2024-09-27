import type { App, Component } from 'vue'

// 這裡統一引入組件
import { Auth } from './Auth';
import {SvgIcon}  from './SvgIcon'
import { IconifyIcon } from './IconifyIcon';
import { SwitchDark } from './SwitchDark';

// 將引入組件放入Components
const Components: {
  [propName: string]: Component
} = { Auth, SvgIcon, IconifyIcon, SwitchDark }

export default {
  install: (app: App) => {
    Object.keys(Components).forEach((key) => {
      app.component(key, Components[key])
    })
  },
}