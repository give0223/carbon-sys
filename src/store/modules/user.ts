// 用戶訊息
import { defineStore } from 'pinia'
import { getUserInfo,logout} from '@/api';
import {LoginParams} from './model/userModel';
import {localGet,localSet} from '@/utils/cache.ts';
import {TOKEN_KEY,USER_INFO_KEY} from '@/enums/cacheEnum.ts';
import type {UserInfo} from '@/api/user/types.ts';
import type {UserState} from './model/userModel.ts';
import {useAuthStore} from './auth.ts';
import {RESETSTORE} from '@/utils/reset.ts';

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
      userInfo: null,
      token: ''
  }),
  getters: {
    // 取得token
    getToken(): string {
      return (this.token as string) || localGet(TOKEN_KEY) || ''
    },
  },
  actions: {
    // 設置token
    setToken(token: string | undefined) {
      console.log("token",token)
      this.token = token ? token : ''
      localSet(TOKEN_KEY, token)
    },
    // 設置用戶訊息
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    // 取得用戶訊息
    async GetInfoAction() {
      const {data} = await getUserInfo()
      const { avatar, buttons, name, roles, routes } = data
      console.log("取得用戶訊息:",data)
      const authStore = useAuthStore()
      // 儲存用戶訊息
      this.setUserInfo({avatar,name})
      // 儲存用戶權限
      authStore.setAuth({buttons,roles,routes})
    },
    // 登出
    async Logout(){
      await logout()
      RESETSTORE()
    }
  }
})