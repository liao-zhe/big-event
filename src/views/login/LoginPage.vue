<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { reqUserRegister, reqUserLogin } from '@/api/user.js'
import { useUserStore } from '@/stores'
const router = useRouter()
const isRegister = ref(false)
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
//整个表单的校验规则
//1.非空校验required:true message消息提示，trigger触发校验的时机blur change
//2.长度校验min:xx,max:xx
//3.正则校验pattern:正则规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      // 最少6位，包括至少1个小写字母，1个数字
      pattern: /^\S*(?=\S{6,})(?=\S*[a-z])\S*$/,
      message: '最少6位,包括至少1个小写字母，1个数字',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      // 最少6位，包括至少1个小写字母，1个数字
      pattern: /^\S*(?=\S{6,})(?=\S*[a-z])\S*$/,
      message: '最少6位,包括至少1个小写字母，1个数字',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const form = ref()
// 注册校验,拿到表单中的validate
const register = async () => {
  await form.value.validate()
  let res = await reqUserRegister(formModel.value)
  if (res.data.code == 0) {
    ElMessage({ type: 'success', message: '注册成功' })
    isRegister.value = false
  } else {
    ElMessage({ type: 'error', message: res.data.message })
  }
}

// 登录校验
const userStore = useUserStore()
const login = async () => {
  await form.value.validate()
  let res = await reqUserLogin(formModel.value)
  if (res.data.code == 0) {
    // 存储token
    userStore.setToken(res.data.token)
    ElMessage({ type: 'success', message: res.data.message })
    router.push('/')
  } else {
    ElMessage({ type: 'error', message: res.data.message })
  }
}

// 切换时刷新数据
watch(isRegister, () => {
  isRegister.value === true
    ? (formModel.value = {
        username: '',
        password: '',
        repassword: ''
      })
    : (formModel.value = {
        username: '',
        password: ''
      })
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!--autocomplete="off" 这将禁用自动完成功能，以确保用户需要手动输入用户名，而不会自动填充以前存储的用户名。 -->
      <!-- 注册 -->
      <el-form
        :rules="rules"
        :model="formModel"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="register"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="formModel"
        :rules="rules"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
