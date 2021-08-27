<template>
  <div>
    <el-card class="card">
      <el-form label-width="160px">
        <el-form-item label="弹窗页面：">老客订单相关</el-form-item>
        <el-form-item label="启用状态：">
          <el-radio-group v-model="param.enableStatus" :disabled="editState">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖励次数：">
          <span v-if="editState">{{param.rewardCount}}</span>
          <div v-else>
            <el-input class="w300" v-model="param.rewardCount" maxlength="3" :disabled="editState" @input="$utils.onlyNum(param, 'rewardCount', param.rewardCount)"></el-input>
            <p class="font-info">全部奖励获得的总次数</p>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <config-node-a :editState="editState" ref="configNode1" name="configNode1"></config-node-a>
    <config-node-b :editState="editState" ref="configNode2" name="configNode2"></config-node-b>
    <config-node-c :editState="editState" ref="configNode3" name="configNode3"></config-node-c>
    <config-node-d :editState="editState" ref="configNode4" name="configNode4"></config-node-d>
    <config-node-e :editState="editState" ref="configNode5" name="configNode5"></config-node-e>
    <config-node-f :editState="editState" ref="configNode6" name="configNode6"></config-node-f>
    <config-node-g :editState="editState" ref="configNode7" name="configNode7"></config-node-g>
    <config-node-h :editState="editState" ref="configNode8" name="configNode8"></config-node-h>
    <config-node-i :editState="editState" ref="configNode9" name="configNode9"></config-node-i>
    <config-node-j :editState="editState" ref="configNode10" name="configNode10"></config-node-j>
    <div class="ma-t-20 align-center" v-if="!editState">
        <el-button @click="submitModule" type="primary">提交保存</el-button>
        <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import Upload from '@/components/upload'
