<template>
  <div class="cms">
    <el-card class="box-card">
       <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label=" " class="mar-t20">
					<el-button type="primary" @click="updateAndroid">更新App下载页</el-button>
				</el-form-item><br>
        <el-form-item label=" ">
					<span>最近一次操作时间：{{updateTime}}</span>
        </el-form-item>
       </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
				sign: true,			// 重复提交锁
        updateTime: ''	// 更新时间
      }
    },
    mounted () {
     this.getUpdateTime()
    },
    methods:{
			// 获取app下载页更新时间
			getUpdateTime () {
				let self = this
				self.$service.systemSetting.download.getUpdateTime().then(res => {
					self.updateTime = res
				})
			},
			// 更新app下载页
			updateAndroid () {
				let self = this
				if (self.sign) {
					self.sign = false
					self.$service.systemSetting.download.updateAndroid().then(res => {
						self.sign = true
						self.updateTime = res
						self.$message.success("操作成功")
					})
					setTimeout(() => {
						self.sign = true
					}, 2000)
				}
			}
    }
  }
</script>
<style scoped>
	.mar-t20 {
		margin-top: 20px;
	}
</style>

