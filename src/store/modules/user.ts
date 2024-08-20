// 用戶訊息
import { defineStore } from 'pinia'
import { getUserInfo ,login} from '@/api';
import {LoginParams} from './model/userModel';
import {localGet,localSet} from '@/utils/cache.ts';
import {TOKEN_KEY,USER_INFO_KEY} from '@/enums/cacheEnum.ts';
import type {UserInfo} from '@/typings/store.d.ts';
import type {UserState} from './model/userModel.ts';

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
      userInfo: null,
      token: undefined
  }),
  getters: {
    // 取得用戶訊息
    getUserInfo(): UserInfo {
      return (this.userInfo as UserInfo) || localGet(USER_INFO_KEY) || {}
    },
    // 取得token
    getToken(): string {
      return (this.token as string) || localGet(TOKEN_KEY) || ''
    },
  },
  actions: {
    // 設置token
    setToken(token: string | undefined) {
      this.token = token ? token : ''
      localSet(TOKEN_KEY, token)
    },
    // 設置用戶訊息
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      localSet(USER_INFO_KEY, info)
    },
    // 登入
    async login(params: LoginParams) {
      try {
        const data = await login(params)

        const { token } = data
        this.setToken(token)
        this.getUserInfoAction()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 取得用戶訊息
    async getUserInfoAction() {
      try {
        const data = await getUserInfo()
        this.setUserInfo(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
  }
})