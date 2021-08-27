<template>
  <el-dialog
    :visible.sync="show"
    width="800px"
    :title="detail.popName"
    @close="$emit('close')">
    <el-card class="visitor-dialog-color">
      <el-form label-width="160px">
        <el-form-item label="弹窗页面：">{{detail.popName}}</el-form-item>
        <el-form-item label="启用状态：">
          <el-radio-group v-model="detail.enableStatus">
            <el-radio disabled :label="true">启用</el-radio>
            <el-radio disabled :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="popCode !== '4'" label="是否循环：">
          <el-radio-group v-model="detail.cycleStatus">
            <el-radio disabled :label="true">循环</el-radio>
            <el-radio disabled :label="false">不循环</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="ma-t-20">
      <template v-for="(item, index) in detail.configDetailList">
        <div :key="item.seqNum" class="card">
          <div class="card-title">
            <div v-if="popCode === '4'" class="txt">{{item.seqNumName}}（<span v-if="item.effectStatus">生效</span><span v-else>不生效</span>）</div>
            <div v-else class="txt">第{{item.seqNum}}条</div>
            <div class="expend">
              <el-button @click="goToExpend(item.seqNum)" type="text">
                <i v-if="item._isExpand" class="el-icon-arrow-down"></i>
                <i v-else class="el-icon-arrow-right"></i>
              </el-button>
            </div>
          </div>
          <div v-if="item._isExpand" class="card-content">
            <el-form label-width="160px" >
              <el-form-item class="text-label" v-if="popCode === '4'" label="是否生效：">
                <el-radio-group v-model="item.effectStatus">
                  <el-radio disabled :label="true">生效</el-radio>
                  <el-radio disabled :label="false">不生效</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="popCode !== '4' || item.effectStatus">
                <el-form-item v-if="popCode === '4'" label="显示位置：">
                  <el-checkbox-group v-model="item.popLocation">
                    <el-checkbox disabled :label="1">首页</el-checkbox>
                    <el-checkbox disabled :label="2">个人中心</el-checkbox>
                    <el-checkbox disabled :label="3" v-if="item.seqNum === 1 || item.seqNum === 3 || item.seqNum === 5 || item.seqNum === 7">退款详情页（仅APP）</el-checkbox>
                    <el-checkbox disabled :label="4" v-if="item.seqNum === 6">订单列表页</el-checkbox>
                    <el-checkbox disabled :label="5" v-if="item.seqNum === 6">订单详情页</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item class="text-label" label="关闭按钮：">
                  <el-radio-group v-model="item.closeButtonEffectStatus">
                    <el-radio disabled :label="true">生效</el-radio>
                    <el-radio disabled :label="false">不生效</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item class="text-label" label="弹窗图片：">
                  <div class="upload-group">
                    <div class="img-wrap">
                      <img v-if="item.popImgUrl" :src="item.popImgUrl" />
                      <div v-if="item.popImgUrl" class="cover-box"><div><i class="el-icon-zoom-in" @click.stop="handleEnlarge(index)"></i></div></div>
                    </div>
                    <div v-if="popCode === '4' && item.secondPopImgUrl" class="img-wrap">
                      <img :src="item.secondPopImgUrl" />
                      <div class="cover-box"><div><i class="el-icon-zoom-in" @click.stop="handleEnlargeSecond(index)"></i></div></div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item class="text-label" label="显示倒计时：">
                  <el-radio-group v-model="item.countDownStatus">
                    <el-radio disabled :label="false">不显示</el-radio>
                    <el-radio disabled :label="true">显示</el-radio>
                  </el-radio-group>
                  <span v-if="item.countDownStatus" class="number">
                    小时 {{item.countDownHour}}
                  </span>
                  <span v-if="item.countDownStatus" class="number">
                    分钟 {{item.countDownMin}}
                  </span>
                </el-form-item>
                <el-form-item class="text-label" label="挂接特权金：">
                  <el-radio-group v-model="item.privilegeGoldStatus">
                    <el-radio disabled :label="false">不挂接</el-radio>
                    <el-radio disabled :label="true">挂接</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="终端配置：">
                  <div class="checkbox-wrap">
                    <el-checkbox disabled class="checkbox" label="mp" v-model="item._mp.checkedStatus">小程序</el-checkbox>
                    <span v-if="item._mp.checkedStatus">
                      <span>跳转类型</span>
                      <span>{{route[item._mp.jumpType]}}</span>
                      <span v-if="item._mp.jumpType === 1">{{item._mp.jumpPath}}</span>
                    </span>
                  </div>
                  <div class="checkbox-wrap">
                    <el-checkbox disabled class="checkbox" label="android" v-model="item._android.checkedStatus">Android</el-checkbox>
                    <span v-if="item._android.checkedStatus">
                      <span>跳转类型</span>
                      <span>{{route[item._android.jumpType]}}</span>
                      <span v-if="item._android.jumpType === 1">{{item._android.jumpPath}}</span>
                    </span>
                  </div>
                  <div class="checkbox-wrap">
                    <el-checkbox disabled class="checkbox" label="ios" v-model="item._ios.checkedStatus">IOS</el-checkbox>
                    <span v-if="item._ios.checkedStatus">
                      <span>跳转类型</span>
                      <span>{{route[item._ios.jumpType]}}</span>
                      <span v-if="item._ios.jumpType === 1">{{item._ios.jumpPath}}</span>
                    </span>
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <img-view :src="item.popImgUrl" class="none" ref="bigImg" :lock="true"></img-view>
          <img-view :src="item.secondPopImgUrl" class="none" ref="bigImgSecond" :lock="true"></img-view>
        </div>
      </template>
    </el-card>
  </el-dialog>
