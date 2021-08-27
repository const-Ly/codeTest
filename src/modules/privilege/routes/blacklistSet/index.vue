<template>
  <div class="cms">
    <el-card>
      <el-form :inline="true" label-width="100px" size="small">
        <el-form-item label="商品名称：">
          <el-input v-model.trim="param.shortTitle" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input v-model.trim="param.productId" class="w300" v-only-num.string="param.productId"></el-input>
        </el-form-item><br>
        <el-form-item label="商家名称：">
          <match @change="param.supplierId = ''" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="ma-l-15" @click="gotoSearch()">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="ma-t-10 relative">
      <div class="btn-set">
        <el-button size="small" type="danger" @click="handleDel">批量删除</el-button>
        <file-upload @success="gotoSearch()" action="/shopRedBagProduct/importBlacklistProduct" :data="{userType:param.userType}">
          <el-button type="success" size="small" slot="handle">导入商品</el-button>
        </file-upload>
        <router-link :to="{path: 'addPro',append:true,query:{type:param.userType}}"><el-button size="small" class="ma-l-10" type="primary">选择商品</el-button></router-link>
      </div>
      <el-tabs v-model="param.userType" class="clearfix" type="card" @tab-click="gotoSearch()">
        <el-tab-pane label="新客黑名单商品" name="1" disabled>
          <list :list="productList" :type="param.userType" :page-now="param.pageIndex" :page-count="pages" @select="handleSelect" @page="gotoSearch($event)" @del="gotoSearch()"></list>
        </el-tab-pane>
        <el-tab-pane label="老客黑名单商品" name="2">
          <list :list="productList" :type="param.userType" :page-now="param.pageIndex" :page-count="pages" @select="handleSelect" @page="gotoSearch($event)" @del="gotoSearch()"></list>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
  import FileUpload from "@/components/fileUpload"
  import Match from '@/components/associativeMatch'
  import List from './productList'
  export default {
    name: "blackList",
    data () {
      let self = this
      return {
        breadcrumbBtn: {
          name: '操作日志',
          fullPath: '/blacklist',
          callback () {
            self.$router.push({path:'/blacklist/logs'})
          }
        },
        param:{
          userType:"2", //新客1  老客2
          shortTitle:"",// 商品名称
          productId:"", // 商品编码
          supplierId:"", //商家id
          pageIndex:1,
          pageSize:50
        },
        pages:0,
        supplierList:[],//商家列表
        productList:[], //黑名单商品列表
        selectedList:[], //选中的商品集合
      }
    },
    components:{Match,List,FileUpload},
    beforeMount() {
      this.$store.commit('updateBreadcrumbBtn', this.breadcrumbBtn)
    },
    mounted () {
      this.getAllSupplier()
      this.gotoSearch()
    },
    methods:{
      //获取所有商家信息
      getAllSupplier () {
        this.$service.common.getAllSuppliers().then(res => {
          this.supplierList = res
        })
      },
      //搜索所有商品信息
      gotoSearch (val) {
        this.param.pageIndex = val || 1
        this.$service.privilege.blacklist.getBlacklistProductByPage(this.param).then(res => {
          this.param.pageIndex = res.pageNum
          this.pages = res.pages
          this.productList = res.list
        })
      },
      //处理选中的商品信息
      handleSelect (rows) {
        this.selectedList = rows.map(item => {
          return {
            productId:item.productId,
            shortTitle:item.shortTitle
          }
        })
      },
      //批量删除
      handleDel () {
        if(this.selectedList.length === 0){
          this.$message.warning("没有可删除的数据，请先勾选");return;
        }
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$service.privilege.blacklist.batchRemoveBlacklistProduct({
            userType:this.param.userType,
            productInfoList:this.selectedList
          }).then(res => {
            this.gotoSearch()
          })
        })
      }
    }
  }
</script>

<style scoped>
  .btn-set {
    position: absolute;
    right:20px;
    top:20px;
    z-index: 100;
  }
  .ma-l-10{ margin-left: 10px;}
</style>
