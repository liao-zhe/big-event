import request from '@/utils/request'

// 获取文章分类信息
export const reqArticleInfo = () => request.get('/my/cate/list')

// 更新文章分类信息
export const reqUpdateArticleInfo = data => request.put('/my/cate/info', data)

// 添加文章分类信息
export const reqAddArticleInfo = data => request.post('/my/cate/add', data)
