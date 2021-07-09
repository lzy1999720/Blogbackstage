import { request } from './request.js'

export const signin = (user,password) => {
  return request({
    method:'post',
    url:'/login',
    data:{
      user,
      password
    }
  })
}