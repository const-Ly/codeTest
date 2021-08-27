<template>
	<div class="cms">
		<el-card class="box-card">
			<!-- 表单 Begin -->
      <el-form ref="form" label-width="150px" size="small" class="input-normal">
        <el-form-item label="奖品名称：">
          <el-input v-model.trim="param.rewardName" class="w300" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="奖品价值：">
          <el-input v-model="param.rewardPrice" v-only-num="param.rewardPrice" :max-len="8" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="奖品成本：">
          <el-input v-model="param.rewardCost" v-only-num="param.rewardCost" :max-len="8" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="奖品数量：">
          <el-input v-model="param.rewardNum" v-only-num="param.rewardNum" :max-len="8" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="是否报税：">
          <el-radio-group v-model="param.isTax">
				    <el-radio :label="1">是</el-radio>
				    <el-radio :label="0">否</el-radio>
				  </el-radio-group>
        </el-form-item>
        <el-form-item label="是否配送：">
          <el-radio-group v-model="param.isDelivery">
				    <el-radio :label="1">是</el-radio>
				    <el-radio :label="0">否</el-radio>
				  </el-radio-group>
        </el-form-item>
       	<el-form-item label="奖品图片：">
          <upload class="w200 fl" action="/image/uploadImage?width=686&height=352&fileSize=300" @success="handlePrizeImgeUrl" :width="150" :height="77"></upload>
          <span class="ma-t-20 fl font-dark0 ">尺寸686×352px，jpg/png格式，不大于300k</span>
        </el-form-item>
       	<el-form-item label="奖品小程序卡片：">
          <upload class="w200 fl" action="/image/uploadImage?width=500&height=400&fileSize=300" @success="handleAppletImgeUrl" :width="125" :height="100"></upload>
          <span class="ma-t-40 fl font-dark0 ">尺寸500×400px，jpg/png格式，不大于300k</span>
        </el-form-item>
        <el-form-item label="方形图：">
          <upload class="w200 fl" action="/image/uploadImage?width=300&height=300&fileSize=300" @success="handleSquareImageUrl" :width="100" :height="100"></upload>
          <span class="ma-t-40 fl font-dark0 ">尺寸300×300px，jpg/png格式，不大于300k</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveDeploy">提交保存</el-button>
          <el-button @click="toBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
   
	</div>
</template>
<script>
const upload = () => import('@/components/upload')
	export default {
		name:"addPrize",
		data() {
      return {
        param:{
          rewardName:"",	// 奖品名称
          rewardPrice:null,	// 奖品价值
          rewardCost:null,	// 奖品成本
          rewardNum:null,	// 奖品数量
          isTax:0,	// 是否报税(0否1是)
          isDelivery:0,	// 是否配送(0否1是)
          imageUrl:"",	// 奖品图片url
          miniImageUrl:"",// 奖品小程序卡片url
          squareImage:""  // 方形图
        }
      }
    },
	  components:{
	  	upload
	  },
    methods:{
      handlePrizeImgeUrl (val) {
	  		this.param.imageUrl = val 
	  	},
      handleAppletImgeUrl (val) {
	  		this.param.miniImageUrl = val 
	  	},
      handleSquareImageUrl (val) {
	  		this.param.squareImage = val 
	  	},
      saveDeploy() {
        let self = this
        if(self.param.rewardName ===''){
	  			this.$message.warning("请输入奖品名称")
	  			return false
	  		}
        if(self.param.rewardName.length < 1 || self.param.rewardName.length > 40){
        	this.$message.warning("请输入1-40字奖品名称")
	  			return false
        }
        if(self.param.rewardCost === '' || self.param.rewardCost === null){
        	this.$message.warning("请输入奖品成本")
	  			return false
        }
        if(self.param.rewardNum === '' || self.param.rewardNum === null){
        	this.$message.warning("请输入奖品数量")
	  			return false
        }
        if(self.param.imageUrl === ''){
        	this.$message.warning("请上传奖品图片")
	  			return false
        }
        if(self.param.miniImageUrl === ''){
        	this.$message.warning("请上传奖品小程序卡片")
	  			return false
        }
        if(self.param.squareImage === ''){
        	this.$message.warning("请上传方形图")
	  			return false
        }
        self.$service.activity.luckDraw.addPlatformReward(self.param).then(res => {
          this.$router.push({path: '/luckDraw/platPrize',query:{}});
       	})
      },
      toBack(){
      	this.$router.push({path: '/luckDraw/platPrize',query:{}});
      }
    },
    created () {
    }
	}
</script>
<style type="text/css" scoped>
</style>
