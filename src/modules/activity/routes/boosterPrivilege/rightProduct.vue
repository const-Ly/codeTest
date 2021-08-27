<template>
	<div class="cms">
		<el-form inline size="small">
      <el-form-item label="">
        <el-select v-model="param.changeCategoryType">
          <el-option label="平台可选" :value="1"></el-option>
          <el-option label="商家选品" :value="2"></el-option>
        </el-select>
      </el-form-item>
			<el-form-item>
				<el-input  placeholder="请输入商品名称或suid" v-model.trim="param.searchContent">
				    <el-button slot="append" @click="searchProducts()">搜索</el-button>
				</el-input>
			</el-form-item>
	  </el-form>
	  <el-table ref="table" :data="productList"  border style="width: 100%" size="mini">
	    <el-table-column prop="skuId" label="SUID"></el-table-column>
	    <el-table-column prop="productName" label="商品名称"></el-table-column>
	    <el-table-column prop="skuSpecs" label="规格"></el-table-column>
	    <el-table-column prop="supplierName" label="商家名称"></el-table-column>
	    <el-table-column label="销售价">
	    	<template slot-scope="prop">
	    		<span>{{ prop.row.price |  currency}}</span>
	    	</template>
	    </el-table-column>
	    <el-table-column label="商家优惠">
        <template slot-scope="prop">
          <span>{{ prop.row.friendHelpSupplierRate | percentage }}</span>
        </template>
      </el-table-column>
	    <el-table-column label="平台优惠">
        <template slot-scope="prop">
          <span>{{ prop.row.friendHelpPlatformRate | percentage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="prop">
          <span class="font-blue" @click="handleRowClick(prop.row)">选择</span>
        </template>
      </el-table-column>
		</el-table>
		<div class="cms-pagination" v-if="productList.length>0">
			<el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="searchProducts"></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
  name: 'privilegeList',
  data () {
  	return {
	  	productList:[],
	  	pages:0,
      param:{
        changeCategoryType:2,
        searchContent:"",
        pageIndex:1,
        pageSize:20
      }
  	}
  },
  mounted () {
  	this.searchProducts()
  },
  methods:{
  	searchProducts (pageNow) {
  		let self = this
  		self.param.pageIndex = pageNow || 1
    	this.$service.activity.boosterRight.getRightsProductList(self.param).then( res => {
    		self.pages = res.pages
    		this.productList = res.list
    	})
  	},
  	handleRowClick (row) {
  		this.$emit('checked',row)
  	}
  }
}
</script>
