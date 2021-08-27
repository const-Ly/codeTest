<template>
  <div class="cms">
    <div v-if="this.param.ruleId" class="ma-b-10">编号：<span class="font-blue">{{ this.param.ruleId}}</span></div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model.trim="param.ruleTitle" class="w300" :maxLength="40"></el-input>
        </el-form-item>
        <el-form-item label="使用范围：">
          <el-checkbox-group v-model="param.useScope">
            <el-checkbox :label="1">IOS</el-checkbox>
            <el-checkbox :label="2">Android</el-checkbox>
            <el-checkbox :label="3">小程序</el-checkbox>
            <el-checkbox :label="4">PC</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注说明：">
          <el-input v-model.trim="param.remark" class="w300" :maxLength="40"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20 ma-b-40">
      <div slot="header" class="clearfix">
        <span>规则内容</span>
      </div>
      <new-editor :content="param.ruleContent" @change="param.ruleContent = $event"></new-editor>
    </el-card>
    <!-- 吸底区域 Begin -->
    <suction-bottom @okFn="saveTask" :pure-back="true"></suction-bottom>
  </div>
</template>
<script>
  import NewEditor from '@/components/newEditor'
  import SuctionBottom from '@/components/panel/suctionBottom'
  export default {
    name: 'add',
    data () {
      return {
        param: {
          ruleId:null,
          ruleTitle: '',
          useScope: [1,2,3,4],
          remark:'',
          ruleContent: '',
        }
      }
    },
    components: { NewEditor, SuctionBottom },
    mounted () {
      this.param.ruleId = this.$route.query.id
      let str = this.param.ruleId ? '编辑' : '添加'
      document.title = str
      document.querySelector('.el-breadcrumb').querySelectorAll('.el-breadcrumb__inner')[2].innerHTML = str
      if(this.param.ruleId) this.getDetail()
    },
    methods: {
      getDetail () {
        this.$service.param.rule.detail({ruleId: this.param.ruleId}).then(res => {
          this.param = res
        })
      },
      testParam () {
        if(this.param.ruleTitle === ''){
          this.$message.warning('请输入1-40字标题');return
        }
        if(this.param.useScope.length === 0){
          this.$message.warning('请选择使用范围');return
        }
        if(this.param.ruleContent === '' || this.param.ruleContent.length > 100000){
          this.$message.warning('请输入1-10w字规则内容');return
        }
        return true
      },
      saveTask () {
        if(this.testParam()){
          this.$service.param.rule.addOrUpdate(this.param).then(res => {
            this.$router.back()
          })
        }
      }
    }
  }
</script>
