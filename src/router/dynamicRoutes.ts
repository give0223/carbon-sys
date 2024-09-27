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
      redirect: '/order/OrderList',
      meta: {
        title: '訂單管理',
        icon: 'ShoppingTrolley',
      },
      children: [
        {
          name: 'OrderList',
          path: '/order/OrderList',
          component: () => import('@/views/order/orderList/index.vue'),
          meta: {
            title: '訂單列表',
            icon: 'ShoppingBag',
          },
        },
        {
          name: 'OrderRefund',
          path: '/order/OrderRefund',
          component: () => import('@/views/order/orderRefund/index.vue'),
          meta: {
            title: '退款管理',
            icon: 'Coin',
          },
        },
      ],
    },
  
]