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
        <el-form-item label="活动类型：">
          <el-select v-model="param.activityType" class="w200">
            <el-option v-for="item in activityTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请单号：">
          <el-input  class="w300" v-model="param.applyNo" v-only-num.string="param.applyNo"></el-input>
        </el-form-item><br/>
        <el-form-item label="商品编码：">
          <el-input v-model="param.productId" v-only-num.string="param.productId"></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model.trim="param.shortTitle" style="width:300px;"></el-input>
        </el-form-item><br/>
        <el-form-item label="平台优惠范围：">
          <div class="w200">
            <el-input class="w80" v-only-num="param.platformDiscountStart" v-model="param.platformDiscountStart"></el-input>
            <span class="range-input-split">至</span>
            <el-input class="w80" v-only-num="param.platformDiscountEnd" v-model="param.platformDiscountEnd"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="商家名称：">
          <match @change="param.supplierId = ''" ref="supplierId" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item><br/>
        <el-form-item label="商品形态：">
          <el-select placeholder="请选择" v-model="param.productForm" class="w200">
            <el-option label="全部" value></el-option>
            <el-option label="普通商品" :value="1"></el-option>
            <el-option label="梦工厂商品" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearSearch()">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span>二审商品</span>
        <el-button class="ma-l-20" type="primary" size="small" @click="batchAudit">批量审核</el-button>
        <el-button class="ma-l-20" type="warning" size="small" @click="handleExport">导出</el-button>
      </div>
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%"  :default-expand-all="false"  @selection-change="handleSelectionChange">
      	<el-table-column type="selection" width="50"></el-table-column>
	      <el-table-column label="申请单号" prop="applyNo"></el-table-column>
		    <el-table-column label="商品编号/SUID">
		    	<template slot-scope="scope">
            <a class="font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{scope.row.productId}}</a>
          </template>
		    </el-table-column>
        <el-table-column label="商品形态" prop="productForm">
          <template slot-scope="scope">
            {{ productFormMap[scope.row.productForm] }}
          </template>
        </el-table-column>
		    <el-table-column label="商品名称/规格" width="150">
		    	<template slot-scope="scope">
            <a class="font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{scope.row.shortTitle}}</a>
          </template>
		    </el-table-column>
		    <el-table-column label="销售价">
		    	<template slot-scope="scope">
            {{scope.row.minSuPrice | currency}}-{{scope.row.maxSuPrice | currency(" ")}}
          </template>
		    </el-table-column>
		    <el-table-column label="活动类型" prop="activityTypeName"></el-table-column>
		    <el-table-column label="商家优惠">
		    	<template slot-scope="scope">
            {{ scope.row.supplierDiscount | percentage }}
          </template>
		    </el-table-column>
		    <el-table-column label="商品净补贴金额预估">
		    	<template slot-scope="scope">{{ scope.row.estimateSubsidyAmount | currency }}</template>
		    </el-table-column>
		    <el-table-column label="商品扣点/平台优惠">
		    	<template slot-scope="scope">
            {{ scope.row.productCost | percentage }}&nbsp;&nbsp;{{ scope.row.platformDiscount | percentage }}
          </template>
		    </el-table-column>
        <el-table-column label="新用户/老客限额">
		    	<template slot-scope="scope">
            {{ scope.row.userCommonPrivilegeDiscountLimit!==null?scope.row.userCommonPrivilegeDiscountLimit:'-'}}
            /
            {{ scope.row.customerCommonPrivilegeDiscountLimit!==null?scope.row.customerCommonPrivilegeDiscountLimit:'-'}}
          </template>
		    </el-table-column>
		    <el-table-column label="审核状态" prop="auditStatusName"></el-table-column>
		    <el-table-column label="操作">
          <template slot-scope="scope">
          	<span v-if="scope.row.auditStatus === 2" @click="getAuditInfo(2,scope.row.applyNo)" class="font-blue">审核</span>
          	<span v-else @click="getAuditInfo(1,scope.row.applyNo)" class="font-blue">查看</span>
          </template>
		    </el-table-column>
		    <el-table-column type="expand" width="40">
	        <template slot-scope="props">
	          <el-table :data="props.row.skuDtoList " :show-header="false" style="width: 100%">
	          	<el-table-column width="50"></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column prop="skuId"></el-table-column>
              <el-table-column width="150">
              	<template slot-scope="scope">
			            {{ scope.row.skuSpecs | placeholder }}
			          </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  {{ scope.row.suPrice | currency }}
                </template>
              </el-table-column>
              <el-table-column prop="activityTypeName"></el-table-column>
              <el-table-column>
              	<template slot-scope="scope">
			            {{ scope.row.supplierDiscount | percentage }}
			          </template>
              </el-table-column>
              <el-table-column>
              	<template slot-scope="scope">
			            {{ scope.row.estimateSubsidyAmount | currency }}
			          </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  {{ scope.row.productCost | percentage }}&nbsp;&nbsp;{{ scope.row.platformDiscount | percentage }}
                </template>
              </el-table-column>
              <el-table-column>
              	<template slot-scope="scope">
                  {{ scope.row.userCommonPrivilegeDiscountLimit!==null?scope.row.userCommonPrivilegeDiscountLimit:'-'}} 
                  /
                   {{ scope.row.customerCommonPrivilegeDiscountLimit!==null?scope.row.customerCommonPrivilegeDiscountLimit:'-'}}
			          </template>
              </el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column width="40"></el-table-column>
            </el-table>
	        </template>
	      </el-table-column>
	    </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-card>
    <!-- 审核详情 -->
    <el-dialog :visible.sync="showAuditDetail" width="60%" title="审核详情" class="mapBox">
      <el-form :inline="true" label-width="100px" size="small">
        <el-form-item label="申请单号：">{{ auditDetail.applyNo }}</el-form-item>
        <el-form-item label="活动类型：">{{ auditDetail.activityTypeName }}</el-form-item>
        <el-form-item label="提交人：">{{ auditDetail.createBy }}</el-form-item>
        <el-form-item label="提交时间：">{{ auditDetail.createTime }}</el-form-item>
        <el-form-item label="初审：">{{ auditDetail.firstAuditBy }},{{ auditDetail.firstAuditTime }}</el-form-item>
        <el-form-item label="初审结果：">{{ auditDetail.firstAuditStatusName }}</el-form-item>
        <el-form-item label="商品编号：">{{ auditDetail.productId }}</el-form-item>
        <template v-if ="auditDetail.productForm === 2">
          <el-form-item label="商品形态：">{{ productFormMap[auditDetail.productForm] }}</el-form-item>
          <el-form-item label="代理商：">{{ auditDetail.channelName?auditDetail.channelName : '--' }}</el-form-item>
          <el-form-item label="大V名称：">{{ auditDetail.dvName?auditDetail.dvName : '--' }}</el-form-item>
        </template>
        <el-form-item label="商品扣点：">{{ auditDetail.productCost | percentage}}</el-form-item>
        <el-form-item label="销售价：">{{ auditDetail.minSuPrice  | currency }}-{{ auditDetail.maxSuPrice | currency(" ") }}</el-form-item>
        <el-form-item label="商家优惠：">{{ auditDetail.submitSupplierDiscount  | percentage }}</el-form-item>
        <el-form-item label="新用户限额：">{{ auditDetail.userCommonPrivilegeDiscountLimit!==null?auditDetail.userCommonPrivilegeDiscountLimit:'--' }} &nbsp;元</el-form-item>
        <el-form-item label="老客限额：">{{ auditDetail.customerCommonPrivilegeDiscountLimit!==null?auditDetail.customerCommonPrivilegeDiscountLimit:'--' }} &nbsp;元</el-form-item>
        <el-form-item label="原平台优惠：">{{ auditDetail.oriPlatformDiscount | percentage}}</el-form-item>
        <el-form-item label="新平台优惠：">{{ auditDetail.submitPlatformDiscount  | percentage}}</el-form-item>
        <!-- 用于保持样式一致 -->
        <el-form-item label=" " v-if ="auditDetail.productForm === 2"></el-form-item>
        <template v-if ="mapStatus === 1">
        	<el-form-item label="二审人：">{{ auditDetail.secondAuditBy | placeholder }}</el-form-item>
        	<el-form-item label="二审时间：">{{ auditDetail.secondAuditTime | placeholder }}</el-form-item>
        	<el-form-item label="二审结果：">{{ auditDetail.secondAuditStatusName | placeholder}}</el-form-item>
        	<el-form-item label="驳回原因：" v-if="auditDetail.auditStatus === 4">{{ auditDetail.rejectReason  }}</el-form-item>
        </template>
        <template v-else>
        	<el-form-item label="二审结果：">
	          <el-radio-group v-model="secondAuditStatus">
	            <el-radio :label="3">审核通过</el-radio>
	            <el-radio :label="4">审核驳回</el-radio>
	          </el-radio-group>
	        </el-form-item><br>
	        <el-form-item label="驳回原因：" v-if="secondAuditStatus === 4">
	          <el-input v-model.trim="secondAuditStatusName" :maxlength="10" size="small" class="w200"></el-input>
	        </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="mapStatus === 2">
        <el-button size="small" type="primary" @click="submitAudit">确认审核</el-button>
        <el-button size="small" @click="showAuditDetail = false">取 消</el-button>
      </span>
      <!-- 负毛利判断弹窗 -->
      <el-dialog
      width="30%"
      title="审核确认"
      :visible.sync="showNegativeProfit"
      center
      append-to-body>
      <p>预估利润计算后，该商品可能为负毛利商品，是否确认审核通过？</p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="apiAuditApplicationFormsByApplyNo()">确认</el-button>
        <el-button size="small" @click="showNegativeProfit = false">取 消</el-button>
      </span>
    </el-dialog>
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
      <!-- 批量审核二层弹层 -->
      <el-dialog
      width="30%"
      title="提示"
      :visible.sync="showBatchAudit"
      center
      append-to-body>
      <p>以下梦工厂商品负毛利超过限额，做自动驳回处理</p>
      <p style="color:#F56C6C">{{batchAuditFailList.join(';')}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitBatchAuditFail">确认审核</el-button>
        <el-button size="small" @click="showBatchAudit = false">取 消</el-button>
      </span>
    </el-dialog>
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
	          activityType:'',	// 活动类型
	          applyNo:"",	// 申请单号
	          shortTitle:"",	// 商品名称
	          supplierId:"",	// 商家id
	          productId:"",	// 商品id
	          platformDiscountStart:"",	// 平台优惠范围最小值
	          platformDiscountEnd:"",	// 平台优惠范围最大值
            auditStatus:2,	// 审核状态, ''全部，2 二审中，3 审核通过 4 审核驳回 5作废
            productForm: '', // 商品形态 1普通商品（默认） 2梦工厂商品
	          pageIndex:1,
	          pageSize:20,
	        },
	        auditStatuss:[{// 审核状态
	        	value: '',
		        label: '全部'
		      },{
	        	value: 2,
		        label: '二审中'
		      },{
	        	value: 3,
		        label: '审核通过'
		      },{
	        	value: 4,
		        label: '审核驳回'
		      },{
	        	value: 5,
		        label: '已作废'
		      }],
	        activityTypes:[{	// 活动类型
	        	value: '',
		        label: '全部'
		      },{
	        	value: 1,
		        label: '一起拼'
		      },{
	        	value: 3,
		        label: '特权金'
		      }],
	        config:{ //三级联动的配置
	          value:'categoryId',
	          label: 'categoryName',
	          children: 'subCategoryList'
	        },
        	categoryList:[], //所有类目信息
          showAuditDetail:false,	// 审核详情弹层
          showNegativeProfit: false, // 负毛利二次确认弹层
          showBatchAudit: false, // 批量审核二次确认弹层
        	auditDetail:{},	// 审核详情信息
        	mapStatus:1,	// 审核状态，1查看，2审核
        	secondAuditStatus:3,	// 二审结果，3审核通过，4审核驳回
        	secondAuditStatusName:'',	// 二审驳回原因
        	checkedList:[], // 选中的信息集合
          // 批量审核
          batchAuditShow:false,
          auditParam:{
            auditStatus:1,
            rejectReason:"",
            applyNoList:[]
          },
          batchAuditFailList:[],
          // 商品形态映射
          productFormMap: {
            1: "普通商品",
            2: "梦工厂商品"
          }
        }
      },
      components:{Match},
      methods:{
          getList(val) {
            let self = this
            self.param.pageIndex = val || 1
           self.$service.activity.secondAudit.getSecondAuditFormByPage(self.param).then(res => {
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
	          self.param.activityType = ""
	          self.param.applyNo = ""
	          self.param.shortTitle = ""
	          self.param.productId = ""
	          self.param.platformDiscountStart = ""
	          self.param.platformDiscountEnd = ""
            self.param.auditStatus = 2
            self.param.productForm = ''
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
		      // 审核详情
		      getAuditInfo (type,applyNo){
		      	let self = this
		     		self.mapStatus = type
            self.secondAuditStatus = 3
            self.secondAuditStatusName = ""
		     		self.$service.activity.secondAudit.getApplicationFormDetailByApplyNo({applyNo:applyNo}).then(res => {
		      		self.auditDetail = res
			      	self.showAuditDetail = true
			      })
          },
          // 正常提交保存的api管理
          apiAuditApplicationFormsByApplyNo(){
              let self = this
              self.$service.activity.secondAudit.auditApplicationFormsByApplyNo({
                applyNo	: self.auditDetail.applyNo,
                auditStatus	: self.secondAuditStatus,
                auditReason	: self.secondAuditStatusName
              }).then(res => {
                this.$message.success("审核成功 ")
               self.showAuditDetail = false
               self.showNegativeProfit = false
               self.getList()
             })
          },
          // 活动二审-负毛利逻辑
		     	submitAudit (){
             let self = this
		     		if(self.secondAuditStatus === 4 && self.secondAuditStatusName === ''){
		     			this.$message.warning("请输入1-10字驳回原因 ")
		     			return false
             }
            if(self.secondAuditStatus === 3 && this.auditDetail.productForm === 2 && this.auditDetail.negativeProfit === 1){
              this.showNegativeProfit = true
            } else {
              this.apiAuditApplicationFormsByApplyNo()
            }
           },

	        //选择的商品信息
	        handleSelectionChange (arr) {
	          this.checkedList = arr.map(item => {
	            return item.applyNo
	          })
	        },
          // 批量审核
          batchAudit () {
            if(this.checkedList.length === 0){
              this.$message.warning("请至少选择一条二审中的申请单")
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
            this.$service.activity.secondAudit.batchAuditPassByApplyNo(this.auditParam).then(res => {
              if(res.length>0){
                this.batchAuditFailList = res
                this.showBatchAudit = true
              }else{
                this.$message.success("批量审核成功")
                this.batchAuditShow = false
                this.getList();
              }
            })
          },
          // 批量审核二次确认弹窗，手动驳回处理
          submitBatchAuditFail(){
            this.auditParam.auditStatus = 0
            this.auditParam.applyNoList = this.batchAuditFailList
            this.$service.activity.secondAudit.batchAuditPassByApplyNo(this.auditParam).then(res => {
              //  this.$message.success("批量审核成功")
               this.batchAuditShow = false
               this.showBatchAudit = false
               this.getList();
            })
          },
		      //导出
		      handleExport () {
		     		let self = this
		      	let _param = JSON.parse(JSON.stringify(self.param))
		        delete _param.pageIndex
		        delete _param.pageSize
		        this.$service.activity.secondAudit.exportActivitySkuByApplyNos(_param).then(res => {
		          window.open(res)
		        })
		      },
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
</style>
