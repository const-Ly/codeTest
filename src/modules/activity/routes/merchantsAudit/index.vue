<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="审核状态：">
          <el-select v-model="param.auditStatus" class="w200">
            <el-option v-for="item in auditStatuss" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类目选择：">
          <el-cascader class="w300" :options="categoryList"  ref="category" change-on-select :props="config" @change="handleChange" clearable></el-cascader>
        </el-form-item><br/>
        <el-form-item label="申请单号：">
          <el-input v-model="param.applyNo" v-only-num.string="param.applyNo"></el-input>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input class="w300" v-model="param.productId" v-only-num.string="param.productId"></el-input>
        </el-form-item><br/>
        <el-form-item label="商品名称：">
          <el-input v-model.trim="param.shortTitle"></el-input>
        </el-form-item>
        <el-form-item label="商家名称：">
          <match @change="param.supplierId = ''" ref="supplierId" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item><br/>
        <el-form-item label="商家优惠范围：">
          <div class="w200">
            <el-input class="w80" v-only-num="param.supplierDiscountStart" v-model="param.supplierDiscountStart"></el-input>
            <span class="range-input-split">至</span>
            <el-input class="w80" v-only-num="param.supplierDiscountEnd" v-model="param.supplierDiscountEnd"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="申请单类型：">
          <el-select v-model="param.applyType" class="w200">
            <el-option label="全部" value=""></el-option>
            <el-option label="提报商品" :value="1"></el-option>
            <el-option label="取消商品" :value="2"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearSearch()">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span>商家提报审核</span>
        <el-button class="ma-l-20" type="primary" size="small" @click="batchAudit">批量审核</el-button>
      </div>
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%"  :default-expand-all="false"  @selection-change="handleSelectionChange">
      	<el-table-column type="selection" width="50"></el-table-column>
	      <el-table-column label="申请单号" prop="applyNo"></el-table-column>
		    <el-table-column label="商品编号">
		    	<template slot-scope="scope">
            <a class="font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{scope.row.productId}}</a>
          </template>
		    </el-table-column>
		    <el-table-column label="商品名称"  width="150">
		    	<template slot-scope="scope">
            <a class="font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{scope.row.shortTitle}}</a>
          </template>
		    </el-table-column>
		    <el-table-column label="销售价">
		    	<template slot-scope="scope">
            {{scope.row.minSuPrice | currency}}-{{scope.row.maxSuPrice | currency(" ")}}
          </template>
		    </el-table-column>
		    <el-table-column label="商品扣点">
		    	<template slot-scope="scope">
            {{ scope.row.productCost | percentage }}
          </template>
		    </el-table-column>
		    <el-table-column label="商家优惠">
		    	<template slot-scope="scope">
            <template v-if="scope.row.oriSupplierDiscount !== null && scope.row.oriSupplierDiscount !== ''">
              {{ scope.row.oriSupplierDiscount | percentage }}→
            </template>
            {{ scope.row.supplierDiscount | percentage }}
          </template>
		    </el-table-column>
        <el-table-column label="提交时间" prop="createTime"></el-table-column>
		    <el-table-column label="申请单类型">
		    	<template slot-scope="scope">
            {{ scope.row.applyTypeName | placeholder }}
          </template>
		    </el-table-column>
		    <el-table-column label="审核状态" prop="auditStatusName"></el-table-column>
		    <el-table-column label="操作">
          <template slot-scope="scope">
          	<span v-if="scope.row.auditStatus === 2" @click="getAuditInfo(2,scope.row.applyNo)" class="font-blue">审核</span>
          	<span v-else @click="getAuditInfo(1,scope.row.applyNo)" class="font-blue">查看</span>
          </template>
		    </el-table-column>
	    </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-card>
    <!-- 审核详情 -->
    <el-dialog :visible.sync="showAuditDetail" width="70%" title="审核详情" class="mapBox">
      <el-form :inline="true" label-width="140px" size="small">
        <el-form-item label="申请单号：">{{ auditDetail.applyNo }}</el-form-item><br>
        <el-form-item label="商家名称：">{{ auditDetail.supplierName }}</el-form-item>
        <el-form-item label="提交时间：">{{ auditDetail.createTime }}</el-form-item>
        <el-form-item label="商品编号：">{{ auditDetail.productId }}</el-form-item>
        <el-form-item label="商品扣点：">{{ auditDetail.productCost | percentage}}</el-form-item>
        <el-form-item label="销售价：">{{ auditDetail.minSuPrice  | currency }}-{{ auditDetail.maxSuPrice | currency(" ") }}</el-form-item>
        <el-form-item label="平台优惠：">--</el-form-item>
        <el-form-item label="原商家优惠：">{{ auditDetail.oriSupplierDiscount  | percentage }}</el-form-item>
        <el-form-item label="新商家优惠：">{{ auditDetail.supplierDiscount  | percentage }}</el-form-item>
        <template v-if="mapStatus === 1">
        	<el-form-item label="审核人：">{{ auditDetail.auditBy | placeholder }}</el-form-item>
	        <el-form-item label="审核时间：">{{ auditDetail.auditTime | placeholder }}</el-form-item>
        	<el-form-item label="审核结果：">{{ auditDetail.auditStatusName }}</el-form-item>
        	<el-form-item label="驳回原因：" v-if="auditDetail.auditStatus === 1">{{ auditDetail.auditReason  }}</el-form-item>
        </template>
        <template v-else>
        	<el-form-item label="审核结果：">
	          <el-radio-group v-model="auditResult">
	            <el-radio :label="3">审核通过</el-radio>
	            <el-radio :label="1">审核驳回</el-radio>
	          </el-radio-group>
	        </el-form-item>
	        <el-form-item label="驳回原因：" v-if="auditResult === 1">
	          <el-input v-model.trim="auditReason" :maxlength="10" size="small" class="w200"></el-input>
	        </el-form-item><br>
        </template>
        <template>
	        <el-form-item label="申请单类型：">{{ auditDetail.applyTypeName | placeholder}}</el-form-item>
	        <el-form-item label="商家取消原因：" class="break">{{ auditDetail.cancelReason  | placeholder }}</el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="mapStatus === 2">
        <el-button size="small" type="primary" @click="submitAudit">确认审核</el-button>
        <el-button size="small" @click="showAuditDetail = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 批量审核 -->
    <el-dialog :visible.sync="batchAuditShow" width="40%" title="批量审核">
      <el-form label-width="100px" size="small">
        <el-form-item label="审核结果：">
          <el-radio-group v-model="auditParam.auditStatus">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="0">审核驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回原因：" v-if="auditParam.auditStatus === 0">
          <el-input v-model.trim="auditParam.rejectReason" :maxlength="10" class="w200"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitBatchAudit">确认审核</el-button>
        <el-button size="small" @click="batchAuditShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import Match from '@/components/associativeMatch'
  export default {
    	name: "blackList",
      data() {
        let self = this
        return {
        	supplierList:[],//商家列表
        	supplierName:'',//商家名称
	        pages:0,
	        list:[],
          param:{//请求参数
	          firstLevelBackendCategoryId:"",
	          secondLevelBackendCategoryId:"",
	          thirdLevelBackendCategoryId:"",
	          auditStatus:'',	// 审核状态,''全部，1 审核驳回，2审核中，3 审核通过，4 已作废
	          applyNo:"",	// 申请单号
	          supplierDiscountStart:"",	// 商家优惠范围最小值
	          supplierDiscountEnd:"",	// 商家优惠范围最大值
	          shortTitle:"",	// 商品名称
	          supplierId:"",	// 商家id
	          productId:"",	// 商品id
            applyType:"",
	          pageIndex:1,
	          pageSize:20,
	        },
	        config:{ //三级联动的配置
	          value:'categoryId',
	          label: 'categoryName',
	          children: 'subCategoryList'
	        },
        	categoryList:[], //所有类目信息
	        auditStatuss:[{// 审核状态
	        	value: '',
		        label: '全部'
		      },{
	        	value: 2,
		        label: '审核中'
		      },{
	        	value: 3,
		        label: '审核通过'
		      },{
	        	value: 1,
		        label: '审核驳回'
		      },{
	        	value: 4,
		        label: '已作废'
		      }],
        	showAuditDetail:false,	// 审核详情弹层
        	auditDetail:{},	// 审核详情信息
        	mapStatus:1,	// 审核状态，1查看，2审核
        	auditResult:3,	// 审核结果，3审核通过，1审核驳回
        	auditReason:'',	// 驳回原因
        	checkedList:[], // 选中的信息集合
          // 批量审核
          batchAuditShow:false,
          auditParam:{
            auditStatus:1,
            rejectReason:"",
            applyNoList:[]
          }
        }
      },
      components:{Match},
      methods:{
          getList(val) {
            let self = this
            self.param.pageIndex = val || 1
           	self.$service.activity.merchantsAudit.getApplicationFormsByPage(self.param).then(res => {
              self.param.pageIndex = res.pageNum
              self.pages = res.pages
              self.list = res.list
           	})
          },
          clearSearch() {
		      	let self = this
		       	// 重置分类
	          let obj = {}
	          obj.stopPropagation = () =>{}
	          self.$refs.category.clearValue(obj)
	          // 重置商家
	          self.$refs.supplierId.clear()
	          // 重置其他参数
	          self.param.auditStatus = ""
	          self.param.applyNo = ""
	          self.param.supplierDiscountStart = ""
	          self.param.supplierDiscountEnd = ""
	          self.param.shortTitle = ""
	          self.param.productId = ""
            self.param.applyType = ""
          },
		      // 获取所有类目信息
		      getBackendCategoryTree () {
        		this.$service.common.getBackendCategoryTree().then(res => {
		          this.categoryList = res
		        })
		      },
          //选择的商品信息
          handleSelectionChange(arr) {
          	var self = this
          	self.selecteds = arr.map(item => {
              return item.productId
		        })
          },
		      //选择的三级联动信息
		      handleChange (val) {
		        let arr = val.concat(["","",""])
		        this.param.firstLevelBackendCategoryId = arr[0]
		        this.param.secondLevelBackendCategoryId = arr[1]
		        this.param.thirdLevelBackendCategoryId = arr[2]
		      },
		      //获取所有商家信息
		      getAllSupplier () {
        		let self = this
		        self.$service.common.getAllSuppliers().then(res => {
		          self.supplierList = res
		        })
		      },
	        //选择的商品信息
	        handleSelectionChange (arr) {
	          this.checkedList = arr.map(item => {
	            return item.applyNo
	          })
	        },
		      // 审核详情
		      getAuditInfo (type,applyNo){
		      	let self = this
		     		self.mapStatus = type
            self.auditResult = 3
            self.auditReason = ""
		     		self.$service.activity.merchantsAudit.getApplicationFormsByApplyNo({applyNo:applyNo}).then(res => {
		      		self.auditDetail = res
			      	self.showAuditDetail = true
			      })
		      },
          submitAudit () {
            let self = this
            if(self.auditResult === 1 && self.auditReason === ''){
              this.$message.warning("请输入1-10字驳回原因 ")
              return false
            }
            self.$service.activity.merchantsAudit.auditApplicationFormsByApplyNo({
              applyNo : self.auditDetail.applyNo,
              auditStatus : self.auditResult,
              auditReason : self.auditReason
            }).then(res => {
              this.$message.success("审核成功 ")
              self.showAuditDetail = false
              self.getList()
            })
          },
		     	// 批量审核
		      batchAudit () {
		        if(this.checkedList.length === 0){
		          this.$message.warning("请至少选择一条待审核的申请单")
		        }else {
              this.auditParam.auditStatus = 1
              this.auditParam.rejectReason = ""
              this.auditParam.applyNoList = this.checkedList
              this.batchAuditShow = true
		        }
		      },
          // 确认批量审核
          submitBatchAudit (){
            if(this.auditParam.auditStatus === 0 && this.auditParam.rejectReason === ""){
              this.$message.warning('请填写1-10字驳回原因');return
            }
            this.$service.activity.merchantsAudit.batchAuditPassByApplyNo(this.auditParam).then(res => {
              this.$message.success("批量审核成功")
              this.batchAuditShow = false
              this.getList();
            })
          }
      },
      mounted () {
        let self = this
        self.getList()
        self.getBackendCategoryTree()
        self.getAllSupplier()
      }
  }
</script>

<style type="text/css" scoped>
  .range-input-split {
    margin:0 7px;
  }
  .mapBox .el-form-item { width:45%;margin-bottom: 0 }
  .break{ word-break: break-all;}
</style>
