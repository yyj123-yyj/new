import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store'
import http from 'axios'
import '../api/mock'


// 按需引入elementUI中的组件
import { 
  Button, 
  Container, 
  Main, 
  Header, 
  Aside,
  Menu, 
  Submenu, 
  MenuItemGroup, 
  MenuItem, 
  Dropdown, 
  DropdownMenu, 
  DropdownItem, 
  Row, 
  Col, 
  Card, 
  Table, 
  TableColumn, 
  Breadcrumb, 
  BreadcrumbItem, 
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui'


// 引入assets文件夹下less中的公共样式
import './assets/less/index.less'


Vue.use(VueRouter)

// 因为axios不是插件，想在全局使用，必须把axios绑定在vue的prototype上
Vue.prototype.$http = http

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)


// 导航守卫
router.beforeEach((to, from, next) => {
  // 获取token信息,获取getToken是为了防止页面刷新之后vuex丢失token信息。
  store.commit('getToken')
  const token = store.state.user.token
  // 判断若token不存在，且当前页不等于登录页,就不能进入系统;直接返回登录页。否则就继续往下走。
  if(!token && to.name !== 'login') {
    next({name: 'login'})
  } else if(token && to.name === 'login') {
    next({name:'home'})
  } else {
    next()
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
