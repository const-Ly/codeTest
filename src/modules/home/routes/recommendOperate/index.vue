<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true"  label-width="100px" class="demo-form-inline">
        <el-form-item label="编号：">
          <el-input v-model.trim="param.id" placeholder="请输入" v-only-num.string="param.id"></el-input>
        </el-form-item>
        <el-form-item label="活动ID：">
          <el-input v-model.trim="param.activityId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="显示位置：">
          <el-select v-model="param.displayPosition">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in displayPositionList"
              :label="item.label"
              :value="item.value"
              :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="param.activityStatus">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in activityStatusList"
              :label="item.label"
              :value="item.value"
              :key="item.value"></el-option>
          </el-select>
        </el-form-item><br />
        <el-form-item label=" ">
          <el-button type="primary" @click="query(1)">查询</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">共 <span class="font-blue" v-text="total"></span> 条</span>
        <el-button class="fr" type="primary" @click="add">添加</el-button>
      </div>
      <el-table :data="list" class="topic-table">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="activityId" label="活动ID"></el-table-column>
        <el-table-column prop="displayPositionName" label="显示位置"></el-table-column>
        <el-table-column prop="id" label="海报图片">
          <template slot-scope="scope">
            <img :src="scope.row.postImgUrl">
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="展示位置"></el-table-column>
        <el-table-column prop="activityStatusName" label="状态"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="startDate" label="启用时间"></el-table-column>
        <el-table-column prop="endDate" label="禁用时间"></el-table-column>
        <el-table-column prop="operator" label="操作人"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span class="font-blue" @click="edit(scope.row)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
        :current-page.sync="param.pageNum"
        :page-count="pages"
        @current-change="query"
        background layout="prev, pager, next"></el-pagination>
    </el-card>
  </div>
</template>
<script> 
export default {
  name: "recommendOperateList",
  data () {
    return {
      param: { // 查询参数
        pageNum: 1,
        pageSize: 20,
        id: '', // 编号
        activityId: '', // 活动id
        displayPosition: '', // 显示位置
        activityStatus: '' // 状态
      },
      list: [], // 列表
      pages: 0, // 总页数
      total: 0, // 数组总数
      displayPositionList: [ // 显示位置
        {value: 1, label: '首页Feed流'},
        {value: 2, label: '首页tab分类页'},
        {value: 3, label: '单类目中间页'},
        {value: 4, label: '个人中心feed流'},
        {value: 5, label: '购物车feed流'},
        {value: 6, label: '订单feed流'}
      ],
      activityStatusList: [ // 状态
        {value: 1, label: '待开始'},
        {value: 2, label: '进行中'},
        {value: 3, label: '已结束'}
      ]
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    clear () { // 清空
      this.param.id = ''
      this.param.activityId = ''
      this.param.displayPosition = ''
      this.param.activityStatus = ''
    },
    query (num) { // 查询
      this.param.pageNum = num || 1
      this.$service.home.recommendOperate.list(this.param).then(res => {
        this.list = res.list
        this.param.pageNum = res.pageNum
        this.pages = res.pages
        this.total = res.total
      })
    },
    add () { // 跳转到添加页面
      window.open('/app/home/#/recommendOperate/add')
    },
    edit (row) { // 跳转编辑页面
      window.open(`/app/home/#/recommendOperate/edit/${row.id}`)
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
</style>


