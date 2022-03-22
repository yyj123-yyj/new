<template>
    <el-container style="height: 100%">
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <CommonTag></CommonTag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import CommonAside from '../components/CommonAside.vue'
  import CommonHeader from '../components/CommonHeader.vue'
  import CommonTag from '../components/CommonTag.vue'
  export default {
    name: 'Main',
    components: {
      CommonAside,
      CommonHeader,
      CommonTag
    },
    data() {
      return {
        
      }
    },
  }
</script>

<style lang="less" scoped>
  // 若在el-container标签外套div标签，这里需要给最外层的div标签设height: 100%;否则会铺不满。
  // div {
  //   height: 100%;
  // }
  .el-header {
    background-color: #999;
  }
  .el-main {
    padding-top: 0;
  }
</style>