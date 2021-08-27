<template>
  <div class="cms">
  	<el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" :model="param" label-width="180px" size="small">
        <el-form-item label="权益名称：">
					<el-col :span="12"><el-input v-model.trim="param.rightsName" @blur="testRightsName" :maxLength="40" placeholder="请输入1-40字符权益名称" clearable></el-input></el-col>
				</el-form-item>
				<el-form-item label="权益描述：">
					<el-col :span="12"><el-input v-model.trim="param.rightsDesc" :maxLength="80" placeholder="请输入1-80字符权益描述" clearable></el-input></el-col>
				</el-form-item>
				<el-form-item label="货品SUID：">
					<el-col :span="5">
						<span v-text="param.productDto.skuId"></span>
				</el-col>
				<el-col :span="8">
					<span>商品编号：{{param.productDto.productId}}</span>
				</el-col>
				</el-form-item>
				<el-form-item label="商品名称：">
					<a target="_blank" :href="'http://www.biyao.com/products/'+param.productDto.skuId+'-0.html'" class="font-blue">{{ param.productDto.productName +"【"+param.productDto.skuSpecs +"】" }}</a>
				</el-form-item>
				<el-form-item label="货品价格：">
					<el-col :span="3">
						<span>{{param.productDto.price | currency}}</span>
				</el-col>
				<el-col :span="6">
					商家优惠：<span>{{param.productDto.friendHelpSupplierRate | percentage}}</span>
				</el-col>
				<el-col :span="6">
					平台优惠：<span>{{param.productDto.friendHelpPlatformRate | percentage}}</span>
				</el-col>
				</el-form-item>
				<el-form-item label="所属商家：">
					<span v-text="param.productDto.supplierName"></span>
				</el-form-item>
  	  	<el-form-item label="备选权益商品：">
					<el-button  type="primary" plain @click="dialogVisible = true" :disabled="param.alternativeProductDtoList.length>19">添加商品</el-button>
					<div class="alternativeProduct" v-if="param.alternativeProductDtoList.length>0">
						<ul>
							<li class="" v-for="(item,key) in param.alternativeProductDtoList" :key="key">
								<el-button  type="text" @click="deleteProduct(key)" class="font-danger">删除</el-button>
								<a target="_blank" :href="'http://www.biyao.com/products/'+item.skuId+'-0.html'" class="font-blue">{{ item.productName +"【"+item.skuSpecs +"】" }}</a>
								<div class="detail">
									<span class="font-info">【价格:{{item.price | currency }};suid:{{item.skuId}};商品编号:{{item.productId}}】</span>
									【商家优惠:{{item.friendHelpSupplierRate | percentage}}；&nbsp;平台优惠:{{item.friendHelpPlatformRate|percentage}}】
								</div>
							</li>
						</ul>
					</div>
				</el-form-item>
				<el-form-item label="权益发放总数：">
					<el-col :span="10">
						<el-input v-model="param.rightsIssueTotal" v-only-num="param.rightsIssueTotal" :max-len="8" @blur="testRightsIssueTotal"></el-input>
				</el-col>
					<el-col :span="1">&nbsp;&nbsp;份</el-col>
				</el-form-item>
				<el-form-item label="使用有效期：">
					<el-col :span="10">
						<el-input v-model="param.usePeriod" v-only-num="param.usePeriod" :max-len="3" @blur="testUsePeriod"></el-input>
				</el-col>
					<el-col :span="1">&nbsp;&nbsp;天</el-col>
					<el-col :span="6" class="font-info">&nbsp;最长30天</el-col>
				</el-form-item>
				<el-form-item label="权益类型：">
					<el-radio-group v-model="param.rightsType" @change="changeRightType">
						<el-radio :label="1">X元购</el-radio>
						<el-radio :label="2">0.a碎片</el-radio>
						<el-radio :label="3">b份分割</el-radio>
					</el-radio-group>
				</el-form-item>

				<!-- 选择权益类型 -->
				<template v-if="param.rightsType === 1">
					<el-form-item label="X元价格：">
						<el-col :span="10"><el-input v-model="param.rightsInfoDto.promotionPrice" v-only-num="param.rightsInfoDto.promotionPrice" @blur="testXPrice"></el-input></el-col>
						<el-col :span="1">&nbsp;&nbsp;元</el-col>
						<el-col :span="8" class="font-info">&nbsp;x元价格不能高于商品原价</el-col>
					</el-form-item>
				</template>
				<template v-else-if="param.rightsType === 2">
						<el-form-item label="获得份数：">
							<el-col :span="4"><el-input v-model="param.rightsInfoDto.getCount" @blur="testCount" v-only-num.float="param.rightsInfoDto.getCount" :max-len="3" placeholder="0.1至1.0"></el-input></el-col>
							<el-col :span="2" class="align-right">单位：</el-col>
							<el-col :span="4"><el-input v-model.trim="param.rightsInfoDto.spec" maxLength="8" @blur="testSpec" clearable></el-input></el-col>
					</el-form-item>
				</template>
				<template v-else>
						<el-form-item label="获得份数：">
							<el-col :span="4"><el-input v-model="param.rightsInfoDto.getCount" v-only-num="param.rightsInfoDto.getCount" @blur="testCount"></el-input></el-col>
							<el-col :span="2" class="align-right">单位：</el-col>
							<el-col :span="4"><el-input v-model.trim="param.rightsInfoDto.unit" maxLength="8" @blur="testUnit" clearable></el-input></el-col>
					</el-form-item>
					<el-form-item label="">
							<el-col :span="4"><el-input v-model="param.rightsInfoDto.total" @blur="testCount" v-only-num="param.rightsInfoDto.total"></el-input></el-col>
							<el-col :span="2" class="align-center">{{param.rightsInfoDto.unit}}/</el-col>
							<el-col :span="4"><el-input v-model.trim="param.rightsInfoDto.spec" maxLength="8" @blur="testSpec" clearable></el-input></el-col>
					</el-form-item>
				</template>
				<el-form-item label="需助力人数：">
						<el-col :span="10"><el-input v-model="param.helpNumber" :max-len="2" @blur="testHelpNumber" v-only-num="param.helpNumber"></el-input></el-col>
						<el-col :span="1">&nbsp;&nbsp;人</el-col>
						<el-col :span="3" class="font-info">&nbsp;0-19人</el-col>
				</el-form-item>
			</el-form>
      <!-- 表单 End -->
		</el-card>
		<!-- 吸底 Begin -->
		<suction-bottom @okFn="saveTask" @okFnByDialog="cancelTask" :okBtn="'保存'">
			<template>
				<span slot="warning">你确定要离开此页面吗？离开后已编辑得而数据可能面临丢失。</span>
			</template>
		</suction-bottom>
		<!-- 吸底 End -->

		<!-- 选择权益商品 Begin -->
		<el-dialog :visible.sync="dialogVisible" width="70%" >
			<product @checked="handleChecked" ref="product"></product>
		</el-dialog>
		<!-- 选择权益商品 End -->
	</div>
