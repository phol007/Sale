import Vue from 'vue'
import Router from 'vue-router'
import Qtd from '@/components/QT/qtd'
import SaleHistory from '@/components/salehistory'
import Menu from '@/components/menu'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Qtd/status/docno',
      name: 'Qtd',
      component: Qtd
    },
    {
      path: '/Saleh',
      name: 'Saleh',
      component: SaleHistory
    },
    {
      path: '/menuDoc',
      name: 'menu',
      component: Menu
    }
  ]
})
