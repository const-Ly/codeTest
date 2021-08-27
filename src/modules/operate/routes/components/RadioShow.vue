<template>
  <div class="radio-show">
    <el-radio-group v-model="info.conf.data">
      <el-radio v-for="(radio,idx) in info.conf.rule" :key="idx" :label="radio.value" :disabled="fromConfReadonly || disabled">{{ radio.label }}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
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
    computed:{
      ...mapGetters(['fromConfReadonly'])
    },
    methods: {
      checkParams () {
        return true
      }
    },
    updated() {
      const materialRight = document.getElementById('materialRight')
      const materialConfig = document.getElementById('materialConfig')
      if (!!materialRight && !!materialConfig) {
        if (materialRight.offsetHeight < materialConfig.offsetHeight) {
          materialRight.style.minHeight = materialConfig.offsetHeight + 'px';
        }
      }
    }
  }
</script>
<style scoped>
  .radio-show .el-radio{ white-space: normal; }
  .radio-show .el-radio:nth-of-type(1) {margin-right: 20px;line-height: 1.5}
  .radio-show .el-radio+.el-radio {margin-left: 0;margin-right:20px;}
</style>

