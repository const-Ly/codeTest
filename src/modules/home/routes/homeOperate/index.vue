<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true"  label-width="100px" class="demo-form-inline">
        <el-form-item label="编号：">
          <el-input class="w200" v-model.trim="param.id" placeholder="请输入" v-only-num.string="param.id" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="模块位置：">
          <el-select class="w200" v-model="param.modelPosition" placeholder="请选择">
            <el-option label="全部"></el-option>
            <el-option label="首页活动入口-1" :value="1"></el-option>
            <el-option label="首页活动入口-2" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="终端类型：">
          <el-select class="w200" v-model="param.clientType" placeholder="请选择">
            <el-option label="全部"></el-option>
            <el-option label="IOS" :value="1"></el-option>
            <el-option label="Android" :value="2"></el-option>
            <el-option label="小程序" :value="4"></el-option>
            <el-option label="M站" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select class="w200" v-model="param.activityStatus" placeholder="请选择">
            <el-option label="全部"></el-option>
            <el-option label="进行中" :value="2"></el-option>
            <el-option label="待开始" :value="1"></el-option>
            <el-option label="已结束" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="query(1)">查询</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">共 <span class="font-danger" v-text="total"></span> 条</span>
        <el-button class="fr" type="primary" @click="add">添加</el-button>
      </div>
      <el-table :data="list" class="topic-table">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="modelPositionName" label="模块位置"></el-table-column>
        <el-table-column prop="activityTypeName" label="活动类型"></el-table-column>
        <el-table-column label="适用用户" width="150">
          <template slot-scope="scope">
            <span v-for="(item, idx) in scope.row.userTypeName" :key="idx" class="userType">
              <i>{{item}}</i>
              <i v-if="idx !== scope.row.userTypeName.length-1">、</i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="运营图片">
          <template slot-scope="scope">
            <img :src="scope.row.operationImgUrl">
          </template>
        </el-table-column>
        <el-table-column prop="activityStatusName" label="状态"></el-table-column>
        <el-table-column prop="startDate" label="开始时间"></el-table-column>
        <el-table-column prop="endDate" label="结束时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="operator" label="操作人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="font-blue" @click="edit(scope.row)">编辑</span>
            <span class="font-blue" @click="copy(scope.row)">复制</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="total>0" class="pagination" :current-page.sync="param.pageNum" :page-count="pages"  @current-change="query" background layout="prev, pager, next"></el-pagination>
    </el-card>
  </div>
</template>
<script> 
export default {
  name: "homeOperateList",
  data () {
    return {
      param: { // 查询参数
        pageNum: 1,
        pageSize: 20,
        id: '', // 编号
        modelPosition: '', // 模块位置
        clientType: '', // 终端类型
        activityStatus: '' // 状态
      },
      list: [], // 列表
      pages: 0, // 总页数
      total: 0 // 数据总数
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    clear () { // 清空
      this.param.id = ''
      this.param.clientType = ''
      this.param.modelPosition = ''
      this.param.activityStatus = ''
    },
    query (num) { // 查询
      this.param.pageNum = num || 1
      this.$service.home.homeOperate.list(this.param).then(res => {
        this.list = res.list || []
        this.param.pageNum = res.pageNum
        this.pages = res.pages
        this.total = res.total
      })
    },
    // 跳转到添加页面
    add () {
      window.open('/app/home/#/homeOperate/add')
    },
    // 跳转复制页面
    copy (row) {
      window.open(`/app/home/#/homeOperate/copy/1/${row.id}`)
    },
    // 跳转编辑页面
    edit (row) {
      window.open(`/app/home/#/homeOperate/edit/2/${row.id}`)
    }
  }
}
</script>
<style scoped>
.topic-table {
  margin-top: 15px;
}
.topic-table tr td img {
  width: 80px;
  height: 80px;
}
.pagination {
  margin-top: 20px;
  float: right;
  padding-bottom: 20px;
}
.userType i{
  font-style: normal;
}
</style>


