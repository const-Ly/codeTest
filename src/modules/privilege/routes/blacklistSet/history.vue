<template>
  <div class="cms">
    <el-table :data="list" border size="small">
      <el-table-column prop="operateTime"  label="操作时间"></el-table-column>
      <el-table-column prop="operateUser"  label="操作人"></el-table-column>
      <el-table-column prop="logContent"  label="操作类型"></el-table-column>
      <el-table-column  label="操作" width="70">
        <template slot-scope="scope">
          <router-link :to="{path: '/blackList/logs/'+scope.row.logId}"><span class="font-blue">查看</span></router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="cms-pagination" v-if="list.length>0">
      <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="getLogs"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "logs",
    data () {
      return {
        list:[],
        pages:0,
        param:{
          pageIndex:1,
          pageSize:20
        }
      }
    },
    methods:{
      getLogs (val) {
        this.param.pageIndex = val || 1
        this.$service.privilege.blacklist.getBlacklistProductLogByPage(this.param).then(res => {
          this.param.pageIndex = res.pageNum
          this.pages = res.pages
          this.list = res.list
        })
      }
    },
    mounted () {
      this.getLogs()
    }
  }
</script>
