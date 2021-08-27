<template>
  <div>
    <span v-if="fromConfReadonly">{{ info.conf.data }}</span>
    <el-input v-else v-model="info.conf.data" class="number-input" :disabled="disabled" v-only-num.integer="info.conf.data" :max-len="8" role="props"></el-input>
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
        if (this.info.conf.rule.required) {
           if (this.info.conf.data === '' || (this.info.conf.data < this.info.conf.rule.minValue || this.info.conf.data > this.info.conf.rule.maxValue)) {
            this.$message.warning(`请输入${this.info.conf.rule.minValue}-${this.info.conf.rule.maxValue}的${this.info.title}`)
            return false 
          }
        } else {
          if (this.info.conf.data !== '' && (this.info.conf.data < this.info.conf.rule.minValue || this.info.conf.data > this.info.conf.rule.maxValue)) {
            this.$message.warning(`请输入${this.info.conf.rule.minValue}-${this.info.conf.rule.maxValue}的${this.info.title}`)
            return false
          }
        }
        return true
      }
    }
  }
</script>

