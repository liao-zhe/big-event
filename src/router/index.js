import { createRouter, createWebHistory } from 'vue-router'

// 创建路由实例
// createWebHistory 配置路由模式，history模式。 hash模式 createWebHashHistory
// import.meta.env.BASE_URL 就是vite.config.js中的base配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
