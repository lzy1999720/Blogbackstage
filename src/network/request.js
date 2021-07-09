import axios from 'axios'
import router from '../router/index'
import { Message } from 'element-ui'

export const request = (config) => {
  const instance = axios.create({
    baseURL: 'http://www.yxb.xyz/api',
    timeout: 8000,
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    switch (error.response.status) {
      case 401:
        Message.error({ message: error.response.data });          //token解析错误
        router.replace('/signin');
        break;
      case 402:
        Message.error({ message: error.response.data });          //没有token或过期或无效
        router.replace('/signin');
        break;
      default:
        break;
    }
  })

  instance.interceptors.request.use(res => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      res.headers.Authorization = `Bearer ${token}`
    }
    return res
  })

  return instance(config)
}