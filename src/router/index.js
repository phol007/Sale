import Vue from 'vue'
import Router from 'vue-router'
const Qtd = () => import('@/components/QT/qtd')
const SaleHistory = () => import('@/components/salehistory')
const Menu = () => import('@/components/menu')
const Login = () => import('@/components/login')

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
