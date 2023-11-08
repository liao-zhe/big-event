import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default createPinia().use(piniaPluginPersistedstate)

// import { useCountStore } from './modules/count'
// export { useCountStore }
// import { useUserStore } from './modules/user'
// export { useUserStore }
// 优化
// count和user中的所有的按需导入全部导出
export * from './modules/count'
export * from './modules/user'
