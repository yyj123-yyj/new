<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <!-- :label：表单域的名称 -->
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <!-- 1、input控件 -->
      <!-- 判断若数据上的type === input组件，就要渲染出该input组件 -->
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>
      <!-- 2、switch控件 -->
      <!-- 判断switch，若与数据的type一样，将数据与表单组件绑定 -->
      <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
      <!-- 3、日期控件 -->
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-mm-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <!-- 4、下拉控件 -->
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <!-- :value="item.value"：下拉选中的数据赋值给数据源中的select属性 -->
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 若当前的组件都不满足，可以自定义传入内容 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'CommonForm',
    // 接收form的相关配置
    props: {
      formLabel: Array,
      form: Object,
      inline:Boolean
    },
    data() {
      return {
        
      }
    },
  }
</script>

<style lang="less">
  
</style>