<template>
  <div class="imgWrap">
    <img :src="src" :width="width" :height="height" :alt="alt" @click="dialogVisible = true">
    <el-dialog :width="dialogWidth" :visible.sync="dialogVisible" :title="title" :modal-append-to-body="false">
      <img :src="src" :alt="alt" @load="onLoad">
    </el-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'imgEnlarge',
  props: {
    src: {  // 图片地址
      default: '',
      requred: true,
      type: String
    },
    alt: {  // 图片备注信息
      default: '',
      type: String
    },
    width: {  // 缩略图宽度
      default: '100px',
      type: String
    },
    height: { // 缩略图高度
      default: '100px',
      type: String
    },
    
    title: {  // 弹窗title
      default: '',
      type: String
    },
  },
  data () {
    return {
      dialogWidth: '',
      dialogVisible: false
    }
  },
  methods: {
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
<style scoped>
  .imgWrap{ position: relative; z-index: 20000;}
  img{ cursor: pointer;}
</style>

