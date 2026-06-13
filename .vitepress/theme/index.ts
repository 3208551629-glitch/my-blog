import DefaultTheme from 'vitepress/theme'
import './styles/index.css'
import ProjectDetail from './components/ProjectDetail.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProjectDetail', ProjectDetail)
  }
}
