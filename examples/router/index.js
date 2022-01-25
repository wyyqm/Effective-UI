import Vue from 'vue'
import VueRouter from 'vue-router'
import Input from '../components/input/index'

import Table from '../components/ef-table/index'
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
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  }
]

const router = new VueRouter({
  routes
})

export default router
