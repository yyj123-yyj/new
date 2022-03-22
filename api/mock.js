// mock模拟数据接口实现
import Mock from 'mockjs'
// 引入回调函数: 将所有的mock数据定义在mockServeData文件夹内
import homeApi from './mockServeData/home'

import UserApi from './mockServeData/user' 
import permissionApi from './mockServeData/permission'

// 书写拦截器的规则
// 参数1：可以是确切的url地址 或 匹配正则规则
// 参数2：接收一个回调函数：里面是返回的数据
Mock.mock('/home/getData', homeApi.getStatisticalData)

// 拦截user用户新增和修改用户的请求【利用正则匹配】
Mock.mock(/user\/add/, 'post', UserApi.createUser)
Mock.mock(/user\/edit/, 'post', UserApi.updateUser)

Mock.mock(/user\/getUser/, 'get', UserApi.getUserList)
Mock.mock(/user\/del/, 'post', UserApi.deleteUser)
Mock.mock(/user\/del/,'post',UserApi.deleteUser)


Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)

