import CommonTable from './index.vue'

export default {
  title: '组件/CommonTable',
  component: CommonTable,
  parameters: {
    componentSource: {
      url: './CommonTable.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommonTable },
  template: '<CommonTable />'
})
export const TableStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
TableStory.storyName = 'CommonTable'
