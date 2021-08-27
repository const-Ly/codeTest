<template>
  <el-card class="card ma-t-20">
    <el-collapse class="ma-b-10" v-for="(item, index) in configNode" :key="index">
      <el-collapse-item class="ma-b-20">
        <template  slot="title" class="relative">
          <p>
            {{item.configNodeName}} &lt;{{index + 1}}&gt; &nbsp;&nbsp; (
            <span v-if="item.baseConfigInfo.effectStatus">生效，成单次数</span>
            <span v-else>不生效，成单次数</span>
            <span v-show="item.baseConfigInfo.minOrderTotalNum !== ''">{{item.baseConfigInfo.minOrderTotalNum}}-{{item.baseConfigInfo.maxOrderTotalNum}}</span>
            <span v-show="item.baseConfigInfo.minOrderTotalNum === ''">--</span>
            )
          </p> 
          <span class="font-blue delIcon" v-if="!editState" v-show="configNode.length>1" @click.stop="delModule('configNode', index)">删除</span>
        </template>
        <template>
          <el-form label-width="160px">
            <el-form-item label="成单次数：">
              <div v-if="editState">最小&nbsp;&nbsp;{{item.baseConfigInfo.minOrderTotalNum}}&nbsp;&nbsp;&nbsp;&nbsp;最大&nbsp;&nbsp;{{item.baseConfigInfo.maxOrderTotalNum}}</div>
              <div v-else>
                最小<el-input class="w100 ma-r-20 ma-l-10" v-model="item.baseConfigInfo.minOrderTotalNum" @input="$utils.onlyNum(item.baseConfigInfo, 'minOrderTotalNum', item.baseConfigInfo.minOrderTotalNum)" maxlength="6"></el-input>
                最大<el-input class="w100 ma-l-10" v-model="item.baseConfigInfo.maxOrderTotalNum" @input="$utils.onlyNum(item.baseConfigInfo, 'maxOrderTotalNum', item.baseConfigInfo.maxOrderTotalNum)" maxlength="6"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="是否生效：">
              <el-radio-group v-model="item.baseConfigInfo.effectStatus" :disabled="editState">
                <el-radio :label="true">生效</el-radio>
                <el-radio :label="false">不生效</el-radio>
              </el-radio-group>
              <p class="font-info" v-if="!editState">不生效该节点总体不弹出弹窗</p>
            </el-form-item>
            <el-form-item label="显示位置：">
              <el-checkbox-group v-model="item.baseConfigInfo.popLocation" :disabled="editState">
                <el-checkbox :label="1">首页</el-checkbox>
                <el-checkbox :label="2">个人中心</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="关闭按钮：">
              <el-radio-group v-model="item.baseConfigInfo.closeButtonEffectStatus" :disabled="editState">
                <el-radio :label="true">生效</el-radio>
                <el-radio :label="false">不生效</el-radio>
              </el-radio-group>
              <p class="font-info" v-if="!editState">关闭按钮不生效，点击关闭按钮同点击弹窗</p>
            </el-form-item>
          </el-form>
          <div v-for="(i, idx) in item.orderPopConfigList" :key="idx" class="orderWrap">
            <div class="clearfix orderHeader">
              <span class="ma-r-20">{{i.orderTypeName}}</span>
              <el-switch v-model="i.orderSwitch" active-color="#13ce66" :disabled="editState"></el-switch>
            </div>
            <el-form label-width="160px" class="ma-t-20" v-show="i.orderSwitch">
              <el-form-item label="弹窗图片：">
                <div v-if="editState">
                  <img-view class=" ma-r-20" :src="i.oldPopImgUrl"></img-view>
                  <img-view :src="i.newPopImgUrl"></img-view>
                </div>
                <div v-else>
                  <upload class="inline-block ma-r-20" action="/image/uploadImage?width=-1&height=-1&fileSize=300" :size='300' :image-url="i.oldPopImgUrl" @success="i.oldPopImgUrl = $event" :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                  :type="['.jpg','.jpeg','.png','.gif']"></upload>
                  <upload class="inline-block" action="/image/uploadImage?width=-1&height=-1&fileSize=300" :size='300' :image-url="i.newPopImgUrl" @success="i.newPopImgUrl = $event" :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                  :type="['.jpg','.jpeg','.png','.gif']"></upload>
                  <p class="font-info">图一为首版（APP5.5.0）弹窗图片，图二为首版之后（APP版本大于5.5.0）弹窗图片 支持jpg、png、gif格式文件，小于300k</p>
                </div>
              </el-form-item>
              <el-form-item label="显示倒计时：">
                <el-radio-group v-model="i.countDownStatus" class="ma-r-20" :disabled="editState">
                  <el-radio :label="false">不显示</el-radio>
                  <el-radio :label="true">显示</el-radio>
                </el-radio-group>
                <div v-if="editState && i.countDownStatus" class="inline-block">
                  小时&nbsp;&nbsp;{{i.countDownHour}}&nbsp;&nbsp;&nbsp;&nbsp; 分钟&nbsp;&nbsp;{{i.countDownMin}}
                </div>
                <div v-show="!editState && i.countDownStatus" class="inline-block">
                  <span v-show="i.countDownStatus" class="ma-r-10">
                  小时
                  <el-input class="w100 ma-l-10" v-model="i.countDownHour" maxlength="2" @input="$utils.onlyNum(i, 'countDownHour', i.countDownHour)"></el-input>
                </span>
                <span v-show="!editState && i.countDownStatus">
                  分钟
                  <el-input class="w100 ma-l-10" v-model="i.countDownMin" maxlength="2" @input="$utils.onlyNum(i, 'countDownMin', i.countDownMin)"></el-input>
                </span>
                </div>
              </el-form-item>
              <el-form-item label="挂接模块：">
                <el-select v-model="i.hangUpAwardType" class="w200" :disabled="editState">
                  <el-option label="不挂接" :value="0"></el-option>
                  <el-option label="特权金" :value="1"></el-option>
                  <el-option label="参团卡" :value="2"></el-option>
                  <el-option label="全民拼卡" :value="3"></el-option>
                  <el-option label="抽奖卡" :value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="终端配置：">
                <div v-for="(o, num) in i.routeList" :key="num" class="ma-b-10">
                  <el-checkbox v-model="o.checkedStatus" class="w100" :disabled="editState">
                    <span v-if="o.clientType === 4">小程序</span>
                    <span v-else-if="o.clientType === 2">Android</span>
                    <span v-if="o.clientType === 1">IOS</span>
                  </el-checkbox>
                  <div v-show="o.checkedStatus" class="inline-block">
                    <span class="ma-l-10">跳转类型</span>
                    <el-select class="ma-l-10 w200" v-model="o.jumpType" placeholder="请选择" :disabled="editState">
                      <el-option label="页面路由" :value="1"></el-option>
                      <el-option label="首页" :value="2"></el-option>
                      <el-option label="关闭弹窗" :value="3"></el-option>
                    </el-select>
                    <span class="ma-l-10" v-if="editState && o.jumpType === 1">{{o.jumpPath}}</span>
                    <el-input class="w300 ma-l-10" v-show="!editState && o.jumpType === 1" v-model="o.jumpPath" maxlength="999"></el-input>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-button class="ma-t-20" type="primary" v-if="!editState" v-show="configNode.length<3" @click="addModule('configNode')">再添加一条</el-button>
  </el-card>
