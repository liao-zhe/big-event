<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCountStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

// 获取路由对象 router useRouter
// 获取路由参数 route useRoute
const router = useRouter()
const route = useRoute()
console.log(router, route)
const goList = () => {
  router.push('/list')
}
const userStore = useUserStore()
const { token } = storeToRefs(userStore)
const { setToken, removeToken } = userStore

const useCount = useCountStore()
const { count } = storeToRefs(useCount)
const { increment } = useCount

onMounted(() => {})
</script>

<template>
  <router-view></router-view>

  <hr />
  <div>我是APP组件</div>
  <!-- 因为使用了element plus 所以components下的组件会自动注册-->
  <test-com></test-com>
  <el-button type="primary" @click="$router.push('/home')">跳转首页</el-button>
  <el-button type="primary" @click="goList()">跳转至列表</el-button>

  <p>{{ token }}</p>
  <button @click="setToken('tokenkey')">登录</button
  ><button @click="removeToken()">退出</button>

  <hr />
  <p>{{ count }}</p>
  <el-button type="primary" @click="increment()">+</el-button>
</template>

<style></style>
