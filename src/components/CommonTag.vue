<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags" 
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'CommonTag',
    data() {
      return {
        
      }
    },

    computed: {
      ...mapState({
        tags: state => state.tab.tabsList
      })
    },

    methods: {
      ...mapMutations({
        close: 'closeTag'
      }),
      // 1、点击切换tag标签的事件
      changeMenu(item) {
        this.$router.push({ name: item.name })
      },
      // 2、点击删除tag标签的事件
      handleClose(tag, index) {
        const length = this.tags.length - 1

        // 调用this.close,删除点击的tag标签
        this.close(tag)

        // 判断若拿到的tag.name与当前路由不一致,就无需操作
        if(tag.name !== this.$route.name) {
          return;
        }
        // 判断若拿到的tag.name是最后一个tag标签,焦点需要往前移动一个
        if(index === length) {
          this.$router.push({
            name: this.tags[index - 1].name
          })
          // 若不是最后一个tag标签就是在中间，焦点需要往后移动一个
        } else {
          this.$router.push({
            name: this.tags[index].name
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .tabs {
    padding: 20px;
    .el-tag {
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>
