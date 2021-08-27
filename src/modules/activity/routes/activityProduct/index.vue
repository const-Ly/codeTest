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
        <el-form-item label="商家优惠范围：">
          <div class="w200">
            <el-input class="w80" v-only-num="param.supplierDiscountStart" v-model="param.supplierDiscountStart"></el-input>
            <span class="range-input-split">至</span>
            <el-input class="w80" v-only-num="param.supplierDiscountEnd" v-model="param.supplierDiscountEnd"></el-input>
          </div>
        </el-form-item><br />
        <el-form-item label="类目选择：">
          <el-cascader class="w300" :options="categoryList" ref="category" change-on-select :props="config" @change="handleChange" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model.trim="param.shortTitle" style="width:200px;"></el-input>
        </el-form-item><br />
        <el-form-item label="商家名称：">
          <match @change="param.supplierId = ''" ref="supplierId" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input v-model.trim="param.productId" v-only-num.string="param.productId"></el-input>
        </el-form-item><br />
        <el-form-item label="参加一起拼：">
          <el-select v-model="param.joinTogGroup" class="w300">
            <el-option v-for="item in joinTogGroups" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参加特权金：">
          <el-select v-model="param.joinNovicePrivilegedGold" class="w200">
            <el-option v-for="item in joinNovicePrivilegedGolds" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item><br />
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearSearch()">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">活动商品</span>
        <el-button class="ma-l-20" type="info" size="small" @click="handleExport">导出</el-button>
      </div>
      <el-table :data="list" style="width:100%" :default-expand-all="false">
        <el-table-column type="expand" width="40">
          <template slot-scope="props">
            <el-table :data="props.row.skuDtoList" :show-header="false" style="width: 100%">
              <el-table-column width="40">
              </el-table-column>
              <el-table-column prop="skuId"></el-table-column>
              <el-table-column width="150">
                <template slot-scope="smscope">
                  {{smscope.row.skuSpecs | placeholder}}
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="smscope">
                  {{smscope.row.suPrice | currency}}
                </template>
              </el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="商品编号/SUID">
          <template slot-scope="scope">
            <a class="font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{scope.row.productId}}</a>
          </template>
        </el-table-column>
        <el-table-column label="商品名称/规格" width="150">
          <template slot-scope="scope">
            <a class="font-blue" :href="'http://m.biyao.com/products/'+scope.row.skuId+'.html'" target="_blank">{{scope.row.shortTitle}}</a>
          </template>
        </el-table-column>
        <el-table-column label="销售价">
          <template slot-scope="scope">
            {{scope.row.minSuPrice | currency}}-{{scope.row.maxSuPrice}}
          </template>
        </el-table-column>
        <el-table-column label="商品扣点">
          <template slot-scope="scope">
            {{ scope.row.productCost | percentage }}
          </template>
        </el-table-column>
        <el-table-column label="商家优惠">
          <template slot-scope="scope">
            {{ scope.row.supplierDiscount | percentage }}
          </template>
        </el-table-column>
        <el-table-column label="一起拼平台优惠">
          <template slot-scope="scope">
            {{ scope.row.togGroupPlatformDiscount | percentage }}
          </template>
        </el-table-column>
        <el-table-column label="特权金平台优惠">
          <template slot-scope="scope">
            {{ scope.row.novicePrivilegedGoldPlatformDiscount | percentage }}
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script type="text/javascript">
import Match from '@/components/associativeMatch'
export default {
  name: "blackList",
  data() {
    let self = this
    return {
      supplierList: [], //商家列表
      supplierName: '', //商家名称
      pages: 0,
      list: [],
      param: { //请求参数
        firstLevelBackendCategoryId: "",
        secondLevelBackendCategoryId: "",
        thirdLevelBackendCategoryId: "",
        supplierDiscountStart: "", // 商家优惠范围
        supplierDiscountEnd: "",
        shortTitle: "", // 商品名称
        supplierId: "", // 商家id
        productId: "", // 商品编码
        joinTogGroup: '', // ''全部、1是、0否
        joinNovicePrivilegedGold: '', // ''全部、1是、0否
        orderByClause: "",
        productForm: 1, // 商品形态 1普通商品（默认） 2梦工厂商品
        pageIndex: 1,
        pageSize: 20,
      },
      joinTogGroups: [{
        value: '',
        label: '全部'
      }, {
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      joinNovicePrivilegedGolds: [{
        value: '',
        label: '全部'
      }, {
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      config: { //三级联动的配置
        value: 'categoryId',
        label: 'categoryName',
        children: 'subCategoryList'
      },
      categoryList: [], //所有类目信息
    }
  },
  components: { Match },
  methods: {
    getList(val) {
      let self = this
      self.param.pageIndex = val || 1
      self.$service.activity.activityProduct.getActivityProductByPage(self.param).then(res => {
        self.param.pageIndex = res.pageNum
        self.pages = res.pages
        self.list = res.list
      })
    },
    clearSearch() {
      let self = this
      // 重置分类
      let obj = {}
      obj.stopPropagation = () => {}
      self.$refs.category.clearValue(obj)
      // 重置商家
      self.$refs.supplierId.clear()
      // 重置其他参数
      self.param.supplierDiscountStart = ""
      self.param.supplierDiscountEnd = ""
      self.param.shortTitle = ""
      self.param.productId = ""
      self.param.joinTogGroup = ''
      self.param.joinNovicePrivilegedGold = ''
      self.param.orderByClause = ""
      self.param.productForm = 1
    },
    // 获取所有类目信息
    getBackendCategoryTree() {
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
    handleChange(val) {
      let arr = val.concat(["", "", ""])
      this.param.firstLevelBackendCategoryId = arr[0]
      this.param.secondLevelBackendCategoryId = arr[1]
      this.param.thirdLevelBackendCategoryId = arr[2]
    },
    //获取所有商家信息
    getAllSupplier() {
      let self = this
      self.$service.common.getAllSuppliers().then(res => {
        self.supplierList = res
      })
    },
    //导出商品
    handleExport() {
      let _param = JSON.parse(JSON.stringify(this.param))
      delete _param.pageIndex
      delete _param.pageSize
      this.$service.activity.activityProduct.activityProductexport(_param).then(res => {
        window.open(res)
      })
    },
  },
  mounted() {
    let self = this
    self.getList()
    self.getBackendCategoryTree()
    self.getAllSupplier()
  }
}
</script>
<style type="text/css" scoped>
</style>