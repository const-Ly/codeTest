<template>
  <div class="cms">
    <el-card>
      <el-form label-width="120px" size="small">
        <el-form-item label="特权金类型：">{{ param.taskTypeName }}</el-form-item>
        <el-form-item label="是否区分用户：" v-if="param.taskType ===2">{{ param.isDistinguishName }}</el-form-item>
        <template v-if="param.taskType ===1 || param.isDistinguish === 2">
          <el-form-item label="特权金面额：">{{ param.amount | currency}}</el-form-item>
          <el-form-item v-if="param.isDistinguish === 2" label="补偿金币：">{{ param.compensateGold | placeholder}}</el-form-item>
          <el-form-item label="有效期：">{{ param.expireType == 1?(param.expireDay||0)+'天':(param.expireHour||0)+'时 '+(param.expireMinute||0)+'分'}}</el-form-item>
          <el-form-item label="是否限量：">{{ param.isLimitName }}</el-form-item>
          <el-form-item label="限制数量：" v-if="param.isLimit === 1">{{ param.number }}</el-form-item>
        </template>
        <template v-else>
          <el-form-item label="新用户面额：">{{ param.newerAmount | currency }}</el-form-item>
          <el-form-item label="补偿金币：">{{ param.newerCompensateGold | placeholder}}</el-form-item>
          <el-form-item label="有效期：">{{ param.expireTypeNewer == 1?(param.expireDayNewer||0)+'天':(param.expireHourNewer||0)+'时 '+(param.expireMinuteNewer||0)+'分'}}</el-form-item>
          <el-form-item label="是否限量：">{{ param.isLimitNewerName }}</el-form-item>
          <el-form-item label="限制数量：" v-if="param.isLimitNewer === 1">{{ param.newerLimitNum }}</el-form-item>
          <el-form-item label="老用户面额：">{{ param.olderAmount | currency }}</el-form-item>
          <el-form-item label="补偿金币：">{{ param.olderCompensateGold | placeholder}}</el-form-item>
          <el-form-item label="有效期：">{{ param.expireTypeOlder == 1?(param.expireDayOlder||0)+'天':(param.expireHourOlder||0)+'时 '+(param.expireMinuteOlder||0)+'分'}}</el-form-item>
          <el-form-item label="是否限量：">{{ param.isLimitOlderName }}</el-form-item>
          <el-form-item label="限制数量：" v-if="param.isLimitOlder === 1">{{ param.olderLimitNum }}</el-form-item>
        </template>
        <el-form-item label=" ">
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'task',
    data () {
     return {
       taskId:null,
       param:{}
     }
    },
    mounted () {
      this.getInfo()
    },
    methods:{
      getInfo () {
        this.$service.privilege.task.getTaskDetail({taskId:this.$route.params.id}).then(res => {
          this.param = res
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>
