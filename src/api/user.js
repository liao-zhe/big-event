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
export const reqUserInfo = () => request.get('/my/userinfo')
