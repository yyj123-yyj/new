<template>
  <div class="common-table">
    <!-- 
      :data属性：用于接收table数据,由父组件传递进来的
      stripe属性：表示斑马条纹 
    -->
    <el-table :data="tableData" height="90%" stripe>
      <!-- 
        show-overflow-tooltip属性：表示若当前列超长了，用tooltip来显示超长那部分的内容。
        对于列，将数据通过配置的方式传递到组件中，拿到数据后就直接渲染出所对应的列
        :label属性：表示当前列的名称
       -->
      <el-table-column 
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 能够接收自定义传递进来的当前列相关配置 -->
        <template slot-scope="scope">
          <!-- 拿到slot里当前的的自定义数据，渲染出来 -->
          <span style="margin-left: 10px">{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>

      <!-- 当前操作列 -->
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'CommonTable',
    props: {
      tableData: Array,
      tableLabel: Array,
      config: Object,
    },
    data() {
      return {
        
      }
    },
    methods: {
      handleEdit(row) {
        this.$emit('edit', row)
      },
      handleDelete(row) {
        this.$emit('del', row)
      },
      changePage(page) {
        this.$emit('changePage', page)
      }
    }
  }
</script>

<style lang="less" scope>
  .common-table {
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .pager {
      position: abslute;
      bottom: 0;
      right: 20px;
    }
  }
</style>