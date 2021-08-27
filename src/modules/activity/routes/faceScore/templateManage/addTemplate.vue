<template>
  <div class="cms">
  	<el-card class="box-card">
  		<div slot="header" class="clearfix">
        <span class="line-32">添加模板</span>
        <el-button class="fr" type="primary" size="small" @click="previewDialog = true">预览</el-button>
      </div>
      <el-form ref="form" label-width="150px" size="small" class="input-normal">
      	<el-form-item label="模板名称：">
          <el-input v-model.trim="param.templateName" :maxLength="10" class="w300 fl"></el-input>
          <span class="ma-l-20 fl font-dark0">*限10个字</span>
        </el-form-item>
        <el-form-item label="上传模板：">
          <upload class="w100 fl" action="/image/uploadImage?width=-1&height=-1&fileSize=2048" @success="handleTemplate" :imageUrl="param.uploadTemplate" :type="jpg"></upload>
          <span class="ma-t-20 ma-l-20 fl font-dark0 ">*支持jpg格式文件，文件小于2M</span>
        </el-form-item>
        <el-form-item label="所属主题：">
          <match :val="param.motifName" wClass="w200 fl" value-key="motifName" @change="param.motifId = '';param.motifName = $event" @select="param.motifId = $event.motifId;param.motifName = $event.motifName" :list="motifList" placeholder=""></match>
          <span class="ma-l-20 fl font-dark0 ">*</span>
        </el-form-item>
        <el-form-item label="融合度：">
          <el-input v-model="param.blend" v-only-num="param.blend" :max-len="3" class="w100 fl"></el-input>
          <span class="ma-l-10 fl">%</span>
          <span class="ma-l-20 fl font-dark0 ">*仅能输入整数</span>
        </el-form-item>
        <el-form-item label="">
          <router-link :to="{ path: '../',append:true }">
          	<el-button type="primary" size="small">返回</el-button>
        	</router-link>
          <el-button type="primary" @click="addTemplate">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 预览 -->
    <el-dialog :visible.sync="previewDialog" width="50%" title="预览" class="mapBox" @close="previewOriginalUrl = '';previewResultUrl = ''">
      <el-form ref="form" label-width="150px" size="small">
        <el-form-item label="上传照片：">
          <upload class="w100 fl" action="/image/uploadImage?width=-1&height=-1&fileSize=2048" @success="handlePreviewOriginal" :imageUrl="previewOriginalUrl" :type="jpg"></upload>
          <span class="ma-t-20 ma-l-20 fl font-dark0 ">*支持jpg格式文件，文件小于2M</span>
        </el-form-item>
        <el-form-item label="换装完成图：">
        	<div class="w-h-100">
        		<img-view v-if="previewResultUrl !== ''" class="w-h-100" :src="previewResultUrl"></img-view>
        	</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button size="small" type="primary" @click="fuseImage">预览</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import Match from '@/components/associativeMatch'
	import upload from '@/components/upload'
  export default {
  	name: 'addTemplate',
    data() {
      return {
      	jpg:[".jpg",".jpeg"],//上传图片格式限制
      	param:{
      		templateName:'',//模板名称
					uploadTemplate:'',//模板url
					motifId:'',//所属主题
					motifName:'',//所属主题名称
					blend:50//融合度
      	},
      	motifList:[],	//主题列表
      	previewDialog:false,
      	previewOriginalUrl:'',	// 预览--处理前的图片
      	previewResultUrl:'',	// 预览--处理后的图片
      	
      	
      }
    },
	  components:{
	  	upload,Match
	  },
    methods:{
      handleTemplate (val) {
	  		this.param.uploadTemplate = val 
	  	},
      handlePreviewOriginal (val) {
	  		this.previewOriginalUrl = val 
	  	},
	  	// 添加模板
	  	addTemplate() {
        let self = this
        if(!self.param.templateName){
	  			self.$message.warning("请输入模板名称")
	  			return false
        }else if(!self.param.uploadTemplate){
	  			self.$message.warning("请上传上传模板")
	  			return false
        }else if(!self.param.motifId){
	  			self.$message.warning("所属主题无效，请重新输入")
	  			return false
        }else if(self.param.blend === ''){
	  			self.$message.warning("请输入融合度")
	  			return false
        }else if(self.param.blend > 100){
	  			self.$message.warning("请输入0-100的整数融合度")
	  			return false
        }
        self.$service.activity.faceScore.addTemplate(self.param).then(res => {
          this.$router.back()
       	})
      },
      // 获取主题列表
	  	getMotifList(){
	  		let self = this
      	self.$service.activity.faceScore.queryTopicSequenceList().then(res => {
          self.motifList = res
       	})
	  	},
	  	// 融合图片
	  	fuseImage(){
	  		if(!this.previewOriginalUrl){
	  			this.$message.warning("请先上传照片")
	  			return false
	  		}
	  		this.$service.activity.faceScore.fuseImage({
	  			previewOriginalUrl:this.previewOriginalUrl,
	  			blend:this.param.blend,
	  			uploadTemplate:this.param.uploadTemplate
	  		}).then(res => {
          this.previewResultUrl = res
       	})
	  	}
    },
    mounted () {
    	this.getMotifList()
    }
  }
</script>
<style type="text/css" scoped>
	.w-h-100{ width: 100px; height: 100px;}
</style>
