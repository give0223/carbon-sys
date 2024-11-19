// 取得登入用戶資訊
// 系統用戶登入訊息接口
import http from '@/utils/http';
import type {CoeRecord } from './types';

export function getCoeData() {
  return http.get<CoeRecord>('https://data.moenv.gov.tw/api/v2/cfp_p_02?language=zh&limit=1000&api_key=22c0c19a-6125-4635-b64e-ad897a9c5f0b');
}