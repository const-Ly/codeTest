<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="170px" size="small" class="input-normal">
        <el-form-item label="抽奖活动名称：">{{ param.lotteryName }}</el-form-item>
        <el-form-item label="奖品来源：">{{ param.source === 0?"平台奖品":"商家奖品" }}</el-form-item>
        <el-form-item label="奖品数量：">{{ param.rewardNum }}</el-form-item>
        <el-form-item label="已选奖品：">
          <template v-if="param.source === 0">
            {{ param.platformRewardName }}
          </template>
          <template v-else>
            {{ param.shopRewardName }}
            <a :href="'http://m.biyao.com/products/'+param.suId+'.html'" target="_blank" class="font font-blue">查看</a>
          </template>
        </el-form-item>
        <el-form-item label="导流模块：">
          <el-radio-group v-model="param.guide">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="体验金：" v-if="param.source === 1">
          <el-radio-group v-model="param.discountMoney">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂接APP激活权益金：">
          <el-radio-group v-model="param.hookAppActivateRightsGold">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂接助力：">
          <el-radio-group v-model="param.hookHelp">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂接特权金：">
          <el-radio-group v-model="param.hookPrivilege">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道页展示：">
          <el-radio-group v-model="param.channelPageShow">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="测试白名单：">{{ param.isWhiteListName }}</el-form-item>
        <el-form-item label="奖品介绍：">
          <new-editor :content="param.rewardDesc" @change="param.rewardDesc = $event"></new-editor>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="save">提交保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  import NewEditor from '@/components/newEditor'
  export default {
    name: 'editTwo',
    data () {
      return {
        lotteryId:this.$route.params.id,
        param:{}
      }
    },
    components:{
      NewEditor
    },
    mounted () {
      this.getLotteryInfo()
    },
    methods:{
      // 获取抽奖活动信息
      getLotteryInfo () {
        this.param = JSON.parse(localStorage.getItem('lottery'))
      },
      save () {
        if(this.param.rewardDesc === ''){
          this.$message.warning("请输入奖品介绍");
        }else{
          this.param.lotteryId = this.lotteryId
          this.$service.activity.luckDraw.updatePlatformLottery(this.param).then(res => {
            this.$router.push('/luckDraw/luckDrawList')
          })
        }
      },
      goBack () {
        //返回上一步的时候需要记录上一步填写的信息
        localStorage.setItem('onlyEdit',true) //仅仅在编辑活动第一步的时候存储，读取缓存信息
        this.$router.back()
      }
    }
  }
</script>
