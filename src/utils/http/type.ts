// * 請求響應參數(不包含data)
export interface Result {
  code: number
  message: string
  success?: boolean
}

// * 請求響應參數(包含data)
export interface ResultData<T = any> extends Result {
  data: T
}
