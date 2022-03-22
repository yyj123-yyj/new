<template>
  <div class="manage">
    <!-- 引入点击"新增"和"编辑"后要显示的表单 -->
    <!-- 判断点击的是新增还是编辑，新增则显示新增用户，否则就是编辑显示更新用户 -->
    <!-- :visible.sync：为true表示弹窗打开，默认为false -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <!-- 新增模块的弹窗 -->
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></CommonForm>
      <!-- 通过slot对dialog组件底部进行自定义 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <!-- 新增按钮和搜索按钮模块 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <CommonForm
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </CommonForm>
    </div>

    <!-- 
      tableData属性：table表格的数据，在data里先定义
      tableLabel属性：代表列的配置数据
     -->
    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></CommonTable>
  </div>
</template>

<script>
  import CommonForm from '../../components/CommonForm.vue'
  import { getUser } from '../../../api/data.js'
  import CommonTable from '../../components/ComonTable.vue'
  export default {
    name: 'User',
    components: {
      CommonForm,
      CommonTable
    },
    data() {
      return {
        operateType: 'add',
        isShow: false,
        operateFormLabel: [
          {
              model: 'name',
              label: '姓名',
              type: 'input'
          },
          {
              model: 'age',
              label: '年龄',
              type: 'input'
          },
          {
              model: 'sex',
              label: '性别',
              type: 'select',
              opts: [
                  {
                      label: '男',
                      value: 1
                  },
                  {
                      label: '女',
                      value: 0
                  }
              ]
          },
          {
              model: 'birth',
              label: '出生日期',
              type: 'date'
          },
          {
              model: 'addr',
              label: '地址',
              type: 'input'
          }
        ],
        operateForm: {
          name: '',
          addr: '',
          age: '',
          birth: '',
          sex: ''
        },
        formLabel: [
          {
            model: 'keyword',
            label: '',
            type: 'input'
          }
        ],
        searchFrom: {
          keyword: ''
        },
        tableData: [],
        tableLabel: [
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'age',
            label: '年龄'
          },
          {
            prop: 'sexLabel',
            label: '性别'
          },
          {
            prop: 'birth',
            label: '出生日期',
            width: 200
          },
          {
            prop: 'addr',
            label: '地址',
            width: 320
          }
        ],
        config: {
          page: 1,
          total: 30
        }

      }
    },
    methods: {
      confirm() {
        // 判断operateType若是编辑功能，书写编辑的接口
        if(this.operateType === "edit") {
          // 修改数据的逻辑
          this.$http.post('/user/edit', this.operateForm).then(res => {
            console.log(res);
            // 1、关闭弹窗
            this.isShow = false
            // 2、更新table数据
            this.getList()
          }) 
        }else {
          // 新增数据的逻辑
          this.$http.post('/user/add', this.operateForm).then(res => {
            console.log(res);
            // 1、关闭弹窗
            this.isShow = false
            // 2、更新table数据
            this.getList()
          }) 
        }
      },
      // 新增用户事件
      addUser() {
        this.isShow = true
        this.operateType = 'add'
        this.operateForm = {
          name: '',
          addr: '',
          age: '',
          birth: '',
          sex: ''
        }
      },
      // 编辑事件
      editUser(row) {
        this.operateType = 'edit'
        this.isShow = true
        this.operateForm = row
      },
      // 删除事件
      delUser(row) {
        this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // 点击确认的回调
          const id = row.id
          this.$http.post('user/del', {
            params: {id}
          }).then(() => {
            this.$message({
              type: 'success',
              message: `删除成功`
            })
            this.getList()
          })
        })
      },
      // 搜索事件
      // 传递一个参数，默认值为空
      getList(name = '') {
        this.config.loading = true
        // 判断name是否存在，若存在，要从第一页开始搜索；若不存在就为空
        name ? (this.config.page = 1) : ''
        // 调用接口
        getUser({
          page: this.config.page,
          name
        }).then(({data:res}) => {
          this.tableData = res.list.map(item => {
            item.sexLabel=item.sex === 0 ? "女" : "男"
            return item
          })
          this.config.total = res.count
          this.config.loading = false
        })
      },

    },

    created() {
      // 页面一刷新就需要调用，要在created钩子内调用
      this.getList()
    }
  }
</script>

<style lang="less" scoped>
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>