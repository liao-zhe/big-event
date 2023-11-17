import request from '@/utils/request'

// 注册
export const reqUserRegister = data => {
  return request({
    method: 'post',
    url: '/api/reg',
    data
  })
}

// 登录
export const reqUserLogin = ({ username, password }) => {
  return request({
    method: 'post',
    url: '/api/login',
    data: { username, password }
  })
}

// 获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新用户信息
export const reqUpdateUserInfo = data => request.put('/my/userinfo', data)

// 上传头像
export const reqUpdateAvatar = avatar =>
  request.patch('/my/update/avatar', { avatar })

// 修改密码
export const reqUpdatePassword = data => request.patch('/my/updatepwd', data)
