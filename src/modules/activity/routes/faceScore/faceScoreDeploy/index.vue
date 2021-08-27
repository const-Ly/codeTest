<template>
  <div class="cms">
  	<el-card class="box-card">
      <el-form ref="form" label-width="260px" size="small" class="input-normal">
        <el-form-item label="好友点赞获取数量（首次）：">
          <el-input v-model="param.newUserPraiseNum" v-only-num="param.newUserPraiseNum" :max-len="7" class="w100 fl"></el-input>
          <span class="ma-l-20 fl font-dark0 ">*0-1000000的整数</span>
        </el-form-item>
        <el-form-item label="好友点赞获取数量（非首次）：">
          <el-input v-model="param.oldUserPraiseNum" v-only-num="param.oldUserPraiseNum" :max-len="7" class="w100 fl"></el-input>
          <span class="ma-l-20 fl font-dark0 ">*0-1000000的整数</span>
        </el-form-item>
        <el-form-item label="每日同一好友点赞次数上限：">
          <el-input v-model="param.dailyPraiseNumLimit" v-only-num="param.dailyPraiseNumLimit" :max-len="3" class="w100 fl"></el-input>
          <span class="ma-l-20 fl font-dark0 ">*0-999的整数</span>
        </el-form-item>
        <el-form-item label="每日获得奖励分数上限：">
          <el-input v-model="param.dailyPraiseScoreLimit" v-only-num="param.dailyPraiseScoreLimit" :max-len="7" class="w100 fl"></el-input>
          <span class="ma-l-20 fl font-dark0 ">*0-1000000的整数</span>
        </el-form-item>
        <el-form-item label="自然月内兑换特权金次数上限：">
          <el-input v-model="param.monthlyPrivilegeNumLimit" v-only-num="param.monthlyPrivilegeNumLimit" :max-len="3" class="w100 fl"></el-input>
          <span class="ma-l-20 fl font-dark0 ">*0-999的整数</span>
        </el-form-item>
        <el-form-item label="新用户首次登录奖励分数：">
          <el-input v-model="param.newUserFirstLoginScore" v-only-num="param.newUserFirstLoginScore" :max-len="7" class="w100 fl"></el-input>
          <span class="ma-l-20 fl font-dark0 ">*0-1000000的整数</span>
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
  	name: 'faceScoreDeploy',
    data() {
      return {
      	param:{
      		type:3,	// 配置类型：1.首页配置，2.参数配置，3.颜值配置，4素材配置
	      	newUserPraiseNum:'',	//好友点赞获取数量（首次）
	      	oldUserPraiseNum:'',	//好友点赞获取数量（非首次）
	      	dailyPraiseNumLimit:'',	//每日同一好友点赞次数上限
	      	dailyPraiseScoreLimit:'',	//每日获得奖励分数上限
	      	monthlyPrivilegeNumLimit:'',	//自然月内兑换特权金次数上限
	      	newUserFirstLoginScore:'',	//新用户首次登录奖励分数
      	}
      }
    },
    methods:{
     getDeploy(val) {
        let self = this
       	self.$service.activity.faceScore.queryConfig().then(res => {
          self.param = res
          self.param.type = 3
       	})
      },
	  	saveDeploy() {
        let self = this
        if(self.param.newUserPraiseNum === '' || self.param.newUserPraiseNum > 1000000){
        	self.$message.warning("请输入0-1000000的整数好友点赞获取数量（首次）")
	  			return false
        }
        if(self.param.oldUserPraiseNum === '' || self.param.oldUserPraiseNum > 1000000){
	  			self.$message.warning("请输入0-1000000的整数好友点赞获取数量（非首次）")
	  			return false
        }
        if(self.param.dailyPraiseNumLimit === ''){
	  			self.$message.warning("请输入0-999的整数每日同一好友点赞次数上限")
	  			return false
        }
        if(self.param.dailyPraiseScoreLimit === '' || self.param.dailyPraiseScoreLimit > 1000000){
	  			self.$message.warning("请输入0-1000000的整数每日获得奖励分数上限")
	  			return false
        }
        if(self.param.monthlyPrivilegeNumLimit === ''){
	  			self.$message.warning("请输入0-999的整数自然月内兑换特权金次数上限")
	  			return false
        }
        if(self.param.newUserFirstLoginScore === '' || self.param.newUserFirstLoginScore > 1000000){
	  			self.$message.warning("请输入0-1000000的整数新用户首次登录奖励分数")
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
