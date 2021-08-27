<template>
  <div>
    <div>校验：</div>
    <ul>
      <li>
        最小长度：
        <span v-if="fromConfReadonly">{{ info.rule.minLength }}</span>
        <el-input v-else class="w100" v-model="info.rule.minLength" v-only-num="info.rule.minLength" :max-len="4" role="props" @blur="handleBlur"></el-input>
      </li>
      <li class="ma-t-10">
        最大长度：
        <span v-if="fromConfReadonly">{{ info.rule.maxLength }}</span>
        <el-input v-else class="w100" v-model="info.rule.maxLength" v-only-num="info.rule.maxLength" :max-len="4" role="props" @blur="handleBlur"></el-input>
      </li>
      <li class="ma-t-10">
        <el-checkbox v-model="info.rule.required" :disabled="fromConfReadonly">必填</el-checkbox>
      </li>
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
        if(this.info.rule.minLength !== '' || this.info.rule.maxLength !== ''){
          if(this.info.rule.minLength > this.info.rule.maxLength){
            this.info.rule.maxLength = 9999
          }
        }
      }
    }
  }
</script>

