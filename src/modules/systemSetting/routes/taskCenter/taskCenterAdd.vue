<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        size="small"
        class="input-normal mar-t20"
      >
        <el-form-item label="任务名称：">
          <el-input class="w300" v-model.trim="form.taskName" maxlength="20"></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">不超过20个字</span>
        </el-form-item>
        <el-form-item label="选择任务：">
          <el-select
            v-model="form.task"
            placeholder="请选择"
            style="width: 300px;"
            @change="selectTask"
          >
            <el-option
              v-for="(item, index) in taskListArr"
              :key="index"
              :label="item.defaultTaskName"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input
            class="w300"
            v-model.trim="form.num"
            maxlength="5"
            @input="$utils.onlyNum(form, 'num', form.num)"
          ></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">0到99999的整数</span>
        </el-form-item>
        <el-form-item label="时间：">
          <div class="block">
            <el-date-picker
              v-model="form.taskTime"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              class="w300"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="奖励内容：">
          <el-select
            v-model="form.rewardType"
            placeholder="请选择"
            style="width: 300px;"
            @change="rewardTypeChange"
          >
            <el-option
              v-for="item in rewardOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金币数量：" v-show="isShowSpecieNum">
          <el-input
            class="w300"
            @input="$utils.onlyNum(form, 'specieNum', form.specieNum)"
            v-model.trim="form.specieNum"
            maxlength="5"
          ></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">0到99999的整数</span>
        </el-form-item>
        
        <el-form-item label="可偷金币：" v-show="isShowSpecieNum">
          <el-input class="w200" v-model="form.canStealGoldNumber" v-only-num="form.canStealGoldNumber" :max-len="4"></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">1到9999的整数，不可大于金币数量</span>
        </el-form-item>
        <el-form-item label="挂接场景值：" v-show="isShowSceneValue">
          <el-input class="w300" v-model.trim="form.sceneValue" maxlength="20"></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">不超过20个字</span>
        </el-form-item>
        <el-form-item label="ios版本下限：">
          <el-select v-model="form.iosVersion" placeholder="请选择" style="width: 300px;" clearable>
            <el-option
              v-for="item in iosVersionArr"
              :key="item.versionNum"
              :label="item.appVersion"
              :value="item.appVersion"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="android版本下限：">
          <el-select
            v-model="form.androidVersion"
            placeholder="请选择"
            style="width: 300px;"
            clearable
          >
            <el-option
              v-for="item in androidVersionArr"
              :key="item.versionNum"
              :label="item.appVersion"
              :value="item.appVersion"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下发用户类型：">
          <el-checkbox-group v-model="form.visitorType">
            <el-checkbox
              v-for="(item, index) in visitorArr"
              :label="item.id"
              :key="index"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否固定路由：">
          <el-radio-group v-model="form.routeType">
            <el-radio :label="1" :disabled=" form.defaultInhenceRouting === 0" >固定路由</el-radio>
            <el-radio :label="0" >自定义路由</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 固定路由 -->
        <div v-if="form.routeType === 1">
          <el-form-item label="ios路由：">
            <span>{{form.defaultIosRouting}}</span>
          </el-form-item>
          <el-form-item label="android路由：">
            <span>{{form.defaultAndroidRouting}}</span>
          </el-form-item>
          <el-form-item label="小程序路由：">
            <span>{{form.defaultMiniAppRouting}}</span>
          </el-form-item>
          <el-form-item label="M站路由：">
            <span>{{form.defaultMRouting}}</span>
          </el-form-item>
        </div>
        <!-- 自定义路由 -->
        <div v-else>
          <el-form-item label="ios路由：">
            <el-input class="w300" v-model.trim="form.iosRouting" placeholder="请输入路由" maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="android路由：">
            <el-input class="w300" v-model.trim="form.androidRouting" placeholder="请输入路由" maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="小程序路由：">
            <el-input class="w300" v-model.trim="form.miniAppRouting" placeholder="请输入路由" maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="M站路由：">
            <el-input class="w300" v-model.trim="form.mRouting" placeholder="请输入路由" maxlength="500"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="任务描述：">
          <el-input
            class="w300"
            type="textarea"
            v-model="form.desc"
            maxlength="30"
            :autosize="{ minRows: 4}"
            placeholder="请输入任务描述"
          ></el-input>
          <span class="ma-l-20 ma-t-10 font-dark0">不超过30个字</span>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="saveFloatImage">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
