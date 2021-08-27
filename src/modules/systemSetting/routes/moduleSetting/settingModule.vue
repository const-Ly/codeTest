<template>
	<div>
		<el-form class="mar-t20" ref="form" label-width="100px" size="small">
			<el-form-item label="图片：">
				<upload class="fl" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" @success="updateImg" :imageUrl="param.dialogImage" :size="300"></upload>
				<span class="mar-l20 font-dark0 ">支持jpg、png格式文件，文件小于300k</span>
			</el-form-item>
			<el-form-item label="开关：">
				<el-radio-group v-model="param.dialogSwitch">
					<el-radio :label="1">开启</el-radio>
					<el-radio :label="0">关闭</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="触发时间：" v-if="[1,2,3,4,5].indexOf(param.type) > -1">
				<span v-if="param.type === 1">0</span>
				<span v-else>
					<el-input class="w120" v-model="param.delaySeconds" v-only-num="param.delaySeconds" :max-len="2"></el-input>
					<span class="mar-l20 font-dark0">1-99的整数</span>
				</span>
			</el-form-item>
			<el-form-item label="跳转类型：" v-if="param.type === 1">
        <el-select v-model="param.jumpType" class="w200">
          <el-option label="无" :value="0"></el-option>
          <el-option label="一起拼频道页" :value="1"></el-option>
          <el-option label="特权金下发页" :value="2"></el-option>
        </el-select>
			</el-form-item>
			<el-form-item label="">
				<el-button type="primary" @click="submit">提交保存</el-button>
			</el-form-item>
	</el-form>
	</div>
</template>

<script type="text/javascript">
	import Upload from '@/components/upload'
	export default {
		name:"setting-module",
		data () {
			return {
				param: {
					type: this.type,
					dialogImage: this.moduleData.dialogImage,
					dialogSwitch: this.moduleData.dialogSwitch,
					delaySeconds: this.moduleData.delaySeconds,
					jumpType: this.moduleData.jumpType || null
				}
			}
		},
		props:{
			type: {
				type: Number,
				default: 0
			},
			moduleData: {
				type: Object,
				default: {}
			}
		},
		components:{Upload},
		watch: {
			type (val, old) {
				this.param.type = val
			},
			moduleData (val, old) {
				this.param.dialogImage = val.dialogImage
				this.param.dialogSwitch = val.dialogSwitch
				this.param.delaySeconds = val.delaySeconds
				this.param.jumpType = this.type === 1 ? val.jumpType : null
			}
		},
		methods:{
			updateImg (url) {
				this.param.dialogImage = url
			},
			submit () {
				if (!this.param.dialogImage) {
					this.$message.warning('请上传组件图片')
					return
				}
				if (!this.param.delaySeconds && [2,3,4,5].indexOf(this.param.type) > -1) {
					this.$message.warning('请输入1-99触发时间')
					return
				}
				this.$service.systemSetting.moduleSetting.configMaterials([this.param]).then(res => {
					res && this.$message.success("提交保存成功")
				})
			}
		}
	}
</script>

<style scoped>
	.w120 {
		width: 120px;
	}
	.mar-t20 {
    margin-top: 20px;
  }
	.mar-l20 {
    margin-left: 20px;
  }
</style>
