<template>
  <div class="home-visitor">
    <div class="card">
      <el-form class="card-content" ref="baseForm" :model="detail" label-width="160px" >
        <el-form-item label="弹窗页面：">{{detail.popName}}</el-form-item>
        <el-form-item label="启用状态：">
          <el-radio-group v-model="detail.enableStatus">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否循环：">
          <el-radio-group v-model="detail.cycleStatus">
            <el-radio :label="true">循环</el-radio>
            <el-radio :label="false">不循环</el-radio>
          </el-radio-group>
          <p class="tips">不循环为单次弹出，仅出现一次</p>
          <p class="tips">循环为重复弹出，多次的逐条循环，单条的每次触发均弹出</p>
        </el-form-item>
      </el-form>
    </div>
    <template v-for="(item, index) in detail.configDetailList">
      <div :key="item.seqNum" class="card">
        <div class="card-title">
          <div class="txt">第{{item.seqNum}}条</div>
          <div class="btn-group">
            <div v-if="detail.configDetailList.length > 1"><el-button @click="deleteModule(item.seqNum)" type="text">删除</el-button></div>
            <div class="caret-sort">
              <div v-if="index === 0" class="top gray"></div>
              <div v-else @click="sortToUp(item.seqNum)" class="top"></div>
              <div v-if="(index + 1) === detail.configDetailList.length" class="bottom gray"></div>
              <div v-else @click="sortToDown(item.seqNum)" class="bottom"></div>
            </div>
            <div class="expend">
              <el-button @click="goToExpend(item.seqNum)" type="text">
                <i v-if="item._isExpand" class="el-icon-arrow-down"></i>
                <i v-else class="el-icon-arrow-right"></i>
              </el-button>
            </div>
          </div>
        </div>
        <div v-if="item._isExpand" class="card-content">
          <el-form ref="baseForm" :model="detail" label-width="160px">
            <el-form-item class="text-label" label="关闭按钮：">
              <el-radio-group v-model="item.closeButtonEffectStatus">
                <el-radio :label="true">生效</el-radio>
                <el-radio :label="false">不生效</el-radio>
              </el-radio-group>
              <p class="tips">关闭按钮不生效，点击关闭按钮同点击弹窗</p>
            </el-form-item>
            <el-form-item class="text-label" label="弹窗图片：">
              <Upload
                action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300"
                accept="image/jpg,image/png,image/gif,image/jpeg"
                :type="['.jpg', '.png', '.gif']"
                :size='300'
                :image-url="item.popImgUrl"
                @success="item.popImgUrl = $event">
              </Upload>
              <div class="tips mar-top">支持jpg、png、gif格式文件，小于300k</div>
            </el-form-item>
            <el-form-item class="text-label" label="显示倒计时：">
              <el-radio-group v-model="item.countDownStatus">
                <el-radio :label="false">不显示</el-radio>
                <el-radio :label="true">显示</el-radio>
              </el-radio-group>
              <span v-if="item.countDownStatus" class="number">
                <span>*</span>小时
                <input class="ipt numIpt" type="text" v-on-num:detail.configDetailList="item.countDownHour" :index="index" v-model="item.countDownHour" maxlength="2" />
              </span>
              <span v-if="item.countDownStatus" class="number">
                <span>*</span>分钟
                <input class="ipt numIpt" type="text" v-on-num:detail.configDetailList="item.countDownMin" :index="index" v-model="item.countDownMin" maxlength="2" />
              </span>
            </el-form-item>
            <el-form-item class="text-label" label="挂接特权金：">
              <el-radio-group v-model="item.privilegeGoldStatus">
                <el-radio :label="false">不挂接</el-radio>
                <el-radio :label="true">挂接</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="终端配置：">
              <div class="checkbox-wrap">
                <el-checkbox class="checkbox" label="mp" v-model="item._mp.checkedStatus">小程序</el-checkbox>
                <div v-if="item._mp.checkedStatus">
                  <span>跳转类型</span>
                  <span>
                    <el-select class="select" v-model="item._mp.jumpType" placeholder="请选择">
                      <el-option label="页面路由" :value="1"></el-option>
                      <el-option label="首页" :value="2"></el-option>
                      <el-option label="关闭弹窗" :value="3"></el-option>
                    </el-select>
                  </span> 
                  <span v-if="item._mp.jumpType === 1">
                    <el-input class="ipt" v-model="item._mp.jumpPath" :maxlength="999"></el-input>
                  </span>
                </div>
              </div>
              <div class="checkbox-wrap">
                <el-checkbox class="checkbox" label="android" v-model="item._android.checkedStatus">Android</el-checkbox>
                <div v-if="item._android.checkedStatus">
                  <span>跳转类型</span>
                  <span>
                    <el-select class="select" v-model="item._android.jumpType" placeholder="请选择">
                      <el-option label="页面路由" :value="1"></el-option>
                      <el-option label="首页" :value="2"></el-option>
                      <el-option label="关闭弹窗" :value="3"></el-option>
                    </el-select>
                  </span>
                  <span v-if="item._android.jumpType === 1">
                    <el-input class="ipt" v-model="item._android.jumpPath" :maxlength="999"></el-input>
                  </span>
                </div>
              </div>
              <div class="checkbox-wrap">
                <el-checkbox class="checkbox" label="ios" v-model="item._ios.checkedStatus">IOS</el-checkbox>
                <div v-if="item._ios.checkedStatus">
                  <span>跳转类型</span>
                  <span>
                    <el-select class="select" v-model="item._ios.jumpType" placeholder="请选择">
                      <el-option label="页面路由" :value="1"></el-option>
                      <el-option label="首页" :value="2"></el-option>
                      <el-option label="关闭弹窗" :value="3"></el-option>
                    </el-select>
                  </span>
                  <span v-if="item._ios.jumpType === 1">
                    <el-input class="ipt" v-model="item._ios.jumpPath" :maxlength="999"></el-input>
                  </span>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
    <div class="footer">
      <div class="add">
        <el-button v-if="detail.configDetailList.length < 5" @click="addOneModule" type="text">再添加一条</el-button>
      </div>
      <div>
        <el-button @click="submitModule" type="primary">提交保存</el-button>
        <el-button @click="goBack" type="primary" plain>返回</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Upload from '@/components/upload'
