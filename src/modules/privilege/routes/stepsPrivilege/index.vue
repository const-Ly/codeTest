<template>
  <div class="cms">

		<el-card class="box-card">
			<!-- 表单 Begin -->
			<el-form ref="form" label-width="100px" size="small">
				<div v-for="(item, i) in stepsPrivilegeMoney" :key="i">
					<el-form-item label=" ">兑换（场景标识：{{ item.exchangeScenario }}，特权金面额：{{ item.exchangeAmount || '--' }}）</el-form-item>
					<el-form-item label=" " v-if="i > 0">
						<el-radio-group v-model="item.status" @change="itemInfo(item)">
							<el-radio :label="1">开启</el-radio>
							<el-radio :label="0">关闭</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label=" " v-if="item.status===1">
						<el-input class="w100" v-model="item.steps" v-only-num:steps="stepsPrivilegeMoney" :index="i" :max-len="8"></el-input>
						步和
						<el-input class="w100" v-model="item.invitation" v-only-num:invitation="stepsPrivilegeMoney" :index="i" :max-len="8"></el-input>
						次邀请
					</el-form-item>
				</div>
				<el-form-item label=" ">
					<el-button size="mini" type="primary" @click="stepsPrivilegeMoneySetting">提交保存</el-button>
				</el-form-item>
			</el-form>
			<!-- 表单 End -->
		</el-card>

  </div>
</template>

<script>
const Upload = () => import('@/components/upload')
export default {
  name: 'stepsPrivilege',
  data () {
    return {
			stepsPrivilegeMoney: [
				{
					'exchangeScenario':'',
					'exchangeAmount':'',
					'status':1,
					'steps':100000,
					'invitation':10
				}
			]
    }
	},
	components:{
		Upload
  },
  methods: {
		// 获取步数换配置
		stepsPrivilegeMoneyInfo() {
			this.$service.privilege.stepsPrivilege.stepsPrivilegeMoneyInfo().then( res => {
				res && res.length && (this.stepsPrivilegeMoney = res)
			})
		},
		// 提交保存
		stepsPrivilegeMoneySetting () {
			for (let i=0, item; i<this.stepsPrivilegeMoney.length; i++) {
				item = this.stepsPrivilegeMoney[i]
				if (item.status === 1) {
					if (!this.testNum(item.steps, 1, '请输入1-99999999所需步数')) return
					if (!this.testNum(item.invitation, 0, '请输入0-99999999邀请次数')) return
				}
			}
			this.$service.privilege.stepsPrivilege.stepsPrivilegeMoneySetting(this.stepsPrivilegeMoney).then( res => {
				this.$message.success('提交保存成功')
			})
		},
		// 初始化
		itemInfo(item) {
			item.steps = ''
			item.invitation = ''
		},
		// 验证
		testNum(val, b, text) {
  		if(typeof val !== 'number' || val>99999999 || val<b){
  			this.$message.warning(text); return false
  		}
  		return true
		}
	},
	mounted(){
		this.stepsPrivilegeMoneyInfo()
	}
}
</script>

<style scoped>

</style>
