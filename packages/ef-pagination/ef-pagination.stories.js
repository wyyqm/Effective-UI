import EfPagination from './index.vue'
export default {
  title: 'EffectiveUI/ef-pagination ',
  component: EfPagination,
  parameters: {
    componentSource: {
      url: './ef-pagination.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EfPagination },
  template: '<ef-pagination></ef-pagination>'
})
export const EfPaginationStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
EfPaginationStory.storyName = 'ef-pagination'
