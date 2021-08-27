<template>
  <div class="cms">
  	<el-card class="box-card">
      <el-form ref="form" label-width="200px" size="small" class="input-normal">
        <el-form-item label="*分享换装卡片文案：">
        	<ul>
	          <li v-for="(item,idx) in param.reloadingCardStrList" :key="idx" class="ma-b-10">
	        		<el-input v-model.trim="param.reloadingCardStrList[idx]" :maxLength="40" class="w300"></el-input>
	        		<span v-if="param.reloadingCardStrList.length>1" class="font font-danger ma-l-20" @click="delCont(param.reloadingCardStrList,idx)">删除</span>
	          </li>
	        </ul>
	        <el-button type="text" class="font font-blue" v-show="param.reloadingCardStrList.length<10" @click="addCont(param.reloadingCardStrList)">再添加一条</el-button>
        </el-form-item>
        
        <el-form-item label="*分享换装海报背景图：">
        	<span class="ma-l-20 font-dark0">(建议尺寸750x1334px)</span>
          <ul class="clearfix">
	          <li v-for="(item,idx) in param.reloadingPosterImgList" :key="idx" class="w100 fl align-center ma-r-20">
	          
            	<upload  class="inline-block" action="/image/uploadImage?width=-1&height=-1&fileSize=300" :size='300' :image-url="item" @success="param.reloadingPosterImgList[idx] = $event"></upload>
            	<span v-if="param.reloadingPosterImgList.length>1" class="font font-danger" @click="delCont(param.reloadingPosterImgList,idx)">删除</span>
	          </li>
	         </ul>
	        <el-button type="text" class="font font-blue" v-show="param.reloadingPosterImgList.length<10" @click="addCont(param.reloadingPosterImgList)">再添加一张</el-button>
        </el-form-item>
        <el-form-item label="*分享换装海报文案：">
        	<ul>
	          <li v-for="(item,idx) in param.reloadingPosterStrList" :key="idx" class="ma-b-10">
	        		<el-input v-model.trim="param.reloadingPosterStrList[idx]" :maxLength="40" class="w300"></el-input>
	        		<span v-if="param.reloadingPosterStrList.length>1" class="font font-danger ma-l-20" @click="delCont(param.reloadingPosterStrList,idx)">删除</span>
	          </li>
	        </ul>
	        <el-button type="text" class="font font-blue" v-show="param.reloadingPosterStrList.length<10" @click="addCont(param.reloadingPosterStrList)">再添加一条</el-button>
        </el-form-item>
        <el-form-item label="*分享颜值卡片文案：">
        	<ul>
	          <li v-for="(item,idx) in param.beautyCardStrList" :key="idx" class="ma-b-10">
	        		<el-input v-model.trim="param.beautyCardStrList[idx]" :maxLength="40" class="w300"></el-input>
	        		<span v-if="param.beautyCardStrList.length>1" class="font font-danger ma-l-20" @click="delCont(param.beautyCardStrList,idx)">删除</span>
	          </li>
	        </ul>
	        <el-button type="text" class="font font-blue" v-show="param.beautyCardStrList.length<10" @click="addCont(param.beautyCardStrList)">再添加一条</el-button>
        </el-form-item>
        <el-form-item label="*分享颜值卡片图：">
          <ul class="clearfix">
	          <li v-for="(item,idx) in param.beautyCardImgList" :key="idx" class="w120 fl align-center ma-r-20">
            	<upload  class="inline-block" action="/image/uploadImage?width=500&height=400&fileSize=300" :size='300' :image-url="item" @success="param.beautyCardImgList[idx] = $event" :width="125" :height="100"></upload>
            	<span v-if="param.beautyCardImgList.length>1" class="font font-danger" @click="delCont(param.beautyCardImgList,idx)">删除</span>
	          </li>
	         </ul>
	        <el-button type="text" class="font font-blue" v-show="param.beautyCardImgList.length<10" @click="addCont(param.beautyCardImgList)">再添加一张</el-button>
        </el-form-item>
        <el-form-item label="*分享颜值海报图：">
        	<span class="ma-l-20 font-dark0">(建议尺寸750x1334px)</span>
          <ul class="clearfix">
	          <li v-for="(item,idx) in param.beautyPosterImgList" :key="idx" class="w100 fl align-center ma-r-20">
            	<upload  class="inline-block" action="/image/uploadImage?width=-1&height=-1&fileSize=300" :size='300' :image-url="item" @success="param.beautyPosterImgList[idx] = $event"></upload>
            	<span v-if="param.beautyPosterImgList.length>1" class="font font-danger" @click="delCont(param.beautyPosterImgList,idx)">删除</span>
	          </li>
	         </ul>
	        <el-button type="text" class="font font-blue" v-show="param.beautyPosterImgList.length<10" @click="addCont(param.beautyPosterImgList)">再添加一张</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveMatter">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
	import upload from '@/components/upload'
  export default {
  	name: 'materialManage',
    data() {
      return {
      	param:{
      		reloadingCardStrList:[],	//分享换装卡片文案
	      	reloadingPosterImgList:[],	//分享换装海报背景图
	      	reloadingPosterStrList:[],	//分享换装海报文案
	      	beautyCardStrList:[],	//分享颜值卡片文案
	      	beautyCardImgList:[],	//分享颜值卡片图
	      	beautyPosterImgList:[]	//分享颜值海报图
      	}
      }
    },
	  components:{
	  	upload
	  },
    methods:{
	    queryMatter() {
	      let self = this
	      self.$service.activity.faceScore.queryMatter().then(res => {
	      	for(let item in res){
	      		if(res[item].length === 0){
	      			res[item].push('')
	      		}
	      	}
	        self.param = res
	      })
	    },
     	addCont(obj){
	    	obj.push('')
	    },
     	delCont(obj,idx){
     		obj.splice(idx,1) 
     	},
     	filterEmpty(arr,hint){
     		for(let i=0; i<this.param[arr].length; i++){
        	if(this.param[arr][i] === ''){
        		this.$message.warning(hint)
	  				return true	// 空
        	}
        }
     		return false	//不空
     	},
	  	saveMatter() {
        if(
        	this.filterEmpty('reloadingCardStrList','请输入分享换装卡片文案') ||
        	this.filterEmpty('reloadingPosterStrList','请输入分享换装海报文案') ||
        	this.filterEmpty('beautyCardStrList','请输入分享颜值卡片文案') ||
        	this.filterEmpty('reloadingPosterImgList','请完整上传分享图') ||
        	this.filterEmpty('beautyCardImgList','请完整上传分享图') ||
        	this.filterEmpty('beautyPosterImgList','请完整上传分享图')
        ){
        	return false
        }
        this.$service.activity.faceScore.saveMatter(this.param).then(res => {
          this.$message.success("提交成功")
       	})
      }
    },
    mounted () {
      this.queryMatter()
    }
  }
</script>
<style type="text/css" scoped>
	.ma-b-10{ margin-bottom: 10px;}
	.w120{ width: 120px;}
</style>
