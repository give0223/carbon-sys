// 取得路由權限表

import { RouteRecordRaw } from 'vue-router';
import router from './index';
import { ElNotification } from "element-plus";
import {LOGIN_URL, ROUTER_WHITE_LIST} from '@/config/config';
import { useUserStore } from "@/store/modules/user";
import { useAuthStore } from "@/store/modules/auth";
import { staticRoutes, notFoundRouter} from './constantRoutes';
import {dynamicRoutes} from './dynamicRoutes';
import {RESETSTORE} from '@/utils/reset';


router.beforeEach(async(to, from, next) => {
  const userStore = useUserStore()
  // 1.判斷是否進入登入頁,有Token才能進入當前頁面,沒有Token就跳轉到登入頁
  if (to.path === LOGIN_URL ) {
    console.log("進入登入頁")
    if(userStore.token) {
      return next(from.fullPath)
    }
    return next()
  }
  // 2.判斷訪問頁面是否在白名單內(不須登入也能訪問),如果存在就直接跳轉
  if(ROUTER_WHITE_LIST.includes(to.path)){
    return next()
  }
  // 3.判斷是否有Token，沒有就跳轉到登入頁並攜帶原本目標路徑
  if(!userStore.token){
    return next({
      path: LOGIN_URL,
      query: {
        redirect: to.fullPath
      }
    })
  }
  const authStore = useAuthStore()
  authStore.setRouteName(to.name as string)
  // 4.如果沒有列表,就重新請求列表並加入動態路由
  if(!authStore.authRouterList.length){
    console.log("重新請求動態列表")
    await initDynamicRouter()
    console.log("to:",to)
    return next({ ...to, replace: true })
  }
  // 5.其他直接放行
  return next()
})

// 獲取動態路由
const initDynamicRouter = async() => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  try {
    // 1取得用戶訊息&權限訊息
    await userStore.GetInfoAction()
    
    // 判斷當前用戶是否有路由權限
    if(!authStore.authRouterList.length){
      ElNotification({
        title: '沒有訪問權限',
        message: '當前帳戶沒有訪問權限，請聯繫系統管理員',
        type: 'warning',
        duration: 3000
      })
      RESETSTORE()
      router.replace(LOGIN_URL)
      return Promise.reject('No permission')
    }

    // 2.過濾路由列表
    const routerList = filterAsyncRoutes(
      dynamicRoutes,
      authStore.authRouterList,
    )

    // 3.設置動態路由
    routerList.forEach((item) => {
      console.log("設置動態路由:",item)
      router.addRoute(item as unknown as RouteRecordRaw)
    })

    // 4.添加notFound路由
    router.addRoute(notFoundRouter)
    console.log("添加notFound路由:",router)

    // 5.處理subMenu資料,靜態路由和動態路由拼接,過濾isHide為true的路由
    const menuList = getMenuList([...staticRoutes, ...routerList] as unknown as Menu.MenuOptions[])
    authStore.setAuthMenuList(menuList)
  }
  catch (error) {
    // 當按鈕或Menu獲取失敗時,重新導向登入頁
    console.log("獲取動態路由例外錯誤:",error)
    RESETSTORE()
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}

// 過濾路由
function filterAsyncRoutes(
  dynamicRoutes: RouteRecordRaw[],
  authRouterList: string[],
) {
  console.log("dynamicRoutes:",dynamicRoutes)
  console.log("authRouterList:",authRouterList)
  return dynamicRoutes.filter((route) => {
    // 1.如果route的name在routeName中沒有,直接過濾掉
    if (!authRouterList.includes(route.name as string)) return false

    // 2.如果當前route還有子路由,就針對子路由也進行過濾
    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRoutes(route.children, authRouterList)
    }
    return true
  })
}

// 側邊Menu列表過濾
function getMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getMenuList(item.children))
    return !item.meta?.isHide
  })
}

