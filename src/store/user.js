import Cookie from 'js-cookie'

export default {
  state: {
    token: ''
  },
  mutations: {
    // 设置token信息
    setToken(state, val) {
      // 值为传递进来的token
      state.token = val
      // 调用Cookie的set方法设置token
      Cookie.set('token', val)
    },
    // 清除token
    clearToken(state) {
      state.token = ''
      // 从Cookie中删除token
      Cookie.remove('token')
    },
    // 获取token信息
    getToken(state) {
      // 获取Cookie里的token
      // 若缓存中有token就直接获取，若缓存中没有token就是从state中获取
      state.token = state.token || Cookie.get('token')
    }
  }
}