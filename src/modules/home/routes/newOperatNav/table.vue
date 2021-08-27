<template>
   <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="sequence" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="140"> </el-table-column>
      <el-table-column prop="disableTime" label="启用时间" width="140"></el-table-column>
      <el-table-column prop="enableTime" label="禁用时间" width="180"></el-table-column>
      <el-table-column prop="superscriptUrl" label="图标" width="100">
        <template slot-scope="scope">
          <img width="80" :src="scope.row.superscriptUrl">
        </template>
      </el-table-column>
      <el-table-column prop="id" label="终端类型"></el-table-column>
      <el-table-column prop="id" label="用户类型"></el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <span>详情</span>
          <span>|</span>
          <span>编辑</span>
          <span>|</span>
          <span>禁用</span>
          <span>|</span>
          <span>日志</span>
        </template>  
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pageNum: 1,
      bottomType: 0,

    }
  },
  methods: {
    request () {
      
      this.axios.get('/static/mock/modules/home/newOperatNav/table.json')
        .then(data => {
          this.tableData = data
        })
    },
    setParam () {
      let param = {
        pageNum: this.pageNum,
        pageSize: 20,
        bottomType: this.bottomType,
        clientType: {},
        customerType: {
          
        },
        iosVersionInfo: {
          versionNumFrom: '',
          versionNumTo: ''
        },
        androidVersionInfo: {
          versionNumFrom: '',
          versionNumTo: ''
        },
        enableStatus: 1
      }
    }
  },
  mounted () {
    this.request()
  }
}
</script>

<style>

</style>


