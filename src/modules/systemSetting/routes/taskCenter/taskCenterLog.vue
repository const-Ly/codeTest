<template>
  <div class="cms">
    <el-card class="box-card ma-t-10">
      <el-table :data="logList" border style="width: 100%">
        <el-table-column label="操作">
          <template slot-scope="scope">{{scope.row.operateType | selectType}}</template>
        </el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="seeTaskDetails(scope.$index,scope.row)"
              type="text"
              size="small"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人"></el-table-column>
        <el-table-column prop="operateTime" label="操作时间"></el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change="getLogList"
          :page-count="pages"
          background
          :page-size="10"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">
// 模拟数据
export default {
  name: 'taskCenterLog',
  data() {
    return {
      logList: [],
      pages: 0, // 总页数
      total: 0, // 总条数
      param: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    // 获取路由参数
    if (this.$route.params.taskId) {
      this.param.taskId = this.$route.params.taskId
      this.getLogList()
    }
  },
  methods: {
    // 查看日志详情
    seeTaskDetails(index, row) {
      this.$router.push(`/taskCenter/taskCenterLogDetails/${row.id}`)
    },
    getLogList(val) {
      this.param.pageNum = val || 1
      this.$service.systemSetting.taskCenter
        .getLogList(this.param)
        .then(data => {
          if (data) {
            this.logList = data.list
            this.param.pageNum = data.pageNum
            this.total = data.total
            this.pages = data.pages
          }
        })
    }
  },
  filters: {
    selectType(value) {
      let str = ''
      switch (value) {
        case 1:
          str = '新增'
          break
        case 2:
          str = '更新'
          break
      }
      return str
    }
  }
}
</script>
<style scoped>
.mar-t20 {
  margin-top: 20px;
}
</style>

