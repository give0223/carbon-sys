import axios from 'axios';
import { AxiosInstance , AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { ElMessage } from 'element-plus';
import {localGet} from '@/utils/cache';
import {TOKEN_KEY} from '@/enums/cacheEnum';

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 0,
})

/* 請求攔截器 */
service.interceptors.request.use(
  (config) => {
    const token = localGet(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  (error: AxiosError) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
)

/* 響應攔截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data

    // 根據自訂義代碼判斷請求是否成功
    if (code === 0) {
      // 將組件用數據返回
      return data
    } else {
      // 處理錯誤呼叫
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // 處理HTTP代碼錯誤
    let message = ''
    // HTTP 狀態碼
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，請重新登入'
        // 這裡可以觸發退出的Action
        break
      case 403:
        message = '拒絕訪問'
        break
      case 404:
        message = '請求地址錯誤'
        break
      case 500:
        message = '伺服器錯誤'
        break
      default:
        message = '網路連接異常，請稍後再試'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  },
)

/* 導出封裝的請求方法 */
const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}

export default http