import axios from 'axios';
import { AxiosInstance , AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus';
import { ResultData } from './type';
import { ResultEnum } from '@/enums/httpEnums'
import {LOGIN_URL} from '@/config/config';
import { RESETSTORE } from '../reset'
import router from '@/routetr';

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 0,
})

/* 請求攔截器 */
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.token = token
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
    const { data } = response
    // * 登入失敗（code == 203）
    if (data.code === ResultEnum.EXPIRE) {
      RESETSTORE()
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE)
      router.replace(LOGIN_URL)
      return Promise.reject(data)
    }

    if (data.code && data.code !== ResultEnum.SUCCESS) {
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE)
      return Promise.reject(data)
    }
    return data
  },
  (error: AxiosError) => {
    // 處理HTTP錯誤
    let message = ''
    // HTTP 狀態碼
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，請重新登入'
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


/**
 * @description: 導出封裝的請求方法
 * @returns {*}
 */
const http = {
  get<T>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return service.get(url, { params, ...config })
  },

  post<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return service.post(url, data, config)
  },

  put<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return service.put(url, data, config)
  },

  delete<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return service.delete(url, { data, ...config })
  },
}

export default http