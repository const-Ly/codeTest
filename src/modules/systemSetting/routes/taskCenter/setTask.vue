<template>
  <div class="cms">
    <el-card class="box-card">
      <h3 class="title">任务基本设置</h3>
      <el-form label-width="200px">
        <el-form-item label="显示任务数量：">
          <el-input class="w200" v-model="taskBaseGlobalConfig.showTaskCount" v-only-num="taskBaseGlobalConfig.showTaskCount" :max-len="3"></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">0到999的整数</span>
        </el-form-item>
        <el-form-item label="每日下发任务数量上限：">
          <el-input class="w200" v-model="taskBaseGlobalConfig.dailyTaskCount" v-only-num="taskBaseGlobalConfig.dailyTaskCount" :max-len="3"></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">0到999的整数</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveTaskBaseGlobalConfig">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <h3 class="title">兑换设置（任务中心--兑换列表的奖励和图标的设置）</h3>
      <el-table class="ma-b-10" :data="exchangeGlobalConfig.globalExchangeConfigList" style="width:100%">
	      <el-table-column label="排序位置">
          <template slot-scope="scope">
            <el-input class="w200" v-model="scope.row.sortSeqNum" @input="$utils.onlyNum(scope.row, 'sortSeqNum', scope.row.sortSeqNum)" maxlength="2"></el-input>
          </template>
        </el-table-column>
	      <el-table-column label="场景值">
	      	<template slot-scope="scope">
            <el-input class="w200" v-model.trim="scope.row.sceneIdentify" @blur="checkSceneIdentify(scope.row)"></el-input>
          </template>
	      </el-table-column>
	      <el-table-column label="福利">
          <template slot-scope="scope">
            {{scope.row.rewardStr | placeholder}}
          </template>
        </el-table-column>
	      <el-table-column label="图片">
          <template slot-scope="scope">
            <div class="w220">
              <upload class="inline-block" action="/image/uploadImage?imageComparisonRule=3&width=200&height=200&fileSize=300" :size="300" :image-url="scope.row.canExchangeTaskIconImgUrl" @success="scope.row.canExchangeTaskIconImgUrl = $event"></upload>
              <upload class="inline-block ma-l-10" action="/image/uploadImage?imageComparisonRule=3&width=200&height=200&fileSize=300" :size="300" :image-url="scope.row.canExchangeBackImgUrl" @success="scope.row.canExchangeBackImgUrl = $event"></upload>
            </div>
            <div class="w220">
              <upload class="inline-block" action="/image/uploadImage?imageComparisonRule=3&width=200&height=200&fileSize=300" :size="300" :image-url="scope.row.oldCustomerTaskIconImgUrl" @success="scope.row.oldCustomerTaskIconImgUrl = $event"></upload>
              <upload class="inline-block ma-l-10" action="/image/uploadImage?imageComparisonRule=3&width=200&height=200&fileSize=300" :size="300" :image-url="scope.row.oldCustomerBackImgUrl" @success="scope.row.oldCustomerBackImgUrl = $event"></upload>
            </div>
            <div class="w220">
              <upload class="inline-block" action="/image/uploadImage?imageComparisonRule=3&width=200&height=200&fileSize=300" :size="300" :image-url="scope.row.goldNotEnoughTaskIconImgUrl" @success="scope.row.goldNotEnoughTaskIconImgUrl = $event"></upload>
              <upload class="inline-block ma-l-10" action="/image/uploadImage?imageComparisonRule=3&width=200&height=200&fileSize=300" :size="300" :image-url="scope.row.goldNotEnoughBackImgUrl" @success="scope.row.goldNotEnoughBackImgUrl = $event"></upload>
            </div>
            <p class="font-info">图片尺寸长宽不超过200px，大小不大于300k（左侧为任务图标，右侧为兑换背景图，第1行可兑换、第2行为老客专享、第3行为金币不足）</p>
          </template>
        </el-table-column>
	      <el-table-column label="跳转路由">
          <template slot-scope="scope">
            <el-input class="w200" v-model.trim="scope.row.androidRoute" placeholder="Android" maxlength="999"></el-input>
            <el-input class="w200 ma-t-10" v-model.trim="scope.row.iosRoute" placeholder="ios" maxlength="999"></el-input>
            <el-input class="w200 ma-t-10" v-model.trim="scope.row.miniAppRoute" placeholder="小程序" maxlength="999"></el-input>
            <el-input class="w200 ma-t-10" v-model.trim="scope.row.msiteRoute" placeholder="M站" maxlength="999"></el-input>
          </template>
        </el-table-column>
	      <el-table-column label="操作">
	      	<template slot-scope="scope">
	      		<el-button @click="delGlobalExchangeConfig(scope.$index)" type="text" >删除</el-button>
          </template>
	      </el-table-column>
	    </el-table>
      <el-button v-show="exchangeGlobalConfig.globalExchangeConfigList.length<10" @click="addGlobalExchangeConfig" type="text">添加一条</el-button>
      <el-button @click="saveExchangeGlobalConfig" type="primary" >提交保存</el-button>
    </el-card>
    <el-card class="box-card ma-t-10">
      <h3 class="title">签到特殊奖励（第n天，奖励m金币配置）</h3>
      <el-table class="ma-b-10" :data="signInRewardGlobalConfig.signInRewardConfigList" style="width:100%">
	      <el-table-column label="第n天">
          <template slot-scope="scope">
            <el-input class="w200" v-model="scope.row.daySeqNum" @input="$utils.onlyNum(scope.row, 'daySeqNum', scope.row.daySeqNum)" maxlength="1"></el-input>
          </template>
        </el-table-column>
	      <el-table-column label="奖励金币">
	      	<template slot-scope="scope">
            <el-input class="w200" v-model="scope.row.rewardGoldNum" @input="$utils.onlyNum(scope.row, 'rewardGoldNum', scope.row.rewardGoldNum)" maxlength="6"></el-input>
          </template>
	      </el-table-column>
	      <el-table-column label="对应文字">
	      	<template slot-scope="scope">
            <el-input class="w200" v-model.trim="scope.row.documentDesc" maxlength="10"></el-input>
          </template>
	      </el-table-column>
	      <el-table-column label="操作">
	      	<template slot-scope="scope">
	      		<el-button @click="delSignInRewardConfig(scope.$index)" type="text" >删除</el-button>
          </template>
	      </el-table-column>
	    </el-table>
      <el-button v-show="signInRewardGlobalConfig.signInRewardConfigList.length<7" @click="addSignInRewardConfig" type="text">添加一条</el-button>
      <el-button @click="saveSignInRewardConfig" type="primary" >提交保存</el-button>
    </el-card>
    <div class="ma-t-10">
      <el-button @click="closePage" type="primary">关闭</el-button>
    </div>
  </div>
