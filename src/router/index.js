import Vue from 'vue'
import Router from 'vue-router'
// 引入一級路由
import Index from '@/components/index.vue'
import GoodShow from '@/components/goodShow.vue'
import Register from '@/components/register.vue'
import Login from '@/components/login.vue'
// 引入二級路由
import HomePage from '@/components/pages/homepage.vue'
import Classification from '@/components/pages/classification.vue'
import ShopCart from '@/components/pages/shopCart.vue'
import PersonCenter from '@/components/pages/personCenter.vue'
// 引入三级路由

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'homePage',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: 'classification',
          name: 'Classification',
          component: Classification,
        },
        {
          path: 'shopCart',
          name: 'ShopCart',
          component: ShopCart
        },
        {
          path: 'personCenter',
          name: 'PersonCenter',
          component: PersonCenter
        },
        {
          path: '*',
          redirect: '/index/homePage'
        }
      ]
    },
    {
      path: '/goodShow',
      name: 'GoodShow',
      component: GoodShow
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      redirect: '/index/homePage'
    }
  ]
})
