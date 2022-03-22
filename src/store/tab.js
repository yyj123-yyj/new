// 定义控制侧边栏是否展开的state属性

import Cookie from "js-cookie"
// import router from "../router"

export default {

  state: {
    // 默认为false，展开状态。
    isCollapse: false,
    // 设置tag的初始值，用来存储点击页面时的历史tag，后续拿到对应的tag渲染header区的面包屑
    tabsList: [
      // 默认值是  首页
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    // 设置对应tag的高亮初始值
    currentMenu:null,
    // menu初始数据为空数组
    menu:[]
  },

  mutations: {
    // 定义侧边栏是否展开的方法
    // 接收到state中的值后进行取反
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },

    // 点击侧边栏的菜单时，改变state内的tabsList内的数据
    // 接收两个参数，state val
    selectMenu(state, val) {
      // 判断当前点击的菜单是否为首页
      if(val.home !== 'home') {
        // 若不是，就让currrentMenu等于val
        state.currentMenu = val
        // 判断当前点击的索引是否存在，用findIndex()
        // 若点击的name与传入的name相等，就是存在,用变量接收结果
        const result = state.tabsList.findIndex(item => item.name === val.name)
        // 若不存在，才往里面添加tabsList
        if(result === -1) {
          state.tabsList.push(val)
        } 
      } else {
        // 若当前选中的是首页，需要将currentMenu标识重置
        state.currentMenu = null
      }
    },

    // 点击删除tag标签的逻辑
    closeTag(state, val) {
      // 找到当前点击的数据,与传入的路由中的name进行比较，
      const result = state.tabsList.findIndex(item => item.name === val.name)
      // 若能找到当前的索引，就是一个非 -1 的值
      // 就可以通过splice删除点击的tag标签
      state.tabsList.splice(result, 1)
    },

    // 设置menu
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 清除menu
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    // 添加menu
    addMenu(state, router) {
      // 判断若cookie中没有叫menu数据，就能直接return
      if(!Cookie.get('menu')) {
        return
      }
      // 若当前有menu的数据，对menu数据进行处理
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu

      // 处理menu数据，为添加动态路由做准备
      const menuArray = []
      // 拿到menu数据进行遍历, 这里拿到的menu就是permission里的menu数据
      menu.forEach(item => {
        // 判断若有子级路由表示有二级菜单，就继续往下遍历
        if(item.children) {
          item.children = item.children.map(item => {
            // 给当前的item对象添加component属性，就是传递router路由里的component路径【必须传递】
            item.component = () => import( `../views/${item.url}`)
            return item
          })
          // 将拿到的数据扁平化添加到新数组内
          menuArray.push(...item.children)
        }else {
          // 若是一级菜单，直接添加component属性
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })

      // 路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })
    }
  }

}