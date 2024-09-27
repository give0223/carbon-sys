import { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config/config'

const LAYOUT = () => import('@/layouts/index.vue')

/**
 * @description 靜態路由
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: LOGIN_URL,
    name: 'login',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: '404',
    path: '/404',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/error-page/index.vue'),
  },
  {
    name: 'LAYOUT',
    path: '/',
    component: LAYOUT,
    redirect: HOME_URL,
    meta: {
      title: '首頁',
      icon: 'HomeFilled',
    },
    children: [
      {
        name: 'Index',
        path: '/index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首頁',
          icon: 'HomeFilled',
          affix: true,
        },
      },
    ],
  },
  {
    name: 'Dashboard',
    path: '/dashBoard',
    component: LAYOUT,
    redirect: '/dashBoard',
    children: [
      {
        name: 'Dashboard',
        path: '/dashBoard',
        component: () => import('@/views/dashBoard/index.vue'),
        meta: {
          icon: 'DataLine',
          title: '數據資料表',
        },
      },
    ],
  },
  // 防止出現No match found for location with path的警告
  {
    path: '/:catchAll(.*)',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/error-page/index.vue'),
  },
]

/**
 * @description 未找到路由給 404 路由
 */
export const notFoundRouter = {
  name: 'notFound',
  path: '/:pathMatch(.*)*',
  redirect: '404',
}
