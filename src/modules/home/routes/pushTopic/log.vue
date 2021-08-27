<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>专题日志</span>
    </div>
    <el-table class="log" :data="logList">
      <el-table-column prop="operator" label="操作人"></el-table-column>
      <el-table-column prop="operateTime" label="操作时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="font-blue" @click="info(scope.row.id)">详情</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" :current-page.sync="params.pageIndex" :page-count="pages" @current-change="getLogs" background layout="prev, pager, next"></el-pagination>
    <log-details ref="hanldLog"></log-details>
  </el-card>
</template>
<script>
import LogDetails from './logDetails'
export default {
  name: "log",
  data () {
    return {
      params: {
        topicId: this.$route.params.id,
        pageSize: 20,
        pageIndex: 1
      },
      pages: 1,
      logList: [],
    }
  },
  components: {
    LogDetails
  },
  methods: {
    getLogs (val) {
      this.params.pageIndex = val || 1
      this.$service.home.pushTopic.logList(this.params).then(res => {
        this.logList = res.list
        this.params.pageIndex = res.pageNum
        this.pages = res.pages
      })
    },
    info (logId) {
      this.$nextTick(() => {
        this.$refs.hanldLog.getDetail(logId)
        this.$refs.hanldLog.showDialog = true
      })
      
    }
  },
  mounted () {
    this.getLogs()
  }
}
</script>
<style>
.pagination {
  margin-top: 20px;
  float: right;
  padding-bottom: 20px;
}
</style>
