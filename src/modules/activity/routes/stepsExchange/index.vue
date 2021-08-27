<template>
  <div class="cms">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
        <span>步数换全局配置</span>
      </div>
			<!-- 表单 Begin -->
			<el-form ref="form" label-width="100px" size="small">
				<el-form-item label=" ">步数换总开关</el-form-item>
				<el-form-item label=" ">
					<el-radio-group v-model="stepsSetting.stepsSwitch">
						<el-radio :label="1">开启</el-radio>
						<el-radio :label="0">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label=" ">个人中心步数换开关</el-form-item>
				<el-form-item label=" ">
					<el-radio-group v-model="stepsSetting.myStepSwitch">
						<el-radio :label="1">开启</el-radio>
						<el-radio :label="0">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label=" ">邀请按钮文案</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model.trim="stepsSetting.inviteButtonCopy" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label=" ">每日行走步数可获取步数上限</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="stepsSetting.maxSteps" v-only-num="stepsSetting.maxSteps" :max-len="8"></el-input>
				</el-form-item>
				<el-form-item label=" ">步数换月可兑换特权金次数</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="stepsSetting.exchangeLimit" v-only-num="stepsSetting.exchangeLimit" :max-len="3"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button size="mini" type="primary" @click="stepsSettingSave">提交保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 表单 End -->
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
        <span>登录奖励（登录步数换获得的步数奖励）</span>
      </div>
			<!-- 表单 Begin -->
			<el-form ref="form" label-width="100px" size="small">
				<el-form-item label=" ">首次登录奖励（首次登录步数换奖励的步数）</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="loginAwardSetting.firstLoginAward" v-only-num="loginAwardSetting.firstLoginAward" :max-len="8"></el-input>
				</el-form-item>
				<el-form-item label=" ">日常登录奖励最低值（非首次登录步数换奖励的步数）</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="loginAwardSetting.minLoginAward" v-only-num="loginAwardSetting.minLoginAward" :max-len="8"></el-input>
				</el-form-item>
				<el-form-item label=" ">日常登录奖励最高值（非首次登录步数换奖励的步数）</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="loginAwardSetting.maxLoginAward" v-only-num="loginAwardSetting.maxLoginAward" :max-len="8"></el-input>
				</el-form-item>
				<el-form-item label=" " class="cl-gray">备注：日常登录获得的值为最高值和最低值之间的随机数，包含最高值和最低值</el-form-item>
				<el-form-item label=" ">
					<el-button size="mini" type="primary" @click="loginAwardSettingSave">提交保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 表单 End -->
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
        <span>首次邀请</span>
      </div>
			<!-- 表单 Begin -->
			<el-form ref="form" label-width="100px" size="small">
				<el-form-item label=" ">邀请好友奖励步数</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="newbieTaskSetting.rewardSteps" v-only-num="newbieTaskSetting.rewardSteps" :max-len="8"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button size="mini" type="primary" @click="newbieTaskSettingSave">提交保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 表单 End -->
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
        <span>日常任务--邀请好友</span>
      </div>
			<!-- 表单 Begin -->
			<el-form ref="form" label-width="100px" size="small">
				<el-form-item label=" ">邀请新用户步数奖励（首次登录步数换）</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="inviteFriendsSetting.newUserSteps" v-only-num="inviteFriendsSetting.newUserSteps" :max-len="8"></el-input>
				</el-form-item>
				<el-form-item label=" ">邀请老客步数奖励（首次登录步数换）</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model="inviteFriendsSetting.oldUserSteps" v-only-num="inviteFriendsSetting.oldUserSteps" :max-len="8"></el-input>
				</el-form-item>
				<el-form-item label=" " class="cl-gray">第5的整数倍为翻倍奖励</el-form-item>
				<el-form-item label=" ">
					<el-button size="mini" type="primary" @click="inviteFriendsSettingSave">提交保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 表单 End -->
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
        <span>日常任务—挑战</span>
      </div>
			<!-- 表单 Begin -->
			<el-form ref="form" label-width="100px" size="small">
				<div v-for="(item, i) in challengeSetting" :key="i">
					<el-form-item label=" ">挑战{{ i+1 }}（挑战步数）</el-form-item>
					<el-form-item label=" ">
						<el-input class="w600" v-model="item.challengeSteps" v-only-num:challengeSteps="challengeSetting" :index="i" :max-len="8"></el-input>
					</el-form-item>
					<el-form-item label=" ">挑战{{ i+1 }}（需缴纳步数）</el-form-item>
					<el-form-item label=" ">
						<el-input class="w600" v-model="item.paymentSteps" v-only-num:paymentSteps="challengeSetting" :index="i" :max-len="8"></el-input>
					</el-form-item>
				</div>
				<el-form-item label=" ">
					<el-button size="mini" type="primary" @click="challengeSettingSave">提交保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 表单 End -->
		</el-card>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
        <span>分享素材</span>
      </div>
			<!-- 表单 Begin -->
			<el-form ref="form" label-width="100px" size="small">
				<el-form-item label=" ">邀请好友（日常任务、首次邀请）小程序分享标题</el-form-item>
				<el-form-item label=" ">
					<el-input class="w600" v-model.trim="sharingMaterialSetting.title" maxlength="40"></el-input>
				</el-form-item>
				<el-form-item label=" ">邀请好友（日常任务、首次邀请）小程序分享卡片图</el-form-item>
				<el-form-item label=" ">
					<div class="left">
						<upload class="online" action="/image/uploadImage?width=500&height=400&fileSize=300" :size="300" :width="125"
						:image-url="sharingMaterialSetting.cardChartImg" @success="sharingMaterialSetting.cardChartImg=$event" ></upload>
					</div>
					<span class="mar-l20">图片尺寸500*400px，jpg/png格式，小于300k</span>
				</el-form-item>
				<el-form-item label=" ">当期挑战分享海报底图</el-form-item>
				<el-form-item label=" ">
					<div class="left">
						<upload class="online" action="/image/uploadImage?width=750&height=1334&fileSize=300" :size="300" :height="178"
						:image-url="sharingMaterialSetting.currentChallengesImg" @success="sharingMaterialSetting.currentChallengesImg=$event" ></upload>
					</div>
					<span class="mar-l20">图片尺寸750*1334px，jpg/png格式，小于300k</span>
				</el-form-item>
				<el-form-item label=" ">每日挑战分享海报底图</el-form-item>
				<el-form-item label=" ">
					<div class="left">
						<upload class="online" action="/image/uploadImage?width=750&height=1334&fileSize=300" :size="300" :height="178"
						:image-url="sharingMaterialSetting.dailyChallengesImg" @success="sharingMaterialSetting.dailyChallengesImg=$event" ></upload>
					</div>
					<span class="mar-l20">图片尺寸750*1334px，jpg/png格式，小于300k</span>
				</el-form-item>
				<el-form-item label=" ">
					<el-button size="mini" type="primary" @click="sharingMaterialSettingSave">提交保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 表单 End -->
		</el-card>

  </div>
