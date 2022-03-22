<template>
  <el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    background-color="#545c64" 
    text-color="#fff" 
    active-text-color="#ffd04b" 
    @open="handleOpen"
    @close="handleClose" 
    :collapse="isCollapse"
  >
    <!-- 侧边栏顶部名称 -->
    <!-- 判断isClloapse是否存在，若存在为折叠只显示‘后台’两字，若不存在为展开就显示全部内容 -->
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>

    <!-- 遍历渲染noChildren内的导航 -->
    <!-- 完成点击页面实现对应路由跳转的事件：clickMenu(item) -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <!-- 动态绑定class，拼接icon属性，渲染图标 -->
      <i :class="'el-icon-' + item.icon"></i>
      <!-- 动态渲染侧边栏的名称 -->
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <!-- 渲染hasChildren内的导航 -->
    <el-submenu v-for="item in hasChildren" :index="item.label" :key="item.label">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <!-- 遍历渲染hasChildren下的二级导航 -->
      <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        // 侧边栏每项导航
        menu: []
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      // 实现点击页面路由跳转
      clickMenu(item) {
        this.$router.push({
          name: item.name
        }),

        this.$store.commit('selectMenu', item)
      }
    },
    computed: {
      // 判断menu内没有子项目的导航
      noChildren() {
        // 若menu内的导航没有子项目，返回数据
        return this.asyncMenu.filter(item => !item.children)
      },
      // 判断menu内有子项目的导航
      hasChildren() {
        // 若menu内的导航有子项目，返回数据
        return this.asyncMenu.filter(item => item.children)
      },

      // 通过 isCollapse() 拿到 store中的state里定义的isCollapse属性
      isCollapse() {
        return this.$store.state.tab.isCollapse
      },

      // 拿到store中的menu数据
      asyncMenu() {
        return this.$store.state.tab.menu
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  /* 处理侧边栏样式 */
  .el-menu {
    height: 100%;
    border: none;
    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
    }
  }
  
</style>