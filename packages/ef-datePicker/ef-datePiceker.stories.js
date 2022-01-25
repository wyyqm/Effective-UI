import EfDatePicker from './index.vue'

export default {
  title: 'EffectiveUI/ef-datePicker ',
  component: EfDatePicker,
  parameters: {
    componentSource: {
      url: './ef-datePicker.vue',
      language: 'vue'
    }
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EfDatePicker },
  template: '<ef-datePicker v-model="times"  :timeFormat="true" :dateType="\'daterange\'" ></ef-datePicker>'
})
export const EfDatePickerStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
EfDatePickerStory.storyName = 'ef-datePicker'
