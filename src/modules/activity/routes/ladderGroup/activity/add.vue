<template>
  <div class="cms">
    <el-card class="box-card">
      <span slot="header">阶梯团信息</span>
      <el-form label-width="150px" size="small">
        <el-form-item label="新客补贴：">
           <el-input class="w200" v-model="param.newerSubsidy" v-only-num="param.newerSubsidy" :max-len="2"></el-input> 元/人
        </el-form-item>
        <el-form-item label="拼团人数：">
           <el-input class="w200" v-model="param.groupSize" v-only-num="param.groupSize" :max-len="2"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <span slot="header">基础信息</span>
      <el-form label-width="150px" size="small">
        <el-form-item label="活动名称：">
           <el-input class="w200" v-model.trim="param.activityName" :maxLength="20"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：">
            <el-date-picker v-model="dateObj" type="datetimerange" range-separator="至" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
              start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChange">
            </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="选品类型：">
          <el-select v-model="searchParam.selectType" class="w150">
            <el-option label="商家选品" :value="2"></el-option>
            <el-option label="平台可选" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类目选择：">
          <el-cascader class="w300" :options="categoryList"  ref="category" change-on-select :props="config" @change="handleCategoryChange" clearable></el-cascader>
        </el-form-item><br>
        <el-form-item label="商品名称：">
          <el-input v-model.trim="searchParam.shortTitle" class="w150"></el-input>
        </el-form-item>
        <el-form-item label="商家名称：">
          <match @change="searchParam.supplierId = ''" ref="supplierId" value-key="supplierName" @select="searchParam.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item><br>
        <el-form-item label="商品编号：">
          <el-input class="w150" v-only-num.string="searchParam.spuId" v-model="searchParam.spuId"></el-input>
        </el-form-item>
        <el-form-item label="商家优惠：">
          <div class="w200">
            <el-input class="w80" v-only-num="searchParam.supplierDiscountStart" v-model="searchParam.supplierDiscountStart" :max-len="3"></el-input>
            <span class="range-input-split">至</span>
            <el-input class="w80" v-only-num="searchParam.supplierDiscountEnd" v-model="searchParam.supplierDiscountEnd" :max-len="3"></el-input>
          </div>
        </el-form-item><br>
        <el-form-item label=" ">
          <el-button type="primary" @click="getSelectableProductList(1)">查询</el-button>
          <el-button @click="clearParam">清空</el-button>
        </el-form-item>
       </el-form>
    </el-card>

    <select-product class="ma-b-40" :selectable-list="selectablelist" :selected-list="selectedlist" :selected-cols="[{label:'排序权重',prop:'weight'}]" @change="selectedlist=$event" ref="selectPro" :total="1000">
      <!-- 分页信息 -->
      <div class="cms-pagination" v-if="pages>0" slot="pagenation">
        <el-pagination background layout="prev, pager, next" :current-page="searchParam.pageIndex" :page-count="pages" @current-change="getSelectableProductList"></el-pagination>
      </div>
      <!-- 填充到已选择列表中去 -->
      <div slot="selected-weight" slot-scope="scope">
        <el-input size="small" v-model="scope.col.weight" v-only-num:weight="selectedlist" :key="scope.idx" :max-len="4" class="w80"></el-input>
      </div>
    </select-product>
    <!-- 吸底区域 Begin -->
    <suction-bottom @okFn="saveTask" :pure-back="true"></suction-bottom>

  </div>
</template>

