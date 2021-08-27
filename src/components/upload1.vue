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
		  	  	<i class="el-icon-delete" @click.stop="handleRemove"></i>
		  		  <i class="el-icon-zoom-in" @click.stop="dialogVisible = true"></i>
		  	  </div>
		  	</div>
		  </template>
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<img-enlarge :src="successUrl" class="none" ref="bigImg" :lock="lock"></img-enlarge>
		<el-dialog :width="dialogWidth" :visible.sync="dialogVisible">
			<img :src="successUrl"  @load="onLoad">
		</el-dialog>
  </div>
</template>

<script type="text/javascript">
	import ImgEnlarge from '@/components/imgEnlarge'
	export default {
		name: 'upload1',
		data () {
			return {
				imgError: 'this.src="' + require('@/assets/images/imgerror.png') + '"', //图片加载不出来的展位图
				fileList:[],
				successUrl:this.imageUrl,

				
				dialogWidth: '',
				dialogVisible: false
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
			}
		},
		watch:{
			imageUrl (nv,ov) {
				this.successUrl = nv
			}
		},
		components: {
			ImgEnlarge
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
				if(!myType) {
					this.$message.warning('图片格式错误!'); return false
				}
				if(!mySize) {
					this.$message.warning('图片大小超过限制!'); return false
				}
				return mySize && myType
			},
			handleAvatarSuccess (response, file, fileList) { // 处理成功
				this.$refs.upload.clearFiles() // 每次上传成功之后都把之前的上传列表清空
				if(response.success){
					this.successUrl = response.data
					this.$emit('success',this.successUrl, this.sort, this.data)
				}else{
					this.$message.error(response.error.message)
				}
			},
			handleAvatarError (err, file, fileList) { // 上传失败时候的处理
				this.$refs.upload.clearFiles() // 每次上传成功之后都把之前的上传列表清空
				this.$message.error(err.error.message);
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
				this.$refs.bigImg.dialogVisible = true

			},
			checkImg () {
				this.$refs.upload.$el.querySelector('input').click()
			},
			
			onLoad(e){
				const img = e.target;
				let width = 0;
				if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
					width = img.width + 40;
				}
				this.dialogWidth = width + 'px';
			}
		}
	}
</script>
