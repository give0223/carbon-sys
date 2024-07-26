import { RouteRecordRaw } from 'vue-router'

// 基础路由

export const constRouterMap: RouteRecordRaw[] = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('/src/views/login/login.vue')
  // },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('/src/layouts/index.vue')
  },
  // {
  //   path: '/403',
  //   name: '403',
  //   component: () => import('/src/errorPages/403.vue')
  // },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('/src/errorPages/404.vue')
  // },
  // {
  //   path: '/500',
  //   name: '500',
  //   component: () => import('/src/errorPages/500.vue')
  // }
]


// 白名单(路径)

export const whiteList = []