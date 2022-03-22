<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
  /* 去掉margin和padding的默认值 */
  html, body {
    margin: 0;
    padding: 0;
    /* height: 100; */
  }
  #app {
    height: 100%;
  }
</style>
