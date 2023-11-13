import request from '@/utils/request'

// 获取文章分类信息
export const reqArticleInfo = () => request.get('/my/cate/list')
