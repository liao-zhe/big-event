<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const { getUser, setUser, removeToken } = userStore
const { user } = storeToRefs(userStore)
// 下拉菜单回调
const handleCommand = command => {
  if (command == 'logout') {
    removeToken()
    setUser({})
    router.push('/login')
  } else {
    router.push(`/user/${command}`)
  }
}
// 获取用户信息
onMounted(() => {
  getUser()
})
</script>
<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside width="200px">
      <div class="el-aside_logo"></div>
      <!-- default-active：页面加载时默认激活菜单的 index active-text-color：活动菜单项的文本的文本颜色
      router 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项。
      index
      -->
      <el-menu
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        router
      >
        <!-- 文章分类 -->
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <!--文章管理 -->
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!-- 个人中心 -->
        <el-sub-menu index="/user">
          <!-- 具名插槽 -->
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          cordeby：<strong>{{ user.nickname || user.username }}</strong>
        </div>
        <!-- 右侧下拉菜单 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="user.user_pic" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!-- 具名插槽 #dropdown是v-slot:dropdown的简写-->
          <template #dropdown>
            <!--command 派发到command回调函数的指令参数 -->
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer>大事件 ©2023 Created by lz</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &_logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
