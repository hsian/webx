import DefaultTheme from 'vitepress/theme'
import '../../../dist/ui.es.js'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 无需 app.component 注册，Web Components 自注册
  }
}