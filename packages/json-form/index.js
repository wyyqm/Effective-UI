// 导入组件，组件必须声明 name
import JsonForm from "./JsonForm.vue"

// 为组件提供 install 安装方法，供按需引入
JsonForm.install = function (Vue) {
    Vue.component(JsonForm.name, JsonForm)
}

// 默认导出组件
export default JsonForm
export { default as ProItemMixin } from "./ProItemMixin"