<script>
  const SuctionBottom = () => import('@/components/panel/suctionBottom')
  const Match = () => import('@/components/associativeMatch')
  const SelectProduct = () => import('@/components/selectProduct')
  export default {
    name: 'add',
    data () {
      return {
        param:{ // 创建活动的参数
          newerSubsidy:"",
          groupSize:"",
          activityName:"",
          beginTime:"",
          endTime:"",
          productList:[]
        },
        searchParam: {// 查询参数
          selectType:2,
          firstLevelBackendCategoryId:"",
          secondLevelBackendCategoryId:"",
          thirdLevelBackendCategoryId:"",
          shortTitle:"",
          spuId:"",
          supplierId:"",
          supplierDiscountStart:"",
          supplierDiscountEnd:"",
          pageIndex:1,
          pageSize:20
        },
        dateObj:[],
        supplierList:[], //商家列表
        categoryList:[], // 类目列表
        config:{ //三级联动的配置
          value:'categoryId',
          label: 'categoryName',
          children: 'subCategoryList'
        },
        pages:0,
        selectablelist:[], //可选择的商品列表
        selectedlist:[] //已选择的商品列表
      }
    },
    components:{
      SuctionBottom,
      Match,
      SelectProduct
    },
    created () {
      this.getSupplierList()
      this.getBackendCategoryTree()
      this.getSelectableProductList()
    },
    methods: {
      // 获取商家列表
      getSupplierList () {
        this.$service.common.getAllSuppliers().then(res => {
          this.supplierList = res
        })
      },
      // 获取所有类目信息
      getBackendCategoryTree () {
        this.$service.common.getBackendCategoryTree().then(res => {
          this.categoryList = res || []
        })
      },
      //选择的三级联动信息
      handleCategoryChange (val) {
        let arr = val.concat(["","",""])
        this.searchParam.firstLevelBackendCategoryId = arr[0]
        this.searchParam.secondLevelBackendCategoryId = arr[1]
        this.searchParam.thirdLevelBackendCategoryId = arr[2]
      },

      handleChange (rel) {// 处理时间范围变化
        this.param.beginTime = rel ? rel[0] : ""
        this.param.endTime = rel ? rel[1] : ""
      },
      clearParam () {// 初始化查询信息
        this.searchParam.selectType = 2
        this.searchParam.shortTitle = ''
        this.searchParam.spuId = ''
        this.searchParam.supplierDiscountStart = ''
        this.searchParam.supplierDiscountEnd = ''
        // 重置类目
        let obj = {}
        obj.stopPropagation = () =>{}
        this.$refs.category.clearValue(obj)
        // 重置商家
        this.$refs.supplierId.clear()
      },
      getSelectableProductList (pageNow) {// 查询可选择商品列表
        this.searchParam.pageIndex = pageNow || 1
        this.$service.activity.ladderGroup.productList(this.searchParam).then(res => {
          this.selectablelist = res.list.map(item => {
            item.weight = 0
            return item
          })
          this.pages = res.pages
          this.searchParam.pageIndex = res.pageNum
        })
      },
      checkParam () {// 校验参数有效性
        if(this.param.newerSubsidy < 2){
          this.$message.warning('请输入2-99新客补贴');return false
        }
        if(this.param.groupSize < 2 || this.param.groupSize > 20){
          this.$message.warning('请输入2-20拼团人数');return false
        }
        if(this.param.activityName === ''){
          this.$message.warning('请输入1-20字活动名称');return false
        }
        if(this.param.beginTime === '' && this.param.endTime === ''){
          this.$message.warning('请输入活动时间');return false
        }
        if(this.param.beginTime === this.param.endTime){
          this.$message.warning('结束时间必须大于开始时间');return false
        }
        if(new Date(this.param.endTime+":59").getTime() <= Date.now()){
          this.$message.warning('结束时间必须大于当前时间');return false
        }
        if(this.selectedlist.length === 0){
          this.$message.warning('请至少选择一个商品');return false
        }
        let filterRel = this.selectedlist.filter(item => {
          return item.weight === ''
        })
        if(filterRel.length > 0){
          this.$message.warning('请输入 0-9999间排序权重');return
        }
        this.param.productList = this.selectedlist.map(item => {
          return {
            productId:item.productId,
            weight: item.weight,
            selectType:item.selectType
          }
        })
        return true
      },
      saveTask () { // 保存信息
        if(this.checkParam()){
          this.$service.activity.ladderGroup.addActivity(this.param).then(res => {
            // 处理批量的错误提示信息
            if(res.length === 0){
              this.$router.back()
            }else{
              this.$refs["selectPro"].errorTip("商品编号"+res.join('、')+"数据异常，请重试")
            }
          })
        }
      }
    }
  }
</script>
