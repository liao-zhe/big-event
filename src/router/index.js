import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// 创建路由实例
// createWebHistory 配置路由模式，history模式。 hash模式 createWebHashHistory
// import.meta.env.BASE_URL 就是vite.config.js中的base配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatatr.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截 使用全局前置路由守卫
// vue3的路由守卫有了更改，去掉了next参数，采用返回值来决定是否放行
//  return { name: 'Login' } 或者 /login重定向到login
// return false  不放行  return undefined 或者 true 就是放行
router.beforeEach(to => {
  if (!useUserStore().token && to.path !== '/login') return '/login'
})

export default router
