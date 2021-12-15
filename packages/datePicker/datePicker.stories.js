import DatePickerUnion from './index.vue'

export default {
  title: 'element常用组件合集/DatePickerUnion',
  component: DatePickerUnion,
  parameters: {
    componentSource: {
      url: './DatePickerUnion.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DatePickerUnion },
  template: '<DatePickerUnion />'
})
export const DatePickerStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
DatePickerStory.storyName = 'DatePickerUnion'
