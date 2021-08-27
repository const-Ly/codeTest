<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form ref="form" label-width="200px" size="small" class="input-normal mar-t20">
        <el-form-item label="顶部引导下载栏图片：">
          <upload class="fl" action="/image/uploadImage?width=750&height=100&fileSize=100" @success="handleFloatImage" :imageUrl="floatImage" :size="100" :width="375" :height="50"></upload>
          <span class="ma-l-20 ma-t-10 fl font-dark0 ">支持jpg/png格式，750*100px，小于100k</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveFloatImage">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
	import upload from '@/components/upload'
  export default {
  	name: 'topGuideDownload',
    data () {
      return {
				floatImage:""
      }
    },
    mounted () {
     this.getInfo()
    },
	  components:{
	  	upload
	  },
    methods:{
			getInfo () {
				let self = this
				self.$service.systemSetting.mManagement.getMFloat().then(res => {
					self.floatImage = res.floatImage
				})
			},
      handleFloatImage (val) {
	  		this.floatImage = val 
	  	},
			saveFloatImage () {
				let self = this
				if(!self.floatImage){
					self.$message.warning("请上传顶部引导下载栏图片")
	  			return false
				}
				self.$service.systemSetting.mManagement.updateMFloat({floatImage:self.floatImage}).then(res => {
					self.$message.success("提交成功")
				})
			},
    }
  }
</script>
<style scoped>
	.mar-t20 {
		margin-top: 20px;
	}
</style>

