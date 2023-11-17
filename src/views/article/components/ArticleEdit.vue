<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
// 局部注册富文本编辑框
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'
import {
  reqAddArticle,
  reqUpdateArticle,
  reqGetArticle
} from '@/api/article.js'

// 收集的表单数据
const formModel = ref({
  id: '',
  title: '',
  cate_id: '',
  content: '',
  cover_img: '', //file对象
  state: ''
})

// form表单对象
const formRef = ref()

const imgUrl = ref('')
// 参数：第一个参数，拿到上传的文件，第二个参数，如果有多文件上传，拿到文件的参数
const onUploadFile = uploadFile => {
  // 实现前端本地预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
  formRef.value.validateField(['cover_img'])
  //   通过打印看到raw存放的fiel对象
  //   console.log(uploadFile)
}

// 校验规则
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  cate_id: [
    {
      validator: (rule, value, callback) => {
        if (!formModel.value.cate_id) {
          callback(new Error('请选择分类'))
        }
        return true
      },
      trigger: 'manual'
    }
  ],
  cover_img: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择封面图片'))
        } else if (value.type !== 'image/jpeg') {
          callback(new Error('请选择格式为jpg的图片'))
        } else if (value.size / 1024 / 1024 > 2) {
          callback(new Error('图片大小不能超过2MB'))
        }
        return true
      },
      trigger: 'blur'
    }
  ],
  content: [
    {
      validator: (rule, value, callback) => {
        // 富文本编辑框的值
        const quillContent = formModel.value.content
        // 在这里进行自定义校验 文本删除后默认是<p><br></p>
        if (!quillContent || quillContent.trim() === '<p><br></p>') {
          callback(new Error('请输入文章内容'))
        }
        return true
      },
      trigger: 'manual'
    }
  ]
}
// 手动校验
const validateQuillContent = () => {
  formRef.value.validateField('content')
}
const handleCateChange = () => {
  formRef.value.validateField('cate_id')
}
const emit = defineEmits(['success'])
// 发布按钮
const onSubmit = async (form, state) => {
  await form.validate()
  formModel.value.state = state
  // 接口要求是form-data数据   转换 formData 数据
  const fd = new FormData()
  for (const key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    await reqUpdateArticle(fd)
    ElMessage.success('编辑成功')
    drawer.value = false
    emit('success', 'edit')
  } else {
    await reqAddArticle(fd)
    ElMessage.success('添加成功')
    drawer.value = false
    emit('success', 'add')
  }
}
// 抽屉效果
const drawer = ref(false)
// 关闭抽屉前的回调
const handlerClose = () => {
  formRef.value.clearValidate()
  drawer.value = false
}
const open = async row => {
  drawer.value = true
  if (row.id) {
    // 编辑数据回显
    const res = await reqGetArticle(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    // 这个接口只支持file对象，所以需要将图片地址转为file对象传给后端
    formModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    formModel.value = {
      title: '',
      cate_id: '',
      cover_img: '',
      content: '<p><br></p>',
      state: ''
    }
    imgUrl.value = ''
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
// 往外暴露方法
defineExpose({
  open
})
</script>

<template>
  <!--抽屉效果 -->
  <el-drawer
    :before-close="handlerClose"
    v-model="drawer"
    :title="formModel.cate_id ? '编辑文章' : '添加文章'"
    :with-header="false"
    size="50%"
  >
    <el-form
      :model="formModel"
      label-width="100px"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id" required>
        <!-- 这里的width是一个自定义属性，要想添加成功，还得在组件中接收props值 -->
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
          @change="handleCateChange"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img" required>
        <!-- elementui action参数：后台地址，自动开启上传 默认参数是post请求，name=file
        这里采用的是前端本地预览，不是本地服务器预览（点击发布前提交），关闭自动提交  auto-upload="false"
        创建本地预览地址 ： URL.createObjectURL(...)
        -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" required>
        <div class="editor">
          <quill-editor
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
            @blur="validateQuillContent"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef, '已发布')"
          >发布</el-button
        >
        <el-button type="info" @click="onSubmit(formRef, '草稿')"
          >草稿</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
