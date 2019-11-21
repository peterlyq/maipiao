import axios from 'axios'
import store from "@/store"
const service= axios.create({
    baseURL:'https://m.maizuo.com',
    timeout:5000
})
service.interceptors.request.use(
    config => {
      // do something before request is sent
      config.headers['X-Client-Info'] = '{"a":"3000","ch":"1002","v":"5.0.4","e":"15670014718602819495825"}'
      config.headers['X-Host'] = config.data.xHost
      if(config.url.indexOf('__CITYID__') !== -1){
        config.url = config.url.replace('__CITYID__','cityId='+store.state.cityId)
      }
      delete config.data.xHost
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  
  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */
  
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data
  
      // if the custom code is not 20000, it is judged as an error.
      if (res.status !== 0) {
        console.log('请求有误',res.msg)
        return res
      } else {
        return res
      }
    },
    error => {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  
  export default service
  