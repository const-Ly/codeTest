<template>
  <div>
    <div>校验：『支持 "-" "." 号』</div>
    <ul>
      <li>
        最小值：
        <span v-if="fromConfReadonly">{{ info.rule.minValue }}</span>
        <el-input v-else class="w100 number-input" v-model="info.rule.minValue" v-only-num.decimal="info.rule.minValue" :max-len="8" role="props" @blur="handleBlur"></el-input>
      </li>
      <li class="ma-t-10">
        最大值：
        <span v-if="fromConfReadonly">{{ info.rule.maxValue }}</span>
        <el-input v-else class="w100 number-input" v-model="info.rule.maxValue" v-only-num.decimal="info.rule.maxValue" :max-len="8" role="props" @blur="handleBlur"></el-input>
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
    data() {
      return {
        min: -9999999,
        max: 99999999,
      }
    },
    computed:{
      ...mapGetters(['fromConfReadonly'])
    },
    methods: {
      handleBlur () {
        let min = this.info.rule.minValue;
        let max = this.info.rule.maxValue;
        if (!min || min === '-') {
          min = 0;
        }
        if (!max || max === '-') {
          max = this.max;
        }
        if(+min > +max) {
          max = this.max
        }
        min = '' + min;
        max = '' + max;
        if (min.length > 8) {
          min = min.substr(0, 8)
        }
        if (max.length > 8) {
          max = min.substr(0, 8)
        }
        this.$nextTick(_ => {
          this.info.rule.minValue = +min;
          this.info.rule.maxValue = +max;
        })
      }
    }
  }
</script>

