// 動態路由

import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => {
  return import('@/layouts/index.vue')
}

export const dynamicRoutes: RouteRecordRaw[] = [
    // 訂單管理
    {
      name: 'Order',
      path: '/order',
      component: LAYOUT,
      redirect: '/order/list',
      meta: {
        title: '訂單管理',
        icon: 'ShoppingTrolley',
      },
      children: [
        {
          name: 'OrderList',
          path: '/order/list',
          component: () => import('@/views/order/list/index.vue'),
          meta: {
            title: '订单列表',
            icon: 'Grid',
          },
        },
        {
          name: 'Label',
          path: '/order/label',
          component: () => import('@/views/order/refund/index.vue'),
          meta: {
            title: '退款管理',
            icon: 'Grid',
          },
        },
      ],
    },
  
]