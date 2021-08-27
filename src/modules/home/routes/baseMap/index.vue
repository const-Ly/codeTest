<template>
  <el-card class="box-card">
    <div slot="header">
      <span>M站首页下载弹层底图</span>
    </div>
    <div class="pa-l-60">
      <div>
        <upload action="/image/uploadImage?width=600&height=750&fileSize=300" :width="120" :height="150" :size='300' :image-url="param.layerBaseMap" @success="param.layerBaseMap = $event" ></upload>
      </div>
      <div class="font-info line-50">备注：图片尺寸600×750px，jpg/png格式，不超过300k</div>
      <el-button type="primary" size="mini" @click="updateMaskByM">提交保存</el-button>
    </div>
  </el-card>
</template>

<script type="text/javascript">
  import Upload from '@/components/upload'
  export default {
    name: 'baseMap',
    data () {
      return {
        param:{
          layerBaseMap:""
        }
      }
    },
    created () {
      this.getMaskByM()
    },
    components:{Upload},
    methods:{
       // 获取M站下载弹层底图
      getMaskByM () {
        this.$service.home.baseMap.getMaskByM().then(res => {
          this.param = res
        })
      },
      // 更新M站下载弹层底图
      updateMaskByM () {
        if(this.param.layerBaseMap === ""){
          this.$message.warning('请上传M站首页下载弹层底图');return
        }
        this.$service.home.baseMap.updateMaskByM(this.param).then(res => {
          this.$message.success('保存成功')
        })
      }
    }
  }
</script>