</template>

<script>
const Upload = () => import('@/components/upload')
export default {
  name: 'stepsExchange',
  data () {
    return {
			stepsSetting: {
				stepsSwitch:1,
				myStepSwitch:0,
				inviteButtonCopy:'',
				exchangeLimit:3,
				maxSteps:1
			},			// 步数换全局配置
			loginAwardSetting: {
				firstLoginAward:0,
				minLoginAward:0,
				maxLoginAward:0
			},			// 登录奖励
			newbieTaskSetting: {
				rewardSteps:0
			},			// 首次邀请
			inviteFriendsSetting: {
				newUserSteps:0,
				oldUserSteps:0
			},			// 日常任务--邀请好友
			challengeSetting: [
				{
					levelStr:'',
					challengeSteps:'',
					paymentSteps:''
				}, {
					levelStr:'',
					challengeSteps:'',
					paymentSteps:''
				}, {
					levelStr:'',
					challengeSteps:'',
					paymentSteps:''
				}
			],			// 日常任务—挑战
			sharingMaterialSetting: {
				title:'',
				cardChartImg:'',
				currentChallengesImg:'',
				dailyChallengesImg:''
			}				// 分享素材
		}
	},
	components:{
  	Upload
  },
  methods: {
		// 获取步数换配置
		getStepsSetting() {
			this.$service.activity.stepsExchange.stepsSettingInfo().then( res => {
				res.stepsSetting && (this.stepsSetting = res.stepsSetting)
				res.loginAwardSetting && (this.loginAwardSetting = res.loginAwardSetting)
				res.newbieTaskSetting && (this.newbieTaskSetting = res.newbieTaskSetting)
				res.inviteFriendsSetting && (this.inviteFriendsSetting = res.inviteFriendsSetting)
				res.challengeSetting && res.challengeSetting.length && (this.challengeSetting = res.challengeSetting)
				if (res.sharingMaterialSetting) {
					this.sharingMaterialSetting.title = res.sharingMaterialSetting.title || ''
					this.sharingMaterialSetting.cardChartImg = res.sharingMaterialSetting.cardChartImg || ''
					this.sharingMaterialSetting.currentChallengesImg = res.sharingMaterialSetting.currentChallengesImg || ''
					this.sharingMaterialSetting.dailyChallengesImg = res.sharingMaterialSetting.dailyChallengesImg || ''
				}
			})
		},
		// 验证
		testNum(val, b, text) {
  		if(typeof val !== 'number' || val>99999999 || val<b) {
  			this.$message.warning('请输入' + b + '-99999999' + text); return false
  		}
  		return true
		},
		testTitle(val) {
  		if(typeof val !== 'string' || val.length>40 || val.length<1){
  			this.$message.warning('请输入邀请好友（日常任务、首次邀请）小程序分享标题'); return false
  		}
  		return true
		},
		// 步数换全局配置保存
		stepsSettingSave () {
			if (!this.stepsSetting.inviteButtonCopy) {
				this.$message.warning('请输入1-20字邀请按钮文案')
				return
			}
			if (!this.testNum(this.stepsSetting.maxSteps, 1, '每日行走步数可获取步数上限')) return
			if (!this.stepsSetting.exchangeLimit) {
				this.$message.warning('请输入1-999步数换月可兑换特权金次数')
				return
			}
			this.$service.activity.stepsExchange.stepsSetting(this.stepsSetting).then( res => {
				this.$message.success('提交保存成功')
			})
		},
		// 登录奖励保存
		loginAwardSettingSave () {
			if (!this.testNum(this.loginAwardSetting.firstLoginAward, 0, '首次登录奖励（首次登录步数换奖励的步数）')) return
			if (!this.testNum(this.loginAwardSetting.minLoginAward, 0, '日常登录奖励最低值（非首次登录步数换奖励的步数）')) return
			if (!this.testNum(this.loginAwardSetting.maxLoginAward, 0, '日常登录奖励最高值（非首次登录步数换奖励的步数）')) return
			if (this.loginAwardSetting.minLoginAward > this.loginAwardSetting.maxLoginAward) {
				this.$message.warning('日常登录最高值必须大于等于最低值')
				return
			}
			this.$service.activity.stepsExchange.loginAwardSetting(this.loginAwardSetting).then( res => {
				this.$message.success('提交保存成功')
			})
		},
		// 首次邀请保存
		newbieTaskSettingSave () {
			if (!this.testNum(this.newbieTaskSetting.rewardSteps, 0, '邀请好友奖励步数')) return
			this.$service.activity.stepsExchange.newbieTaskSetting(this.newbieTaskSetting).then( res => {
				this.$message.success('提交保存成功')
			})
		},
		// 日常任务--邀请好友保存
		inviteFriendsSettingSave () {
			if (!this.testNum(this.inviteFriendsSetting.newUserSteps, 0, '邀请新用户步数奖励（首次登录步数换）')) return
			if (!this.testNum(this.inviteFriendsSetting.oldUserSteps, 0, '邀请老客步数奖励（首次登录步数换）')) return
			this.$service.activity.stepsExchange.inviteFriendsSetting(this.inviteFriendsSetting).then( res => {
				this.$message.success('提交保存成功')
			})
		},
		// 日常任务—挑战保存
		challengeSettingSave () {
			for (let i=0, item; i<this.challengeSetting.length; i++) {
				item = this.challengeSetting[i]
				if (!this.testNum(item.challengeSteps, 1, '挑战' + (i+1) + '（挑战步数）')) return
				if (!this.testNum(item.paymentSteps, 1, '挑战' + (i+1) + '（需缴纳步数）')) return
			}
			this.$service.activity.stepsExchange.challengeSetting(this.challengeSetting).then( res => {
				this.$message.success('提交保存成功')
			})
		},
		// 分享素材保存
		sharingMaterialSettingSave () {
			if (!this.testTitle(this.sharingMaterialSetting.title)) return
			if (!this.sharingMaterialSetting.cardChartImg) {
				this.$message.warning('请上传邀请好友（日常任务、首次邀请）小程序分享卡片图')
				return
			}
			if (!this.sharingMaterialSetting.currentChallengesImg) {
				this.$message.warning('请上传当期挑战分享海报底图')
				return
			}
			if (!this.sharingMaterialSetting.dailyChallengesImg) {
				this.$message.warning('请上传每日挑战分享海报底图')
				return
			}
			this.$service.activity.stepsExchange.sharingMaterialSetting(this.sharingMaterialSetting).then( res => {
				this.$message.success('提交保存成功')
			})
		}
	},
	mounted(){
		this.getStepsSetting()
	}
}
</script>

<style scoped>
	.w600 {
		width: 600px;
	}
	.online {
		display: inline-block;
	}
  .box-card {
		margin-bottom: 20px;
	}
	.cl-gray {
		color: gray;
	}
	.left {
		float: left;
	}
	.mar-l20 {
		margin-left: 20px;
	}
</style>
