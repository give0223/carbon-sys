// 重製用戶訊息
import { useUserStore } from '@/store/modules/user';
import { useAuthStore } from '@/store/modules/auth';
export function RESETSTORE() {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  userStore.$reset();
  authStore.$reset();
  // 清除用戶訊息緩存
  localStorage.removeItem('app-user');
}