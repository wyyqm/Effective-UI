import Vue from 'vue'
import VueRouter from 'vue-router'
import Input from '../components/input/index'
import Search from '../components/ef-search/index'
import Item from '../components/ef-formItem/index'
import searchRow from '../pages/searchRow/index'
import Table from '../components/ef-table/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/input',
    name: 'input',
    component: Input
  },
  {
    path: '/ss',
    name: 'ss',
    component: Search
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/item',
    name: 'item',
    component: Item
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
