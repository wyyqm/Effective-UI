import EfSearch from './index.vue'
export default {
  title: 'EffectiveUI/ef-search ',
  component: EfSearch,
  parameters: {
    componentSource: {
      url: './ef-search.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EfSearch },
  template: '<ef-search></ef-search>'
})
export const EfSearchStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
EfSearchStory.storyName = 'ef-search'
