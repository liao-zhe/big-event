import request from '@/utils/request'

export const reqUserRegister = data => {
  return request({
    method: 'post',
    url: '/api/reg',
    data
  })
}

export const reqUserLogin = ({ username, password }) => {
  return request({
    method: 'post',
    url: '/api/login',
    data: { username, password }
  })
}