</template>

<script type="text/javascript">
import Upload from '@/components/upload1'
export default {
  name: 'configNodeH',
  props: {
    editState: { // 页面是否不可编辑(禁用状态)
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      configNode: []
    }
  },
  components: {
    Upload
  },
  mounted () {
  },
  methods: {
    getDate (data) {
      this.configNode = data
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
          configNodeName: this.configNode[0].configNodeName,
          baseConfigInfo: {
            minOrderTotalNum: '', // 最小成单次数
            maxOrderTotalNum: '', // 最大成单次数
            effectStatus: false, // 该配置项是否生效（false：不生效；true：生效） 
            popLocation: [],  // 弹窗显示位置  1-首页； 2-个人中心页； 3-退款详情页； 4-订单列表页； 5-订单详情页
            closeButtonEffectStatus: true // 关闭按钮是否生效
          },
          orderPopConfigList: [{ // 订单弹窗配置集合
            orderType: 0, // 订单类型： 0-普通订单 41-一起拼开团 42-一起拼参团 5-抢返现订单
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
            orderType: 41, // 订单类型： 0-普通订单 41-一起拼开团 42-一起拼参团 5-抢返现订单
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
            orderType: 42, // 订单类型： 0-普通订单 41-一起拼开团 42-一起拼参团 5-抢返现订单
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
          },{ // 订单弹窗配置集合
            orderType: 5, // 订单类型： 0-普通订单 41-一起拼开团 42-一起拼参团 5-抢返现订单
            orderTypeName: '抢返现订单', // 订单类型名称
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
    checkout () {
      // 模块循环
      for(let i=0; i<this.configNode.length; i++) {
        let item = this.configNode[i]
        // 成单次数
        if (item.baseConfigInfo.minOrderTotalNum === '' || item.baseConfigInfo.minOrderTotalNum === null || item.baseConfigInfo.maxOrderTotalNum === '' || item.baseConfigInfo.maxOrderTotalNum === null) {
          this.$message.warning('请输入成单次数')
          return false
        }
        item.baseConfigInfo.minOrderTotalNum = parseInt(item.baseConfigInfo.minOrderTotalNum)
        item.baseConfigInfo.maxOrderTotalNum = parseInt(item.baseConfigInfo.maxOrderTotalNum)
        if (item.baseConfigInfo.minOrderTotalNum > item.baseConfigInfo.maxOrderTotalNum) {
          this.$message.warning(item.configNodeName + ' <' +(i+1)+ '>成单次数最小值必须小于等于最大值')
          return false
        }
        // 订单循环
        for (let o=0; o<item.orderPopConfigList.length; o++) {
          let orderPop = item.orderPopConfigList[o]
          // 订单开启
          if (orderPop.orderSwitch) {
            // 图片
            if (!orderPop.oldPopImgUrl || !orderPop.newPopImgUrl) {
              this.$message.warning('请上传弹窗图片')
              return false
            }
            // 倒计时
            if (orderPop.countDownStatus) {
              if (orderPop.countDownHour==='' || orderPop.countDownHour===null || orderPop.countDownMin==='' || orderPop.countDownMin===null) {
                this.$message.warning('请输入' +item.configNodeName+ ' <' + (i+1) + '>  有效的显示倒计时时间，小时0-99，分钟0-59，小时分钟不可同为0')
                return false
              }
              orderPop.countDownHour = parseInt(orderPop.countDownHour)
              orderPop.countDownMin = parseInt(orderPop.countDownMin)
              if (orderPop.countDownHour>99 || orderPop.countDownMin>59 || (orderPop.countDownHour===0 && orderPop.countDownMin===0)) {
                this.$message.warning('请输入' +item.configNodeName+ ' <' + (i+1) + '>  有效的显示倒计时时间，小时0-99，分钟0-59，小时分钟不可同为0')
                return false
              }
            }
            // 终端循环
            for (let r=0; r<orderPop.routeList.length; r++) {
              let route = orderPop.routeList[r]
              let type
              if (route.clientType === 1){
                type = 'IOS'
              }else if (route.clientType === 2){
                type = 'Android'
              }else if (route.clientType === 4){
                type = '小程序'
              }
              // 选中终端
              if (route.checkedStatus) {
                // 未选择跳转类型
                if (!route.jumpType) {
                  this.$message.warning('请选择填写'+ item.configNodeName +' <' + (i+1) + '>' +type+'跳转类型')
                  return false
                }
                // 跳转类型为页面路由时，路由为空
                if (route.jumpType === 1 && !route.jumpPath) {
                  this.$message.warning('请输入页面路由')
                  return false
                }
              }
            }
          }
        }
        item.configIndex = i+1
      }
      return this.configNode
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
