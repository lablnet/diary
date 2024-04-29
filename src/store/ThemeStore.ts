import { defineStore } from 'pinia'
import { themeSetup } from '../utils/index'

// media query for dark theme
const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const useThemeStore = defineStore('ThemeStore', {
  state: () => ({
    theme:
      localStorage.getItem('theme') ??
      (darkThemeMediaQuery.matches ? 'dark' : 'light')
  }),
  actions: {
    changeTheme (theme: string) {
      return (this.theme = theme)
    }
  }
})
