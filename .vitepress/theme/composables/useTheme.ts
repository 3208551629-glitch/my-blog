import { ref, watch } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  // 初始化时检查系统偏好和本地存储
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme')
    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setTheme(dark) {
    isDark.value = dark
  }

  watch(isDark, (dark) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }
  }, { immediate: true })

  return {
    isDark,
    toggleTheme,
    setTheme
  }
}
