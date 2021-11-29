import ButtonUnion from './index.vue'

export default {
  title: '组件/ButtonUnion',
  component: ButtonUnion,
  parameters: {
    componentSource: {
      url: './ButtonUnion.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ButtonUnion },
  template: '<ButtonUnion />'
})
export const ButtonStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
ButtonStory.storyName = 'ButtonUnion'
