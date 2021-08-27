<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="商品形态：">
          <el-select placeholder="请选择" v-model="param.productForm" class="w300">
            <el-option label="普通商品" :value="1"></el-option>
            <el-option label="梦工厂商品" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input class="w200" v-model.trim="param.shortTitle"></el-input>
        </el-form-item><br>
        <el-form-item label="类目选择：">
          <el-cascader class="w300" :options="categoryList"  ref="category" change-on-select :props="config" @change="handleChange" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input class="w200" v-model="param.productId" v-only-num.string="param.productId"></el-input>
        </el-form-item><br>
        <el-form-item label="商家名称：">
          <match @change="param.supplierId = ''" ref="supplierId" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item>
        <el-form-item label="商家优惠：">
          <el-select v-model="param.supplierDiscountStatus" class="w200">
            <el-option label="全部" value=""></el-option>
            <el-option label="已变更" :value="1"></el-option>
            <el-option label="未变更" :value="0"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="审核状态：">
          <el-select v-model="param.auditStatus" class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="初审中" :value="1"></el-option>
            <el-option label="二审中" :value="2"></el-option>
            <el-option label="审核通过" :value="3"></el-option>
            <el-option label="审核驳回" :value="4"></el-option>
            <el-option label="已作废" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家优惠范围：">
          <div class="w200">
            <el-input class="w80" v-only-num="param.supplierDiscountStart" v-model="param.supplierDiscountStart"></el-input>
            <span class="range-input-split">至</span>
            <el-input class="w80" v-only-num="param.supplierDiscountEnd" v-model="param.supplierDiscountEnd"></el-input>
          </div>
        </el-form-item><br>
        <el-form-item label="可售状态：">
          <el-select v-model="param.sellStatus" class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="可售" :value="1"></el-option>
            <el-option label="不可售" :value="2"></el-option>
            <el-option label="--" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品：">
          <el-select v-model="param.isNew" class="w200">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="代理商：">
          <factorLenovoSearch v-model="param.channelCode" class="w300"></factorLenovoSearch>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getToggroupProductList(1)">查询</el-button>
          <el-button @click="clearParam">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">新手特权金商品</span>
        <el-button class="ma-l-20" type="primary" size="small" @click="batchAudit">批量审核</el-button>
        <el-button class="ma-l-20" type="success" size="small" @click="handleExport">导出</el-button>
        <file-upload @success="getToggroupProductList()" action="/activity/userShopRedBagProduct/batchImport">
          <el-button type="danger" size="small" slot="handle"  title="仅针对新添加活动商品">导入</el-button>
        </file-upload>
        <router-link :to="{ path: 'add',append:true }">
          <el-button class="fr" type="primary" size="small">添加</el-button>
        </router-link>
      </div>
      <!-- 表格数据 -->
      <el-table :data="proList" style="width: 100%" @selection-change="handleSelectionChange" size="small">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="商品编号">
          <template slot-scope="scope">
            <a class="font font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{ scope.row.productId }}</a>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="150">
          <template slot-scope="scope">
             <a class="font font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{ scope.row.shortTitle }}</a>
          </template>
        </el-table-column>
        <el-table-column label="商品形态" prop="productForm">
          <template slot-scope="scope">
            {{ productFormMap[scope.row.productForm] }}
          </template>
        </el-table-column>
        <el-table-column label="代理商" prop="channelName">
          <template slot-scope="scope">{{ scope.row.channelName? scope.row.channelName : '-' }}</template>
        </el-table-column>
        <el-table-column label="新品" prop="isNewName"></el-table-column>
        <el-table-column label="销售价" width="150">
          <template slot-scope="scope">{{ scope.row.minSuPrice | currency }} - {{scope.row.maxSuPrice | currency(" ")}}</template>
        </el-table-column>
        <el-table-column label="商品扣点">
          <template slot-scope="scope">{{ scope.row.productCost | percentage }}</template>
        </el-table-column>
        <el-table-column :render-header="renderHeader">
          <template slot-scope="scope">
            <div :title="scope.row.auditTime" class="cursor-default">
              <span v-if="scope.row.changeCategoryType == 1">--</span>
              <template v-else>
                <span v-if="scope.row.supplierDiscountStatus == 1 ">
                  {{ scope.row.oriSupplierDiscount | percentage }} -> {{ scope.row.supplierDiscount | percentage }}
                </span>
                <span v-else>{{ scope.row.supplierDiscount | percentage }}</span>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="平台优惠" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.platformDiscount | percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="auditStatusName" label="审核状态"></el-table-column>
        <el-table-column prop="auditStatusName" label="可售状态">
          <template slot-scope="scope">
            <span :title="scope.row.sellStatus == 2?scope.row.unsellReason:''">{{ scope.row.sellStatusName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="handleMap(scope.row,3)" v-if="scope.row.auditStatus===1">审核</el-button>
            <el-button type="text" @click="handleMap(scope.row,1)" v-else-if="scope.row.auditStatus===2">查看</el-button>
            <el-button type="text" @click="handleMap(scope.row,2)" v-else>编辑</el-button>
            <el-button type="text" class="font-danger" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="pageChange"></el-pagination>
      </div>
    </el-card>

    <!-- 审核详情 -->
    <el-dialog :visible.sync="showAuditDetail" width="60%" :title="title" class="mapBox">
      <el-form :inline="true" label-width="100px" size="small">
        <el-form-item label="提交人：">{{ auditDetail.createBy | placeholder}}</el-form-item>
        <el-form-item label="提交时间：">{{ auditDetail.createTime | placeholder}}</el-form-item>
        <template v-if="mapStatus !== 3">
          <el-form-item label="初审：">{{ auditDetail.firstAuditBy | placeholder }} <span v-if="auditDetail.firstAuditBy">,</span>{{ auditDetail.firstAuditTime | placeholder(" ")}}</el-form-item>
          <el-form-item label="初审结果：">{{ auditDetail.firstAuditStatusName | placeholder }}</el-form-item>
          <el-form-item label="二审：">{{ auditDetail.secondAuditBy | placeholder }} <span v-if="auditDetail.secondAuditBy">,</span>{{ auditDetail.secondAuditTime | placeholder(" ")}}</el-form-item>
          <el-form-item label="二审结果：">{{ auditDetail.secondAuditStatusName | placeholder }}<span v-if="auditDetail.secondAuditReason">,{{ auditDetail.secondAuditReason }}</span></el-form-item>
        </template>
        <el-form-item label="商品编号：">{{ auditDetail.productId }}</el-form-item>
        <template v-if ="auditDetail.productForm === 2">
          <el-form-item label="商品形态：">{{ productFormMap[auditDetail.productForm] }}</el-form-item>
          <el-form-item label="代理商：">{{ auditDetail.channelName?auditDetail.channelName : '--' }}</el-form-item>
          <el-form-item label="大V名称：">{{ auditDetail.dvName?auditDetail.dvName : '--' }}</el-form-item>
        </template>
        <el-form-item label="商品扣点：">{{ auditDetail.productCost | percentage}}</el-form-item>
        <el-form-item label="销售价：">{{ auditDetail.minSuPrice | currency }}-{{ auditDetail.maxSuPrice | currency(" ") }}</el-form-item>
        <el-form-item label="商家优惠：">{{ auditDetail.supplierDiscount | percentage }}</el-form-item>
        <el-form-item label="原平台优惠：">{{ auditDetail.oriPlatformDiscount | percentage}}</el-form-item>
        <el-form-item label="新平台优惠：">
          <span v-if="mapStatus === 2">
            <el-input v-model="newPlatformDiscount" v-only-num="newPlatformDiscount" :max-len="2" class="input-mini"></el-input> &nbsp;%
          </span>
          <span v-else class="font font-danger">{{ auditDetail.platformDiscount | percentage }}</span>
        </el-form-item>
        <el-form-item label="初审：" v-if="mapStatus === 3">
          <el-radio-group v-model="audisResult">
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核驳回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="mapStatus !== 1">
        <el-button v-if="mapStatus === 2" size="small" type="primary" @click="handleNewPlatformDiscount">提交保存</el-button>
        <el-button v-if="mapStatus === 3" size="small" type="primary" @click="handleAudit">确认审核</el-button>
        <el-button size="small" @click="showAuditDetail = false">取 消</el-button>
      </span>
      <el-dialog
      width="30%"
      title="审核确认"
      :visible.sync="showNegativeProfit"
      center
      append-to-body>
      <p>预估利润计算后，该商品可能为负毛利商品，是否确认审核通过？</p>
      <span slot="footer" class="dialog-footer" v-if="mapStatus === 2">
        <el-button size="small" type="primary" @click="apiUpdatePlatformDiscountByApplyNo">继续提交</el-button>
        <el-button size="small" @click="showNegativeProfit = false">重新设置</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="mapStatus === 3">
        <el-button size="small" type="primary" @click="apiFirstAuditByApplyNo">确认</el-button>
        <el-button size="small" @click="showNegativeProfit = false">取消</el-button>
      </span>
    </el-dialog>
    </el-dialog>

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
  </div>
</template>

<script type="text/javascript">
  import Match from '@/components/associativeMatch'
  import FileUpload from "@/components/fileUpload"
  import factorLenovoSearch from '@/components/factorLenovoSearch'
  export default {
    name: 'together',
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
          supplierDiscountStart:"",
          supplierDiscountEnd:"",
          shortTitle:"",
          productId:"",
          supplierId:"",
          sellStatus:"",
          orderByClause:0,
          supplierDiscountStatus:"",
          auditStatus:"",
          pageSize:20,
          pageIndex:1,
          isNew: '',
          productForm: 1,
          channelCode: ''
        },
        pages:0,

        // 表格区域
        proList:[],// 商品信息
        checkedList:[], // 选中的信息集合

        // 审核详情
        showAuditDetail:false, //是否显示审核详情弹框
        audisResult:3,
        mapStatus:1,//操作状态 1查看 2编辑 3 初审
        newPlatformDiscount:"",//新平台优惠
        auditDetail:{
          applyNo:"",// 申请单id
          createBy:"", //提交人
          createTime:"",//提交时间
          firstAuditBy:"",// 初审人
          firstAuditTime:"",//初审时间
          firstAuditStatuName:"",// 初审结果
          secondAuditBy:"",// 二审人
          secondAuditTime:"",//二审时间
          secondAuditStatuName:"",//二审结果
          secondAuditReason:"",//二审原因
          productId:"",// 商品编码
          productCost:"",// 商品扣点
          minPrice:"",// 商品最低销售价
          maxPrice:"",// 商品最高销售价
          oriPlatformDiscount:"",// 原平台优惠
          platformDiscount:"",//平台优惠
          supplierDiscount:"",//商家优惠
          productForm: "", // 商品形态 1普通商品 2梦工厂商品
          negativeProfit: "", // 是否是负毛利 1-是 0-否
          channelCode: "", // 代理商ID
          channelName: "", // 代理商名称
          dvId: "", // 大V的ID
          dvName: "", // 大V的名称
        },
        productFormMap: { // 商品形态映射
          1: "普通商品",
          2: "梦工厂商品"
        },
        showNegativeProfit: false,
        showBatchAudit: false,
        batchAuditFailList: []
      }
    },
    computed:{
      title () {
        return this.mapStatus === 1?"查看":this.mapStatus === 2?"编辑":"初审"
      }
    },
    mounted () {
      this.getSupplierList()
      this.getBackendCategoryTree()
      this.getToggroupProductList()
    },
    components:{ Match ,FileUpload, factorLenovoSearch},
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
      // 获取一起拼商品
        getToggroupProductList (pageNow) {
          let self = this
          self.param.pageIndex = pageNow || 1
          this.$service.privilege.novice.getActivityProductByPage(self.param).then(res => {
            self.pages = res.pages
            self.param.pageIndex = res.pageNum
            self.proList = res.list
          })
        },
        pageChange (val) {
          this.getToggroupProductList(val)
        },
        //选择的商品信息
        handleSelectionChange (arr) {
          this.checkedList = arr.map(item => {
            let obj = {
              applyNo: item.applyNo,
              productForm: item.productForm
            }
            return obj
          })
        },
        // 清空查询条件
        clearParam () {
          // 重置分类
          let obj = {}
          obj.stopPropagation = () =>{}
          this.$refs.category.clearValue(obj)
          // 重置商家
          this.$refs.supplierId.clear()

          this.param.supplierDiscountStart = ""
          this.param.supplierDiscountEnd = ""
          this.param.shortTitle = ""
          this.param.productId = ""
          this.param.supplierDiscountStatus = ""
          this.param.auditStatus = ""
          this.param.sellStatus = ""
          this.param.isNew = ""
          this.param.productForm = 1
          this.param.channelCode = ""
        },
      // 渲染指定表头
      renderHeader (h, { column, $index }) {
        let self = this
        return h('span', [
          "商家优惠",
          h('b', {
            class: 'el-icon-caret-bottom font-18',
            on: {
              click: () => {
                self.param.orderByClause = this.param.orderByClause === 0?1:0;
                self.getToggroupProductList()
              }
            }
          })
        ])
      },

      // 批量审核
      batchAudit () {
        if(this.checkedList.length === 0){
          this.$message.warning("请至少选择一条初审中的商品")
        }else {
          this.$confirm('你确定审核通过所选商品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$service.privilege.novice.batchFirstAuditPassByApplyNo(this.checkedList).then(res => {
              if(res.length>0){
                this.batchAuditFailList = res
                this.showBatchAudit = true
              }else{
                this.$message.success("批量审核成功")
                this.getToggroupProductList();
              }
            })
          })
        }
      },
      // 删除
      handleRemove (row) {
        this.$confirm('你确认删除该优惠吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$service.privilege.novice.deleteByApplyNo({productId:row.productId, applyNo:row.applyNo,productForm:row.productForm}).then(res => {
            this.getToggroupProductList()
          })
        })
      },
      // 查看详情
      handleMap (row,type) {
        this.mapStatus = type
        this.newPlatformDiscount = ""// 重置新平台优惠值
        this.audisResult = 3 // 重置审核状态
        this.$service.privilege.novice.getApplicationFormsByApplyNo({applyNo:row.applyNo,productId:row.productId}).then(res => {
          this.auditDetail = res
          this.showAuditDetail = true
        })
      },
      // 提交保存
      handleNewPlatformDiscount () {
        if(this.newPlatformDiscount>99 || this.newPlatformDiscount === ""){
          this.$message.warning("请输入0-99间整数");
          return false
        }
        // 负毛利判断接口及业务逻辑
        let _param = {
          productId: this.auditDetail.productId,
          platformDiscount: this.newPlatformDiscount,
          promotionType: 2
        }
        if(this.auditDetail.productForm === 1) {
          this.apiUpdatePlatformDiscountByApplyNo()
        } else {
          this.$service.privilege.novice.judgeNegativeProfit(_param).then(res => {
              if(res.negativeProfit === 1){ // 是负毛利商品，弹出二次确认窗即可
                this.showNegativeProfit = true
              }else { // 不是负毛利商品，正常提交
                this.apiUpdatePlatformDiscountByApplyNo()
              }
          })
        }
      },
      // 确认审核
      handleAudit () {
        if(this.audisResult === 3 && this.auditDetail.productForm === 2 && this.auditDetail.negativeProfit === 1){
          this.showNegativeProfit = true
        } else {
          this.apiFirstAuditByApplyNo()
        }
      },
      // 导出
      handleExport () {
        let _param = JSON.parse(JSON.stringify(this.param))
        delete _param.pageSize
        delete _param.pageIndex
        this.$service.privilege.novice._export(_param).then(res => {
          window.open(res)
        })
      },
      // 编辑确认保存接口的api管理
      apiUpdatePlatformDiscountByApplyNo(){
          this.$service.privilege.novice.updatePlatformDiscountByApplyNo({productId:this.auditDetail.productId, applyNo:this.auditDetail.applyNo, oriPlatformDiscount:this.auditDetail.oriPlatformDiscount, supplierDiscount:this.auditDetail.supplierDiscount, platformDiscount:this.newPlatformDiscount, productForm: this.auditDetail.productForm}).then(res => {
            this.showAuditDetail = false
            this.showNegativeProfit = false
            this.getToggroupProductList()
          })
      },
      // 初审接口的api管理
      apiFirstAuditByApplyNo () {
        this.$service.privilege.novice.firstAuditByApplyNo({productId:this.auditDetail.productId, applyNo:this.auditDetail.applyNo, firstAuditStatus:this.audisResult, productForm: this.auditDetail.productForm}).then(res => {
          this.showAuditDetail = false
          this.showNegativeProfit = false
          this.getToggroupProductList()
        })
      },
      // 批量拒绝
      submitBatchAuditFail(){
        this.$service.privilege.novice.batchFirstAuditRejectByApplyNo(this.batchAuditFailList).then(res => {
          this.showBatchAudit = false
          this.getToggroupProductList();
        })
      }

    }
  }
</script>

<style type="text/css" scoped>
  .range-input-split {
    margin:0 7px;
  }
  .w80{width:80px !important;}
  .mapBox .el-form-item { width:45%;margin-bottom: 0 }
</style>
