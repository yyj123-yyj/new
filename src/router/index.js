import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'Main',
    // component: Main
    // 路由懒加载获取路径
    component: () => import('../views/Main.vue'),
    redirect: '/home',
    children: [
      // 路由都是动态添加的，这里不需要

      // home页面的路由
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
      },
      // user页面的路由
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user')
      },
      // mall页面的路由
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall')
      },
      // other下pageOne 和 pageTwo的路由
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/other/pageOne.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/other/pageTwo.vue')
      },
    ]
  },

  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  }
]

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  path: '/home',
  mode: 'history',
  routes: routes
})


// 暴露router
export default router