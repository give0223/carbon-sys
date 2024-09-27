import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { staticRoutes } from './constantRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes as RouteRecordRaw[],
  // 路由切換時 滾動到最上面
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router