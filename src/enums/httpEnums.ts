
/**
 * @description: 回應結果
 * @argument SUCCESS  請求成功
 * @argument EXPIRE   token請求失效或驗證失敗
 * @argument ERROR    請求錯誤
 * @argument TIMEOUT  請求超時
 * @argument TYPE     請求類型
 */
export enum ResultEnum {
  SUCCESS = 200,
  EXPIRE = 203,
  ERROR = -1,
  ERRMESSAGE = '请求失败',
  TIMEOUT = 25000,
  TYPE = 'success',
}
