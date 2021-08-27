<template>
  <el-card class="card">
    <div slot="header" class="clearfix">
      <span> 弹窗页面：{{configNode.sonPopName}}</span> 
    </div>
    <div>
      <el-form label-width="160px">
        <el-form-item label="成单次数：">
          <div v-if="editState">
            最小&nbsp;&nbsp;{{configNode.minNum}}&nbsp;&nbsp;&nbsp;&nbsp;
            最大&nbsp;&nbsp;{{configNode.maxNum}}</div>
          <div v-else>
            最小<el-input class="w150 ma-r-20 ma-l-10" v-model="configNode.minNum"
              @input="$utils.onlyNum(configNode, 'minNum', configNode.minNum)"
              maxlength="6"></el-input>
            最大<el-input class="w150 ma-l-10" v-model="configNode.maxNum"
              @input="$utils.onlyNum(configNode, 'maxNum', configNode.maxNum)"
              maxlength="6"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="生效时间：">
          <el-date-picker v-model="datePicker" v-if="!editState"
            type="datetimerange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <span v-else>{{ datePicker[0] }} -- {{ datePicker[1] }}</span>
        </el-form-item>
        <el-form-item label="显示位置：">
          <el-checkbox-group v-model="configNode.popLocation" :disabled="editState">
            <el-checkbox v-for="item in selectedList" :key="item.sonPopCode"
              :label="item.popLocationId">{{item.popLocationName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="关闭按钮：">
          <el-radio-group v-model="configNode.closeButtonEffectStatus" :disabled="editState">
            <el-radio :label="true">生效</el-radio>
            <el-radio :label="false">不生效</el-radio>
          </el-radio-group>
          <p class="font-info" v-if="!editState">关闭按钮不生效，点击关闭按钮同点击弹窗</p>
        </el-form-item>
      </el-form>
      <div class="orderWrap" v-for="(item, idx) in configNode.oldCustomerOrderPopConfigList" :key="idx">
        <div class="clearfix orderHeader">
          <span class="ma-r-20">{{item.orderTypeName}}</span>
          <el-switch class="fr" v-model="item.orderSwitch" active-color="#13ce66" :disabled="editState"></el-switch>
        </div>
        <el-form label-width="160px" class="ma-t-20" v-show="item.orderSwitch">
          <el-form-item label="挂接模块：">
            <el-select v-model="item.hangUpAwardType" class="w200" :disabled="editState">
              <el-option label="不挂接" :value="0"></el-option>
              <el-option label="特权金" :value="1"></el-option>
              <el-option label="参团卡" :value="2"></el-option>
              <el-option label="全民拼卡" :value="3"></el-option>
              <el-option label="抽奖卡" :value="5"></el-option>
              <el-option label="好友弹窗" :value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="item.hangUpAwardType === 6" label="弹窗图片：">
            <div v-if="editState">
              <img-view class="ma-r-20" :src="item.authAddressBookHaveFriendImgUrl"></img-view>
              <img-view class="ma-r-20" :src="item.authAddressBookNoFriendImgUrl"></img-view>
              <img-view class="ma-r-20" :src="item.noAuthAddressBookHaveFriendImgUrl"></img-view>
              <img-view :src="item.noAuthAddressBookNoFriendImgUrl"></img-view>
            </div>
            <div v-else>
              <upload class="inline-block ma-r-20"
                action="/image/uploadImage?width=-1&height=-1&fileSize=300"
                :size='300' :image-url="item.authAddressBookHaveFriendImgUrl"
                @success="item.authAddressBookHaveFriendImgUrl = $event"
                :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                :type="['.jpg','.jpeg','.png','.gif']"></upload>
              <upload class="inline-block ma-r-20"
                action="/image/uploadImage?width=-1&height=-1&fileSize=300"
                :size='300' :image-url="item.authAddressBookNoFriendImgUrl"
                @success="item.authAddressBookNoFriendImgUrl = $event"
                :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                :type="['.jpg','.jpeg','.png','.gif']"></upload>
              <upload class="inline-block ma-r-20"
                action="/image/uploadImage?width=-1&height=-1&fileSize=300"
                :size='300' :image-url="item.noAuthAddressBookHaveFriendImgUrl"
                @success="item.noAuthAddressBookHaveFriendImgUrl = $event"
                :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                :type="['.jpg','.jpeg','.png','.gif']"></upload>
              <upload class="inline-block"
                action="/image/uploadImage?width=-1&height=-1&fileSize=300"
                :size='300' :image-url="item.noAuthAddressBookNoFriendImgUrl"
                @success="item.noAuthAddressBookNoFriendImgUrl = $event"
                :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                :type="['.jpg','.jpeg','.png','.gif']"></upload>
              <p class="font-info">4张图片依次为：通讯录已授权有好友、无好友，通讯录未授权有好友、无好友；支持jpg、png、gif格式文件，小于300k</p>
            </div>
          </el-form-item>
          <el-form-item v-else label="弹窗图片：">
            <div v-if="editState">
              <img-view class="ma-r-20" :src="item.oldPopImgUrl"></img-view>
              <img-view :src="item.newPopImgUrl"></img-view>
            </div>
            <div v-else>
              <upload class="inline-block ma-r-20"
                action="/image/uploadImage?width=-1&height=-1&fileSize=300"
                :size='300' :image-url="item.oldPopImgUrl"
                @success="item.oldPopImgUrl = $event"
                :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                :type="['.jpg','.jpeg','.png','.gif']"></upload>
              <upload class="inline-block"
                action="/image/uploadImage?width=-1&height=-1&fileSize=300"
                :size='300' :image-url="item.newPopImgUrl"
                @success="item.newPopImgUrl = $event"
                :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                :type="['.jpg','.jpeg','.png','.gif']"></upload>
              <p class="font-info">图一为首版（APP5.5.0）弹窗图片，图二为首版之后（APP版本大于5.5.0）弹窗图片 支持jpg、png、gif格式文件，小于300k</p>
            </div>
          </el-form-item>
          <el-form-item label="显示倒计时：">
            <el-radio-group v-model="item.countDownStatus" class="ma-r-20" :disabled="editState">
              <el-radio :label="false">不显示</el-radio>
              <el-radio :label="true">显示</el-radio>
            </el-radio-group>
            <div v-if="editState && item.countDownStatus" class="inline-block">
              小时&nbsp;&nbsp;{{item.countDownHour}}&nbsp;&nbsp;&nbsp;&nbsp;
              分钟&nbsp;&nbsp;{{item.countDownMin}}
            </div>
            <div v-show="!editState && item.countDownStatus" class="inline-block">
              <span v-show="item.countDownStatus" class="ma-r-10">
              小时 <el-input class="w100 ma-l-10" v-model="item.countDownHour" maxlength="2"
                @input="$utils.onlyNum(item, 'countDownHour', item.countDownHour)"></el-input>
            </span>
            <span v-show="!editState && item.countDownStatus">
              分钟 <el-input class="w100 ma-l-10" v-model="item.countDownMin" maxlength="2"
                @input="$utils.onlyNum(item, 'countDownMin', item.countDownMin)"></el-input>
            </span>
            </div>
          </el-form-item>
          <el-form-item label="终端配置：">
            <div v-for="(o, num) in item.routeList" :key="num" class="ma-b-10">
              <el-checkbox v-model="o.checkedStatus" class="w100" :disabled="editState">
                <span>{{ o.clientTypeName }}</span>
              </el-checkbox>
              <div v-show="o.checkedStatus" class="inline-block x-box">
                <span class="ma-l-10">跳转类型</span>
                <el-select class="ma-l-10 w200" v-model="o.jumpType" placeholder="请选择" :disabled="editState">
                  <el-option label="页面路由" :value="1"></el-option>
                  <el-option label="首页" :value="2"></el-option>
                  <el-option label="关闭弹窗" :value="3"></el-option>
                </el-select>
                <span class="ma-l-10" v-if="editState && o.jumpType === 1">{{o.jumpPath}}</span>
                <el-input class="w300 ma-l-10" v-show="!editState && o.jumpType === 1" v-model.trim="o.jumpPath" maxlength="999"></el-input>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="ma-t-20">
      <el-button class="ma-t-20" type="primary" v-if="!editState" @click="submit">提交保存</el-button>
      <el-button class="ma-t-20" v-if="!isLog && !editState" @click="goback">返 回</el-button>
    </div>
  </el-card>
</template>

<script type="text/javascript">
import Upload from '@/components/upload1'

export default {
  name: 'oldGuestChildAdd',
  props: {
    editState: { // 页面是否只读，true为只读状态(禁用状态)
      type: Boolean,
      default: false
    },
    isLog: { // 是否日志快照
      type: Boolean,
      default: false
    },
    id: { // id
      type: String,
      default: ''
    },
    sonPopCode: { // sonPopCode
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedList: [],
      datePicker: '',
      configNode: {
        sonNodeId: '', // id
        sonPopCode: '', // 老客相关子弹窗枚举（401-410）
        sonPopName: '', // 子弹窗名称
        minNum: '', // 最小成单次数
        maxNum: '', // 最大成单次数
        effectStartTime: '', // 生效开始时间
        effectEndTime: '', // 生效结束时间
        effectStatus: '', // 生效状态枚举（1-待生效、2-生效中、3-已失效）
        popLocation: [], // 已勾选弹窗位置集合
        closeButtonEffectStatus: true, // 是否生效，默认生效
        oldCustomerOrderPopConfigList: [
          {
            orderSwitch: false, // 默认关闭状态
            orderType: 0, // 订单类型枚举当前仅有：0、41、42、5
            orderTypeName: '普通订单', // 订单类型名称
            oldPopImgUrl: '', // 首版-弹窗图片url地址
            newPopImgUrl: '', // 首版后-弹窗图片url地址
            authAddressBookHaveFriendImgUrl: '', // 通讯录已授权有好友图片url地址
            authAddressBookNoFriendImgUrl: '', // 通讯录已授权无好友图片url
            noAuthAddressBookHaveFriendImgUrl: '', // 通讯录未授权有好友图片url地址
            noAuthAddressBookNoFriendImgUrl: '', // 通讯录未授权无好友图片url地址
            hangUpAwardType: 0, // 挂接类型枚举，当前仅有：0、1、2、3
            countDownStatus: false, // 是否显示倒计时
            countDownHour: '', // 倒计时-小时（倒计时开启时，有效）
            countDownMin: '', // 倒计时-分钟（倒计时开启时，有效）
            routeList: [
              {
                clientType: 1, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'IOS', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 2, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'Android', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 4, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: '小程序', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }
            ]
          }, {
            orderSwitch: false, // 默认关闭状态
            orderType: 41, // 订单类型枚举当前仅有：0、41、42、5
            orderTypeName: '一起拼开团', // 订单类型名称
            oldPopImgUrl: '', // 首版-弹窗图片url地址
            newPopImgUrl: '', // 首版后-弹窗图片url地址
            authAddressBookHaveFriendImgUrl: '', // 通讯录已授权有好友图片url地址
            authAddressBookNoFriendImgUrl: '', // 通讯录已授权无好友图片url
            noAuthAddressBookHaveFriendImgUrl: '', // 通讯录未授权有好友图片url地址
            noAuthAddressBookNoFriendImgUrl: '', // 通讯录未授权无好友图片url地址
            hangUpAwardType: 0, // 挂接类型枚举，当前仅有：0、1、2、3
            countDownStatus: false, // 是否显示倒计时
            countDownHour: '', // 倒计时-小时（倒计时开启时，有效）
            countDownMin: '', // 倒计时-分钟（倒计时开启时，有效）
            routeList: [
              {
                clientType: 1, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'IOS', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 2, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'Android', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 4, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: '小程序', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }
            ]
          }, {
            orderSwitch: false, // 默认关闭状态
            orderType: 42, // 订单类型枚举当前仅有：0、41、42、5
            orderTypeName: '一起拼参团', // 订单类型名称
            oldPopImgUrl: '', // 首版-弹窗图片url地址
            newPopImgUrl: '', // 首版后-弹窗图片url地址
            authAddressBookHaveFriendImgUrl: '', // 通讯录已授权有好友图片url地址
            authAddressBookNoFriendImgUrl: '', // 通讯录已授权无好友图片url
            noAuthAddressBookHaveFriendImgUrl: '', // 通讯录未授权有好友图片url地址
            noAuthAddressBookNoFriendImgUrl: '', // 通讯录未授权无好友图片url地址
            hangUpAwardType: 0, // 挂接类型枚举，当前仅有：0、1、2、3
            countDownStatus: false, // 是否显示倒计时
            countDownHour: '', // 倒计时-小时（倒计时开启时，有效）
            countDownMin: '', // 倒计时-分钟（倒计时开启时，有效）
            routeList: [
              {
                clientType: 1, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'IOS', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 2, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'Android', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 4, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: '小程序', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }
            ]
          }, {
            orderSwitch: false, // 默认关闭状态
            orderType: 5, // 订单类型枚举当前仅有：0、41、42、5
            orderTypeName: '抢返现订单', // 订单类型名称
            oldPopImgUrl: '', // 首版-弹窗图片url地址
            newPopImgUrl: '', // 首版后-弹窗图片url地址
            authAddressBookHaveFriendImgUrl: '', // 通讯录已授权有好友图片url地址
            authAddressBookNoFriendImgUrl: '', // 通讯录已授权无好友图片url
            noAuthAddressBookHaveFriendImgUrl: '', // 通讯录未授权有好友图片url地址
            noAuthAddressBookNoFriendImgUrl: '', // 通讯录未授权无好友图片url地址
            hangUpAwardType: 0, // 挂接类型枚举，当前仅有：0、1、2、3
            countDownStatus: false, // 是否显示倒计时
            countDownHour: '', // 倒计时-小时（倒计时开启时，有效）
            countDownMin: '', // 倒计时-分钟（倒计时开启时，有效）
            routeList: [
              {
                clientType: 1, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'IOS', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 2, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: 'Android', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }, {
                clientType: 4, // 客户端类型，1-ios；2-Android； 4-小程序
                clientTypeName: '小程序', // 客户端类型名称
                checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
                jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
                jumpPath: '' // 跳转路径
              }
            ]
          }
        ]
      }
    }
  },
  components: { Upload },
  mounted () {
    this.info()
  },
  methods: {
    info () {
      let arr = {
        401: '已付款＆退款成功',
        402: '生产中',
        403: '生产中&退款成功',
        404: '已发货',
        405: '已发货&退款成功',
        406: '已收货',
        407: '已收货&退款成功',
        408: '订单完结首次下发',
        409: '订单完结二次下发',
        410: '订单完结三次下发',
        411: '存量老客'
      }
      this.configNode.sonPopCode = this.$route.params.sonPopCode || this.sonPopCode
      if (this.id || this.$route.params.id) {
        this.configNode.sonNodeId = this.id || this.$route.params.id
        this.getPageInfo()
      }
      this.configNode.sonPopName = arr[this.configNode.sonPopCode]
      if (!this.editState) {
        document.querySelector('.el-breadcrumb')
        .querySelectorAll('.el-breadcrumb__inner')[2].innerHTML = this.configNode.sonPopName
      }
      this.getSelected()
    },
    getSelected () {
      this.$service.systemSetting.dialogManagement.queryPopLocationList({
        sonPopCode: this.configNode.sonPopCode
      }).then(res => {
        this.selectedList = res[0].popLocationList
      })
    },
    getPageInfo () {
      let _url = ''
      let param = {
        popCode: 4,
        sonPopCode: this.configNode.sonPopCode
      }
      if (this.isLog) {
        _url = 'querySonNodeLogDetail'
        param.logId = this.id || this.$route.params.id
      } else {
        param.sonNodeId = this.id || this.$route.params.id
        _url = 'querySonNodeDetail'
      }
      this.$service.systemSetting.dialogManagement[_url](param).then(res => {
        if (res) this.configNode = res.sonPopCodeNode4
        this.datePicker = [this.configNode.effectStartTime, this.configNode.effectEndTime]
      })
    },
    checkout () {
      // 成单次数
      const configNode = JSON.parse(JSON.stringify(this.configNode))
      if (configNode.minNum === '' || configNode.minNum === null ||
        configNode.maxNum === '' || configNode.maxNum === null) {
        this.$message.warning('请输入成单次数')
        return false
      }
      configNode.minNum = parseInt(configNode.minNum)
      configNode.maxNum = parseInt(configNode.maxNum)
      if (configNode.minNum > configNode.maxNum) {
        this.$message.warning('成单次数最小值必须小于等于最大值')
        return false
      }
      if (!this.datePicker) {
        this.$message.warning('请选择生效时间')
        return false
      }
      if (this.datePicker[1] - this.datePicker[0] < 5000 * 60) {
        this.$message.warning('开始时间必须小于结束时间且间隔必须大于等于5分钟')
        return false
      }
      if (typeof this.datePicker[0] !== 'string') {
        configNode.effectStartTime = this.$utils.date2str(this.datePicker[0])
        configNode.effectEndTime = this.$utils.date2str(this.datePicker[1])
      } else {
        configNode.effectStartTime = this.datePicker[0]
        configNode.effectEndTime = this.datePicker[1]
      }
      // 订单循环
      let orderPop = null
      for (let o = 0; o < configNode.oldCustomerOrderPopConfigList.length; o++) {
        orderPop = configNode.oldCustomerOrderPopConfigList[o]
        // 订单开启
        if (orderPop.orderSwitch) {
          // 图片
          if (orderPop.hangUpAwardType === 6) {
            orderPop.oldPopImgUrl = null
            orderPop.newPopImgUrl = null
            if (!orderPop.authAddressBookHaveFriendImgUrl ||
              !orderPop.authAddressBookNoFriendImgUrl ||
              !orderPop.noAuthAddressBookHaveFriendImgUrl ||
              !orderPop.noAuthAddressBookNoFriendImgUrl) {
                this.$message.warning('请上传弹窗图片')
                return false
              }
          } else {
            orderPop.authAddressBookHaveFriendImgUrl = null
            orderPop.authAddressBookNoFriendImgUrl = null
            orderPop.noAuthAddressBookHaveFriendImgUrl = null
            orderPop.noAuthAddressBookNoFriendImgUrl = null
            if (!orderPop.oldPopImgUrl || !orderPop.newPopImgUrl) {
              this.$message.warning('请上传弹窗图片')
              return false
            }
          }
          // 倒计时
          if (orderPop.countDownStatus) {
            if (orderPop.countDownHour==='' || orderPop.countDownHour===null ||
              orderPop.countDownMin==='' || orderPop.countDownMin===null) {
              this.$message.warning('请输入'+ orderPop.orderTypeName +'有效的显示倒计时时间，小时0-99，分钟0-59，小时分钟不可同为0')
              return false
            }
            orderPop.countDownHour = parseInt(orderPop.countDownHour)
            orderPop.countDownMin = parseInt(orderPop.countDownMin)
            if (orderPop.countDownHour>99 || orderPop.countDownMin>59 ||
              (orderPop.countDownHour===0 && orderPop.countDownMin===0)) {
              this.$message.warning('请输入'+ orderPop.orderTypeName +'有效的显示倒计时时间，小时0-99，分钟0-59，小时分钟不可同为0')
              return false
            }
          }
          // 终端循环
          for (let r=0; r<orderPop.routeList.length; r++) {
            let route = orderPop.routeList[r]
            let type = [null, 'IOS', 'Android', 'M站', '小程序'][route.clientType]
            // 选中终端
            if (route.checkedStatus) {
              // 未选择跳转类型
              if (!route.jumpType) {
                this.$message.warning('请选择填写'+ orderPop.orderTypeName + type +'跳转类型')
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
      return configNode
    },
    submit () {
      let param = this.checkout()
      if (!param) return
      this.$service.systemSetting.dialogManagement.oldCustomerAddOrUpdateSonConfig(param)
      .then(res => {
        if (res) this.goback()
      })
    },
    goback () {
      this.$router.push('/dialogManagement/oldGuest/childManagement/' + this.configNode.sonPopCode)
    }
  },
}
</script>

<style type="text/css" scoped>
  .delIcon{ position: absolute; right: 80px; padding-left: 10px; padding-right: 10px;}
  .orderWrap{ border: 1px solid #EBEEF5; margin-top: 10px; background-color: #fbfbfb;}
  .orderHeader{ border-bottom: 1px solid #EBEEF5; padding: 10px 20px;}
  img{ cursor: pointer;}
  .x-box {
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .x-box span {
    word-wrap: break-word;
  }
</style>