</template>

<script type="text/javascript">
import Upload from '@/components/upload'
export default {
  name: 'DetailDialog',
  props: {
    popCode: {
      type: String,
      default: ''
    },
    logId: {
      type: String,
      default: ''
    },
    parmName: {
      type: String,
      default: 'popCode'
    }
  },
  components: {
    Upload
  },
  data () {
    return {
      show: true,
      route: ['', '页面路由', '首页', '关闭弹窗'],
      detail: {
        configDetailList: [
          {
            _mp: {
              clientType: 4,
              checkedStatus: false,
              jumpType: '',
              jumpPath: ''
            },
            _android: {
              clientType: 2,
              checkedStatus: false,
              jumpType: '',
              jumpPath: ''
            },
            _ios: {
              clientType: 1,
              checkedStatus: false,
              jumpType: '',
              jumpPath: ''
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      const params = this.parmName === 'logId' ? {'logId':this.logId} : {'popCode':this.popCode}
      const req = this.parmName === 'logId' ? this.$service.systemSetting.dialogManagement.logsDetail : this.$service.systemSetting.dialogManagement.getDetail
      req(params).then(res => {
        let detail = res
        detail.configDetailList = detail.configDetailList.map(item => {
          item.routeList.forEach(sItem => {
            if (sItem.clientType === 4) {
              item._mp = {...sItem}
            } else if (sItem.clientType === 2) {
              item._android = {...sItem}
            } else if (sItem.clientType === 1) {
              item._ios = {...sItem}
            }
          })

          item._isExpand = this.popCode === '4' ? false : true
          return item
        })
        this.detail = detail
      })
    },
    goToExpend (seqNum) {
      let modules = this.detail.configDetailList
      modules = modules.map(item => {
        if (item.seqNum === seqNum) {
          item._isExpand = !item._isExpand
        }
        return item
      })
      this.detail.configDetailList = modules
    },
    // 放大查看大图
    handleEnlarge (index) {
      this.$refs.bigImg[index].handleEnlarge()
    },
    handleEnlargeSecond (index) {
      this.$refs.bigImgSecond[index].handleEnlarge()
    }
  }
}
</script>


<style type="text/css" scoped>
.card {
  margin-bottom: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
}
.card-title {
  background: #eee;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
}
.card-title .txt {
  float: left;
}
.card-title .expend {
  float: right;
}
.card-content {
  padding: 20px 20px 20px 0;
}
.checkbox-wrap .checkbox {
  width: 80px;
}
.checkbox-wrap span {
  padding: 0 5px;
  color: #606266;
  word-break: break-all;
}
.img-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
}
.img-wrap img {
  width: 100px;
  height: 100px;
}
.cover-box {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.3)
}
.cover-box div {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
  text-align: center;
}
.cover-box div i {
  font-size: 24px;
  color: #ffffff;
  display: inline-block;
}
.img-wrap:hover {
  border: 1px dashed #409EFF;
}
.img-wrap:hover .cover-box {
	display: block;
}
.number {
  padding-left: 20px;
  color: #606266;
}
.upload-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.upload-group > div {
  margin-right: 40px;
}
</style>