// 模拟数据
export default {
  name: 'taskCenterAdd',
  data() {
    return {
      form: {
        taskName: '', // 任务名称
        task: '', // 选择任务
        num: '', // 序号
        taskTime: '', // 开始、结束时间
        startTime: '', // 开始时间
        endTime: '', // 开始时间
        rewardType: '', // 奖励内容
        specieNum: '', // 金币数量
        canStealGoldNumber: '', // 可偷金币数量
        sceneValue: '', // 场景值
        iosVersion: '', // ios 版本
        androidVersion: '', // android 版本
        visitorType: [1, 2, 3], // 访客类型
        routeType: '', // 路由类型
        iosRouting: '', // 自定义--ios路由
        androidRouting: '', // 自定义--android路由
        miniAppRouting: '', // 自定义--小程序路由
        mRouting: '', // 自定义--M站路由
        defaultIosRouting: '', // 固定--ios路由
        defaultAndroidRouting: '', // 固定--android路由
        defaultMiniAppRouting: '', // 固定--小程序路由
        defaultMRouting: '', // 固定--M站路由
        desc: '', // 任务描述
        defaultInhenceRouting: '' // 任务属性--是否是固定路由， 0 否  1 是
      },
      // 保存的参数
      param: {
        customerType: {},
        name: '',
        defaultTaskId: '',
        defaultTaskName: '',
        inhenceRouting: '',
        iosRouting: '', // 自定义--ios路由
        androidRouting: '', // 自定义--android路由
        miniAppRouting: '', // 自定义--小程序路由
        mRouting: '', // 自定义--M站路由
        defaultIosRouting: '', // 固定--ios路由
        defaultAndroidRouting: '', // 固定--android路由
        defaultMiniAppRouting: '', // 固定--小程序路由
        defaultMRouting: '', // 固定--M站路由
        sequence: '',
        beginTime: '',
        endTime: '',
        rewardType: '',
        sceneIdentify: '',
        goldNumber: '',
        iosVersionFrom: '',
        iosVersionNumFrom: '',
        androidVersionFrom: '',
        androidVersionNumFrom: '',
        taskDesc: '',
        defaultInhenceRouting: '' // 任务属性--是否是固定路由， 0 否  1 是
      },
      editId: '', // 编辑任务 id
      isShowSceneValue: false, // 是否展示 场景值
      isShowSpecieNum: false, // 是否展示 金币
      rewardOptions: [
        { label: '参团卡', value: 1 },
        { label: '抽奖卡', value: 2 },
        { label: '全民拼卡', value: 3 },
        { label: '特权金', value: 4 },
        { label: '金币', value: 5 }
      ],
      visitorArr: [
        { name: '新访客', id: 1 },
        { name: '老访客', id: 2 },
        { name: '老客', id: 3 }
      ],
      taskListArr: [], // 任务列表
      iosVersionArr: [], // ios 版本号
      androidVersionArr: [] // Android 版本号
    }
  },
  mounted() {
    // 获取任务列表  ios 版本号  android 版本号
    Promise.all([
      this.getTaskList(),
      this.getIosVersion(),
      this.getAndroidVersion()
    ]).then(values => {
      this.isEchoDData()
    })
  },
  methods: {
    // 是否需要回显
    isEchoDData() {
      // 有 editId 为编辑状态
      this.editId = this.$route.params.editId
      if (this.editId) {
        this.$service.systemSetting.taskCenter
          .editTask({ id: this.editId })
          .then(data => {
            this.echoDData(data)
          })
      }
    },
    // 编辑的数据回显
    echoDData(detailData) {
      var form = this.form
      // 任务名称
      form.taskName = detailData.name
      //选择任务需要特殊处理  (依赖任务列表接口)
      let taskListArr = this.taskListArr
      let len = taskListArr.length
      let num = ''
      for (let i = 0; i < len; i++) {
        if (taskListArr[i].id === detailData.defaultTaskId) {
          num = i
          break
        }
      }
      form.task = num
      // 任务属性--是否是固定路由， 0 否  1 是
      form.defaultInhenceRouting = detailData.defaultInhenceRouting
      // 路由类型 (与 选择任务联动)
      form.routeType = detailData.inhenceRouting
      // 自定义--ios路由
      form.iosRouting = detailData.iosRouting
      // 自定义--android路由
      form.androidRouting = detailData.androidRouting
      // 自定义--小程序路由
      form.miniAppRouting = detailData.miniAppRouting
      // 自定义--M站路由
      form.mRouting = detailData.mRouting
      // 固定--ios路由
      form.defaultIosRouting = detailData.defaultIosRouting
      // 固定--android路由
      form.defaultAndroidRouting = detailData.defaultAndroidRouting
      // 固定--小程序路由
      form.defaultMiniAppRouting = detailData.defaultMiniAppRouting
      // 固定--M站路由
      form.defaultMRouting = detailData.defaultMRouting
      //序号
      form.num = detailData.sequence
      //序号
      form.taskTime = [detailData.beginTime, detailData.endTime]
      // 奖励内容
      form.rewardType = detailData.rewardType
      this.rewardTypeChange(form.rewardType)
      // 金币数量
      form.specieNum = detailData.goldNumber
      // 可偷金币数量
      form.canStealGoldNumber = detailData.canStealGoldNumber
      // 场景值
      form.sceneValue = detailData.sceneIdentify
      // ios 版本下限
      form.iosVersion = detailData.iosVersionFrom // detailData.iosVersionNumFrom +
      // android 版本下限
      form.androidVersion = detailData.androidVersionFrom // detailData.androidVersionNumFrom +
      // 访客类型
      // 回显数据时 需要清空数组
      form.visitorType.splice(0, form.visitorType.length)
      // 新访客
      if (detailData.customerType.newVisitor === 1) {
        form.visitorType.push(1)
      }
      // 老访客
      if (detailData.customerType.oldVisitor === 1) {
        form.visitorType.push(2)
      }
      // 老客
      if (detailData.customerType.customer === 1) {
        form.visitorType.push(3)
      }
      // 任务描述
      form.desc = detailData.taskDesc
    },
    // 选择任务
    selectTask(value) {
      let taskArr = this.taskListArr
      let currentItem = taskArr[value]
      this.form.routeType = currentItem.inhenceRouting
      this.form.defaultInhenceRouting = currentItem.inhenceRouting // 任务属性--是否是固定路由， 0 否  1 是
      // 固定路由
      if ( currentItem.inhenceRouting === 1) {
        this.form.defaultIosRouting = currentItem.iosRouting // 固定--ios路由
        this.form.defaultAndroidRouting = currentItem.androidRouting // 固定--android路由
        this.form.defaultMiniAppRouting = currentItem.miniAppRouting // 固定--小程序路由
        this.form.defaultMRouting = currentItem.mRouting //固定-- M站路由
        this.form.iosRouting = '' // 自定义--ios路由
        this.form.androidRouting = '' // 自定义--android路由
        this.form.miniAppRouting = '' // 自定义--小程序路由
        this.form.mRouting = '' //自定义-- M站路由
      }else if ( currentItem.inhenceRouting === 0 ) {
        this.form.defaultIosRouting = '' // 固定--ios路由
        this.form.defaultAndroidRouting = '' // 固定--android路由
        this.form.defaultMiniAppRouting = '' // 固定--小程序路由
        this.form.defaultMRouting = '' //固定-- M站路由
        this.form.iosRouting = currentItem.iosRouting // 自定义--ios路由
        this.form.androidRouting = currentItem.androidRouting // 自定义--android路由
        this.form.miniAppRouting = currentItem.miniAppRouting // 自定义--小程序路由
        this.form.mRouting = currentItem.mRouting //自定义-- M站路由
      }
    },
    // 奖励内容
    rewardTypeChange(value) {
      if (value === 5) {
        this.isShowSpecieNum = true // 是否展示 场景值
        this.isShowSceneValue = false // 是否展示 金币
      } else if (value === 1 || value === 2 || value === 3 || value === 4) {
        this.isShowSceneValue = true
        this.isShowSpecieNum = false
      } else {
        this.isShowSceneValue = false
        this.isShowSpecieNum = false
      }
    },
    // 获取ios 版本号
    getIosVersion() {
      return new Promise((resolve, reject) => {
        let param = {
          platform: 1, // 1:IOS 2:Android
          fromVersionNum: 123 // 写死的值 124
        }
        this.$service.systemSetting.taskCenter
          .queryAppVersion(param)
          .then(res => {
            this.iosVersionArr = res || []
            resolve('ios 版本获取成功')
          })
      })
    },
    // 获取 android 版本号
    getAndroidVersion() {
      return new Promise((resolve, reject) => {
        let param = {
          platform: 2, // 1:IOS 2:Android
          fromVersionNum: 263 // 写死的值  263
        }
        this.$service.systemSetting.taskCenter
          .queryAppVersion(param)
          .then(res => {
            this.androidVersionArr = res || []
            resolve('android 版本获取成功')
          })
      })
    },
    // 获取任务列表
    getTaskList() {
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.taskCenter.getTaskList().then(res => {
          this.taskListArr.push(...res)
          resolve(this.taskListArr)
        })
      })
    },
    saveFloatImage() {
      // 校验参数
      let result = this.checkParam()
      if (result.success === 0) {
        this.$message.warning(result.mes)
        return
      }
      // 编辑 必传 任务 id
      if (this.editId) {
        result.param.id = this.editId
      }
      this.$service.systemSetting.taskCenter
        .saveTask(result.param)
        .then(res => {
          if (res) {
            this.$message.success('保存成功')
          }
        })
    },
    // 校验保存的参数
    checkParam() {
      let form = this.form
      let param = this.param
      let result = { success: 0, error: '', param: null }
      param.inhenceRouting = form.routeType // 当前任务类型
      // 任务名称
      if (form.taskName.length > 0) {
        param.name = form.taskName
      } else {
        result.mes = '任务名称不能为空'
        return result
      }
      // 选择任务
      if (form.task !== '') {
        let currentItem = this.taskListArr[form.task]
        param.defaultTaskId = currentItem.id
        param.defaultTaskName = currentItem.defaultTaskName
          // 自定义路由
          param.iosRouting = form.iosRouting // ios路由
          param.androidRouting = form.androidRouting // android路由
          param.miniAppRouting = form.miniAppRouting // 小程序路由
          param.mRouting = form.mRouting // M站路由
          // 固定路由
          param.defaultIosRouting = form.defaultIosRouting // ios路由
          param.defaultAndroidRouting = form.defaultAndroidRouting // android路由
          param.defaultMiniAppRouting = form.defaultMiniAppRouting // 小程序路由
          param.defaultMRouting = form.defaultMRouting // M站路由
      } else {
        result.mes = '选择任务不能为空'
        return result
      }
      // 序号
      if (form.num !== '') {
        param.sequence = form.num
      } else {
        result.mes = '序号不能为空'
        return result
      }
      // 时间
      if (form.taskTime) {
        let taskBeginTime = new Date(form.taskTime[0]).getTime()
        let currentTime = new Date().getTime()
        // if (taskBeginTime < currentTime) {
        //   result.mes = '开始时间不能晚于当前时间'
        //   return result
        // }
        param.beginTime = form.taskTime[0]
        param.endTime = form.taskTime[1]
      } else {
        result.mes = '开始时间开始时间、结束时间不能为空'
        return result
      }
      // 奖励内容
      if (form.rewardType !== '') {
        param.rewardType = form.rewardType
      } else {
        result.mes = '奖励内容不能为空'
        return result
      }
      //
      if (param.rewardType === 5) {
        // 金币数量
        if (form.specieNum !== '') {
          param.goldNumber = form.specieNum
          param.sceneIdentify = ''
        } else {
          result.mes = '金币数量不能为空'
          return result
        }
        // 可偷金币
        if (form.canStealGoldNumber === 0) {
          result.mes = '可偷金币必须是1到9999的整数'
          return result
        } else {
          
          param.canStealGoldNumber = form.canStealGoldNumber
        }
        if (form.canStealGoldNumber > form.specieNum) {
          result.mes = '可偷金币不可大于金币数量'
          return result
        }
      } else {
        // 挂接场景值
        if (form.sceneValue !== '') {
          param.sceneIdentify = form.sceneValue
          param.goldNumber = ''
        } else {
          result.mes = '挂接场景值不能为空'
          return result
        }
      }
      // ios版本下限
      if (form.iosVersion !== '') {
        let appVersion = this.confirmAppVersionInfo(
          this.iosVersionArr,
          form.iosVersion
        )
        param.iosVersionFrom = appVersion.appVersion
        param.iosVersionNumFrom = appVersion.versionNum
      } else {
        param.iosVersionFrom = ''
        param.iosVersionNumFrom = ''
      }
      // android版本下限
      if (form.androidVersion !== '') {
        let appVersion = this.confirmAppVersionInfo(
          this.androidVersionArr,
          form.androidVersion
        )
        param.androidVersionFrom = appVersion.appVersion
        param.androidVersionNumFrom = appVersion.versionNum
      } else {
        param.androidVersionFrom = ''
        param.androidVersionNumFrom = ''
      }
      // 访客类型
      if (form.visitorType.length > 0) {
        param.customerType.newVisitor = form.visitorType.indexOf(1) > -1 ? 1 : 0
        param.customerType.oldVisitor = form.visitorType.indexOf(2) > -1 ? 1 : 0
        param.customerType.customer = form.visitorType.indexOf(3) > -1 ? 1 : 0
      } else {
        result.mes = '下发用户类型不能为空'
        return result
      }
      // 任务描述
      param.taskDesc = form.desc
      // 任务属性--是否是固定路由， 0 否  1 是
      param.defaultInhenceRouting = form.defaultInhenceRouting
      // 校验通过
      result.success = 1
      result.param = param
      return result
    },
    // 确认 app 版本的相关信息
    confirmAppVersionInfo(arr, appVersion) {
      let len = arr.length
      for (let i = 0; i < len; i++) {
        if (arr[i].appVersion === appVersion) {
          return arr[i]
        }
      }
    }
  },
  filters: {
    isEmpty: value => {
      if (value !== '' && value !== null) {
        return value
      } else {
        return '无'
      }
    }
  }
}
</script>
<style scoped>
.mar-t20 {
  margin-top: 20px;
}
.w300 {
  width: 300px;
}
</style>

