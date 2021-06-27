// 让storybook能够识别第三方依赖. 如: element-ui
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        expanded: true, // 该配置为true时, 会为每一个prop生成对应说明(如果有的话, 每个prop的说明应该写在/** xxx */中)
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
}
