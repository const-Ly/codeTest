<template>
  <div class="inline-block">
    <el-dialog title="提示" :visible.sync="showTip" v-if="showTip" width="30%" class="multi-info-list">
      <div v-html="_html"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleOkCb">确 认</el-button>
      </span>
    </el-dialog>
    <el-upload :list-type="listType" :file-list="fileList" class="file-upload" ref="upload"
      :action="'http://cmsapp.biyao.com'+action" :multiple="multiple" :data="data" :with-credentials="hasCookie" :drag="drag" :limit="limit"
      :accept="accept" :show-file-list="showFileList" :size="size" :auto-upload="autoPpload" :disabled="disabled"
      :before-upload="beforeAvatarUpload" :on-exceed="handleExceed"
      :on-success="handleAvatarSuccess" :on-error="handleAvatarError">
      <slot name="handle"></slot>
      <slot name="tip-txt"></slot>
    </el-upload>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'fileUpload',
    data () {
      return {
        fileList:[],
        loading:null,
        // 以下为弹框错误提示相关
        showTip: false,
        _html:''
      }
    },
    props:{
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
      accept:{ // 上传文件类型 默认：xlsx
        type:String,
        default:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
      type:{
        type:String,
        default:".xlsx"
      },
      size:{ // 文件大小，默认1G
        type:Number,
        default:1024
      },
      limit:{ // 最大上传个数
        type:Number,
        default:5
      },
      hasCookie: { // 是否携带认证信息
        type:Boolean,
        default:true
      },
      showFileList:{ // 是否显示已上传的文件列表
        type:Boolean,
        default:false
      },
      drag:{ // 是否启动拖动上传
        type:Boolean,
        default:false
      },
      deferTip:{// 导入成功后是否间接提示信息
        type:Boolean,
        default: false
      }
    },
    methods:{
      beforeAvatarUpload (file) { // 上传前的处理
        const myType = this.accept.indexOf(file.type) > -1 && file.name.indexOf(this.type)>-1
        const mySize = this.size * 1024 * 1024 >= file.size
        if(!myType) {
          this.$message.warning('文件格式错误!');return false
        }
        if(!mySize) {
          this.$message.warning('文件大小超过限制!'); return false
        }
        this.$store.commit('importLoading')
        return mySize && myType
      },
      handleAvatarSuccess (response, file, fileList) { // 处理成功
        this.$refs.upload.clearFiles() // 每次上传成功之后都把之前的上传列表清空
        this.$store.commit('hideLoading')
        if(response.success){
          if(this.deferTip){
            this.$emit('defer', response.data)
          }else {
            this.showErrTip(response.data)
          }
        }else{
          this.$message.error(response.error.message)
        }
      },
      handleAvatarError (err, file, fileList) { // 上传失败时候的处理
        this.$refs.upload.clearFiles() // 每次上传成功之后都把之前的上传列表清空
        this.$store.commit('hideLoading')
        this.$message.error(err.error.message);
      },
      handleExceed (files, fileList) { //文件个数超出限制个数时触发
        if(fileList.length >= this.limit){
          this.$refs.upload.clearFiles()
          this.$store.commit('hideLoading')
        }
        this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      // 触发弹框展示
      showErrTip (data) {
        this._html = ''
        if(data.failCount > 0){// 失败条数不为0
          this._html = "成功导入"+data.successCount+"条商品，失败"+data.failCount+"条，以下为失败商品所在行号，请注意粘贴保存检查：<span class='font-danger'>"+data.failLineNumberList.join("、")+"</span>。"
        }else{
          this._html = "成功导入"+data.successCount+"条商品，失败"+data.failCount+"条。"
        }
        this.showTip = true
        setTimeout(()=>{
          document.querySelector('.v-modal').remove()
        },10)
      },
      // 导入成功后点击确定触发回调函数
      handleOkCb () {
        this.showTip = false
        this.$emit('success')
      }
    }
  }
</script>

<style scoped>
  .file-upload {display: inline-block;margin-left: 10px;}
</style>
