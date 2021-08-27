<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="170px" size="small" class="input-normal">
        <el-form-item label="抽奖活动名称：">{{ param.lotteryName }}</el-form-item>
        <el-form-item label="奖品来源：">{{ param.sourceName }}</el-form-item>
        <el-form-item label="奖品数量：">{{ param.rewardNum }}</el-form-item>
        <el-form-item label="已选奖品：">
          <template>
            {{ param.source === 0 ? param.platformRewardName : param.shopRewardName }}
            <a v-if="param.source === 1" :href="'http://m.biyao.com/products/'+param.suId+'.html'" target="_blank" class="font font-blue">查看</a>
          </template>
        </el-form-item>
        <el-form-item label="导流模块：">{{ param.guideName }}</el-form-item>
        <el-form-item label="体验金：" v-if="param.source === 1">{{ param.discountMoneyName }}</el-form-item>
        <el-form-item label="挂接APP激活权益金：">{{ param.hookAppActivateRightsGoldName }}</el-form-item>
        <el-form-item label="挂接助力：">{{ param.hookHelpName }}</el-form-item>
        <el-form-item label="挂接特权金：">{{ param.hookPrivilegeName }}</el-form-item>
        <el-form-item label="频道页展示：">{{ param.channelPageShowName }}</el-form-item>
        <el-form-item label="测试白名单：">{{ param.isWhiteListName }}</el-form-item>
        <el-form-item label="奖品介绍：">
          <new-editor :content="param.rewardDesc" :disabled="true"></new-editor>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  import NewEditor from '@/components/newEditor'
  export default {
    name: 'viewTwo',
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
        this.$service.activity.luckDraw.editLottery({lotteryId: this.lotteryId}).then(res => {
          this.param = res
        })
      }
    }
  }
</script>
