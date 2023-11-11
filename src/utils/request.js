// 二次封装axios
import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    // 携带token
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  res => {
    // 响应核心数据
    if (res.data.code == 0) {
      return res
    }
    // 如果失败
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  error => {
    //  如果错误为401或者token过期
    // ?.可链式操作符，如果遇到 null 或 undefined，就会立即返回 undefined，而不会继续访问下一个属性或调用下一个方法。
    if (error.response?.status == 401) {
      router.push('/login')
    }
    // 错误的默认情况
    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