</template>

<script type="text/javascript">

import Upload from "@/components/upload";
export default {
  name: 'setTask',
  components: { Upload },
  data() {
    return {
      taskBaseGlobalConfig: {  // 任务基本设置
        showTaskCount: '', // 任务显示数量
        dailyTaskCount: '' // 首次下发任务数量
      },
      exchangeGlobalConfig: {
        globalExchangeConfigList: []
      },
      signInRewardGlobalConfig: {
        signInRewardConfigList: []
      }
    }
  },
  methods: {
    getAllModelTaskConfig () {
      this.$service.systemSetting.taskCenter.getAllModelTaskConfig().then(res => {
        if (!res) return false
        this.taskBaseGlobalConfig = res.taskBaseGlobalConfig
        this.signInRewardGlobalConfig = res.signInRewardGlobalConfig
        for(let i=0; i<res.exchangeGlobalConfig.globalExchangeConfigList.length; i++){
          let gList = res.exchangeGlobalConfig.globalExchangeConfigList[i]
          let rewardStr = ''
          for(let j=0; j<gList.rewardTypes.length; j++){
            rewardStr += gList.rewardTypes[j]+'、'
          }
          gList.rewardStr = rewardStr.substr(0, rewardStr.length - 1)
        }
        this.exchangeGlobalConfig = res.exchangeGlobalConfig
      })
    },
    // 保存任务基本设置
    saveTaskBaseGlobalConfig () {
      if (this.taskBaseGlobalConfig.showTaskCount === '' || this.taskBaseGlobalConfig.showTaskCount === null){
          return this.$message.warning("请输入任务显示数量")
      }
      if (this.taskBaseGlobalConfig.dailyTaskCount === '' || this.taskBaseGlobalConfig.dailyTaskCount === null){
          return this.$message.warning("请输入首次下发任务数量上限")
      }
      this.$service.systemSetting.taskCenter.saveGlobalConfig(this.taskBaseGlobalConfig).then(res => {
        if (!res) return false
        this.$message.success('提交保存成功')
      })
    },
    // 校验场景值
    checkSceneIdentify (row){
      if( row.sceneIdentify === ''|| row.sceneIdentify === null){
        return this.$message.warning("场景值不存在，请重新输入")
      }
      // 场景值、奖励类型和奖励类型字符串先置空，校验通过再赋值
      let sceneIdentifyStr = row.sceneIdentify
      row.sceneIdentify = ''
      row.rewardTypes = ''
      row.rewardStr = ''
      let rewardStr = ''
      this.$service.systemSetting.taskCenter.getRewardTypesByScene({sceneIdentify: sceneIdentifyStr}) .then(res => {
        if (res.rewardTypes) {
          row.sceneIdentify = sceneIdentifyStr
          for(let i=0; i<res.rewardTypes.length; i++){
            rewardStr += res.rewardTypes[i]+'、'
          }
          row.rewardStr = rewardStr.substr(0, rewardStr.length - 1)
          row.rewardTypes = res.rewardTypes
        }
      })
    },
    delGlobalExchangeConfig (idx) {
      this.exchangeGlobalConfig.globalExchangeConfigList.splice(idx, 1)
    },
    addGlobalExchangeConfig () {
      this.exchangeGlobalConfig.globalExchangeConfigList.push({
        sortSeqNum: '',
        sceneIdentify: '',
        rewardTypes: '',
        rewardStr: '',
        canExchangeTaskIconImgUrl: '',
        canExchangeBackImgUrl: '',
        oldCustomerTaskIconImgUrl: '',
        oldCustomerBackImgUrl: '',
        goldNotEnoughTaskIconImgUrl: '',
        goldNotEnoughBackImgUrl: '',
        androidRoute: '',
        iosRoute: '',
        miniAppRoute: '',
        msiteRoute: ''
      })
    },
    saveExchangeGlobalConfig () {
      for( let i=0; i<this.exchangeGlobalConfig.globalExchangeConfigList.length; i++){
        if(this.exchangeGlobalConfig.globalExchangeConfigList[i].sortSeqNum === '' || this.exchangeGlobalConfig.globalExchangeConfigList[i].sortSeqNum === null){
          return this.$message.warning("请输入排序位置")
        }
        if(this.exchangeGlobalConfig.globalExchangeConfigList[i].sceneIdentify === '' || this.exchangeGlobalConfig.globalExchangeConfigList[i].sceneIdentify === null){
          return this.$message.warning("请输入场景值")
        }
        if(!this.exchangeGlobalConfig.globalExchangeConfigList[i].canExchangeTaskIconImgUrl){
          return this.$message.warning("请上传可兑换任务图标")
        }
        if(!this.exchangeGlobalConfig.globalExchangeConfigList[i].canExchangeBackImgUrl){
          return this.$message.warning("请上传可兑换兑换背景图")
        }
        if(!this.exchangeGlobalConfig.globalExchangeConfigList[i].oldCustomerTaskIconImgUrl){
          return this.$message.warning("请上传老客专享任务图标")
        }
        if(!this.exchangeGlobalConfig.globalExchangeConfigList[i].oldCustomerBackImgUrl){
          return this.$message.warning("请上传老客专享兑换背景图")
        }
        if(!this.exchangeGlobalConfig.globalExchangeConfigList[i].goldNotEnoughTaskIconImgUrl){
          return this.$message.warning("请上传金币不足任务图标")
        }
        if(!this.exchangeGlobalConfig.globalExchangeConfigList[i].goldNotEnoughBackImgUrl){
          return this.$message.warning("请上传金币不足兑换背景图")
        }
      }
      this.$service.systemSetting.taskCenter.saveGlobalExchangeConfig(this.exchangeGlobalConfig).then(res => {
        if (!res) return false
        this.$message.success('提交保存成功')
      })
    },
    delSignInRewardConfig (idx) {
      this.signInRewardGlobalConfig.signInRewardConfigList.splice(idx, 1)
    },
    addSignInRewardConfig () {
      this.signInRewardGlobalConfig.signInRewardConfigList.push({
        daySeqNum: '',
        rewardGoldNum: '',
        documentDesc: ''
      })
    },
    saveSignInRewardConfig () {
      for( let i=0; i<this.signInRewardGlobalConfig.signInRewardConfigList.length; i++){
        if(this.signInRewardGlobalConfig.signInRewardConfigList[i].daySeqNum === '' || this.signInRewardGlobalConfig.signInRewardConfigList[i].daySeqNum === null){
          return this.$message.warning("请输入第n天")
        }
        if(this.signInRewardGlobalConfig.signInRewardConfigList[i].daySeqNum < 1 || this.signInRewardGlobalConfig.signInRewardConfigList[i].daySeqNum > 7){
          return this.$message.warning("第n天必须是1到7的整数")
        }
        if(this.signInRewardGlobalConfig.signInRewardConfigList[i].rewardGoldNum === '' || this.signInRewardGlobalConfig.signInRewardConfigList[i].rewardGoldNum === null){
          return this.$message.warning("请输入奖励金币")
        }
        if(this.signInRewardGlobalConfig.signInRewardConfigList[i].rewardGoldNum < 1){
          return this.$message.warning("奖励金币必须是1到999999的整数")
        }
        if(this.signInRewardGlobalConfig.signInRewardConfigList[i].documentDesc === '' || this.signInRewardGlobalConfig.signInRewardConfigList[i].documentDesc === null){
          return this.$message.warning("请输入对应文字")
        }
      }
      this.$service.systemSetting.taskCenter.saveGlobalSignInRewardConfig(this.signInRewardGlobalConfig).then(res => {
        if (!res) return false
        this.$message.success('提交保存成功')
      })
    },
    closePage () {
      window.close()
    }
  },
  mounted() {
    this.getAllModelTaskConfig()
  }
}
</script>
<style scoped>
  .title{ margin-bottom: 20px;}
  .w220{ width: 220px;}
</style>

