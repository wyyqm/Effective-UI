import InputUnion from './index.vue'

export default {
  title: '组件/InputUnion',
  component: InputUnion,
  parameters: {
    componentSource: {
      url: './InputUnion.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { InputUnion },
  template: '<InputUnion />'
})
export const InputStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
InputStory.storyName = 'InputUnion'
