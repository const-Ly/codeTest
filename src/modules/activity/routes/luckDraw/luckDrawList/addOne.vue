<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="120px" size="small" class="input-normal">
        <el-form-item label="抽奖活动名称：">
          <el-input v-model.trim="param.lotteryName" :maxLength="40"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker v-model="startTime" type="datetime" format="yyyy-MM-dd HH:mm" @change="handleChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开奖时机：">
          <el-radio-group v-model="param.lotteryType">
            <el-radio :label="0">满人开奖</el-radio>
            <el-radio :label="1">定时开奖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <template v-if="param.lotteryType === 1">
            到
            <el-date-picker v-model="lotteryTime" type="datetime" format="yyyy-MM-dd HH:mm" @change="handleLotteryTimeChange">
            </el-date-picker>
            时间自动开奖
          </template>
          <template v-else>
            满 <el-input v-model="param.lotteryNum" v-only-num="param.lotteryNum" :max-len="8" class="w100"></el-input> 人参加自动开奖
          </template>
        </el-form-item>
        <el-form-item label="APP专享：">
          <el-radio-group v-model="param.appOnly">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="口令抽奖：">
          <el-radio-group v-model="param.needPasswd">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" " v-if="param.needPasswd">
          <template>
            <el-input v-model.trim="param.passwd" :maxLength="20" class="w400"></el-input> (口令值)
            <el-input v-model.trim="param.passwdTip" :maxLength="100" class="w400"></el-input> (口令提示)
          </template>
        </el-form-item>
        <el-form-item label="用户等级：">
          <el-radio-group v-model="param.userLevelSwitch">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
          <el-select v-if="param.userLevelSwitch === 1" v-model="param.userVlevel" placeholder="请选择">
            <el-option v-for="item in Vlist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-if="param.userLevelSwitch === 1">及以上（V及以上即为全部用户）</span>
        </el-form-item>
        <el-form-item label="组队类型：">
          <el-radio-group v-model="param.groupType">
            <el-radio :label="0">不可组队</el-radio>
            <el-radio :label="1">强制组队</el-radio>
            <el-radio :label="2">非强制组队</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" " v-if="param.groupType !== 0">
          <template v-if="param.groupType === 1">
            <el-input v-model="param.forceGroupNum" v-only-num="param.forceGroupNum" :max-len="2" class="w100"></el-input> 人/队
          </template>
          <template v-if="param.groupType === 2">
            <el-input v-model="param.nonForceGroupNum" v-only-num="param.nonForceGroupNum" :max-len="2" class="w100"></el-input> 人/队
          </template>
        </el-form-item>
        <el-form-item label="奖品来源：">
          <el-radio-group v-model="param.source">
            <el-radio :label="0">平台奖品</el-radio>
            <el-radio :label="1">商家奖品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖品数量：">
          <el-input v-model="param.rewardNum" v-only-num="param.rewardNum" :max-len="8" class="w100"></el-input>
          <span class="font font-info">（强制组队必须为组队人数的整数倍，非强制组队必须大于等于组队人数）</span>
        </el-form-item>
        <el-form-item label="虚拟参与人：" v-if="param.source === 0">
          <el-input v-model="param.rebotNum" v-only-num="param.rebotNum" :max-len="3" class="w100"></el-input>
          <span class="font font-info">（虚拟参与人数不占用奖品数量，强制组队必须为组队人数的整数倍）</span>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="goNext">下一步</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'addOne',
    data () {
      return {
        startTime:new Date(),
        lotteryTime:null,
        Vlist:[{label:"V",value:0},{label:"V1",value:1},{label:"V2",value:2},{label:"V3",value:3},{label:"V4",value:4},{label:"V5",value:5}],
        param: { // 新增抽奖活动参数
          lotteryName: '', //抽奖活动名称
          startTime: '',//开始时间
          lotteryType: 1, //开奖方式
          lotteryTime: '',// 开奖时间
          lotteryNum: '', // 开奖人数
          appOnly: 0, // 是否app专享
          needPasswd:0, // 是否开启口令
          passwd:'', // 口令内容
          passwdTip:'', // 口令提示
          userLevelSwitch:0, // 用户等级开关
          userVlevel:0, // 用户等级
          groupType: 0, //组队类型
          forceGroupNum:'',//强制组队人数
          nonForceGroupNum: '', // 非强制组队人数
          source:0, // 奖品来源
          rewardNum:'', //奖品数量
          rebotNum:'', //虚拟中奖人数
          shopRewardId:'',//商家商品id
          shopRewardName:'', // 商家奖品名称
          platformRewardId: '',// 平台奖品id
          platformRewardName:'',//平台奖品名称
          guide:0, //是否导流模块
          discountMoney:0, //是否体验金
          hookAppActivateRightsGold:0, // 挂接APP激活权益金
          hookHelp:0,       // 挂接助力
          hookPrivilege:0,  // 挂接特权金
          channelPageShow:0,// 频道页展示
          isWhiteList:0,    // 白名单
          rewardDesc:''//奖品描述
        }
      }
    },
    mounted () {
      this.handleCache()
      this.handleChange(this.startTime)
    },
    methods:{
      // 处理开始时间的变化
      handleChange (date) {
        this.param.startTime = this.$utils.dateToString(date)
      },
      // 处理到期时间的变化
      handleLotteryTimeChange (date) {
        this.param.lotteryTime = this.$utils.dateToString(date)
      },
      // 处理缓存
      handleCache () {
        // 如果之前记录的信息，并且是从第二步骤返回回来的，则显示信息,之后移除信息，不做记录
        if(localStorage.getItem('onlyAdd')){
          this.param = JSON.parse(localStorage.getItem('lottery'))
          // 重新绑定开始时间和开奖时间的日期格式
          this.startTime = new Date(this.param.startTime)
          if(this.param.lotteryTime !== ""){
            this.lotteryTime = new Date(this.param.lotteryTime)
          }
        }
        localStorage.removeItem('onlyAdd')
        localStorage.removeItem('lottery')
      },
      // 校验参数
      modifyParam () {
        if(this.param.lotteryName === ''){ // 抽奖活动名称
          this.$message.warning("请输入1-40字抽奖活动名称");return
        }
        if(this.param.startTime === ''){ // 抽奖活动名称
          this.$message.warning("请输入开始时间");return
        }
        // 满人开奖下，对应人数必填
        if(this.param.lotteryType === 0 && this.param.lotteryNum < 2){
          this.$message.warning("请输入2-99999999人的满人开奖数值");return
        }
        // 到期开奖下，对应开奖时间必填
        if(this.param.lotteryType === 1 && (this.param.lotteryTime === '' || new Date(this.param.lotteryTime+":00").getTime() <= new Date(this.param.startTime+":00").getTime())){
           this.$message.warning("开奖时间必须大于开始时间");return
        }
        // 口令开启状态下，口令值和提示必填
        if(this.param.needPasswd === 1 && this.param.passwd === ''){
          this.$message.warning("请输入1-20字口令值");return
        }
        if(this.param.needPasswd === 1 && this.param.passwdTip === ''){
          this.$message.warning("请输入1-100字口令提示");return
        }
        // 组队类型-强制组队或者非强制组队下，组队人数必填
          if((this.param.groupType === 1 && (this.param.forceGroupNum <2 || this.param.forceGroupNum > 20)) || (this.param.groupType === 2 && (this.param.nonForceGroupNum <2 || this.param.nonForceGroupNum > 20))){
            this.$message.warning("请输入2-20组队人数");return
          }
          //开奖时机为满人开奖、组队类型为强制组队，则满人输入的人数必须为组队人数的整数倍
          if(this.param.lotteryType === 0 && this.param.groupType === 1 && this.param.lotteryNum % this.param.forceGroupNum !== 0){
            this.$message.warning("满人开奖人数必须是强制组队的组队人数整数倍");return
          }
          //满人开奖，非强制组队，满人开奖人数必须大于组队人数
          if(this.param.lotteryType === 0 && this.param.groupType === 2 && this.param.lotteryNum <= this.param.nonForceGroupNum){
            this.$message.warning("满人开奖人数必须大于非强制组队的组队人数");return
          }
          // 校验奖品数量
          // 强制组队，奖品数量必须为组队人数的整数倍
          if(this.param.groupType === 1 && (this.param.rewardNum === '' || this.param.rewardNum % this.param.forceGroupNum !== 0)){
            this.$message.warning("请输入组队人数的整数倍奖品数量");return
          }
          // 非强制组队，奖品数量必须大于组队人数
          if(this.param.groupType === 2 && this.param.rewardNum < this.param.nonForceGroupNum){
            this.$message.warning("奖品数量必须大于等于组队人数");return
          }
          if(this.param.source===0 && (this.param.rewardNum<0 || this.param.rewardNum === '')){ // 不可开奖时限制0-99999999
            this.$message.warning("请输入0-99999999的奖品数量值");return
          }
          if(this.param.source===1 && (this.param.rewardNum<1 || this.param.rewardNum === '')){ // 不可开奖时限制1-99999999
            this.$message.warning("请输入1-99999999的奖品数量值");return
          }
          if(this.param.rewardNum + this.param.rebotNum === 0){ // 平台奖品数量+虚拟奖品必须大于0
            this.$message.warning("平台奖品数量+虚拟参与人必须大于0");return
          }
        // 虚拟参与人
          if(this.param.source === 0){//平台选品下考虑虚拟参与人
            if(this.param.rebotNum === ''){//平台选品下，虚拟参与人限制在0-999
              this.$message.warning("请输入0-999人的虚拟参与人值");return
            }
            if(this.param.groupType === 1 && this.param.rebotNum % this.param.forceGroupNum !== 0){
              this.$message.warning("虚拟参与人数必须为强制组队的组队人数整数倍");return
            }
          }
        return true
      },
      // 校验通过进入下一步
      goNext () {
        if(this.modifyParam()){
          // 校验通过后暂存抽奖活动数据
          localStorage.setItem('lottery',JSON.stringify(this.param))
          this.$router.push('/luckDraw/luckDrawList/add_two')
        }
      },
      goBack () {
        this.$confirm('返回将不保存数据，确认吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.back()
        })
      }
    }
  }
</script>
<style scoped>
  .input-normal {width:800px; }
</style>