const platformType = ['', 'IOS', 'Android', '', '小程序']
export default {
  name: 'VisitorDeit',
  props: {
    popCode: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
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
  components: {
    Upload
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      const params = {
        popCode: this.popCode
      }
      this.$service.systemSetting.dialogManagementOld.getDetail(params).then(res => {
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
          item._isExpand = true
          return item
        })
        this.detail = detail
      })
    },
    deleteModule (seqNum) {
      let modules = this.detail.configDetailList
      if (!modules.length) {
        return false
      }
      modules = modules.filter(item => {
        return item.seqNum !== seqNum
      })
      modules = modules.map((item, idx) => {
        item.seqNum = idx + 1
        return item
      })
      this.detail.configDetailList = modules
    },
    sortToUp (seqNum) {
      let modules = this.detail.configDetailList
      let index = -1
      modules.forEach((item, idx) => {
        if (item.seqNum === seqNum) {
          index = idx
        }
      })
      if (index > -1) {
        modules[index - 1] = modules.splice(index, 1 , modules[index - 1])[0]
      }
      modules = modules.map((item, idx) => {
        item.seqNum = idx + 1
        return item
      })
      this.detail.configDetailList = modules
    },
    sortToDown (seqNum) {
      let modules = this.detail.configDetailList
      let index = -1
      modules.forEach((item, idx) => {
        if (item.seqNum === seqNum) {
          index = idx
        }
      })
      if (index > -1) {
        modules[index] = modules.splice(index + 1, 1 , modules[index])[0]
      }
      modules = modules.map((item, idx) => {
        item.seqNum = idx + 1
        return item
      })
      this.detail.configDetailList = modules
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
    addOneModule () {
      const modules = this.detail.configDetailList
      if (modules.length >= 5) {
        return false
      }
      modules.push({
        seqNum: modules.length + 1,
        closeButtonEffectStatus: true,
        popImgUrl: '',
        privilegeGoldStatus: false,
        countDownStatus: false,
        countDownHour: '',
        countDownMin: '',
        _isExpand: true,
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
      })
      this.detail.configDetailList = modules
    },
    submitModule () {
      const detail = this.detail
      const params = {
        popCode: this.popCode
      }
      params.enableStatus = detail.enableStatus
      params.cycleStatus = detail.cycleStatus
      params.configDetailList = detail.configDetailList.map(item => {
        const subItem = {
          routeList: []
        }
        subItem.seqNum = item.seqNum
        subItem.closeButtonEffectStatus = item.closeButtonEffectStatus
        subItem.popImgUrl = item.popImgUrl
        subItem.privilegeGoldStatus = item.privilegeGoldStatus
        subItem.countDownStatus = item.countDownStatus
        subItem.countDownHour = item.countDownHour
        subItem.countDownMin = item.countDownMin
        subItem.routeList.push(item._mp)
        subItem.routeList.push(item._android)
        subItem.routeList.push(item._ios)
        return subItem
      })
      const arr = params.configDetailList
      for (let i = 0; i < arr.length; i ++) {
        const current = arr[i]
        if (!current.popImgUrl) {
          this.$message.warning('请上传弹窗图片')
          return false
        }
        if (current.countDownStatus) {
          if (current.countDownHour === null ||
            current.countDownMin === null ||
            current.countDownHour === '' ||
            current.countDownMin === '' ||
            (current.countDownHour == 0 && current.countDownMin == 0) ||
            current.countDownMin > 59) {
            this.$message.warning(`请输入第${current.seqNum}条有效的显示倒计时时间，小时0-99，分钟0-59，小时分钟不可同为0`)
            return false
          }
        }
        for (let k = 0; k < current.routeList.length; k ++) {
          const currentRoute = current.routeList[k]
          if (currentRoute.checkedStatus && (currentRoute.jumpType === '' || currentRoute.jumpType === null)) {
            this.$message.warning(`请选择填写第${current.seqNum}条${platformType[currentRoute.clientType]}跳转类型`)
            return false
          }
          if (currentRoute.checkedStatus && currentRoute.jumpType === 1 && (currentRoute.jumpPath === '' || currentRoute.jumpPath === null)) {
            this.$message.warning(`请输入第${current.seqNum}条${platformType[currentRoute.clientType]}页面路由`)
            return false
          }
        }
      }

      this.$service.systemSetting.dialogManagementOld.updateConfig(params).then(res => {
        this.$message.success('提交成功')
        this.$router.push({path: '/dialogManagementOld'})
      })
    },
    goBack () {
      this.$router.push({path: '/dialogManagementOld'})
    }
  },
  directives: {
    onNum (el, attr, vnode) {
      let m = vnode.context, 
          i = vnode.data.attrs.index, 
          e = attr.expression,
          v = attr.value,
          g = /\D/g,
          r, c, b
      if (v !== null && v.replace) {
        b = v.replace(g, '')
        if(i !== undefined) {
          c = e.split('.')[1]
          r = attr.rawName.split(':')[1] || ''
          r = r.split('.')
          switch (r.length) {
            case 1:
              m.$data[r[0]] && (m.$data[r[0]] = b)
              break;
            case 2:
              m.$data[r[0]][r[1]][i][c] = b
              break;
          }
        }
      }
    }
  }
}
</script>

