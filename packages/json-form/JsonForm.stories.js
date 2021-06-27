import JsonForm from './JsonForm.vue'

export default {
    title: '组件/JsonForm',
    component: JsonForm
}

const Template = (args, { argTypes }) => ({
    components: { JsonForm },
    // 此处改成当前的写法, 而不要直接使用args, 否则可能会导致下面的JsonFormStory.args配置无效
    props: Object.keys(argTypes),
    template: '<JsonForm v-bind="$props"/>'
})

export const JsonFormStory = Template.bind({})
// 修改该storybook在界面左侧导航的名称, 如果不设置那么会是: Json Form Story
JsonFormStory.storyName = 'JsonForm'
JsonFormStory.args = {
    /* 👇 这里可以设置自定义组件prop的初始值 */
    formItemArrConfig: [{ prop: 'name', compName: 'el-input', label: '姓名', rules: [{ required: true, message: '请输入姓名' }] }]
}
