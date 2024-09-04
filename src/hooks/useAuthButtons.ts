import { computed } from 'vue'
import { useAuthStore } from '@/store/modules/auth'

/**
 * @description: 頁面按鈕權限
 */
export const useAuthButtons = () => {
  const authStore = useAuthStore()
  const authButtons = authStore.authButtonList || []

  // 當前按鈕權限列表
  const BUTTONS = computed(() => {
    const currentPageAuthButton : {
      [key:string]: boolean
    } = {}
    authButtons.forEach((item) => (currentPageAuthButton[item] = true))
    return currentPageAuthButton
  })
  return {
    BUTTONS
  }
}