import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from '@tuya-fe/full-ui'
import TyAsyncButton from '@tuya-fe/ty-async-button'
import '@tuya-fe/full-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import axios from 'axios'
import '../utils/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(TyAsyncButton)

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
