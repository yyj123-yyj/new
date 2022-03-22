// 会把接口请求都写在该文件内

import axios from "./axios";

// 接口调用并暴露
// 定义接口请求方法
export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu', // 接口的相关地址
    method: 'post', // 接口的类型
    data: param  // 传入的参数
  })
}


export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}


export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    methods: 'get',
    params
  })
}


// export const getMenu = (params) => {
//   return axios.request({
//     url: '/permission/getMenu',
//     methods: 'post',
//     data: params
//   })
// }