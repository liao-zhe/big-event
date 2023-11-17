<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { reqUpdateAvatar } from '@/api/user'
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)

// 选择图片，并且进行预览
// 给el-upload绑定一个ref，拿到上传头像的点击事件
const uploadRef = ref()

// 预览图片并整理base64格式的数据
const onSelectAvatar = uploadFile => {
  // 上传头像的数据格式必须是base64的格式
  // 基于FileReader 读取图片做预览，并且拿到了base64格式的数据
  // 创建一个新的FileReader对象，用于读取文件内容
  const reader = new FileReader()
  // 读取文件的内容，并以DataURL的形式进行编码
  reader.readAsDataURL(uploadFile.raw)
  // 当文件读取完成时，触发onload事件
  reader.onload = () => {
    imgUrl.value = reader.result
  }
  //   imgUrl.value = URL.createObjectURL(uploadFile.raw)
}

// 上传头像
const onUpdateAvatar = async () => {
  await reqUpdateAvatar(imgUrl.value)
  await userStore.getUser()
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>

<template>
  <page-content title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="fasle"
          ref="uploadRef"
          :on-change="onSelectAvatar"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" alt="" />
        </el-upload>
        <br />
        <!-- 找到upload内部的input元素，然后调用click方法，实现触发文件选择对话框的效果 -->
        <el-button
          type="primary"
          :icon="Plus"
          size="large"
          @click="uploadRef.$el.querySelector('input').click()"
        >
          选择图片
        </el-button>
        <el-button
          type="success"
          :icon="Upload"
          size="large"
          @click="onUpdateAvatar"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </page-content>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
