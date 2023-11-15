<script setup>
import { reqArticleInfo } from '@/api/article.js'
import { ref } from 'vue'
import DialogCom from './components/DialogCom.vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const loading = ref(false)
const channelList = ref([])
const getChannelList = async () => {
  loading.value = true
  const res = await reqArticleInfo()
  if (res.data.code == 0) {
    channelList.value = res.data.data
    loading.value = false
  } else {
    loading.value = false
    Promise.reject(new Error('fail'))
  }
}

getChannelList()

//通过模板引入 拿到dialog-com组件
const dialog = ref()

// 添加分类
const addChannel = () => {
  dialog.value.open({})
}
// 编辑分类
const editChannel = row => {
  dialog.value.open(row)
}
// 删除分类
const deleteChannel = () => {
  dialog.value.open()
}

const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-content title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="80px">
      </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            circle
            plain
            :icon="Edit"
            @click="editChannel(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="deleteChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- table插槽还支持empty -->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!-- 弹出框 -->
    <DialogCom ref="dialog" @success="onSuccess"></DialogCom>
  </page-content>
</template>
