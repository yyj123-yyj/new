// 该文件时Echarts所承载的DOM
<template>
  <div ref="echart"></div>
</template>

<script>
    // 引入echarts
    import * as echarts from 'echarts'
  // 在script中编写该组件所接收的相应属性和逻辑
  export default {
    // 1、
    props: {
      // 1-1、柱状图和折线图的option几乎一致; 饼状图没有x轴和y轴; 需要定义属性用于区分柱状图/折线图/饼状图。
      isAxisChart: {
        type: Boolean,
        default: true // 初始值
      },

      // 1-2、接受传递进来的option参数
      chartData: {
        type: Object, // 类型为object
        default() { // 定义默认值是为了避免使用时不传值，为了容错
          return {
            xData: [],
            series: []
          }
        }     
      },
  },

  // 5、初始化之前，要对传入的chartData数据进行监听
  watch: {
    chartData: {
      handler: function() {
        // 在里面调用initChart进行调用
        this.initChart()
      },
      // 首次对事件进行监听时，也需要触发
      deep: true
    }
  },

  // 4、在methods内进行echarts初始化
  methods: {
    // 【写4-1之前要有步骤5】
    // 4-1、在initChart调用 initChartData() 函数，进行初始化
    initChart() {
      // 因为处理echarts里数据在下面的initChartData里
      this.initChartData()
      // 调用完成后，拿到配置数据，渲染echarts
      // 需要先判断当前的echarts有没有渲染,若已经渲染就不需要再渲染
      // 判断echart若存在，直接进行渲染
      if(this.echart) {
        this.echart.setOption(this.options)
      } else {
        // 若echart不存在，需要初始化echarts对象,插入DOM节点
        this.echart = echarts.init(this.$refs.echart)
        // 拿到echart的实例
        this.echart.setOption(this.options)
      }
    },
    // 4-2、在处理数据时，分两种情况：
    initChartData() {
      // 若isAxisChart存在则为折线图或柱状图，
      if(this.isAxisChart) {
        // 就设置x、y轴坐标，X是由外面传进来的charData内，Y是默认的
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
        // 若isAxisChart不存在则为饼状图，
      } else {
        // 就没有x、y轴，直接对series赋值
        this.normalOption.series = this.chartData.series
      }
    }

  },

  // 3、在data中定义柱状图/折线图/饼状图 所对应的数据
  data() {
    return {
      // 折线图
      axisOption: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
      },

      // 饼状图
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },

      // 定义echart，默认为null,在initChart里判断当前echarts有无渲染时使用。
      echart: null
    }
  },

  // 2、利用computed对传入进来的options数据进行判断
  computed: {
    // 【写2-1之前，要有步骤3】
    // 2-1、通过判断isAxisChart属性,来决定传过来的是 柱状图/折线图/饼状图。
    // 若this.isAxisChart存在，就获取data中的折线图，否则就获取饼状图
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  }
}
</script>

