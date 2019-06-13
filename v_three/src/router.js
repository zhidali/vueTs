import Vue from 'vue'
import Router from 'vue-router'
import shou from '@/views/Home/route'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...shou,
    {
      path: '*',
      beforeEnter: (to, from, next) => {
        next("/first")
      }
    },
    // 重定向
    {
      path: '/',
      redirect: '/first'
    }
  ]
})
