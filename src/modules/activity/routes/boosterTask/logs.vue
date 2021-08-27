<template>
  <div class="cms demo-block">
    <el-card class="box-card">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="createTime" label="操作时间" width="200"></el-table-column>
        <el-table-column prop="createBy" label="操作人" width="200"></el-table-column>
        <el-table-column prop="operateContent" label="操作内容"></el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      param: {
        pageIndex: 1,
        pageSize: 20
      },
      pages: 0,
      list:[]
    }
  },
  methods:{
    getList(val) {
      this.param.pageIndex = val || 1
      this.$service.activity.boosterTask.log(this.param).then(res => {
        this.param.pageIndex = res.pageNum
        this.pages = res.pages
        this.list = res.list
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cms-pagination {
    text-align: center;
    margin-top: 20px;
  }
</style>
