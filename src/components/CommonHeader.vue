<template>
  <header>
    <!-- header左侧区域 -->
    <!-- header区域 -- 左边的按钮 -->
    <div class="l-content">
      <!-- plain：镂空的属性 icon：用的值是elementUI内icon的图标名称 -->
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <h3 style="color: #fff">首页</h3> -->
    </div>

    <!-- header右侧区域 -->
    <div class="r-content">
      <!-- trigger：click触发下拉 -->
      <el-dropdown trigger="click" size="mini">
        <span>
          <!-- 将头像动态引入进来 -->
          <img class="user" :src="userImg"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'CommonHeader',
    data() {
      return {
        // 利用require的方式，动态引入图片的url路径
        userImg: require('../assets/images/user.png')
      }
    },

    methods: {
      handleMenu() {
        // 利用commit直接跟mutations对话，拿到mutations内的操作作为handleMenu点击触发的执行事件
        this.$store.commit('collapseMenu')
      },
      // 点击退出
      logOut() {
        this.$store.commit('clearToken')
        this.$store.commit('clearMenu')
        this.$router.push('/login')
      }
    },

    computed: {
      ...mapState({
        tags: state => state.tab.tabsList
      })
    }
  }
</script>

<style lang="less" scoped>
  header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .l-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  
</style>