</template>

<script>
const SuctionBottom = () => import('@/components/panel/suctionBottom')
const Upload = () => import('@/components/upload')
const Product = () => import('./rightProduct')

import elInput from 'element-ui/packages/input'
export default {
  name: 'privilegeAdd',
  data () {
    return {
      param:{ // 保存权益的参数
      	rightsName:"", // 权益名称
      	rightsDesc:"", // 权益描述
      	productDto:{}, // 商品信息
      	alternativeProductDtoList:[], // 备选商品集合
      	rightsIssueTotal:"", // 权益发放总数
      	usePeriod:7, // 使用有效期
      	rightsType:2,// 权益类型
      	helpNumber:"", // 需助力人数
      	upgradeStatus:0, // 是否权益升级 0 不是 1是
      	rightsInfoDto:{ // 权益类型配置
      		promotionPrice:"", // X元价格
      		getCount:"", // 获得份数
      		unit:"", // 单位
      		total:"", // 一整份的数量
      		spec:"" // 一整份的单位
      	}
      },
      suid:this.$route.query.suid,
      dialogVisible:false
    }
  },
  components:{
  	SuctionBottom,
  	elInput,
  	Upload,
  	Product
  },
  mounted () {
  	let _query = {
  		searchContent:this.suid,
  		pageIndex:1,
  		pageSize:20
  	}
  	this.$service.activity.boosterRight.getRightsProductList(_query).then( res => {
  		this.param.productDto = res.list[0]
  	})
  },
  methods:{
  	testRightsName () {
  		if(this.param.rightsName === ""){
  			this.$message.warning("权益名称,最多40字，不可为空")
  			return false
  		}
  		return true
  	},
  	testRightsIssueTotal () {
  		if(!this.$utils.isPosInt(this.param.rightsIssueTotal)){
  			this.$message.warning("权益发放总数须为正整数");return false
  		}
  		if(this.param.rightsIssueTotal > 99999999 ){
  			this.$message.warning("请输入有效的权益发放份数")
  			return false
  		}
  		return true
  	},
  	testUsePeriod () {
  		if(!this.$utils.isPosInt(this.param.usePeriod)){
  			this.$message.warning("使用有效期须为正整数");return false
  		}
  		if(this.param.usePeriod > 30 ){
  			this.$message.warning("使用有效期最多30天")
  			return false
  		}
  		return true
  	},
  	testXPrice () {
  		if(!this.$utils.isFload(this.param.rightsInfoDto.promotionPrice) && !this.$utils.isInteger(this.param.rightsInfoDto.promotionPrice)){
  			this.$message.warning("请输入价格或者数据格式有误");return false
  		}
  		if(this.param.rightsInfoDto.promotionPrice > this.param.productDto.price ){
  			this.$message.warning("x元价不可以高于商品原售价")
  			return false
  		}
  		return true
  	},
  	testHelpNumber () {
  		if(this.param.helpNumber ==="" || this.param.helpNumber > 19 ){
  			this.$message.warning("需助力人数应在0-19范围内")
  			return false
  		}
  		return true
  	},
  	testCount () {
  		const rule = /^1|(\d\.\d)$/
			if(this.param.rightsType === 2 && (!rule.test(this.param.rightsInfoDto.getCount) || this.param.rightsInfoDto.getCount <0.1 || this.param.rightsInfoDto.getCount > 1)){ // 0.a碎片
				this.$message.warning("获得份数请配置0.1-1间1位小数或整数1 ")
  			return false
			}else if(this.param.rightsType === 3){
				if(!this.$utils.isPosInt(this.param.rightsInfoDto.getCount)){
					this.$message.warning("获得份数须为有效正整数")
  				return false
				}else if(!this.$utils.isPosInt(this.param.rightsInfoDto.total)) {
					this.$message.warning("分割总份数须为有效正整数")
  				return false
				}else if(this.param.rightsInfoDto.getCount > this.param.rightsInfoDto.total){
					this.$message.warning("获得份数不可以大于分割总份数")
  				return false
				}
			}
  		return true
  	},
  	testUnit () {
  		if(this.param.rightsInfoDto.unit === ""){
  			this.$message.warning("请输入单位")
  			return false
  		}
  		return true
  	},
  	testSpec () {
  		if(this.param.rightsInfoDto.spec === ""){
  			this.$message.warning("请输入单位")
  			return false
  		}
  		return true
  	},
	testAlternativeProductDtoList () {
		if(this.param.alternativeProductDtoList.length === 0){
  			this.$message.warning("请选择备选权益商品")
  			return false
  		}
  		return true
	},
  	changeRightType () {
  		let self = this
  		//重置初始化条件
  		self.param.helpNumber = ""
  		Object.keys(self.param.rightsInfoDto).map((key) => {
  			self.param.rightsInfoDto[key] = ""
  		})
  	},
  	handleChecked (row) {
  		this.dialogVisible = !this.dialogVisible
  		this.param.alternativeProductDtoList.unshift(row)
  	},
  	deleteProduct (idx) {
  		this.param.alternativeProductDtoList.splice(idx,1)
  	},
  	saveTask () {
  		if(this.testRightsName() && this.testRightsIssueTotal() &&
  			this.testUsePeriod() && this.testHelpNumber() && this.testAlternativeProductDtoList()){
  			if(this.param.rightsType === 1 && this.testXPrice()){ //X元购
  				this.saveData()
  			}else if(this.param.rightsType === 2 && this.testCount() && this.testSpec()) {
  				this.saveData()
  			}else if(this.param.rightsType === 3 && this.testCount() && this.testUnit() && this.testSpec()) {
  				this.saveData()
  			}
  		}
  	},
  	saveData () {
  		this.$service.activity.boosterRight.addRight(this.param).then(res => {
  			this.$router.back()
  		})
  	},
  	cancelTask () {
  		this.$router.back()
  	}
  }
}
</script>

<style scoped>
  .cms {
  	padding-bottom: 150px;
  }
  .cms .cms {padding-bottom: 0}
  .alternativeProduct .detail {
  	padding-left: 30px;
  }
</style>
