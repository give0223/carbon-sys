// 用戶登入資料類型
export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export interface UserInfoRes {
  userId: string
  username: string
  avatar: string
  desc: string
}

// 用戶權限資料類型
export interface AuthInfo {
  buttons: string[]
  roles: string[]
  routes: string[]
}

// 用戶訊息類型
export interface UserInfo {
  userId: string
  username: string
  avatar: string
}