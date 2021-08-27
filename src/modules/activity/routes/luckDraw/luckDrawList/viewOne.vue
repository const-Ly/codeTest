<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="120px" size="small" class="input-normal">
        <el-form-item label="抽奖活动名称：">{{ param.lotteryName }}</el-form-item>
        <el-form-item label="开始时间：">{{ param.startTime }} </el-form-item>
        <el-form-item label="开奖时机：">
          <template>
            <span>{{ param.lotteryTypeName }}</span>&nbsp;
            <span v-if="param.lotteryType ===1 ">到 {{ param.lotteryTime }} 时间自动开奖</span>
            <span v-else>满 {{ param.lotteryNum }} 人参加自动开奖</span>
          </template>
        </el-form-item>
        <el-form-item label="APP专享：">{{ param.appOnlyName }} </el-form-item>
        <el-form-item label="口令抽奖：">
          <template>
            <span>{{ param.passwdStatusName }}</span>
            <span v-if="param.needPasswd === 1">
              口令值：{{ param.passwd }};&nbsp;口令提示：{{ param.passwdTip }}
            </span>
          </template>
        </el-form-item>
        <el-form-item label="用户等级：">
          {{ param.userLevelSwitchName }}
          <span v-if="param.userLevelSwitch === 1">{{ param.userVlevelName }}及以上（V及以上即为全部用户）</span>
        </el-form-item>
        <el-form-item label="组队类型：">
          <template>
            {{ param.groupTypeName }}
            <span v-if="param.groupType === 1">{{ param.forceGroupNum }}人/队</span>
            <span v-if="param.groupType === 2">{{ param.nonForceGroupNum }}人/队</span>
          </template>
        </el-form-item>
        <el-form-item label="奖品来源：">{{ param.sourceName }}</el-form-item>
        <el-form-item label="奖品数量：">{{ param.rewardNum }}</el-form-item>
        <el-form-item label="虚拟参与人：" v-if="param.source === 0">{{ param.rebotNum }}</el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="goNext">下一步</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'viewOne',
    data () {
      return {
        lotteryId:this.$route.params.id,
        param: {}
      }
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
      },
      goNext () {
        this.$router.push('/luckDraw/luckDrawList/view_two/'+this.lotteryId)
      }
    }
  }
</script>
<style scoped>
  .input-normal {width:800px; }
</style>
