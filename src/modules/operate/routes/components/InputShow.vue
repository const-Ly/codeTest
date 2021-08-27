<template>
  <div>
    <span v-if="fromConfReadonly">{{ info.conf.data }}</span>
    <el-input v-else v-model="info.conf.data" :disabled="disabled" :minlength="info.conf.rule.minLength" :maxlength="info.conf.rule.maxLength"></el-input>
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
        if((this.info.conf.rule.minLength > 0 || this.info.conf.rule.required) && (this.info.conf.data.length < this.info.conf.rule.minLength || this.info.conf.data.length > this.info.conf.rule.maxLength)){
          this.$message.warning(`请输入${this.info.conf.rule.minLength}-${this.info.conf.rule.maxLength}字${this.info.title}`)
          return false
        }
        return true
      }
    }
  }
</script>

