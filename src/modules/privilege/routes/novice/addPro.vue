<template>
  <div class="cms">
    <el-card class="box-card">
       <el-form :inline="true" label-width="150px" size="small">
         <el-form-item label="选品类型：">
          <el-select v-model="param.changeCategoryType" class="w300">
            <el-option label="平台可选" :value="1"></el-option>
            <el-option label="商家选品" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品形态：">
          <el-select placeholder="请选择" v-model="param.productForm" class="w200">
            <el-option label="普通商品" :value="1"></el-option>
            <el-option label="梦工厂商品" :value="2"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="类目选择：">
          <el-cascader class="w300" :options="categoryList"  ref="category" change-on-select :props="config" @change="handleChange" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model.trim="param.shortTitle"></el-input>
        </el-form-item><br>
        <el-form-item label="商家名称：">
          <match @change="param.supplierId = ''" ref="supplierId" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input v-model="param.productId" v-only-num.string="param.productId"></el-input>
        </el-form-item><br>
        <el-form-item label="参加一起拼：">
          <el-select v-model="param.joinTogGroup" class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下架状态：">
          <el-select v-model="param.shelveStatus" class="w200">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="0"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="增值服务：">
          <el-select v-model="param.addValServer" class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="签名" :value="1"></el-option>
            <el-option label="图案定制" :value="2"></el-option>
            <el-option label="空" :value="3"></el-option>
            <el-option label="私人定制咖啡" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品审核状态：">
          <el-select v-model="param.productAuditStatus" class="w200">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" :value="1"></el-option>
            <el-option label="审核通过" :value="2"></el-option>
            <el-option label="审核不通过" :value="3"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="是否新品：">
          <el-select v-model="param.isNew" class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理商：">
          <factorLenovoSearch v-model="param.channelCode"></factorLenovoSearch>
        </el-form-item><br>
        <el-form-item label=" ">
          <el-button type="primary" @click="getSelectableProductList(1)">查询</el-button>
          <el-button @click="clearParam">清空</el-button>
        </el-form-item>
       </el-form>
    </el-card>

    <!-- 可选择商品列表 -->
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span>可选择商品</span>
      </div>
      <!-- 表格数据 -->
      <el-table :data="proList" style="width: 100%" size="small">
        <el-table-column label="商品编号" prop="productId"></el-table-column>
        <el-table-column label="商品名称" width="150" prop="shortTitle"></el-table-column>
        <el-table-column label="商品形态" prop="productForm">
          <template slot-scope="scope">
            {{ productFormMap[scope.row.productForm] }}
          </template>
        </el-table-column>
        <el-table-column label="代理商" prop="channelName">
          <template slot-scope="scope">{{ scope.row.channelName? scope.row.channelName : '-' }}</template>
        </el-table-column>
        <el-table-column label="大V名称" prop="dvName">
          <template slot-scope="scope">{{ scope.row.dvName? scope.row.dvName : '-' }}</template>
        </el-table-column>
        <el-table-column label="销售价" width="150">
          <template slot-scope="scope">{{ scope.row.minSuPrice | currency }} - {{scope.row.maxSuPrice | currency(" ")}}</template>
        </el-table-column>
        <el-table-column label="商家优惠">
          <template slot-scope="scope">{{ scope.row.supplierDiscount | percentage }}</template>
        </el-table-column>
        <el-table-column label="上下架状态" prop="shelveStatusName"></el-table-column>
        <el-table-column label="增值服务" prop="addValServerName"></el-table-column>
        <el-table-column label="商品审核状态" prop="pAuditStatusName"></el-table-column>
        <el-table-column label="是否新品" prop="isNewName"></el-table-column>
        <el-table-column label="参加活动情况">
          <template slot-scope="scope">{{ scope.row.joinActivityName | placeholder }}</template>
        </el-table-column>
        <el-table-column :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button type="text" @click="selectSingle(scope.row)" v-if="scope.row.selectable === 1">选择</el-button>
            <el-button type="text" disabled v-else>已选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="pageChange"></el-pagination>
      </div>
    </el-card>
    
    <!-- 已选择商品列表 -->
    <el-card class="box-card ma-t-10 pa-b-30">
      <div slot="header" class="clearfix">
        <span>已选择商品</span>
      </div>
      <!-- 表格数据 -->
      <el-table :data="checkedProList" style="width: 100%" size="small">
        <el-table-column label="商品编号" prop="productId"></el-table-column>
        <el-table-column label="商品名称" width="150" prop="shortTitle"></el-table-column>
        <el-table-column label="商品形态" prop="productForm">
          <template slot-scope="scope">
            {{ productFormMap[scope.row.productForm] }}
          </template>
        </el-table-column>
        <el-table-column label="代理商" prop="channelName">
          <template slot-scope="scope">{{ scope.row.channelName? scope.row.channelName : '-' }}</template>
        </el-table-column>
        <el-table-column label="大V名称" prop="dvName">
          <template slot-scope="scope">{{ scope.row.dvName? scope.row.dvName : '-' }}</template>
        </el-table-column>
        <el-table-column label="销售价" width="150">
          <template slot-scope="scope">{{ scope.row.minSuPrice | currency }} - {{scope.row.maxSuPrice | currency(" ")}}</template>
        </el-table-column>
        <el-table-column label="商家优惠">
          <template slot-scope="scope">{{ scope.row.supplierDiscount | percentage }}</template>
        </el-table-column>
        <el-table-column label="上下架状态" prop="shelveStatusName"></el-table-column>
        <el-table-column label="增值服务" prop="addValServerName"></el-table-column>
        <el-table-column label="商品审核状态" prop="pAuditStatusName"></el-table-column>
        <el-table-column label="是否新品" prop="isNewName"></el-table-column>
        <el-table-column label="参加活动情况">
          <template slot-scope="scope">{{ scope.row.joinActivityName | placeholder }}</template>
        </el-table-column>
        <el-table-column label="*平台优惠">
          <template slot-scope="scope">
            <el-input v-model="scope.row.newPlatformDiscount" @blur="handleBlur(scope.row.newPlatformDiscount)" v-only-num:newPlatformDiscount="checkedProList" :key="scope.$index" :max-len="2" class="w80"></el-input> &nbsp;%
          </template>
        </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteItem(scope.row.productId,scope.$index)">删除选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  
    <!-- 吸底区域 Begin -->
    <suction-bottom @okFn="saveTask" :pure-back="true"></suction-bottom>

  </div>
