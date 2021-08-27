<template>
  <div class="cms">
  	<el-card class="pa-b-100">
	    <!-- 表单 Begin -->
	    <el-form label-width="180px" size="small">
	      <el-form-item label="权益名称：">
			    <span v-text="detail.rightsName"></span>
			  </el-form-item>
			  <el-form-item label="权益描述：">
			    <span v-text="detail.rightsDesc"></span>
			  </el-form-item>
			  <el-form-item label="货品SUID：">
			    <el-col :span="5">
				    	<span v-text="detail.productDto.skuId"></span>
					</el-col>
					<el-col :span="8">
						<span>商品编号：{{detail.productDto.productId}}</span>
					</el-col>
			  </el-form-item>
			  <el-form-item label="商品名称：">
			    <a target="_blank" :href="'http://www.biyao.com/products/'+detail.productDto.skuId+'-0.html'" class="font-blue">{{ detail.productDto.productName +"【"+detail.productDto.skuSpecs +"】" }}</a>
			  </el-form-item>
			  <el-form-item label="货品价格：">
			    <el-col :span="3">
			    	<span>{{detail.productDto.price | currency}}</span>
					</el-col>
					<el-col :span="6">
		  			商家优惠：{{detail.productDto.friendHelpSupplierRate | percentage }}
		  		</el-col>
		      <el-col :span="6">
		        平台优惠：{{detail.productDto.friendHelpPlatformRate | percentage }}
		      </el-col>
			  </el-form-item>
			  <el-form-item label="所属商家：">
			    <span v-text="detail.productDto.supplierName"></span>
			  </el-form-item>
			  <el-form-item label="备选权益商品：">
			    <div class="alternativeProduct" v-if="detail.alternativeProductDtoList.length>0">
			    	<ul>
			    		<li class="" v-for="(item,key) in detail.alternativeProductDtoList" :key="key">
			    			<a target="_blank" :href="'http://www.biyao.com/products/'+item.skuId+'-0.html'" class="font-blue">{{ item.productName +"【"+item.skuSpecs +"】" }}</a>
			    			<div class="detail">
			    				<span class="font-info">【价格:{{item.price | currency }};suid:{{item.skuId}};商品编号:{{item.productId}}】</span>
			    				【商家优惠:{{item.friendHelpSupplierRate | percentage}}；&nbsp;平台优惠:{{item.friendHelpPlatformRate | percentage}}】
			    			</div>
			    		</li>
			    	</ul>
			    </div>
			    <span v-else class="font-info">暂无备选商品</span>
			  </el-form-item>
			  <el-form-item label="权益发放总数：">
			    <el-col :span="2" class="align-center"><span v-text="detail.rightsIssueTotal"></span></el-col>
			    <el-col :span="1">&nbsp;&nbsp;份</el-col>
			  </el-form-item>
			  <el-form-item label="使用有效期：">
			    <el-col :span="2" class="align-center"><span v-text="detail.usePeriod"></span></el-col>
			    <el-col :span="1">&nbsp;&nbsp;天</el-col>
			  </el-form-item>
			  <el-form-item label="权益类型：">
			    <span v-text="detail.rightsTypeName"></span>
			  </el-form-item>
			  <el-form-item label="X元价格：" v-if="detail.rightsInfoDto.promotionPrice!==null">
			    <el-col :span="2" class="align-center"><span v-text="detail.rightsInfoDto.promotionPrice"></span></el-col>
			    <el-col :span="1">&nbsp;&nbsp;元</el-col>
			  </el-form-item>
			  <el-form-item label="获得份数：" v-if="detail.rightsInfoDto.getCount!==null">
			    <span>{{detail.rightsInfoDto.getCount+(detail.rightsInfoDto.unit || detail.rightsInfoDto.spec)}}</span>
			  </el-form-item>
			  <el-form-item label="分割总份数：" v-if="detail.rightsInfoDto.total!==null">
			    <span>{{detail.rightsInfoDto.total+detail.rightsInfoDto.unit+"/"+detail.rightsInfoDto.spec}}</span>
			  </el-form-item>
			  <el-form-item label="需助力人数：">
			    <span v-text="detail.helpNumber"></span>
			  </el-form-item>
			</el-form>
		</el-card>
		<!-- 吸底区域 Begin -->
    <suction-bottom :showOk="false"></suction-bottom>
	<!-- 吸底区域 End -->
  </div>
</template>

<script>
const SuctionBottom = () => import('@/components/panel/suctionBottom')
export default {
  name: 'privilegeDetail',
  data () {
    return {
      detail:{
				'productDto': {},
				'rightsInfoDto': {},
				'alternativeProductDtoList':[]
			}
    }
  },
  components:{
  	SuctionBottom
  },
  created () {
  	this.$service.activity.boosterRight.getRightDetail({rightsId:this.$route.params.id}).then(res => {
  		this.detail = res
  	})
  }
}
</script>
