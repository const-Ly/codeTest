<template>
  <div class="effective">
    <div class="effective-header">
      协议生效弹窗
    </div>
    <el-form class="effective-body" ref="form" label-width="100px" size="small">
			<el-form-item label="生效日期：">
        <el-date-picker
          v-model="param.effectiveTime"
          :picker-options="options"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span><i>*</i> 仅对生效日期之前注册的用户展示弹窗</span>
			</el-form-item>
      <el-button class="effective-submit" @click="saveValid">提交保存</el-button>
    </el-form>
  </div>
</template>

<script>
import newEditor from '@/components/newEditor'
export default {
  data(){
    return {
      param: {
        
      },
      options: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  components: {
    newEditor
  },
  methods: {
    request() {
      this.$service.systemSetting.agreementCMS.getEffectiveMaskConfig().then(res => {
        this.param = res
      })
    },
    saveValid() {
      let effectiveTime = this.param.effectiveTime
      if(!effectiveTime || effectiveTime.trim() === '') {
        this.$message.warning('请选择日期！');return
      }
      this.save({
        effectiveTime: effectiveTime
      })
    },
    save(param) {
      let state = confirm('确认提交协议生效日期！')
      if(!state) return
      this.$service.systemSetting.agreementCMS.saveEffectiveMaskConfig(param).then(res => {
        this.$message.success('提交保存成功')
      })
    }
  },
  mounted() {
    this.request()
  }
}
</script>

<style scoped>
.effective-body {
  padding: 30px;
  background: #fff;
  margin-top: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 3px;
}
.effective-header {
  height: 40px;
  line-height: 40px;
  background: #fff;
  padding-left: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 3px;
}
.effective-submit {
  margin-top: 20px;
  margin-left: 400px;
}
.w-200 {
  width: 200px;
}
.effective-body span {
  color: red;
}
</style>


