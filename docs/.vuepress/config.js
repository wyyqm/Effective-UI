module.exports = {
  title: 'Element UI 组件扩展',
  description: '积累Element UI的扩展组件',
  markdown: {
    // 代码显示行号
    lineNumbers: true,
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] }
  },
  plugins: [
    '@vuepress-reco/extract-code',
    ['vuepress-plugin-code-copy', true],
    [
      '@vuepress/register-components',
      {
        components: [
          {
            name: 'Home',
            path: '/examples/views/Home.vue'
          },
          {
            name: 'JsonForm',
            path: '/packages/json-form/JsonForm.vue'
          },
          {
            name: 'ProSelect',
            path: '/examples/components/ProSelect.vue'
          },
          {
            name: 'CommView',
            path: '/examples/components/CommView.vue'
          }
        ]
      }
    ]
  ]
}
