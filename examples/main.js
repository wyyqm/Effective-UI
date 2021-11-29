import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ElementExtends from '../src/index'

import ProSelect from './components/ProSelect.vue'
import CommView from './components/CommView.vue'

import '@tuya-fe/full-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import './assets/commonPage.less'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
if (process.env.NODE_ENV !== 'production') require('../utils/index')
Vue.use(ElementUI)
Vue.use(ElementExtends)

Vue.prototype.$ELEMENT = { size: 'small' }
// 将表单项组件全局注册, 这样JsonForm组件中才能使用到外部自定义的表单项组件
// Vue.use(ProSelect)
// Vue.use(CommView)
Vue.component(ProSelect.name, ProSelect)
Vue.component(CommView.name, CommView)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
