<template>
  <el-card class="card">
    <div slot="header" class="clearfix">
      <span> 弹窗页面：{{configNode.sonPopName}}</span> 
    </div>
    <div>
      <el-form label-width="160px">
        <el-form-item label="弹窗顺序：">
          <el-select v-model="configNode.popSeqNum" class="w200" :disabled="editState">
            <el-option label="请选择" value=""></el-option>
            <el-option label="第1条" :value="1"></el-option>
            <el-option label="第2条" :value="2"></el-option>
            <el-option label="第3条" :value="3"></el-option>
            <el-option label="第4条" :value="4"></el-option>
            <el-option label="第5条" :value="5"></el-option>
          </el-select>
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
        <el-form-item label="关闭按钮：">
          <el-radio-group v-model="configNode.closeButtonEffectStatus" :disabled="editState">
            <el-radio :label="true">生效</el-radio>
            <el-radio :label="false">不生效</el-radio>
          </el-radio-group>
          <p class="font-info" v-if="!editState">关闭按钮不生效，点击关闭按钮同点击弹窗</p>
        </el-form-item>
        <el-form-item label="挂接模块：">
          <el-select v-model="configNode.hangUpAwardType" class="w200" :disabled="editState">
            <el-option label="不挂接" :value="0"></el-option>
            <el-option label="特权金" :value="1"></el-option>
            <el-option label="抽奖卡" :value="5"></el-option>
            <el-option label="好友弹窗" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="configNode.hangUpAwardType === 6" label="弹窗图片：">
          <div v-if="editState">
            <img-view class="ma-r-20" :src="configNode.authAddressBookHaveFriendImgUrl"></img-view>
            <img-view class="ma-r-20" :src="configNode.authAddressBookNoFriendImgUrl"></img-view>
            <img-view class="ma-r-20" :src="configNode.noAuthAddressBookHaveFriendImgUrl"></img-view>
            <img-view :src="configNode.noAuthAddressBookNoFriendImgUrl"></img-view>
          </div>
          <div v-else>
            <upload class="inline-block ma-r-20"
              action="/image/uploadImage?width=-1&height=-1&fileSize=300"
              :size='300' :image-url="configNode.authAddressBookHaveFriendImgUrl"
              @success="configNode.authAddressBookHaveFriendImgUrl = $event"
              :accept="'image/jpg,image/png,image/gif,image/jpeg'"
              :type="['.jpg','.jpeg','.png','.gif']"></upload>
            <upload class="inline-block ma-r-20"
              action="/image/uploadImage?width=-1&height=-1&fileSize=300"
              :size='300' :image-url="configNode.authAddressBookNoFriendImgUrl"
              @success="configNode.authAddressBookNoFriendImgUrl = $event"
              :accept="'image/jpg,image/png,image/gif,image/jpeg'"
              :type="['.jpg','.jpeg','.png','.gif']"></upload>
            <upload class="inline-block ma-r-20"
              action="/image/uploadImage?width=-1&height=-1&fileSize=300"
              :size='300' :image-url="configNode.noAuthAddressBookHaveFriendImgUrl"
              @success="configNode.noAuthAddressBookHaveFriendImgUrl = $event"
              :accept="'image/jpg,image/png,image/gif,image/jpeg'"
              :type="['.jpg','.jpeg','.png','.gif']"></upload>
            <upload class="inline-block"
              action="/image/uploadImage?width=-1&height=-1&fileSize=300"
              :size='300' :image-url="configNode.noAuthAddressBookNoFriendImgUrl"
              @success="configNode.noAuthAddressBookNoFriendImgUrl = $event"
              :accept="'image/jpg,image/png,image/gif,image/jpeg'"
              :type="['.jpg','.jpeg','.png','.gif']"></upload>
            <p class="font-info">4张图片依次为：通讯录已授权有好友、无好友，通讯录未授权有好友、无好友；支持jpg、png、gif格式文件，小于300k</p>
          </div>
        </el-form-item>
        <el-form-item v-else label="弹窗图片：">
          <div v-if="editState">
            <img-view :src="configNode.popImgUrl"></img-view>
          </div>
          <div v-else>
            <upload class="inline-block"
              action="/image/uploadImage?width=-1&height=-1&fileSize=300"
              :size='300' :image-url="configNode.popImgUrl"
              @success="configNode.popImgUrl = $event"
              :accept="'image/jpg,image/png,image/gif,image/jpeg'"
              :type="['.jpg','.jpeg','.png','.gif']"></upload>
            <p class="font-info">支持jpg、png、gif格式文件，小于300k</p>
          </div>
        </el-form-item>
        <el-form-item label="显示倒计时：">
          <el-radio-group v-model="configNode.countDownStatus" class="ma-r-20" :disabled="editState">
            <el-radio :label="false">不显示</el-radio>
            <el-radio :label="true">显示</el-radio>
          </el-radio-group>
          <div v-if="editState && configNode.countDownStatus" class="inline-block">
            小时&nbsp;&nbsp;{{configNode.countDownHour}}&nbsp;&nbsp;&nbsp;&nbsp;
            分钟&nbsp;&nbsp;{{configNode.countDownMin}}
          </div>
          <div v-show="!editState && configNode.countDownStatus" class="inline-block">
            <span v-show="configNode.countDownStatus" class="ma-r-10">
            小时 <el-input class="w100 ma-l-10" v-model="configNode.countDownHour" maxlength="2"
              @input="$utils.onlyNum(configNode, 'countDownHour', configNode.countDownHour)"></el-input>
          </span>
          <span v-show="!editState && configNode.countDownStatus">
            分钟 <el-input class="w100 ma-l-10" v-model="configNode.countDownMin" maxlength="2"
              @input="$utils.onlyNum(configNode, 'countDownMin', configNode.countDownMin)"></el-input>
          </span>
          </div>
        </el-form-item>
        <el-form-item label="终端配置：">
          <div v-for="(item, num) in configNode.routeList" :key="num" class="card ma-b-10">
            <el-checkbox v-model="item.checkedStatus" class="w100" :disabled="editState">
              <span>{{ item.clientTypeName }}</span>
            </el-checkbox>
            <div v-show="item.checkedStatus" class="inline-block x-box">
              <span class="ma-l-10">跳转类型</span>
              <el-select class="ma-l-10 w200" v-model="item.jumpType" placeholder="请选择" :disabled="editState">
                <el-option label="页面路由" :value="1"></el-option>
                <el-option label="首页" :value="2"></el-option>
                <el-option label="关闭弹窗" :value="3"></el-option>
              </el-select>
              <span class="ma-l-10" v-if="editState && item.jumpType === 1">{{item.jumpPath}}</span>
              <el-input class="w300 ma-l-10" v-show="!editState && item.jumpType === 1" v-model.trim="item.jumpPath" maxlength="999"></el-input>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="orderWrap" v-for="(item, idx) in configNode.visitorInterceptConfigList" :key="idx">
        <div class="clearfix orderHeader">
          <span class="ma-r-20 title">拦截{{ item.interceptSeqNum }}次</span>
          <div class="fr btn-box ma-r-20">
            <el-button :class="{top:true, gray:idx === 0}" v-show="!editState" :disabled="idx === 0"
              @click="sortUp(item.interceptSeqNum)" type="text"></el-button>
            <el-button :class="{bottom:true, gray:idx === configNode.visitorInterceptConfigList.length - 1}"
              v-show="!editState" :disabled="idx === configNode.visitorInterceptConfigList.length - 1"
              @click="sortDown(item.interceptSeqNum)" type="text"></el-button>
          </div>
          <el-button class="fr mar-r50" v-show="!editState" @click="deleteModule(item.interceptSeqNum)" type="text">删除</el-button>
        </div>
        <el-form label-width="160px" class="ma-t-20">
          <el-form-item label="弹窗图片：">
            <div v-if="editState">
              <img-view :src="item.popImgUrl"></img-view>
            </div>
            <div v-else>
              <upload class="inline-block"
                action="/image/uploadImage?width=-1&height=-1&fileSize=300"
                :size='300' :image-url="item.popImgUrl"
                @success="item.popImgUrl = $event"
                :accept="'image/jpg,image/png,image/gif,image/jpeg'"
                :type="['.jpg','.jpeg','.png','.gif']"></upload>
              <p class="font-info">支持jpg、png、gif格式文件，小于300k</p>
            </div>
          </el-form-item>
          <el-form-item label="挂接模块：">
            <el-select v-model="item.hangUpAwardType" class="w200" :disabled="editState">
              <el-option label="不挂接" :value="0"></el-option>
              <el-option label="特权金" :value="1"></el-option>
              <el-option label="抽奖卡" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端配置：">
            <div v-for="(o, num) in item.interceptRouteList" :key="num" class="ma-b-10">
              <el-checkbox v-model="o.checkedStatus" class="w100" :disabled="editState">
                <span>{{ o.clientTypeName }}</span>
              </el-checkbox>
              <div v-show="o.checkedStatus" class="inline-block x-box">
                <span class="ma-l-10">跳转类型</span>
                <span class="ma-l-10">页面路由</span>
                <span class="ma-l-10" v-if="editState && o.checkedStatus">{{o.jumpPath}}</span>
                <el-input class="w300 ma-l-10" v-show="!editState && o.checkedStatus" v-model.trim="o.jumpPath" maxlength="999"></el-input>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="add" v-if="!editState && configNode.visitorInterceptConfigList.length < 3">
      <el-button @click="addOneModule" type="text">添加拦截</el-button>
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
  name: 'newVisitorsChildAdd',
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
      datePicker: '',
      configNode: {
        sonNodeId: '', // id
        sonPopCode: '', // 老客相关子弹窗枚举（101、201、301）
        sonPopName: '', // 子弹窗名称
        popSeqNum: '', // 弹窗顺序
        effectStartTime: '', // 生效开始时间
        effectEndTime: '', // 生效结束时间
        closeButtonEffectStatus: true, // 是否生效，默认生效
        popImgUrl: '', // 弹窗图片url地址
        authAddressBookHaveFriendImgUrl: '', // 通讯录已授权有好友图片url地址
        authAddressBookNoFriendImgUrl: '', // 通讯录已授权无好友图片url
        noAuthAddressBookHaveFriendImgUrl: '', // 通讯录未授权有好友图片url地址
        noAuthAddressBookNoFriendImgUrl: '', // 通讯录未授权无好友图片url地址
        hangUpAwardType: 0, // 挂接类型枚举，当前仅有：0、1、5
        countDownStatus: false, // 是否显示倒计时
        countDownHour: '', // 倒计时-小时（倒计时开启时，有效）
        countDownMin: '', // 倒计时-分钟（倒计时开启时，有效）
        routeList: [
          {
            clientType: 1, // 客户端类型，1-ios；2-Android； 4-小程序
            clientTypeName: 'IOS', // 客户端类型名称
            checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
            hangUpAwardType: 0,
            jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
            jumpPath: '' // 跳转路径
          }, {
            clientType: 2, // 客户端类型，1-ios；2-Android； 4-小程序
            clientTypeName: 'Android', // 客户端类型名称
            checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
            hangUpAwardType: 0,
            jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
            jumpPath: '' // 跳转路径
          }, {
            clientType: 4, // 客户端类型，1-ios；2-Android； 4-小程序
            clientTypeName: '小程序', // 客户端类型名称
            checkedStatus: false, // 客户端是否被选中，false-未选中，true-选中
            hangUpAwardType: 0,
            jumpType: '', // 跳转类型，1-页面路由；2-首页；3-关闭弹窗
            jumpPath: '' // 跳转路径
          }
        ],
        visitorInterceptConfigList: []
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
        101: '新访客',
        201: '未注册老访客',
        301: '已注册老访客'
      }
      this.configNode.sonPopCode = ~~(this.sonPopCode || this.$route.params.sonPopCode)
      if (this.id || this.$route.params.id) {
        this.configNode.sonNodeId = this.id || this.$route.params.id
        this.getPageInfo()
      }
      this.configNode.sonPopName = arr[this.configNode.sonPopCode]
      if (!this.editState) {
        document.querySelector('.el-breadcrumb')
        .querySelectorAll('.el-breadcrumb__inner')[2].innerHTML = this.configNode.sonPopName
      }
    },
    getPageInfo () {
      let _url = ''
      let param = {
        popCode: 2,
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
        if (res) {
          this.configNode = res.sonPopCodeNode2
          this.datePicker = [this.configNode.effectStartTime, this.configNode.effectEndTime]
        }
      })
    },
    addOneModule () {
      let item = {
        interceptSeqNum: this.configNode.visitorInterceptConfigList.length + 1,
        popImgUrl: '',
        hangUpAwardType: 0,
        interceptRouteList: [
          {clientType: 1, clientTypeName: 'IOS', checkedStatus: false, jumpType: '', jumpPath: ''},
          {clientType: 2, clientTypeName: 'Android', checkedStatus: false, jumpType: '', jumpPath: ''},
          {clientType: 4, clientTypeName: '小程序', checkedStatus: false, jumpType: '', jumpPath: ''}
        ]
      }
      this.configNode.visitorInterceptConfigList.push(item)
    },
    deleteModule (seqNum) {
      let modules = this.configNode.visitorInterceptConfigList
      modules = modules.filter(item => {
        return item.interceptSeqNum !== seqNum
      })
      modules = modules.map((item, idx) => {
        item.interceptSeqNum = idx + 1
        return item
      })
      this.configNode.visitorInterceptConfigList = modules
    },
    sortUp (seqNum) {
      let modules = this.configNode.visitorInterceptConfigList
      let index = -1
      modules.forEach((item, idx) => {
        if (item.interceptSeqNum === seqNum) index = idx
      })
      if (index > -1) modules[index - 1] = modules.splice(index, 1 , modules[index - 1])[0]
      modules = modules.map((item, idx) => {
        item.interceptSeqNum = idx + 1
        return item
      })
      this.configNode.visitorInterceptConfigList = modules
    },
    sortDown (seqNum) {
      let modules = this.configNode.visitorInterceptConfigList
      let index = -1
      modules.forEach((item, idx) => {
        if (item.interceptSeqNum === seqNum) index = idx
      })
      if (index > -1) modules[index] = modules.splice(index + 1, 1 , modules[index])[0]
      modules = modules.map((item, idx) => {
        item.interceptSeqNum = idx + 1
        return item
      })
      this.configNode.visitorInterceptConfigList = modules
    },
    checkout () {
      const configNode = JSON.parse(JSON.stringify(this.configNode))
      if (!configNode.popSeqNum) {
        this.$message.warning('请选择弹窗顺序')
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
      // 图片
      if (configNode.hangUpAwardType === 6) {
        configNode.popImgUrl = null
        if (!configNode.authAddressBookHaveFriendImgUrl ||
          !configNode.authAddressBookNoFriendImgUrl ||
          !configNode.noAuthAddressBookHaveFriendImgUrl ||
          !configNode.noAuthAddressBookNoFriendImgUrl) {
            this.$message.warning('请上传弹窗图片')
            return false
          }
      } else {
        configNode.authAddressBookHaveFriendImgUrl = null
        configNode.authAddressBookNoFriendImgUrl = null
        configNode.noAuthAddressBookHaveFriendImgUrl = null
        configNode.noAuthAddressBookNoFriendImgUrl = null
        if (!configNode.popImgUrl) {
          this.$message.warning('请上传弹窗图片')
          return false
        }
      }
      // 倒计时
      if (configNode.countDownStatus) {
        if (configNode.countDownHour==='' || configNode.countDownHour===null ||
          configNode.countDownMin==='' || configNode.countDownMin===null) {
          this.$message.warning('请输入'+ configNode.sonPopName +'有效的显示倒计时时间，小时0-99，分钟0-59，小时分钟不可同为0')
          return false
        }
        configNode.countDownHour = parseInt(configNode.countDownHour)
        configNode.countDownMin = parseInt(configNode.countDownMin)
        if (configNode.countDownHour>99 || configNode.countDownMin>59 ||
          (configNode.countDownHour===0 && configNode.countDownMin===0)) {
          this.$message.warning('请输入'+ configNode.sonPopName +'有效的显示倒计时时间，小时0-99，分钟0-59，小时分钟不可同为0')
          return false
        }
      }
      // 终端循环
      let route, type
      for (let r = 0; r < configNode.routeList.length; r++) {
        route = configNode.routeList[r]
        type = [null, 'IOS', 'Android', 'M站', '小程序'][route.clientType]
        // 选中终端
        if (route.checkedStatus) {
          // 未选择跳转类型
          if (!route.jumpType) {
            this.$message.warning('请选择填写'+ configNode.sonPopName + type +'跳转类型')
            return false
          }
          // 跳转类型为页面路由时，路由为空
          if (route.jumpType === 1 && !route.jumpPath) {
            this.$message.warning('请输入页面路由')
            return false
          }
        }
      }
      // 拦截
      let r, o, orderPop = null
      for (o = 0; o < configNode.visitorInterceptConfigList.length; o++) {
        orderPop = configNode.visitorInterceptConfigList[o]
        // 图片
        if (!orderPop.popImgUrl) {
          this.$message.warning('请上传弹窗图片')
          return false
        }
        if (orderPop.hangUpAwardType === null ||
          orderPop.hangUpAwardType === '' ||
          orderPop.hangUpAwardType === undefined) {
          this.$message.warning('请选择挂接模块')
          return false
        }
        // 终端循环
        for (r = 0; r < orderPop.interceptRouteList.length; r++) {
          route = orderPop.interceptRouteList[r]
          // 选中终端
          if (route.checkedStatus) {
            // 未选择跳转类型
            route.jumpType = 1
            // 跳转类型为页面路由时，路由为空
            if (!route.jumpPath) {
              this.$message.warning('请输入页面路由')
              return false
            }
          }
        }
      }
      return configNode
    },
    submit () {
      let param = this.checkout()
      if (!param) return
      this.$service.systemSetting.dialogManagement.visitorAddOrUpdateSonConfig(param)
      .then(res => {
        if (res) this.goback()
      })
    },
    goback () {
      this.$router.push('/dialogManagement/unregisteredOldGuest/childManagement/' + this.configNode.sonPopCode)
    }
  },
}
</script>

<style type="text/css" scoped>
.delIcon{ position: absolute; right: 80px; padding-left: 10px; padding-right: 10px;}
.orderWrap{ border: 1px solid #EBEEF5; margin-top: 10px; background-color: #fbfbfb;}
.orderHeader{ border-bottom: 1px solid #EBEEF5; padding: 10px 20px;}
.orderHeader .btn-box {
  position: relative;
}
.orderHeader .title {
  line-height: 30px;
}
.orderHeader .top {
  position: absolute;
  margin: 0;
  width: 0px; height: 0px;
  top: -15px; left: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid #409EFF;
}
.orderHeader .top.gray {
  border-bottom: 10px solid #ccc;
}
.orderHeader .bottom.gray {
  border-top: 10px solid #ccc;
}
.orderHeader .bottom {
  position: absolute;
  margin: 0;
  width: 0px; height: 0px;
  top: 20px; left: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #409EFF;
}
img{ cursor: pointer;}
.mar-r50 {
  margin-right: 50px;
}
.add {
  margin-bottom: 10px;
}
.x-box {
  width: 100%;
  padding-right: 20px;
  box-sizing: border-box;
}
.x-box span {
  word-wrap: break-word;
}
</style>
