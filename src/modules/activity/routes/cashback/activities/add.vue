<template>
  <div class="cms">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
      <el-form label-width="180px" size="small">
        <el-form-item label="活动名称：">
          <el-input v-model.trim="basicsInfo.activityName" maxLength="20" class="w400"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：">
          <el-date-picker
            class="w190"
            v-model="basicsInfo.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
            @change="onStartTimeChange">
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            class="w190"
            v-model="basicsInfo.finishTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间"
            :picker-options="timeOptions"
            @change="onFinishTimeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="抽奖商品池：">
          <match class="w400" @change="basicsInfo.poolId = ''" ref="poolId" value-key="poolName" @select="basicsInfo.poolId = $event.poolId" :list="productPoolsList" placeholder="请输入抽奖商品池"></match>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 吸底区域 Begin -->
    <suction-bottom @okFn="saveTask" :pure-back="true"></suction-bottom>
  </div>
</template>
<script type="text/javascript">
  import Match from '@/components/associativeMatch'
  import SuctionBottom from '@/components/panel/suctionBottom'
  import DateTimePicker from '@/components/dateTimePicker'
  export default {
    name: 'add',
    data () {
      return {
        //基础信息
        basicsInfo: {
          poolId: '',
          activityName:'',
          startTime:'',
          finishTime:''
        },
        productPoolsList: [], // 活动商品池名称
        timeOptions: {
          // 小于当前时间的不可选，小于开始时间的不可选
          disabledDate: (time) => {
            const startDate = this.$utils.dateToString(new Date(this.basicsInfo.startTime), 'yyyy-MM-dd')
            const startDay = this.$utils.dateToString(new Date(), 'yyyy-MM-dd')
            return time.getTime() < +(new Date(`${startDate} 00:00:00`)) || time.getTime() < +(new Date(`${startDay} 00:00:00`))
          }
        },
      }
    },
    components:{ Match, SuctionBottom, DateTimePicker },
    methods:{
      onStartTimeChange (v) {
        if (!v) return
        if (+(new Date(v)) > +(new Date(this.basicsInfo.finishTime))) {
          this.basicsInfo.finishTime = ''
        }
      },
      onFinishTimeChange (v) {
        const { startTime } = this.basicsInfo
        if (!v) return false
        if (new Date(v) < new Date()) {
          this.basicsInfo.finishTime = ''
          this.$message.warning('结束时间不可小于当前时间，请重新选择')
          return false
        }
        if (!startTime) return false
        if (+(new Date(v)) < +(new Date(startTime))) {
          this.basicsInfo.finishTime = ''
          this.$message.warning('结束时间不可小于开始时间，请重新选择')
        }
      },
      clearFinishTime () {
        this.basicsInfo.finishTime = ''
        this.$refs['endTime'].dateTime = ''
      },
      //保存
      saveTask () {
        if(!this.basicsInfo.activityName){
          this.$message.warning('请输入活动名称！')
          return
        }
        if(!this.basicsInfo.poolId){
          this.$message.warning('请选择抽奖商品池！')
          return
        }
        if(!this.basicsInfo.startTime || !this.basicsInfo.finishTime){
          this.$message.warning('请输入活动时间！')
          return
        }
        this.$service.activity.cashback.addOrUpdate(this.basicsInfo).then(res => {
            this.$router.back()
        })
      },
      // 公海系统中业务类型为“每日抽奖”且状态为“启用”的 活动商品池名称
      queryProductPools () {
        this.$service.common.queryProductPools().then(res => {
          this.productPoolsList = res
        })
      }
    },
    mounted () {
      this.queryProductPools()
    },
  }
</script>
<style scoped>
  .w80{width:80px !important;}
  .w139{width:139px;}
  .w180{width:180px;}
  .w400{width:400px !important;}
  .mar-b40 {
    margin-bottom: 40px;
  }
  .w190 {
    width: 190px;
  }
</style>
