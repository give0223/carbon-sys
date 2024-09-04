// 系統用戶登入訊息接口
import http from '@/utils/http';
import type {LoginData, UserRes } from './types';

// 登入
export function login (data: LoginData) {
  return http.post<string>('/admin/acl/index/login', data);
}

// 取得登入用戶資訊
export function getUserInfo() {
  return http.get<UserRes>('/admin/acl/index/info');
}

// 登出
export function logout() {
  return http.post('/admin/alc/index/logout');
}