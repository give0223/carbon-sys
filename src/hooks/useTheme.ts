import { computed } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'
import { ElMessage } from 'element-plus'

export const useTheme = () => {
  const settingsStore = useSettingsStore()
  const themeConfig = computed(() => settingsStore.themeConfig)

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement as HTMLElement
    if (themeConfig.value.isDark) body.setAttribute('class', 'dark')
    else body.setAttribute('class', '')
  }


  // 初始化主題
  const initTheme = () => {
    switchDark()
  }
  return {
    initTheme,
    switchDark,
  }
}
