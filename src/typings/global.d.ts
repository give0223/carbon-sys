declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare type Recordable<T = any> = Record<string, T>
declare module 'path-browserify'
// * Vite
declare interface ViteEnv {
  NODE_ENV: string
  VITE_APP_PORT: number
  VITE_APP_TITLE: string
  VITE_APP_BASE_API: string
}

/**
 * @description 動態路由參數配置 📚
 * @param path ==> 列表路徑
 * @param name ==> 列表別名
 * @param component ==> View文件路徑
 * @param redirect ==> 重新定向地址
 * 
 * @param meta ==> 列表標題資訊
 * @param meta.icon ==> 列表圖標
 * @param meta.title ==> 列表標題
 * @param meta.activeMenu ==> 當前路徑為詳情頁時，激活的列表
 * @param meta.isLink ==> 是否外部鏈接
 * @param meta.isHide ==> 是否隱藏
 * @param meta.isFull ==> 是否全螢幕
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否關閉頁面保留
 * @param meta.noAuth ===> 是否校驗權限
 * */

// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string
    name: string
    component?: string | (() => Promise<any>)
    redirect?: string
    meta: MetaProps
    children?: MenuOptions[]
  }
  interface MetaProps {
    icon: string
    title: string
    name: string
    activeMenu?: string
    isLink?: string
    isHide: boolean
    isFull: boolean
    isAffix: boolean
    isKeepAlive: boolean
    noAuth: boolean
  }
}
