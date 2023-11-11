import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'
// 用户模块 setToken  removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    const setToken = newToken => {
      token.value = newToken
    }
    //
    const removeToken = () => {
      token.value = ''
    }

    // 用户信息
    const user = ref({})
    // 请求获取数据
    const getUser = async () => {
      const res = await userGetInfoService()
      if (res.data.code == 0) {
        user.value = res.data.data
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }
    // 清空用户信息
    const setUser = obj => {
      user.value = obj
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
