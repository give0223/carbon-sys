import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { staticRoutes } from './constantRoutes'
import { useUserStore } from '@/store/modules/user';
import { useAuthStore } from '@/store/modules/auth';
import { LOGIN_URL,ROUTER_WHITE_LIST  } from '@/config/config';

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes as RouteRecordRaw[],
  // 路由切換時 滾動到最上面
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from, next) => {
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
  // 4.如果沒有列表,就重新請求列表並加入動態路由
  const authStore = useAuthStore()
  authStore.setRouteName(to.name as string)
  if(!authStore.authRouterList.length){
  }
  // 5.其他直接放行
  return next()
})

export default router