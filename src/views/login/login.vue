<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>
    <!-- 用户名 -->
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  // 引入mock模拟生成token
  // import Mock from 'mockjs'
  import {getMenu} from '../../../api/data.js'
  export default {
    name: 'login',
    data() {
      return {
        form: {},
        rules: {
          // user的校验
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {
              min: 3,
              message: '用户名长度不能小于3位',
              trigger: 'blur'
            }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      login() {
        // 调用getMenu,传入用户名和密码
        getMenu(this.form).then(({data: res}) => {
          console.log('res', res);
          // 判断code状态码为20000，接口就是整常的，
          if(res.code === 20000) {
            // 若成功，拿到接口返回的token设置进去，同时给不同的账号配置不同的菜单权限，进行路由跳转
            // 登录成功后先清除当前的路由
            this.$store.commit('clearMenu')
            // 设置menu
            this.$store.commit('setMenu', res.data.menu)
            // 设置token
            this.$store.commit('setToken', res.data.token)
            // 动态添加路由：传入当前的router实例
            this.$store.commit('addMenu', this.$router)
            this.$router.push({name: 'home'}) // 跳转路由
          }else { // 否则抛出异常
            this.$message.warning(res.data.message)
          }
        })

        // // 模拟生成token
        // const token = Mock.random.guid()
        // // 拿到token进行设置
        // this.$store.commit('setToken', token)
        // // 登录成功后跳转到首页
        // this.$router.push({name: 'home'})
        
      }
    }
  }
</script>

<style lang="less" scope>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_submit {
    margin: 10px auto 0px auto;
  }
</style>