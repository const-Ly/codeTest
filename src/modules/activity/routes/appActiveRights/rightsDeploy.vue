<template>
	<div class="cms">
		<el-card class="box-card">
      <div class="option-box">
        <div class="option-list clearfix">
          <div class="option-label"><span class="font-danger ma-r-10">*</span>权益有效期：</div>
          <div class="option-val">
             <el-input v-model="parm.expireDay" v-only-num="parm.expireDay" :max-len="4" size="small" class="w200"></el-input>
          </div>
         	<p class="fl">&nbsp;天&nbsp;&nbsp;（权益发放后的有效期）</p>
        </div>
        <div class="option-list clearfix">
          <div class="option-label"><span class="font-danger ma-r-10">*</span>每日最多引导：</div>
          <div class="option-val">
             <el-input v-model="parm.guideCountDay" v-only-num="parm.guideCountDay" :max-len="2" size="small" class="w200"></el-input>
          </div>
         	<p class="fl">&nbsp;次&nbsp;&nbsp;（每个用户ID每日最多引导次数，按自然日计算）</p>
        </div>
        <div class="option-list clearfix">
          <div class="option-label"><span class="font-danger ma-r-10">*</span>单个权益金额 ：</div>
          <div class="option-val">
             <el-input v-model="parm.singleAmount" v-only-num="parm.singleAmount" :max-len="8" size="small" class="w200"></el-input>
          </div>
         	<p class="fl">&nbsp;元&nbsp;&nbsp;（每个权益的金额）</p>
        </div>
        <div class="option-list clearfix">
          <div class="option-label"><span class="font-danger ma-r-10">*</span>权益总金额 ：</div>
          <div class="option-val">
             <el-input v-model="parm.rightsAmount" v-only-num="parm.rightsAmount" :max-len="8" size="small" class="w200"></el-input>
          </div>
         	<p class="fl">&nbsp;元&nbsp;&nbsp;（发放出去的权益总金额）</p>
        </div>
        <div class="option-list clearfix">
          <div class="option-label">剩余权益金额 ：</div>
          <div class="fl">{{parm.surplusAmount}}</div>
         	<p class="fl">&nbsp;元&nbsp;&nbsp;（剩余权益金额小于单个权益金额时权益不再发放，每次更改权益总金额后重新计算剩余权益金额）</p>
        </div>
      </div>
      <el-button class="ma-t-20 mg-l-120" type="primary" @click="saveDeploy" size="small">提交保存</el-button>
    </el-card>
   
	</div>
</template>
<script>
	export default {
		name:"rightsDeploy",
		data() {
      return {
        parm:{
          expireDay:"",
          guideCountDay:"",
          singleAmount:"",
          rightsAmount:"",
          surplusAmount:""
        }
      }
    },
    methods:{
      getList(val) {
        let self = this
        self.$service.activity.appActiveRights.getAppRights().then(res => {
          self.parm = res
       })
      },
      saveDeploy() {
      	let self = this
      	if(self.parm.expireDay >1000 || self.parm.expireDay < 1){
      		self.$message.warning("权益有效期应为1-1000间整数")
					return
      	}
      	if(self.parm.guideCountDay === ''){
      		self.$message.warning("请输入每日最多引导")
					return
      	}
      	if(self.parm.guideCountDay >10 || self.parm.guideCountDay < 1){
      		self.$message.warning("请输入1-10次 每日最多引导")
					return
      	}
      	if(self.parm.singleAmount >99999999 || self.parm.singleAmount < 1){
      		self.$message.warning("单个权益金额应在1-99999999元间")
					return
      	}
      	if(self.parm.rightsAmount === '' || self.parm.rightsAmount >99999999){
      		self.$message.warning("权益总金额应在0-99999999元间")
					return
      	} 
      	self.$service.activity.appActiveRights.saveAppRights(self.parm).then(res => {
          self.$message.success("保存成功")
          self.getList()
       })
      }
    },
    created () {
      this.getList()
    }
	}
</script>
<style type="text/css" scoped>
  .option-box {
    padding:20px 0;
  }
  .option-list {
    margin-top: 15px;
  }
  .option-label {
    float:left;
    width:120px;
    text-align: right;
    margin-right: 10px;
  }
  .option-val{
    float: left;
  }
  .option-val{
  	margin-top: -5px;
  }
  .mg-l-120{ margin-left: 130px;}
</style>
