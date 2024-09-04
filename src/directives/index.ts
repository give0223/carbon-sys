import { App } from 'vue'
import auth  from './modules/auth' // 這邊再匯入一個新的模組檔，就是我要定義的指令內容

const directivesList: any = {
  // Custom directives
  auth,
}
const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 註冊所有自訂指令
      app.directive(key, directivesList[key])
    })
  },
}

export default directives

