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
      <el-form-item label="奖励次数：">
        <span v-if="editState">{{param.rewardCount}}</span>
        <el-input v-else class="w300" v-model="param.rewardCount" maxlength="3" @input="$utils.onlyNum(param, 'rewardCount', param.rewardCount)"></el-input>
        <p v-if="!editState" class="font-info">全部奖励获得的总次数</p>
      </el-form-item>
      <el-form-item label="优先级：">
        <div class="inline-block ma-r-20" v-for="(item, idx) in param.rewardShowInfoList" :key="idx">
          <span class="ma-r-10">{{item.rewardTypeName}}</span>
          <span v-if="editState">{{item.priority}}</span>
          <el-input v-else class="w100" v-model="item.priority" maxlength="2" @input="$utils.onlyNum(item, 'priority', item.priority)"></el-input>
        </div>
        <p v-if="!editState" class="font-info">0-99，优先级越小越靠前</p>
      </el-form-item>
      <el-form-item label="弹窗图片：">
        <div class="inline-block" v-for="(item, idx) in param.rewardShowInfoList" :key="idx">
          <img-view v-if="editState" class=" ma-r-20" :src="item.showImage"></img-view>
          <upload v-else class="inline-block ma-r-20" action="/image/uploadImage?width=-1&height=-1&fileSize=300" :size='300' :image-url="item.showImage" @success="item.showImage = $event" :accept="'image/jpg,image/png,image/gif,image/jpeg'" :type="['.jpg','.jpeg','.png','.gif']"></upload>
        </div>
        <p v-if="!editState" class="font-info">三张图片依次为参团卡、全民拼卡、抽奖卡弹层图片</p>
        <p v-if="!editState" class="font-info">支持jpg、png、gif格式文件，小于300k</p>
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
  import Upload from '@/components/upload1'
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
      Upload
    },
    methods: {
      // 获取父弹窗详情
      getDetail () {
        let _url
        let _param = {
          popCode: '4'
        }
        if (this.isLog) {
          _url = 'queryParentLogDetail'
          _param.logId = this.id
        }else {
          _url = 'queryParentNodeDetail'
        }
        this.$service.systemSetting.dialogManagement[_url](_param).then( res => {
          this.param = res.popCodeNode4 || {}
        })
      },
      save () {
        if (this.param.rewardCount === '' || this.param.rewardCount === null || this.param.rewardCount <= 0) {
          return this.$message.warning('奖励次数必须是1-999的整数')
        }
        let item
        for (let i=0; i<this.param.rewardShowInfoList.length; i++) {
          item = this.param.rewardShowInfoList[i]
          if (item.priority === '' || item.priority === null) {
            return this.$message.warning('请输入0-99间不重复的优先级')
          }
        }
        this.$service.systemSetting.dialogManagement.oldCustomerUpdateParentConfig(this.param).then( res => {
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
  img{ cursor: pointer;}
</style>
