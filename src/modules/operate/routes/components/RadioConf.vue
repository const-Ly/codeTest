<template>
  <div class="neweronly-radio">
    <div>选项：</div>
    <ul>
      <li v-for="(item, idx) in info.rule" :key="idx" class="ma-t-10">
        <el-radio v-model="info.data" :label="item.value" :disabled="fromConfReadonly">选项{{ idx+1 }} </el-radio>
        <el-input v-model="item.label" class="w120" :readonly="fromConfReadonly"/>
        <template v-if="!fromConfReadonly">
          <span class="el-icon-remove-outline" @click="handleDelete(idx)"></span>
          <span class="el-icon-circle-plus-outline" @click="handleCopy(idx)"></span>
        </template>
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
      },
      total: {
        type:Number,
        default: 99
      }
    },
    computed:{
      ...mapGetters(['fromConfReadonly'])
    },
    methods: {
      initRadioSet () {
        this.info.data = 1
        this.info.rule = this.info.rule.map((item,idx) => {
          idx = idx+1
          return {
            value: idx,
            label: item.label
          }
        })
      },
      handleDelete (idx) {
        if(this.info.rule.length === 1){
          this.$message.warning('请至少保留一个选项');return
        }
        this.info.rule.splice(idx, 1)
        this.initRadioSet()
      },
      handleCopy (idx) {
        if(this.info.rule.length >= this.total){
          this.$message.warning(`最多添加${this.total}条选项`);return
        }
        const currentItem = this.$utils.deepCopy( this.info.rule[idx] )
        this.info.rule.splice(idx+1, 0, currentItem )
        this.initRadioSet()
      }
    }
  }
</script>

<style>
.el-icon-remove-outline, .el-icon-circle-plus-outline {
  font-size: 22px;
  color: #409efc;
}
.ma-t-10 {
  line-height: 36px;
}
</style>


