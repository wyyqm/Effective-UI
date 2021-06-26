import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import elementExtends from '../src/index'

import ProSelect from './components/ProSelect.vue'
import CommView from './components/CommView.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(elementExtends)
Vue.use(ProSelect)
Vue.use(CommView)

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
