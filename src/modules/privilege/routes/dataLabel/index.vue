<template>
  <div class="cms">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button class="fr" type="primary" @click="add()">添加</el-button>
      </div>
      <el-table :data="list">
        <el-table-column label="数据标签ID" prop="id"></el-table-column>
        <el-table-column label="数据标签名称" prop="labelTitle"></el-table-column>
        <el-table-column label="数据范围">
          <template slot-scope="scope">
            <span v-if="['', null].indexOf(scope.row.minValue) > -1">--</span>
            <span v-else>[{{ scope.row.minValue }}, {{ scope.row.maxValue }})</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="statusDes"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="font-blue" @click="updateStatus(scope.row.id, 1)">启用</span>
            <span v-if="scope.row.status === 1" class="font-blue" @click="updateStatus(scope.row.id, 0)">禁用</span>
            <span class="font-blue" @click="add(scope.row.id)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="getList($event)"></el-pagination>
      </div>
    </el-card>

    <!-- 添加/编辑数据标签 -->
     <el-dialog :title="addTitle" :visible.sync="addSwitch" width="600px">
      <el-form label-width="200px">
        <el-form-item v-show="addParam.id" label="数据标签ID：">{{ addParam.id }}</el-form-item>
        <el-form-item label="数据标签名称：">
          <el-input class="w300" v-model.trim="addParam.labelTitle" :maxLength="8"></el-input>
        </el-form-item>
        <el-form-item label="数据范围最小值（包含）：">
          <el-input class="w300" v-model="addParam.minValue" v-only-num="addParam.minValue" :max-len="3"></el-input>
        </el-form-item>
        <el-form-item label="数据范围最大值（不包含）：">
          <el-input class="w300" v-model="addParam.maxValue" v-only-num="addParam.maxValue" :max-len="3"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button class="ma-l-20" @click="addSwitch = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  name: 'dataLabel',
  data () {
    return {
      param: {
        pageIndex:1,
        pageSize:20
      },
      list: [],
      pages: 0,
      addSwitch: false,
      addTitle: '添加数据标签',
      addParam: {
        id: '',
        labelTitle: '',
        minValue: '',
        maxValue: ''
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods:{
    // 获取数据列表
    getList (index) {
      this.param.pageIndex = index || 1
      this.$service.privilege.dataLabel.getList(this.param).then(res => {
        this.pages = res.pages
        this.param.pageIndex = res.pageNum
        this.list = res.list || []
      })
    },
    add (id) {
      this.addTitle = id ? '编辑数据标签' : '添加数据标签'
      if (id) {
        this.$service.privilege.dataLabel.info({id}).then(res => {
          this.addParam.id = id
          this.addParam.labelTitle = res.labelTitle
          this.addParam.minValue = res.minValue
          this.addParam.maxValue = res.maxValue
        })
      } else {
        this.addParam.id = null
        this.addParam.labelTitle = ''
        this.addParam.minValue = ''
        this.addParam.maxValue = ''
      }
      this.addSwitch = true
    },
    updateStatus (id, status) {
      let text = status === 1 ? '你确定启用该数据标签吗？' : '你确定禁用该数据标签吗？'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.privilege.dataLabel.changeStatus({id, status}).then(res => {
          res && this.getList(this.param.pageIndex)
        })
      })
    },
    submit () {
      // 验证表单
      this.$utils.testForm(
      [
        {test: this.addParam.labelTitle === '', fun: () => this.$message.warning('请输入数据标签名称')},
        {test: this.addParam.minValue === '', fun: () => this.$message.warning('请输入数据范围最小值（包含）')},
        {test: this.addParam.minValue > 101, fun: () => this.$message.warning('数据范围最小值（包含）必须是0到101的整数')},
        {test: this.addParam.maxValue === '', fun: () => this.$message.warning('请输入数据范围最大值（不包含）')},
        {test: this.addParam.maxValue > 101, fun: () => this.$message.warning('数据范围最大值（不包含）必须是0到101的整数')},
        {test: this.addParam.maxValue <= this.addParam.minValue, fun: () => this.$message.warning('数据范围最大值必须大于最小值')}
      ], () => {
        // 表单验证通过后，执行刷新列表操作
        this.$service.privilege.dataLabel.addOrUpdate(this.addParam).then(res => {
          if (res) {
            this.$message.success('提交成功')
            this.getList(this.param.pageIndex)
            this.addSwitch = false
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-button.ma-r-20{  margin-right: 20px; }
</style>
