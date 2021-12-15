import EfSelectInput from './index.vue'

export default {
  title: 'EffectiveUI/EfSelectInput ',
  component: EfSelectInput,
  parameters: {
    componentSource: {
      url: './EfSelectInput.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EfSelectInput },
  template: `<ef-selectInput v-model="searchVal" :options="options"></ef-selectInput>`
})
export const EfSelectInputStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称
EfSelectInputStory.storyName = 'EfSelectInput'
EfSelectInputStory.args = {
  /* 👇 这里可以设置自定义组件prop的初始值 */
  searchVal: {
    key: '',
    value: ''
  },
  options: [
    { label: '商品名称', value: 'name' },
    { label: '合约编号', value: 'id' }
  ]
}
