<script setup>
import { ref } from 'vue'
import { reqUpdateArticleInfo, reqAddArticleInfo } from '@/api/article.js'

const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

// 校验规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

// 基于外面传来的参数是添加还是编辑
// 并且进行数据的回显
const open = async row => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
// 提交时自动校验
const formRef = ref()

const submit = async () => {
  await formRef.value.validate()
  await formRef.value.validate()
  formModel.value.id
    ? await reqUpdateArticleInfo(formModel.value)
    : await reqAddArticleInfo(formModel.value)

  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success')
}
const cancel = () => {
  formModel.value = {}
  dialogVisible.value = false
  formRef.value.resetFields()
}
const emit = defineEmits(['success', 'cancle'])
const handlerClose = () => {
  dialogVisible.value = false
  formRef.value.clearValidate()
}
// 往外暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
    align-center
    :before-close="handlerClose"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          minlength="1"
          maxlength="10"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          minlength="1"
          maxlength="15"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
