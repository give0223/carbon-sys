// 權限控制指令

import { useAuthStore } from '@/store/modules/auth'
import type { Directive,DirectiveBinding } from 'vue';

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()
    const { value } = binding
    const currentPageRoles = authStore.authButtonList ?? []
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = value.every((item) =>
        currentPageRoles.includes(item),
      )
      // 如果沒有這個權限，就移除整個 HTML 節點
      if (!hasPermission) el.remove()
    } else {
      if (!currentPageRoles.includes(value)) el.remove()
    }
  },
}

export default auth