<template>
  <div class="cms">
  	<el-card class="box-card">
      <el-form ref="form" label-width="150px" size="small" class="input-normal">
        <el-form-item label="磨皮参数：">
          <el-input v-model="param.buffingParam" v-only-num="param.buffingParam" :max-len="3" class="w100 fl"></el-input>
          <span class="ma-l-10 fl">%</span>
          <span class="ma-l-20 fl font-dark0">*0-100的整数</span>
        </el-form-item>
        <el-form-item label="美白参数：">
          <el-input v-model="param.whiteningParam" v-only-num="param.whiteningParam" :max-len="3" class="w100 fl"></el-input>
          <span class="ma-l-10 fl">%</span>
          <span class="ma-l-20 fl font-dark0">*0-100的整数</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveDeploy">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  export default {
  	name: 'paramDeploy',
    data() {
      return {
      	param:{
      		type:2,	// 配置类型：1.首页配置，2.参数配置，3.颜值配置，4素材配置
	      	buffingParam:'',
	      	whiteningParam:'',
      	}
      }
    },
    methods:{
     getDeploy(val) {
        let self = this
       	self.$service.activity.faceScore.queryConfig().then(res => {
          self.param.buffingParam = res.buffingParam
          self.param.whiteningParam = res.whiteningParam
       	})
     },
	  	saveDeploy() {
        let self = this
        if(self.param.buffingParam === ''){
	  			self.$message.warning("请输入磨皮参数")
	  			return false
        }else if(self.param.buffingParam > 100){
	  			self.$message.warning("请输入0-100的整数磨皮参数")
	  			return false
        }else if(self.param.whiteningParam === ''){
	  			self.$message.warning("请输入美白参数")
	  			return false
        }else if(self.param.whiteningParam > 100){
	  			self.$message.warning("请输入0-100的整数美白参数")
	  			return false
        }
        self.$service.activity.faceScore.saveConfig(self.param).then(res => {
          self.$message.success("提交成功")
       	})
      }
    },
    mounted () {
      this.getDeploy()
    }
  }
</script>
<style type="text/css" scoped>
</style>