import ConfigNodeA from './configNodeA'
import ConfigNodeB from './configNodeB'
import ConfigNodeC from './configNodeC'
import ConfigNodeD from './configNodeD'
import ConfigNodeE from './configNodeE'
import ConfigNodeF from './configNodeF'
import ConfigNodeG from './configNodeG'
import ConfigNodeH from './configNodeH'
import ConfigNodeI from './configNodeI'
import ConfigNodeJ from './configNodeJ'
export default {
  name: 'oldClientsOrder',
  props: {
    editState: { // 页面是否不可编辑(禁用状态)
      type: Boolean,
      default: false
    },
    logDetails: { // 页面是否作为日志详情
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      param: {
        enableStatus: false, // 启用状态
        rewardCount: '' // 奖励次数
      },
      configNode1: [],
      logId: '' // 日志详情时传参用
      
    
    }
  },
  components: {
    Upload, ConfigNodeA, ConfigNodeB, ConfigNodeC, ConfigNodeD, ConfigNodeE, ConfigNodeF, ConfigNodeG, ConfigNodeH,  ConfigNodeI, ConfigNodeJ
  },
  mounted () {
    if (!this.logDetails) this.getDetail()
  },
  methods: {
    getDetail () {
      let getURL = this.logDetails ? 'queryOldCustomerDetail' : 'queryOldCustomerConfig'
      let parm = this.logDetails ? {'logId': this.logId} : {}
      this.$service.systemSetting.dialogManagementOld[getURL](parm).then(res => {
        this.param.enableStatus = res.enableStatus
        this.param.rewardCount = res.rewardCount || ''
        this.$refs.configNode1.getDate(res.configNode1)
        this.$refs.configNode2.getDate(res.configNode2) 
        this.$refs.configNode3.getDate(res.configNode3)
        this.$refs.configNode4.getDate(res.configNode4)
        this.$refs.configNode5.getDate(res.configNode5)
        this.$refs.configNode6.getDate(res.configNode6)
        this.$refs.configNode7.getDate(res.configNode7)
        this.$refs.configNode8.getDate(res.configNode8)
        this.$refs.configNode9.getDate(res.configNode9)
        this.$refs.configNode10.getDate(res.configNode10)
      })
    },
    // 删除模块
    delModule (moduleNode,idx){
      this[moduleNode].splice(idx,1)
    },
    // 添加模块
    addModule (moduleNode){
      this[moduleNode].push(
        {
          configIndex: 1, // 节点序号
          baseConfigInfo: {
            minOrderTotalNum: '', // 最小成单次数
            maxOrderTotalNum: '', // 最大成单次数
            effectStatus: false, // 该配置项是否生效（false：不生效；true：生效） 
            popLocation: [],  // 弹窗显示位置  1-首页； 2-个人中心页； 3-退款详情页； 4-订单列表页； 5-订单详情页
            closeButtonEffectStatus: true // 关闭按钮是否生效
          },
          orderPopConfigList: [{ // 订单弹窗配置集合
            orderType: 0, // 订单类型： 0-普通订单 41-一起拼开团 42-一起拼参团
            orderTypeName: '普通订单', // 订单类型名称
            orderSwitch: false, // 订单是否打开
            oldPopImgUrl: '', // 首版-弹窗图片url地址
            newPopImgUrl: '', // 首版后-弹窗图片url地址
            countDownStatus: false, // 是否显示倒计时
            countDownHour: '', // 倒计时-小时
            countDownMin: '', // 倒计时-分钟
            hangUpAwardType: 0, // 挂接模块, 0-不挂接；1-特权金；2-参团卡；3-全民拼卡
            routeList:[{
              clientType: 4, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            },{
              clientType: 2, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            },{
              clientType: 1, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            }]
          },{ // 订单弹窗配置集合
            orderType: 41, // 订单类型： 0-普通订单 41-一起拼开团 42-一起拼参团
            orderTypeName: '一起拼开团', // 订单类型名称
            orderSwitch: false, // 订单是否打开
            oldPopImgUrl: '', // 首版-弹窗图片url地址
            newPopImgUrl: '', // 首版后-弹窗图片url地址
            countDownStatus: false, // 是否显示倒计时
            countDownHour: '', // 倒计时-小时
            countDownMin: '', // 倒计时-分钟
            hangUpAwardType: 0, // 挂接模块, 0-不挂接；1-特权金；2-参团卡；3-全民拼卡
            routeList:[{
              clientType: 4, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            },{
              clientType: 2, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            },{
              clientType: 1, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            }]
          },{ // 订单弹窗配置集合
            orderType: 42, // 订单类型： 0-普通订单 41-一起拼开团 42-一起拼参团
            orderTypeName: '一起拼参团', // 订单类型名称
            orderSwitch: false, // 订单是否打开
            oldPopImgUrl: '', // 首版-弹窗图片url地址
            newPopImgUrl: '', // 首版后-弹窗图片url地址
            countDownStatus: false, // 是否显示倒计时
            countDownHour: '', // 倒计时-小时
            countDownMin: '', // 倒计时-分钟
            hangUpAwardType: 0, // 挂接模块, 0-不挂接；1-特权金；2-参团卡；3-全民拼卡
            routeList:[{
              clientType: 4, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            },{
              clientType: 2, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            },{
              clientType: 1, // 客户端类型, 1-ios；2-Android； 4-小程序
              checkedStatus: false, // 客户端是否被选中
              jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
              jumpPath: '' // 跳转路径
            }]
          }]
        }
      )
    },
    submitModule () {
      if (this.param.rewardCount === '' || this.param.rewardCount === null) {
        return this.$message.warning('奖励次数必须是1-999的整数')
      }
      this.param.rewardCount = parseInt(this.param.rewardCount)
      
      if (this.param.rewardCount === 0) {
        return this.$message.warning('奖励次数必须是1-999的整数')
      }
      if (this.checkout(this.$refs.configNode1.checkout, 'configNode1')) return false
      if (this.checkout(this.$refs.configNode2.checkout, 'configNode2')) return false
      if (this.checkout(this.$refs.configNode3.checkout, 'configNode3')) return false
      if (this.checkout(this.$refs.configNode4.checkout, 'configNode4')) return false
      if (this.checkout(this.$refs.configNode5.checkout, 'configNode5')) return false
      if (this.checkout(this.$refs.configNode6.checkout, 'configNode6')) return false
      if (this.checkout(this.$refs.configNode7.checkout, 'configNode7')) return false
      if (this.checkout(this.$refs.configNode8.checkout, 'configNode8')) return false
      if (this.checkout(this.$refs.configNode9.checkout, 'configNode9')) return false
      if (this.checkout(this.$refs.configNode10.checkout, 'configNode10')) return false
      this.$service.systemSetting.dialogManagementOld.updateOldCustomerConfig(this.param).then(res => {
        this.$message.success('提交成功')
        this.$router.push({path: '/dialogManagementOld'})
      })
    },
    checkout (fun, val) {
      return !(this.param[val] = fun())
    },
    goBack () {
      this.$router.push({path: '/dialogManagementOld'})
    }
  },
}
</script>
<style type="text/css" scoped>
  .delIcon{ position: absolute; right: 80px; padding-left: 10px; padding-right: 10px;}
  .orderWrap{ border: 1px solid #EBEEF5; margin-top: 10px; background-color: #fbfbfb;}
  .orderHeader{ border-bottom: 1px solid #EBEEF5; padding: 10px 20px;}
  img{ cursor: pointer;}
</style>
