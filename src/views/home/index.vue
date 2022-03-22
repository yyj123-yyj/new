<template>
  <el-row class="home" :gutter="20">

    <!-- 首页左侧 -->
    <el-col :span="8" style="margin-top: 20px;">
      <!-- 用户部分card区 -->
      <!-- hover时显示阴影 -->
      <el-card shadow="hover">

        <!-- 头像信息区 -->
        <div class="user">
          <!-- 动态引入头像 -->
          <img :src="userImg"/>
          <!-- 名称和职位 -->
          <div class="userinfo">
            <!-- 名称 -->
            <p class="name">Admin</p>
            <!-- 权限名称 -->
            <p class="access">超级管理员</p>
          </div>
        </div>

        <!-- 登录时间区 -->
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>上海</span></p>
        </div>

      </el-card>


      <!-- table表格区 -->
      <el-card style="margin-top: 20px; height: 460px;">
        <!-- 
          prop：读取对应列内容的字段名
          label：显示的标题
        -->
        <el-table :data="tableData">
          <el-table-column 
            v-for="(val, key) in tableLabel"  
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!--首页右侧 -->
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <!-- 订单数据区 -->
        <!-- 
          :body-style：内容区的样式。 
          :class：根据数据内的icon渲染。
        -->
        <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">￥{{item.name}}</p>
          </div>
        </el-card>
      </div>

      <!-- 折线图区 -->
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts" ></div> -->
        <Echart :chartData="echarData.order" style="height: 280px"></Echart>
      </el-card>

      <!-- 柱、饼状图区 -->
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <Echart :chartData="echarData.user" style="height: 240px"></Echart>
        </el-card>
        <!-- 饼状图 -->
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <Echart :chartData="echarData.video" :isAxisChart="false" style="height: 260px"></Echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  // 引入定义好的接口请求方法
  import { getData } from '../../../api/data.js'
  // 引入echarts,5版本的引入方式 * as.
  // import * as echarts from 'echarts'
  // 引入二次封装的echarts图表组件
  import Echart from '../../components/Echarts.vue'

  export default {
    name: 'User',
    // 注册二次封装的echarts图表组件
    components: {
      Echart
    },
    data() {
      return {
        // 利用require的方式，动态引入图片的url路径
        userImg: require('../../assets/images/user.png'),

        // tableDate数据设为空数组，请求接口时返回，mock模拟服务器返回的数据。
        tableData: [],

        // 定义每一列的数据去渲染页面
        tableLabel: {
          name: '课程',
          todayBuy: '今日购买',
          monthBuy: '本月购买',
          totalBuy: '总购买'
        },

        // 订单数据
        countData: [
          {
            name: "今日支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "今日收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "今日未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
          {
            name: "本月支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "本月收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "本月未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
        ],

        // 定义Echart的data数据
        echarData: {
          // 折线图部分
          order: {
            xData: [],
            series: []
          },
          // 柱状图的部分
          user: {
            xData: [],
            series: []
          },
          // 饼状图部分
          video: {
            series: []
          }
        }
      }
    },

    // 接口请求数据
    mounted() {
      // 调用getDate接口请求方法
      getData().then(res => {
        // 解构拿到res内的code 和 data数据
        const { code, data } = res.data
        // 判断code若正常为20000，就拿到mock(模拟接口)中的tableData数据，赋值给 tableData
        if(code === 20000) {
          this.tableData = data.tableData

          // 1、产品折线图
          // 在接口请求完后，拿到返回的数据data.orderData做折线图的处理
          const order = data.orderData
          // 定义变量接收X轴的坐标
          const xData = order.date


          // 拿到每项数据中的key值，
          // 通过Object.keys里面传入order.data的第一项
          const keyArray = Object.keys(order.data[0])
          // 拿到key值后组装series数据
          const series = []
          // 遍历拿到的key值
          keyArray.forEach(key => {
            series.push({
              // series内的name对应key值(图例)。
              name: key,
              // series内的data对应的图例的数据，取对应图例的数据映射每一项，拿到每一项所对应的key值，返回。
              data: order.data.map(item => item[key]),
              // 折线图
              type: 'line'
            })
          })


          // 二次封装echarts图表后改写
          // 1、折线图
          this.echarData.order.xData = xData
          this.echarData.order.series = series



          // 2、用户柱状图
          this.echarData.user.xData = data.userData.map(item => item.date)
          this.echarData.user.series = [
              // 图例1：新增用户
              {
                name: '新增用户', // key
                data: data.userData.map(item => item.new), // new对应的数据
                type: 'bar' // 柱状图
              },

              // 图例2：活跃用户
              {
                name: '活跃用户', // key
                data: data.userData.map(item => item.active), // active对应的数据
                type: 'bar' // 柱状图
              }
            ]
          
          // 3、饼状图
          this.echarData.video.series = [
            {
              data: data.videoData, // 拿到videoData中的数据
              type: 'pie' // 饼状图
            }
          ]

        }

      })
    }
  }
</script>

<style>
  
</style>