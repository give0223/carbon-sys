// 系統用戶登入訊息接口
import http from '@/utils/http';
import type {LoginData, LoginRes, UserInfoRes} from './types';

// 登入
export const login = (data: LoginData) => {
  console.log("登入系統API",data)
  return http.post<LoginRes>('/user/login', data);
}

// 取得登入用戶資訊
export const getUserInfo = () => {
  return http.get<UserInfoRes>('/user/info');
}

// 登出
export const logout = () => {
  return http.post('/admin/alc/index/logout');
}