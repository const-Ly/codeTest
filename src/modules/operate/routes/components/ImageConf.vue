<template>
  <div>
    <div>校验：</div>
    <ul>
      <li class="desc pad">尺寸限制 (为空即不限制)</li>
      <li>
        宽度 (px) ：
        <span v-if="fromConfReadonly">{{ info.rule.width }}</span>
        <el-input v-else class="w100" v-model="info.rule.width" v-only-num="info.rule.width" :max-len="4" role="props" @blur="handleBlur"></el-input>
      </li>
      <li class="ma-t-10">
        高度 (px) ：
        <span v-if="fromConfReadonly">{{ info.rule.height }}</span>
        <el-input v-else class="w100" v-model="info.rule.height" v-only-num="info.rule.height" :max-len="4" role="props" @blur="handleBlur"></el-input>
      </li>
      <li class="desc">大小限制 (为空等同于300k)</li>
      <li class="ma-t-10">
        尺寸 (k) ：
        <span v-if="fromConfReadonly">{{ info.rule.size }}</span>
        <el-input v-else class="w100" v-model="info.rule.size" v-only-num="info.rule.size" :max-len="4" role="props" @blur="handleBlur"></el-input>
      </li>
      <li class="ma-t-10">
        <el-checkbox v-model="info.rule.required" :disabled="fromConfReadonly">必填</el-checkbox>
      </li>
      <li class="desc">格式 (jpg/jpeg/png/gif)</li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      info: {
        type:Object,
        default: () => ({})
      }
    },
    computed:{
      ...mapGetters(['fromConfReadonly'])
    },
    methods: {
      handleBlur () {
        if (this.info.rule.width !== '' && this.info.rule.width < 1) {
          this.info.rule.width = 1;
        }
        if (this.info.rule.height !== '' && this.info.rule.height < 1) {
          this.info.rule.height = 1;
        }
        if (this.info.rule.size == '') {
          this.info.rule.size = 300;
        } else if (this.info.rule.size !== '' && this.info.rule.size < 1) {
          this.info.rule.size = 1;
        }
      }
    }
  }
</script>

<style scoped>
  .desc {
    font-size: 14px;
    color: #303133;
    padding: 10px 0 0px;
  }
  .desc.pad {
    padding-bottom: 10px;
  }
</style>