<template>
	<div class="cms">
		<el-card class="box-card">
			<!-- 表单 Begin -->
      <el-form ref="form" label-width="150px" size="small" class="input-normal">
        <el-form-item label="奖品ID：">
          {{ param.rewardId }}
        </el-form-item>
        <el-form-item label="奖品名称：">
          <el-input v-model.trim="param.rewardName" class="w300" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="奖品价值：">
          <el-input v-model="param.rewardPrice" v-only-num="param.rewardPrice" :max-len="8" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="奖品成本：">
          <el-input v-model="param.rewardCost" v-only-num="param.rewardCost" :max-len="8" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="增加数量：">
          <el-input v-model="param.addStore" v-only-num="param.addStore" :max-len="8" class="w100"></el-input>
          <span>增加成功后，剩余数量会有对应的增加</span>
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
          <upload class="w200 fl" action="/image/uploadImage?width=686&height=352&fileSize=300" @success="handlePrizeImgeUrl" :imageUrl="param.imageUrl" :width="150" :height="77"></upload>
          <span class="ma-t-20 fl font-dark0 ">尺寸686×352px，jpg/png格式，不大于300k</span>
        </el-form-item>
       	<el-form-item label="奖品小程序卡片：">
          <upload class="w200 fl" action="/image/uploadImage?width=500&height=400&fileSize=300" @success="handleAppletImgeUrl" :width="125" :height="100"  :imageUrl="param.miniImageUrl"></upload>
          <span class="ma-t-40 fl font-dark0 ">尺寸500×400px，jpg/png格式，不大于300k</span>
        </el-form-item>
        <el-form-item label="方形图">
            <upload class="w200 fl" action="/image/uploadImage?width=300&height=300&fileSize=300" @success="handleSquareImageUrl" :width="100" :height="100"  :imageUrl="param.squareImage"></upload>
            <span class="ma-t-40 fl font-dark0 ">尺寸300×300px，jpg/png格式，不大于300k</span>
          </el-form-item>
        <el-form-item label="剩余数量：">
           <el-input v-model="param.availableStore" v-only-num="param.availableStore" :max-len="8" class="w100" :disabled="true"></el-input>
           <span>剩余可用的奖品数量</span>
        </el-form-item>
        <el-form-item label="锁定数量：">
          <el-input v-model="param.lockStore" v-only-num="param.lockStore" :max-len="8" class="w100" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="已领取数量：">
           <el-input v-model="param.receiveStore" v-only-num="param.receiveStore" :max-len="8"class="w100" :disabled="true"></el-input>
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
		name:"editPrize",
		data() {
      return {
      	param:{}
      }
    },
	  components:{
	  	upload
	  },
    methods:{
    	getEditInfo(){
        let self = this
    		self.$service.activity.luckDraw.editPlatfromReward({rewardId:this.$route.params.id * 1}).then(res => {
 					self.param = Object.assign(res,{addStore:0,rewardId:this.$route.params.id * 1})
    		})
    	},
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
        let _param = JSON.parse(JSON.stringify(self.param))
		    delete _param.lockStore
		    delete _param.receiveStore
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
        if(self.param.addStore === ''){
        	this.$message.warning("请输入增加数量")
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
        if(self.param.squareImage === '' || !self.param.squareImage){
        	this.$message.warning("请上传方形图")
	  			return false
        }
       	self.$service.activity.luckDraw.updatePlatformReward(_param).then(res => {
          this.$router.push({path: '/luckDraw/platPrize',query:{}});
       	})
      },
      toBack(){
      	this.$router.push({path: '/luckDraw/platPrize',query:{}});
      }
    },
    created () {
    	this.getEditInfo()
    }
	}
</script>
<style type="text/css" scoped>
  
</style>
