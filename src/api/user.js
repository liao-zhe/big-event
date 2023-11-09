import request from '@/utils/request'

export const reqUserRegister = data => {
  return request({
    method: 'post',
    url: '/api/reg',
    data
  })
}
