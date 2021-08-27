<template>
  <div class="cms">
    <el-card>
      <el-form :inline="true" label-width="150px" size="small">
        <template v-if="param.userType === '1'">
          <el-form-item label="平台优惠范围：" style="width:45%" class="multiInput">
            <el-input v-model="param.platformDiscountStart" v-only-num="param.platformDiscountStart"></el-input>
            <span class="range-input-split">至</span>
            <el-input v-model="param.platformDiscountEnd" v-only-num="param.platformDiscountEnd"></el-input>
          </el-form-item>
          <el-form-item label="商家优惠范围：" style="width:45%" class="multiInput">
            <el-input class="range-input" v-model="param.supplierDiscountStart" v-only-num="param.supplierDiscountStart"></el-input>
            <span class="range-input-split">至</span>
            <el-input class="range-input" v-model="param.supplierDiscountEnd" v-only-num="param.supplierDiscountEnd"></el-input>
          </el-form-item><br/>
        </template>
        <el-form-item label="商品名称：">
          <el-input v-model.trim="param.shortTitle" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input v-model.trim="param.productId" v-only-num.string="param.productId"></el-input>
        </el-form-item><br>
        <el-form-item label="商家名称：">
          <match @change="param.supplierId = ''" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item>
        <el-form-item label="品类选择：">
          <el-cascader :options="categoryList" change-on-select :props="config" @change="handleChange" clearable></el-cascader>
          <el-button type="primary" @click="getProList()">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="ma-t-10">
      <div class="clearfix pa-b-20">
        <span>{{param.userType === '1' ? "一起拼商品" :"平台商品"}}</span>
        <el-button class="fr" size="small" type="primary" @click="handleMultiAdd">批量选择</el-button>
        <el-button class="fr ma-r-20" size="small" type="warning" @click="exportPro">导出商品</el-button>
      </div>
      <div>
        <el-table :data="list" @selection-change="handleSelectionChange" border size="small">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="productId"  label="商品编号"></el-table-column>
          <el-table-column prop="shortTitle"  label="商品名称"></el-table-column>
          <el-table-column prop="supplierName"  label="商家名称"></el-table-column>
          <el-table-column  label="销售价">
            <template slot-scope="scope">
              {{scope.row.minPrice| currency}}- {{scope.row.maxPrice}}
            </template>
          </el-table-column>
          <template v-if="param.userType === '1'">
            <el-table-column label="商家优惠">
              <template slot-scope="scope">
              	<span v-if="scope.row.supplierDiscount === null">{{scope.row.supplierDiscount | placeholder}}</span>
          	<span v-else>{{scope.row.supplierDiscount | percentage}}</span>
              </template>
            </el-table-column>
            <el-table-column label="平台优惠">
              <template slot-scope="scope">
              	<span v-if="scope.row.platformDiscount === null">{{scope.row.platformDiscount | placeholder}}</span>
          	<span v-else>{{scope.row.platformDiscount | percentage}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column  label="操作" width="70">
            <template slot-scope="scope">
              <span class="font-blue" @click="handleSingleAdd(scope.row.productId)">选择</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="cms-pagination" v-if="list.length>0">
          <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="getProList"></el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog title="提示" :visible.sync="showErrorTip"  width="40%" class="multi-info-list">
      <div v-html="errorTipHtml"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleTip">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Match from '@/components/associativeMatch'
  export default {
    name: "blackList",
    data () {
      return {
        param:{
          userType:this.$route.query.type, //新客1  老客2
          shortTitle:"", //商品名称
          productId:"", //商品编码
          supplierId:"", //商家id
          firstLevelBackendCategoryId:"", //一级类目id
          secondLevelBackendCategoryId:"", //二级类目id
          thirdLevelBackendCategoryId:"", //三级类目id
          platformDiscountStart:"", //平台优惠比例起始值；查询新客列表用到
          platformDiscountEnd:"", //平台优惠比例结束值；查询新客列表用到
          supplierDiscountStart:"", //商家优惠比例起始值；查询新客列表用到
          supplierDiscountEnd:"", //商家优惠比例结束值；查询新客列表用到
          pageIndex:1,
          pageSize:50,
          additionalFlag:-1
        },
        pages:0,
        supplierList:[],//商家列表
        list:[], //商品列表
        selectedList:[], //选中的商品集合
        categoryList:[], //所有类目信息
        config:{ //三级联动的配置
          value:'categoryId',
          label: 'categoryName',
          children: 'subCategoryList'
        },
        showErrorTip:false, //批量选择弹框
        errorTipHtml:"", //批量提示文案
        mapType:""
      }
    },
    components:{Match},
    mounted () {
      if(this.param.userType === '2'){
        delete this.param.platformDiscountStart
        delete this.param.platformDiscountEnd
        delete this.param.supplierDiscountStart
        delete this.param.supplierDiscountEnd
      }
      this.getAllSupplier()
      this.getProList()
      this.getBackendCategoryTree()
    },
    methods:{
      handleChange (val) {
        let arr = val.concat(["","",""])
        this.param.firstLevelBackendCategoryId = arr[0]
        this.param.secondLevelBackendCategoryId = arr[1]
        this.param.thirdLevelBackendCategoryId = arr[2]
      },
      // 获取所有类目信息
      getBackendCategoryTree () {
        this.$service.common.getBackendCategoryTree().then(res => {
          this.categoryList = res
        })
      },
      //获取所有商家信息
      getAllSupplier () {
        this.$service.common.getAllSuppliers().then(res => {
          this.supplierList = res
        })
      },
      //获取商品信息
      getProList (val) {
        this.param.pageIndex = val || 1
        this.$service.privilege.blacklist.getPrivilegeProductByPage(this.param).then(res => {
          this.param.pageIndex = res.pageNum
          this.pages = res.pages
          this.list = res.list
        })
      },
      //导出商品
      exportPro () {
        let _param = JSON.parse(JSON.stringify(this.param))
        delete _param.pageIndex
        delete _param.pageSize
        this.$service.privilege.blacklist.exportPrivilegeProduct(_param).then(res => {
          window.open(res)
        })
      },
      //选中的表格项
      handleSelectionChange (rows) {
        this.selectedList = rows.map(row => {
          return row.productId
        })
      },
      handleMultiAdd () {
        if(this.selectedList.length === 0){
          this.$message.warning("没有可添加的商品，请先勾选");return;
        }
        this.$confirm('确认是否批量添加？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.mapType = "multiple"
          this.addBlackListPro(this.selectedList,true)
        })
      },
      handleSingleAdd (id) {
        this.mapType = "single"
        this.addBlackListPro([id],false)
      },
      //添加黑名单商品
      addBlackListPro (arr,isBatch) {
        this.$service.privilege.blacklist.batchAddBlacklistProduct({userType:this.param.userType,productIdList:arr,isBatch:isBatch?1:0}).then(res => {
          if(this.mapType === "multiple"){//批量选择需要显示异常商品编号
            this.handleImport(res)
          }else{
            this.getProList()
          }
        })
      },
      handleImport (res) {
        this.errorTipHtml = "成功选择"+res.successCount+"条商品，失败"+res.failCount+"条."
        if(res.failCount > 0){
          this.errorTipHtml += "以下为失败商品编号，请注意粘贴保存检查："
          this.errorTipHtml += res.failSpuIdList.map(item => {
            return '<span class="font-danger">'+item+'</span>'
          }).join("、")
        }
        this.showErrorTip = true
      },
      handleTip () {
        this.showErrorTip = false
        this.getProList()
      }
    }
  }
</script>

<style scoped>
  .el-button.ma-r-20{margin-right: 20px}
</style>
