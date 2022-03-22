import axios from 'axios'
import config from '../config'


// 判断，若当前是开发环境，就取config配置内的dev开发环境请求接口的地址，否则就拿到pro生产环境的请求接口的地址。
const baseUrl=process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// 书写axios的工具类
class HttpRequest {
  // 拿到baseUrl配置axios的相关信息
  constructor (baseUrl) {
    this.baseUrl = baseUrl  // 将拿到的baseUrl添加到实例上
  }

  // 该方法，用于定义axios的相关配置
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,  // 初始值，拿到当前实例下的baseUrl
      header: {}  // 请求头
    }
    return config
  }

  // 配置拦截器
  interceptors(instance) { // 传入 instance参数，instance就是axios的实例
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // console.log(response, 'response');
      // 对响应数据做点什么
      return response;
    }, function (error) {
      console.log(error, 'error');
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  // 后续接口请求时，要调用该函数
  // 该函数接受一个相关配置,比如参数options
  request(options) {
    // 创建axios实例
    const instance = axios.create() 
    
    // 调用getInsideConfig配置的相关信息（需要解构）
    // 将传入进来的参数也进行解构
    options = {...this.getInsideConfig(), ...options}
    // 调用拦截器时传入axios的实例
    this.interceptors(instance)
    // 返回接口请求的结果
    return instance(options)
  }
}

// 暴露axios工具类时，通过new关键字，暴露，把baseUrl(请求地址)传递出去
export default new HttpRequest(baseUrl)


// import axios  from "axios";
// import config from '../config'


// const baseUrl=process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// class HttpRequest{
// constructor(baseUrl){
//     this.baseUrl = baseUrl
// }
// getInsideConfig(){
//     const config ={
//         baseUrl:this.baseUrl,
//         header:{}
//     }
//     return config
// }
// interceptors(instance){
//         // 添加请求拦截器
//         instance.interceptors.request.use(function (config) {
//             // 在发送请求之前做些什么
//             return config;
//         }, function (error) {
//             // 对请求错误做些什么
//             return Promise.reject(error);
//         });

//         // 添加响应拦截器
//         instance.interceptors.response.use(function (response) {
//             console.log(response,'reponse');
//             // 2xx 范围内的状态码都会触发该函数。
//             // 对响应数据做点什么
//             return response;
//         }, function (error) {
//             console.log(error,'error')
//             // 超出 2xx 范围的状态码都会触发该函数。
//             // 对响应错误做点什么
//             return Promise.reject(error);
//         });
//         }
//         request(options){
//                 const instance=axios.create()
//                 options={...this.getInsideConfig(),...options}
//                 this.interceptors(instance)
//                 return instance(options)
//         }
// }

// export default new HttpRequest(baseUrl)
