<template>
  <div>
    <el-card>
			<div slot="header" class="clearfix"><span>全局配置</span></div>
			<div>
				<el-form class="mar-t20" ref="form" label-width="100px" size="small">
					<el-form-item label="间隔天数：">
						<el-input class="w120" v-only-num="globalConfig.intervalDay" v-model="globalConfig.intervalDay" :maxLength="3"></el-input>
						<span class="mar-l20 font-dark0">1-999的整数</span>
					</el-form-item>
					<el-form-item label="总开关：">
						<el-radio-group v-model="globalConfig.hangUpSwitch">
							<el-radio :label="1">开启</el-radio>
							<el-radio :label="0">关闭</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="submit">提交保存</el-button>
					</el-form-item>
				</el-form>
			</div>
    </el-card>
		<el-card class="mar-t20">
      <el-collapse v-model="activeName">
        <el-collapse-item title="首页弹窗" :name="1">
					<setting-module :type="1" :moduleData="homePage"></setting-module>
        </el-collapse-item>
				<el-collapse-item title="一起拼频道页" :name="2">
					<setting-module :type="2" :moduleData="toggroup"></setting-module>
        </el-collapse-item>
				<el-collapse-item title="搜索结果页" :name="3">
					<setting-module :type="3" :moduleData="searchResult"></setting-module>
        </el-collapse-item>
				<el-collapse-item title="个人中心页" :name="4">
					<setting-module :type="4" :moduleData="minePage"></setting-module>
        </el-collapse-item>
				<el-collapse-item title="购物车页" :name="5">
					<setting-module :type="5" :moduleData="shopCar"></setting-module>
        </el-collapse-item>
        <el-collapse-item title="特权金弹窗挂接任务" :name="6">
          <el-form class="mar-t20" label-width="200px" size="small">
            <el-form-item label="未登录是否挂接特权金：">
              <el-radio-group v-model="hangUpTaskConfig.dialogSwitch">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="submitHangUpTaskConfig">提交保存</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="浮球设置-未登录" :name="7">
          <el-form class="mar-t20" label-width="200px" size="small">
            <el-form-item label="活动1：">
              <el-radio-group v-model="floatBallUnLoginList[0].dialogSwitch">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片：">
              <upload class="fl" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" @success="floatBallUnLoginList[0].dialogImage = $event" :imageUrl="floatBallUnLoginList[0].dialogImage" :size="300"></upload>
              <span class="mar-l20 font-dark0 ">支持jpg、png格式文件，文件小于300k</span>
            </el-form-item>
            <el-form-item label="活动2：">
              <el-radio-group v-model="floatBallUnLoginList[1].dialogSwitch">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片：">
              <upload class="fl" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" @success="floatBallUnLoginList[1].dialogImage = $event" :imageUrl="floatBallUnLoginList[1].dialogImage" :size="300"></upload>
              <span class="mar-l20 font-dark0 ">支持jpg、png格式文件，文件小于300k</span>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="submitFloatBallUnLogin">提交保存</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="浮球设置-已登录" :name="8">
          <el-form class="mar-t20" label-width="200px" size="small">
            <el-form-item label="活动1：">
              <el-radio-group v-model="floatBallLoginList[0].dialogSwitch">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片：">
              <upload class="fl" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" @success="floatBallLoginList[0].dialogImage = $event" :imageUrl="floatBallLoginList[0].dialogImage" :size="300"></upload>
              <span class="mar-l20 font-dark0 ">支持jpg、png格式文件，文件小于300k</span>
            </el-form-item>
            <el-form-item label="活动2：">
              <el-radio-group v-model="floatBallLoginList[1].dialogSwitch">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片：">
              <upload class="fl" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" @success="floatBallLoginList[1].dialogImage = $event" :imageUrl="floatBallLoginList[1].dialogImage" :size="300"></upload>
              <span class="mar-l20 font-dark0 ">支持jpg、png格式文件，文件小于300k</span>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="submitFloatBallLogin">提交保存</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script type="text/javascript">
	import SettingModule from './settingModule'
	import Upload from '@/components/upload'
  export default {
    name: 'moduleSetting',
    data () {
      return {
				activeName: 0,
				globalConfig: {intervalDay:0, hangUpSwitch:0},	// 全局配置
				homePage: {dialogSwitch:0, delaySeconds:0, dialogImage:'',jumpType:0},			// 首页弹窗
				toggroup: {dialogSwitch:0, delaySeconds:'', dialogImage:''},		// 一起拼频道页
				searchResult: {dialogSwitch:0, delaySeconds:'', dialogImage:''},// 搜索结果页
				minePage: {dialogSwitch:0, delaySeconds:'', dialogImage:''},		// 个人中心页
        shopCar: {dialogSwitch:0, delaySeconds:'', dialogImage:''},      // 购物车页
        hangUpTaskConfig: {dialogSwitch:1, delaySeconds:'', dialogImage:''},      // 特权金弹窗挂接任务
        floatBallUnLoginList:[{     // 浮球设置-未登录
          dialogSwitch:0,
          dialogImage:'',
          businessType:1
        },{
          dialogSwitch:0,
          dialogImage:'',
          businessType:2
        }], 
        floatBallLoginList:[{      // 浮球设置-已登录
          dialogSwitch:0,
          dialogImage:'',
          businessType:1
        },{
          dialogSwitch:0,
          dialogImage:'',
          businessType:2
        }]
      }
    },
    components:{SettingModule , Upload},
    mounted () {
      this.$service.systemSetting.moduleSetting.homeList().then( res => {
				res && res.globalConfig && (this.globalConfig = res.globalConfig)
				res && res.homePage && (this.homePage = res.homePage)
				res && res.toggroup && (this.toggroup = res.toggroup)
				res && res.searchResult && (this.searchResult = res.searchResult)
				res && res.minePage && (this.minePage = res.minePage)
        res && res.shopCar && (this.shopCar = res.shopCar)
        res && res.hangUpTaskConfig && (this.hangUpTaskConfig = res.hangUpTaskConfig)
        res && res.floatBallUnLoginList && (this.floatBallUnLoginList = res.floatBallUnLoginList)
        res && res.floatBallLoginList && (this.floatBallLoginList = res.floatBallLoginList)
      })
    },
    methods:{
      submit () {
				if (!this.globalConfig.intervalDay) {
					this.$message.warning('间隔天数请填写1-999的整数')
					return
				}
				this.$service.systemSetting.moduleSetting.globalConfig(this.globalConfig).then(res => {
					res && this.$message.success('提交保存成功')
				})
			},
      submitHangUpTaskConfig () {
        this.hangUpTaskConfig.type = 6
        this.$service.systemSetting.moduleSetting.configMaterials([this.hangUpTaskConfig]).then(res => {
          res && this.$message.success('提交保存成功')
        })
      },
      // 浮球设置-未登录
      submitFloatBallUnLogin () {
        this.floatBallUnLoginList[0].type = 7
        this.floatBallUnLoginList[1].type = 7
        this.floatBallUnLoginList[0].businessType = 1
        this.floatBallUnLoginList[1].businessType = 2
        this.$service.systemSetting.moduleSetting.configMaterials(this.floatBallUnLoginList).then(res => {
          res && this.$message.success('提交保存成功')
        })
      },
      // 浮球设置-已登录
      submitFloatBallLogin () {
        this.floatBallLoginList[0].type = 8
        this.floatBallLoginList[1].type = 8
        this.floatBallLoginList[0].businessType = 1
        this.floatBallLoginList[1].businessType = 2
        this.$service.systemSetting.moduleSetting.configMaterials(this.floatBallLoginList).then(res => {
          res && this.$message.success('提交保存成功')
        })
      }
    }
  }
</script>


<style type="text/css" scoped>
  .mar-l20 {
    margin-left: 20px;
  }
	.mar-t20 {
    margin-top: 20px;
  }
	.w120 {
		width: 120px;
	}
</style>
