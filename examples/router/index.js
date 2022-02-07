import Vue from 'vue'
import VueRouter from 'vue-router'
import Input from '../components/input/index'

import SearchList from '../pages/ef-search-page/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/input',
    name: 'input',
    component: Input
  },

  {
    path: '/searchlist',
    name: 'searchlist',
    component: SearchList
  }
]

const router = new VueRouter({
  routes
})

export default router
