import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'UI Components',
  description: '基于 Web Components 的 UI 组件库文档',
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: '快速开始',
          link: '/guide/getting-started'
        },
        {
          text: 'Components',
          items: [     // 二级菜单
            { text: '输入框 input', link: '/components/input' },
            { text: '按钮 button', link: '/components/button' },
          ]
        }
      ]
    }
  }
});