import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './styles/index.css'
import ProjectDetail from './components/ProjectDetail.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ProjectDetail', ProjectDetail)
  }
}
