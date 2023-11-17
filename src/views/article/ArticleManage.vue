<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/channelselect.vue'
import { reqArticleList, reqDelArticle } from '@/api/article.js'
import dateFormat from '@/utils/dateFormat.js'
import ArticleEdit from './components/ArticleEdit.vue'

// 定义参数进行双向绑定
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: ''
})

// 文章列表
const articleList = ref([])
const total = ref(0)
const loading = ref(false)
const getArticleList = async () => {
  loading.value = true
  const res = await reqArticleList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// 通过模板引入，拿到子组件
const articleEditRef = ref()

// 发布文章回调
const onAddArticle = () => {
  articleEditRef.value.open({})
}

// 编辑文章回调
const onEditArticle = row => {
  articleEditRef.value.open(row)
}

// 删除文章回调
const onDeleteArticle = async row => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await reqDelArticle(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
//修改当前页显示多少数据
const handleSizeChange = size => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 修改页码
const handleCurrentChange = page => {
  params.value.pagenum = page
  getArticleList()
}
// 搜索功能
// 因为已经实现了父子数据同步，所以不再需要传递一次cate_id和cate_state
// 因为数据已经通过v-model绑定，传递至params中了
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置功能
const reset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const success = type => {
  if (type == 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-content title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>

    <!-- 内容部分 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- vue3的 v-model的本质是 props[modelValue] @update:modelValue -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state" placeholder="请选择">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <template #default="{ row }">
          <el-button type="primary" @click="onSearch(row)">搜索</el-button>
          <el-button @click="reset(row)">重置</el-button>
        </template>
      </el-form-item>
    </el-form>
    <!-- 表格部分 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间">
        <template #default="{ row }">
          {{ dateFormat(row.pub_date, 'YYYY年MM月DD日 HH时mm分ss秒') }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; justify-content: flex-end"
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      background
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="success"></ArticleEdit>
  </page-content>
</template>
