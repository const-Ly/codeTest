<template>
  <div>
    <div v-if="fromConfReadonly">
      <img class="pic-limit" :src="info.conf.data"/>
    </div>
    <div v-else>
      <upload
        class="inline-block"
        :action="uploadUrl"
        :size="+this.info.conf.rule.size"
        :imageUrl="info.conf.data"
        :disabled="disabled"
        :type="['.jpg','.jpeg','.png', '.gif']"
        accept="image/jpg,image/jpeg,image/png,image/gif"
        @success="info.conf.data = $event" >
      </upload>
      <div class="inline-block upload-desc">
        <div>
          <span>尺寸</span>：
          <span>
            宽{{!this.info.conf.rule.width ? '不限' : `${this.info.conf.rule.width}px`}}，
            高{{!this.info.conf.rule.height ? '不限' : `${this.info.conf.rule.height}px`}}
          </span>
        </div>
        <div><span>格式</span>：<span>jpg/jpeg/png/gif</span></div>
        <div><span>大小</span>：<span>小于{{this.info.conf.rule.size || 300}}k</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import upload from '@/components/upload'
  export default {
    props: {
      info: {
        type:Object,
        default: () => ({})
      },
      disabled: {
        type:Boolean,
        default: true
      }
    },
    data() {
      return {
        uploadUrl: '/image/uploadImage?'
      }
    },
    mounted() {
      if (this.info.conf.rule.width) {
        this.uploadUrl += `width=${this.info.conf.rule.width}`
      } else {
        this.uploadUrl += 'verifyWidthStatus=false'
      }
      if (this.info.conf.rule.height) {
        this.uploadUrl += `&height=${this.info.conf.rule.height}`
      } else {
        this.uploadUrl += '&verifyHeightStatus=false'
      }
      if (this.info.conf.rule.size) {
        this.uploadUrl += `&fileSize=${this.info.conf.rule.size }`
      } else {
        this.uploadUrl += '&fileSize=300'
      }
    },
    computed:{
      ...mapGetters(['fromConfReadonly'])
    },
    components: {
      upload
    },
    methods: {
      checkParams () {
        if (this.info.conf.rule.required && !this.info.conf.data) {
          this.$message.warning(`请上传${this.info.title}图片`)
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .pic-limit {
    width: auto;
    height: auto;
    max-width: 150px;
    height: 150px;
  }
  .upload-desc {
    padding: 10px 0 0 10px;
    vertical-align: top;
  }
  .upload-desc > div {
    font-size: 12px;
    margin-top: 5px;
    color: #999;
  }
</style>