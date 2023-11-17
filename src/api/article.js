import request from '@/utils/request'

// 获取文章分类信息
export const reqArticleInfo = () => request.get('/my/cate/list')

// 更新文章分类信息
export const reqUpdateArticleInfo = data => request.put('/my/cate/info', data)

// 添加文章分类信息
export const reqAddArticleInfo = data => request.post('/my/cate/add', data)

// 删除文章分类
export const reqDeleteArticleInfo = id =>
  request.delete('/my/cate/del', { params: { id } })

// 文章管理

// 获取文章列表 /my/article/list
export const reqArticleList = params =>
  request.get('/my/article/list', { params })

// 添加文章
export const reqAddArticle = data => request.post('/my/article/add', data)

// 获取文章详细
// get请求携带的参数都是放在params中的
export const reqGetArticle = id => {
  return request({
    method: 'get',
    url: '/my/article/info',
    params: { id }
  })
}

// 更新文章
export const reqUpdateArticle = data => request.put('/my/article/info', data)

// 删除文章
export const reqDelArticle = id =>
  request.delete('my/article/info', { params: { id } })
