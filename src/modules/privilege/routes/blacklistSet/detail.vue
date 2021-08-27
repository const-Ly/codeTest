<template>
  <div class="cms">
    <el-table :data="list" border size="small">
      <el-table-column prop="productId"  label="商品编号"></el-table-column>
      <el-table-column prop="shortTitle"  label="商品名称"></el-table-column>
      <el-table-column prop="content"  label="操作内容"></el-table-column>
    </el-table>
    <div class="cms-pagination" v-if="list.length>0">
      <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="getDetail"></el-pagination>
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
          logId:this.$route.params.id,
          pageIndex:1,
          pageSize:20
        }
      }
    },
    methods:{
      getDetail (val) {
        this.param.pageIndex = val || 1
        this.$service.privilege.blacklist.getBlacklistProductLogDetailByPage(this.param).then(res => {
          this.param.pageIndex = res.pageNum
          this.pages = res.pages
          this.list = res.list
        })
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
