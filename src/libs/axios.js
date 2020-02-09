import axios from 'axios'
import store from '@/store'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    }
    return config
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      console.log(error) // for debug
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
      // 数据源格式
      // code data msg success
      // if the custom code is not 20000, it is judged as an error.
      const res = response.data
      if (res.code === 3000) {
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    }, error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
    })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
