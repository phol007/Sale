import Vue from 'vue'
import Router from 'vue-router'
import Qtd from '@/components/qtd'
import Qth from '@/components/qthistory'
import Menu from '@/components/menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Qtd/status',
      name: 'Qtd',
      component: Qtd
    },
    {
      path: '/Qth',
      name: 'Qth',
      component: Qth
    },
    {
      path: '/menuDoc',
      name: 'menu',
      component: Menu
    }
  ]
})
