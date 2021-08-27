<template>
  <div class="cms">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
      <el-form label-width="180px" size="small">
        <el-form-item label="ID：">{{basicsInfo.activityId}}</el-form-item>
        <template v-if="basicsInfo.status === 2">
          <el-form-item label="活动名称：">{{ basicsInfo.activityName }}</el-form-item>
          <el-form-item label="活动时间：">
            {{ basicsInfo.startTime }}<span>至</span>{{ basicsInfo.finishTime }}
          </el-form-item>
          <el-form-item label="抽奖商品池：">{{ basicsInfo.poolName }}</el-form-item>
        </template>
        <template v-else>
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
              @change="handleStartTime">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              class="w190"
              v-model="basicsInfo.finishTime"
              :picker-options="finishTimeOptions"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              @change="handleFinishTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="抽奖商品池：">
            <match :val="basicsInfo.poolName" wClass="w400"  value-key="poolName" @change="basicsInfo.poolId = '';basicsInfo.poolName = $event" @select="basicsInfo.poolId = $event.poolId; basicsInfo.poolName = $event.poolName" :list="productPoolsList" placeholder="请输入抽奖商品池"></match>
          </el-form-item>
        </template>
      </el-form>
    </el-card>
    <!-- 吸底区域 Begin -->
    <suction-bottom @okFn="saveTask" :pure-back="true"></suction-bottom>
  </div>
</template>
<script type="text/javascript">
  import Match from '@/components/associativeMatch'
  import SuctionBottom from '@/components/panel/suctionBottom'
  export default {
    name: 'edit',
    data () {
      return {
        //基础信息
        basicsInfo:{
          activityId:'',
          activityName:'',
          startTime:null,
          finishTime:null,
          status:null,
          poolId: '',
          poolName: ''
        },
        productPoolsList: [], // 活动商品池名称
        startTimeOptions:{
          disabledDate(time){
            return time < new Date() - 8.64e7
          }
        },
        finishTimeOptions: {
          disabledDate: (time) => {
            const startDate = this.$utils.dateToString(new Date(this.basicsInfo.startTime), 'yyyy-MM-dd')
            const startDay = this.$utils.dateToString(new Date(), 'yyyy-MM-dd')
            return time.getTime() < +(new Date(`${startDate} 00:00:00`)) || time.getTime() < +(new Date(`${startDay} 00:00:00`))
          }
        }
      }
    },
    computed:{
      startTime() {
        return this.basicsInfo.startTime
      },
      finishTime() {
        return this.basicsInfo.finishTime
      }
    },
    watch: {
      startTime(val, old) {
        if (!old) return
        let date = typeof (val) === 'string' ? new Date(val) : val
        let newDate = new Date()
        if (date < newDate) {
          this.basicsInfo.startTime = this.$utils.date2str(newDate)
        }
      },
      finishTime(val, old) {
        if (old) return
        let date = typeof (val) === 'string' ? new Date(val) : val
        let starDate = typeof (this.basicsInfo.startTime) === 'string' ? new Date(this.basicsInfo.startTime) : this.basicsInfo.startTime
        if (date < starDate.getTime() || date > starDate.getTime() + 3 * 8.64e7) {
          if (date.getTime() - starDate.getTime() > 8.64e7) {
            this.basicsInfo.finishTime = this.$utils.date2str(new Date(starDate.getTime() + 3 * 8.64e7))
          } else {
            this.basicsInfo.finishTime = this.$utils.date2str(starDate)
          }
        }
      }
    },
    components:{ Match, SuctionBottom },
    methods:{
      clearFinishTime () {
        this.basicsInfo.finishTime = ''
      },
      //保存
      saveTask () {
        if(!this.basicsInfo.activityName){
          this.$message.warning("请输入活动名称！")
          return
        }
        if(!this.basicsInfo.startTime || !this.basicsInfo.finishTime){
          this.$message.warning("请输入活动时间！")
          return
        }
        this.$service.activity.cashback.addOrUpdate(this.basicsInfo).then(res => {
            this.$router.back()
        })
      },
      // 处理开始时间的变化
      handleStartTime (v) {
        if (!v) return
        if (+(new Date(v)) > +(new Date(this.basicsInfo.finishTime))) {
          this.basicsInfo.finishTime = ''
        }
      },
      // 处理到期时间的变化
      handleFinishTime (v) {
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
      // 获取抢返现活动信息详情
      getCheckedProList () {
        this.$service.activity.cashback.activityDetail({'activityId':this.$route.params.id}).then(res => {
          this.basicsInfo.status = res.status
          this.basicsInfo.activityId = res.activityId
          this.basicsInfo.activityName = res.activityName
          this.basicsInfo.startTime = res.startTime
          this.basicsInfo.finishTime = res.finishTime
          this.basicsInfo.poolId = res.poolId
          this.basicsInfo.poolName = res.poolName
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
      this.getCheckedProList()
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
