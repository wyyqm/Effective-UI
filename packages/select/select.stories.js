import SelectUnion from './index.vue'

export default {
  title: 'element常用组件合集/SelectUnion',
  component: SelectUnion,
  parameters: {
    componentSource: {
      url: './SelectUnion.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SelectUnion },
  template: '<SelectUnion />'
})
export const SelectStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
SelectStory.storyName = 'SelectUnion'
