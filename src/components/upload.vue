<template>
  <div>
  	<el-upload class="avatar-uploader" :list-type="listType" :file-list="fileList" ref="upload"
		  :action="'http://cmsapp.biyao.com'+action" :multiple="multiple" :data="data" :with-credentials="hasCookie" :drag="drag" :limit="limit"
		  :accept="accept" :show-file-list="showFileList" :size="size" :auto-upload="autoPpload" :disabled="disabled"
		  :before-upload="beforeAvatarUpload"
		  :on-remove="handleRemove" :on-exceed="handleExceed"
		  :on-success="handleAvatarSuccess" :on-error="handleAvatarError">
		  <template v-if="successUrl">
		  	<img :src="successUrl" class="avatar" :onerror="imgError">
		  	<div class="map-box">
		  	  <div>
		  	  	<i class="el-icon-delete" @click.stop="handleRemove" v-if="!disabled"></i>
		  		  <i class="el-icon-zoom-in" @click.stop="handleEnlarge"></i>
		  	  </div>
		  	</div>
		  </template>
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<img-view :src="successUrl" class="none" ref="bigImg" :lock="lock"></img-view>
  </div>
</template>

<script type="text/javascript">
	export default {
		name: 'upload',
		data () {
			return {
				imgError: 'this.src="' + require('@/assets/images/imgerror.png') + '"', //图片加载不出来的展位图
				fileList:[],
				successUrl:this.imageUrl
			}
		},
		props:{
			sort:{ // 用于记录元素下标
				type: Number,
				default: 0
			},
			imageUrl:{ // 默认图片
				type:String,
				default:""
			},
			action:{ // 上传地址
				type:String,
				default:""
			},
			listType:{ //文件列表类型 text/picture/picture-card
				type:String,
				default:"text"
			},
			multiple:{ // 是否支持多文件上传
				type:Boolean,
				default:false
			},
			data:{ // 上传附带的参数
				type:Object,
				default () {
					return {}
				}
			},
			autoPpload:{ // 是否自动上传
				type:Boolean,
				default:true
			},
			disabled:{ // 是否禁用
				type:Boolean,
				default:false
			},
			accept:{ // 上传文件类型
				type:String,
				default:"image/jpg,image/jpeg,image/png"
			},
			type:{
				type:Array,
				default () {
					return [".jpg",".jpeg",".png"]
				}
			},
			size:{ // 文件大小，默认2M
				type:Number,
				default:2*1024
			},
			limit:{ // 最大上传个数
				type:Number,
				default:2
			},
			hasCookie: { // 是否携带认证信息
				type:Boolean,
				default:false
			},
			showFileList:{ // 是否显示已上传的文件列表
				type:Boolean,
				default:false
			},
			drag:{ // 是否启动拖动上传
				type:Boolean,
				default:false
			},
			width:{
				type:Number,
				default:100
			},
			height:{
				type:Number,
				default:100
			},
			lock:{
				type:Boolean,
				default:true
			},
			errorMessage: { // 上传图片失败后的错误提示
				type: String,
				default:""
			},
			limitWidth: { // 上传图片限制的宽度，默认为0，不限制
				type: Number,
				default: 0
			},
			limitHeight: { // 限制图片限制的高度，默认为0，不限制
				type: Number,
				default: 0
			},
			isLimitMeasurement: { // 是否限制图片的尺寸
				type: Boolean,
				default: false
			},
			uploadedIndex: { // 列表类型中已上传图片的个数
				type: Number,
				default: 0
			}
		},
		watch:{
			imageUrl (nv,ov) {
				this.successUrl = nv
			}
		},
		mounted () {
			this.$refs.upload.$el.style.width = this.width+"px";
			this.$refs.upload.$el.style.height = this.height+"px";
		},
		methods:{
			beforeAvatarUpload (file) { // 上传前的处理
				let idx = file.name.lastIndexOf(".")
				const myType = this.accept.indexOf(file.type) > -1 && this.type.indexOf(file.name.slice(idx)) >-1
				const mySize = this.size  * 1024 >= file.size

				if(this.errorMessage) {
					if(!myType || !mySize) {
						this.$message.warning(this.errorMessage); return false
					}
				} else {
					if(!myType) {
						this.$message.warning('图片格式错误!'); return false
					}
					if(!mySize) {
						this.$message.warning('图片大小超过限制!'); return false
					}
				}
				return mySize && myType
			},
			handleAvatarSuccess (response, file, fileList) { // 处理成功
				this.$refs.upload.clearFiles() // 每次上传成功之后都把之前的上传列表清空
				if(response.success){
					// isLimitMeasurement 老站老客1.0时添加
					if(this.isLimitMeasurement) { // 是否需要校验上传图片的尺寸
							let image = new Image();   
							image.onload = () => {  
									let width = image.width;  
									let height = image.height;
									if(this.uploadedIndex == 1 && this.successUrl) { // 只上传了一个图片，而且是重新上传的操作 这个情况不校验尺寸。
										this.$emit('imageMeasurement', {
											width: width,
											height: height,
										})
										this.successUrl = response.data
										this.$emit('success',this.successUrl, this.sort, this.data)
									} else {
										if((this.limitWidth && this.limitWidth != image.width) || (this.limitHeight && this.limitHeight != image.height)) {
											this.$message.warning(`多图尺寸必须统一，已上传尺寸为“${this.limitWidth}×${this.limitHeight}”大小不可大于${this.size}k`)
										} else {
											this.$emit('imageMeasurement', {
												width: width,
												height: height,
											})
											this.successUrl = response.data
											this.$emit('success',this.successUrl, this.sort, this.data)
										}
									}
							}  
							image.src = response.data;  
					} else {
						this.successUrl = response.data
						this.$emit('success',this.successUrl, this.sort, this.data)
					}
				}else{
					this.$message.error(response.error.message)
				}
			},
			handleAvatarError (err, file, fileList) { // 上传失败时候的处理
				this.$refs.upload.clearFiles() // 每次上传成功之后都把之前的上传列表清空
				this.$message.error(err.error && err.error.message || "网络异常，请稍后再试");
			},
			handleRemove (file, fileList) { // 移除文件列表
				this.successUrl = ''
				this.$emit('success',this.successUrl, this.sort)
			},
			handleExceed (files, fileList) { //文件个数超出限制个数时触发
				if(fileList.length >= this.limit){
					this.$refs.upload.clearFiles()
				}
				this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
			},
			handleEnlarge () {// 放大查看大图
				this.$refs.bigImg.handleEnlarge()
			},
			checkImg () {
				this.$refs.upload.$el.querySelector('input').click()
			}
		}
	}
</script>
