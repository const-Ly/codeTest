<template>
  <el-card class="box-card">
  	<el-form label-width="180px" size="small">
        <el-form-item label="是否首页显示：">
          <el-radio-group v-model="param.isShow">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="切换间隔：">
           <el-input v-model="param.switchTime" class="w300" :maxlength="2"></el-input>&nbsp;秒
        </el-form-item>
        <el-form-item label="专题标题：">
          <match :val="topicName" @change="param.topicId = '';topicName = $event" value-key="title" @select="param.topicId = $event.topicId;topicName = $event.title" :list="topicList" placeholder="请输入专题标题"></match>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="handleSave">提交保存</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script type="text/javascript">
  import Match from '@/components/associativeMatch'
  export default {
    name: 'layer',
    data () {
    	return {
        param:{
          id:"",
          isShow:0,
          topicId:"",
          switchTime:5
        },
        topicName:"",
        topicList:[]
      }
    },
    created () {
      let self = this
      this.$service.common.getOnlineTopicList().then(res => {
        self.topicList = res
      })
      this.$service.home.layer.getFolatingDetail().then(res => {
        self.param = res
        if(!res.topicId) return;
        self.$service.common.getTopicDetail({topicId:res.topicId}).then(res => {
        	self.topicName = res.title
	    })
      })
    },
    components:{Match},
    methods:{
      handleSave () {
      	let self = this
        if(!this.$utils.isPosInt(self.param.switchTime) || self.param.switchTime<2 || self.param.switchTime > 10){
          self.$message.warning("请输入2-10间整数切换秒数")
          return
        }
        self.$service.home.layer.saveFolating(self.param).then(res => {
        	self.$message.success("提交成功")
        })
      }
    }
  }
</script>
<style scoped>
  .w300 {width: 300px;}
</style>