</template>

<script type="text/javascript">
  import Match from '@/components/associativeMatch'
  import factorLenovoSearch from '@/components/factorLenovoSearch'
  const SuctionBottom = () => import('@/components/panel/suctionBottom')
  export default {
    data () {
      return {
        // 查询区域数据源
        supplierList:[], // 商家列表
        categoryList:[], //类目信息
        config:{ //三级联动的配置
          value:'categoryId',
          label: 'categoryName',
          children: 'subCategoryList'
        },
        param:{
          firstLevelBackendCategoryId:"",
          secondLevelBackendCategoryId:"",
          thirdLevelBackendCategoryId:"",
          shortTitle:"",
          productId:"",
          supplierId:"",
          changeCategoryType:1,
          joinTogGroup:"",
          shelveStatus:"",
          addValServer:"",
          productAuditStatus:"",
          isNew:"",
          productForm: 1,
          channelCode: '',
          pageSize:20,
          pageIndex:1
        },
        pages:0,

        // 表格区域
        proList:[],// 商品信息
        checkedProList:[], //已选择的商品信息
        // 商品形态映射
        productFormMap: {
          1: "普通商品",
          2: "梦工厂商品"
        }
      }
    },
    computed:{
      checkedProId () {
        return this.checkedProList.map(pro => {
          return pro.productId
        })
      }
    },
    components:{ Match,SuctionBottom,factorLenovoSearch },
    mounted () {
      this.getSupplierList()
      this.getBackendCategoryTree()
      this.getSelectableProductList()
    },
    methods:{
      // 获取商家列表
        getSupplierList () {
          this.$service.common.getAllSuppliers().then(res => {
            this.supplierList = res
          })
        },
      // 获取所有类目信息
        getBackendCategoryTree () {
          this.$service.common.getBackendCategoryTree().then(res => {
            this.categoryList = res
          })
        },
        //选择的三级联动信息
        handleChange (val) {
          let arr = val.concat(["","",""])
          this.param.firstLevelBackendCategoryId = arr[0]
          this.param.secondLevelBackendCategoryId = arr[1]
          this.param.thirdLevelBackendCategoryId = arr[2]
        },
      // 获取可选择商品
        getSelectableProductList (pageNow) {
          let self = this
          this.param.pageIndex = pageNow || 1
          this.$service.privilege.novice.getPreActivityProductByPage(this.param).then(res => {
            this.pages = res.pages
            this.param.pageIndex = res.pageNum
            res.list.forEach(pro => {
              pro.selectable = self.checkedProId.indexOf(pro.productId) > -1 ? 0 : 1
            })
            this.proList = res.list
          })
        },
        pageChange (val) {
          this.getSelectableProductList(val)
        },
        // 清空查询条件
        clearParam () {
          // 重置分类
          let obj = {}
          obj.stopPropagation = () =>{}
          this.$refs.category.clearValue(obj)
          // 重置商家
          this.$refs.supplierId.clear()

          this.param.shortTitle = ""
          this.param.productId = ""
          this.param.changeCategoryType = 1
          this.param.joinTogGroup = ""
          this.param.shelveStatus = ""
          this.param.addValServer = ""
          this.param.productAuditStatus = ""
          this.param.isNew = ""
          this.param.productForm = 1
          this.param.channelCode = ""
        },
      // 渲染指定表头
      renderHeader (h, { column, $index }) {
        let self = this
        return h('span', {
          class: 'font font-blue',
          on: {
            click: () => {
              self.checkAll()
            }
          }
        }, "选择全部")
      },

      // 操作
        // 选择本页全部
        checkAll () {
          if(this.proList.length + this.checkedProList.length >= 200 ){
            this.$message.warning("最多选择200条商品");
          }else{
            this.proList.forEach(item => {
              if(item.selectable === 1){//是可以选择的
                item.selectable = 0
                this.checkedProList.push({...item,newPlatformDiscount:""})
              }
            })
          }
        },
        // 选择单个
        selectSingle (item) {
          if(this.checkedProList.length >= 200){
            this.$message.warning("最多选择200条商品")
          }else if(this.checkedProId.indexOf(item.productId) > -1){
            this.$message.warning("商品数据异常")
          }else{
            item.selectable = 0
            this.checkedProList.push({...item,newPlatformDiscount:""})
          }
        },
        //删除单个已选择
        deleteItem (productId,idx) {
          this.checkedProList.splice(idx,1)
          this.proList.forEach(item => {
            if(item.productId === productId){
              item.selectable = 1
            }
          })
        },
        handleBlur (num) {
          if(num > 99 || num === ""){
            this.$message.warning("平台优惠值限制在0-99间整数")
          }
        },
        //保存商品
        saveTask () {
          if(this.checkedProList.length === 0){
            this.$message.warning("请至少选择一个商品")
          }else{
            let _param = this.checkedProList.map(item => {
              return {
                productId: item.productId,
                supplierId:item.supplierId,
                changeCategoryType:item.changeCategoryType,
                platformDiscount: item.newPlatformDiscount,
                supplierDiscount:item.supplierDiscount,
                productForm: item.productForm
              }
            })
            let _filter = _param.filter(item => {
              return item.platformDiscount > 99 || item.platformDiscount === ""
            })
            if(_filter.length > 0){
              this.$message.warning("平台优惠值限制在0-99间整数");return;
            }
            this.$service.privilege.novice.batchSaveActivityProduct(_param).then(res => {
              this.$router.back()
            })
          }
        }
    }
  }
</script>
<style scoped>
  .w80{width:80px !important;}
</style>

