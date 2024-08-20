import { defineStore } from 'pinia'
import { AuthState } from './model/authModel'
import { AuthInfo } from '../../api/user/types'
export const useAuthStore = defineStore({
  // id: 必要的,在Store中唯一
  id: 'app-auth',
  state: (): AuthState => ({
    // 當前頁面,route name用來當前權限檢查
    routeName: '',
    // 後端返回的角色列表
    roles: [],
    // 後端返回的按鈕權限列表
    authButtonList: [],
    // 後端返回的路由列表
    authRouterList: [],
    // 處理後側邊列表
    authMenuList: [],
  }),

  actions: {
    // setRouteName
    setRouteName(name: string) {
      this.routeName = name
    },

    resetAuth() {
      this.authRouterList = []
    },
    // 設置用戶權限訊息
    setAuth(authInfo: AuthInfo) {
      this.roles = authInfo.roles
      this.authButtonList = authInfo.buttons
      this.authRouterList = authInfo.routes
    },
    setAuthMenuList(list: Menu.MenuOptions[]) {
      this.authMenuList = list
    },
  },
})
