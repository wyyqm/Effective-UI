import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Input from '../components/input/index'
import searchRow from '../pages/searchRow/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/input',
    name: 'input',
    component: Input
  },
  {
    path: '/search',
    name: 'searchRow',
    component: searchRow
  }
]

const router = new VueRouter({
  routes
})

export default router
