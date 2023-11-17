<script setup>
import { ref } from 'vue'
import { reqArticleInfo } from '@/api/article.js'

const channelList = ref({})
// 获取文章分类信息
const getChannelList = async () => {
  const res = await reqArticleInfo()
  channelList.value = res.data.data
}

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue', 'change'])
const handleSelectChange = () => {
  // 手动触发父组件的 change 事件
  emit('change')
}
getChannelList()
</script>

<template>
  <!-- 父组件来决定子组件的数据 子组件只不过是一个公共组件 
   vue3的 v-model的本质是 props[modelValue] @update:modelValue 
   组件使用了v-model,子组件要拆分获取数据
   二次封装的组件要跟父组件实现双向绑定，要先接收父组件传过来的props值，然后当触发时，要传递这个修改的事件给我父组件
   这样就实现了父子组件之间的双向数据绑定
   <channel-select v-model="params.cate_id"></channel-select>
  -->
  <el-select
    placeholder="请选择"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
    @change="handleSelectChange"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
