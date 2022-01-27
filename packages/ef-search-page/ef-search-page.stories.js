import EfSearchPage from './index.vue'
export default {
  title: '列表页/ef-search-page',
  component: EfSearchPage,
  parameters: {
    componentSource: {
      url: './EfSearchPage.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EfSearchPage },
  template: '<ef-search-page></ef-search-page>'
})
export const EfSearchStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
EfSearchStory.storyName = 'ef-search-page'
