<template>
  <div class="cms">
  	<el-card class="box-card">
  		<div slot="header" class="clearfix">
        <span class="line-32">首页配置</span>
      </div>
      <el-form ref="form" label-width="150px" size="small" class="input-normal">
        <el-form-item label="首页展示图：">
          <upload class="w100 fl" action="/image/uploadImage?width=-1&height=-1&fileSize=150" @success="handleHomeShowImg" :imageUrl="homeDeploy.homeShowImg" :size="150"></upload>
          <span class="ma-l-20 ma-t-20 fl font-dark0 ">*支持jpg、png格式文件，文件小于150k</span>
        </el-form-item>
        <el-form-item label="相册按钮：">
          <upload class="w100 fl" action="/image/uploadImage?width=-1&height=-1&fileSize=50" @success="handlePhotoAlbumBtnImg" :imageUrl="homeDeploy.photoAlbumBtnImg" :size="50"></upload>
          <span class="ma-l-20 ma-t-20 fl font-dark0 ">*支持jpg、png格式文件，文件小于50k</span>
        </el-form-item>
        <el-form-item label="拍摄按钮：">
          <upload class="w100 fl" action="/image/uploadImage?width=-1&height=-1&fileSize=50" @success="handlePphotoBtnImg" :imageUrl="homeDeploy.photoBtnImg" :size="50"></upload>
          <span class="ma-l-20 ma-t-20 fl font-dark0 ">*支持jpg、png格式文件，文件小于50k</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveHomeDeploy">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20">
  		<div slot="header" class="clearfix">
        <span class="line-32">入口配置</span>
      </div>
      <el-form ref="form" label-width="200px" size="small" class="input-normal">
        <el-form-item label="颜值入口展示：">
          <el-radio-group v-model="entranceDeploy.beautyEntranceShow">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="颜值分享统一跳转商城首页：">
          <el-radio-group v-model="entranceDeploy.beautySkipHome">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveEntranceDeploy">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
	import upload from '@/components/upload'
  export default {
  	name: 'pageDeploy',
    data() {
      return {
      	homeDeploy:{
      		type:1,	// 配置类型：1.首页配置，2.参数配置，3.颜值配置. 4颜值开关配置
	      	homeShowImg:'',
	      	photoAlbumBtnImg:'',
	      	photoBtnImg:''
      	},
      	entranceDeploy:{
      		type:4,	// 配置类型：1.首页配置，2.参数配置，3.颜值配置. 4颜值开关配置
      		beautyEntranceShow:1,	// 颜值入口展示,0关，1开
      		beautySkipHome:0	// 颜值分享统一跳转商城首页,0关，1开
      	}
      }
    },
	  components:{
	  	upload
	  },
    methods:{
     getDeploy(val) {
        let self = this
       	self.$service.activity.faceScore.queryConfig().then(res => {
          self.homeDeploy.homeShowImg = res.homeShowImg
          self.homeDeploy.photoAlbumBtnImg = res.photoAlbumBtnImg
          self.homeDeploy.photoBtnImg = res.photoBtnImg
          self.entranceDeploy.beautyEntranceShow = res.beautyEntranceShow
          self.entranceDeploy.beautySkipHome = res.beautySkipHome
          
       	})
      },
      handleHomeShowImg (val) {
	  		this.homeDeploy.homeShowImg = val 
	  	},
      handlePhotoAlbumBtnImg (val) {
	  		this.homeDeploy.photoAlbumBtnImg = val 
      },
      handlePphotoBtnImg (val) {
	  		this.homeDeploy.photoBtnImg = val 
	  	},
	  	saveHomeDeploy() {
        let self = this
        if(!self.homeDeploy.homeShowImg){
	  			self.$message.warning("请上传首页展示图")
	  			return false
        }else if(!self.homeDeploy.photoAlbumBtnImg){
	  			self.$message.warning("请上传相册按钮")
	  			return false
        }else if(!self.homeDeploy.photoBtnImg){
	  			self.$message.warning("请上传拍摄按钮")
	  			return false
        }
        self.$service.activity.faceScore.saveConfig(self.homeDeploy).then(res => {
          self.$message.success("提交成功")
       	})
      },
	  	saveEntranceDeploy() {
        let self = this
        self.$service.activity.faceScore.saveConfig(self.entranceDeploy).then(res => {
          self.$message.success("提交成功")
       	})
      }
    },
    mounted () {
      this.getDeploy()
    }
  }
</script>
<style type="text/css" scoped>
</style>
