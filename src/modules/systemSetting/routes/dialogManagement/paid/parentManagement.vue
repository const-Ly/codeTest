<template>
  <el-card class="box-card ma-t-10">
    <el-form label-width="160px">
      <el-form-item label="弹窗页面：">{{param.popName}}</el-form-item>
      <el-form-item label="启用状态：">
        <el-radio-group v-model="param.enableStatus" :disabled="editState">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" v-if="!editState">
        <el-button class="ma-r-20" @click="save" type="primary">提交保存</el-button>
        <router-link :to="{ path: '../../../',append:true }">
          <el-button size="small" >返回</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </el-card>
  
</template>

<script type="text/javascript">
  export default {
    name: 'parentManagement',
    props: {
      editState: { // 页面是否只读，true为只读状态(禁用状态)
        type: Boolean,
        default: false
      },
      isLog: { // 是否日志快照
        type: Boolean,
        default: false
      },
      id: { // 日志id
        type: String,
        default: null
      }
    },
    data () {
      return {
        param: {}
      }
    },
    components: {
    },
    methods: {
      // 获取父弹窗详情
      getDetail () {
        let _url
        let _param = {
          popCode: '5'
        }
        if (this.isLog) {
          _url = 'queryParentLogDetail'
          _param.logId = this.id
        }else {
          _url = 'queryParentNodeDetail'
        }
        this.$service.systemSetting.dialogManagement[_url](_param).then( res => {
          this.param = res.popCodeNode5 || {}
        })
      },
      save () {
        this.$service.systemSetting.dialogManagement.payedUpdateParentConfig(this.param).then( res => {
            this.$router.push({path: '../../'})
          })
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>


<style type="text/css" scoped>
</style>