<style type="text/css" scoped>
.home-visitor {
  color: #606266;
}
.tips {
  font-size: 12px;
  color: #aaa;
  padding: 0;
  margin: 0;
  line-height: 1.4;
}
.tips.mar-top {
  margin-top: 10px;
}
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
.card-title::after {
  clear: both;
  content: '';
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.card-title .txt {
  float: left;
}
.card-title .btn-group {
  float: right;
}
.card-title .btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.caret-sort {
  width: 20px;
  margin: 0 10px;
}
.caret-sort > div {
  cursor: pointer;
}
.caret-sort .top {
  width: 0px;
  height: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid #409EFF;
  margin-bottom: 4px;
  margin-left: 6px;
}
.caret-sort .top.gray {
  border-bottom: 8px solid #909399;
  cursor: default;
}
.caret-sort .bottom {
  width: 0px;
  height: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #409EFF;
  margin-left: 6px;
}
.caret-sort .bottom.gray {
  border-top: 10px solid #909399;
  cursor: default;
}
.btn-group .expend {
  width: 20px;
}
.btn-group i {
  color: #909399;
  font-size: 16px;
}

.card-content {
  padding: 20px 0;
}
.number {
  padding-left: 20px;
  color: #606266;
}
.number .ipt {
  margin-left: 10px;
  width: 100px;
}
.number span {
  color: red;
}
.checkbox-wrap {
  padding: 5px 0;
}
.checkbox-wrap > div {
  display: inline-block;
}
.checkbox-wrap span {
  padding: 0 5px;
  color: #606266;
}
.checkbox-wrap .checkbox {
  width: 100px;
}
.checkbox-wrap .select {
  width: 100px;
}
.checkbox-wrap .ipt {
  width: 300px;
}
.numIpt {
  background-color: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: inline-block;
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
}

.footer {
  padding-left: 40px;
}
.footer .add {
  margin-bottom: 10px;
}
</style>
