<template>
  <div class="cms">
  	<el-card class="box-card">
      <el-form ref="form" label-width="150px" size="small" class="input-normal">
      	<el-form-item label="主题名称：">
          <el-input v-model.trim="param.motifName" :maxLength="5" class="w300 fl"></el-input>
          <span class="ma-l-20 fl font-dark0">*限5个字</span>
        </el-form-item>
        <el-form-item label="主题图标：">
          <upload class="w100 fl" action="/image/uploadImage?width=-1&height=-1&fileSize=50" @success="handleMotifIcon" :imageUrl="param.motifIcon" :size="50"></upload>
          <span class="ma-t-20 ma-l-20 fl font-dark0 ">*支持jpg、png格式文件，文件小于50k</span>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="param.motifGender" class="w200 fl">
            <el-option label="男" :value=1></el-option>
            <el-option label="女" :value=2></el-option>
          </el-select>
          <span class="ma-l-20 fl font-dark0 ">*</span>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="param.ordinal" v-only-num="param.ordinal" :max-len="3" class="w100 fl"></el-input>
          <span class="ma-l-20 fl font-dark0 ">*仅能输入整数</span>
        </el-form-item>
        <el-form-item label="">
          <router-link :to="{ path: '../../',append:true }">
          	<el-button type="primary" size="small">返回</el-button>
        	</router-link>
          <el-button type="primary" @click="editMotif">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
	import upload from '@/components/upload'
  export default {
  	name: 'editMotif',
    data() {
      let self = this
      return {
      	param:{
      		motifId:'',//主题id
      		motifName:'',//主题名称
					motifIcon:'',//主题图标
					motifGender:2,//性别
					ordinal:''//排序
      	}
      }
    },
	  components:{
	  	upload
	  },
    methods:{
      handleMotifIcon (val) {
	  		this.param.motifIcon = val 
	  	},
	  	getMotif(){
        let self = this
	  		self.$service.activity.faceScore.queryTopicById({motifId:self.$route.params.id}).then(res => {
          self.param = res
          self.param.motifId = self.$route.params.id//主题id
       	})
	  	},
	  	// 编辑主题
	  	editMotif() {
        let self = this
        if(!self.param.motifName){
	  			self.$message.warning("请输入主题名称")
	  			return false
        }else if(!self.param.motifIcon){
	  			self.$message.warning("请上传主题图标")
	  			return false
        }else if(self.param.ordinal === ''){
	  			self.$message.warning("请输入排序")
	  			return false
        }
        self.$service.activity.faceScore.updateTopic(self.param).then(res => {
          this.$router.back()
       	})
      }
    },
    mounted () {
    	this.getMotif()
    }
  }
</script>
<style type="text/css" scoped>
</style>
