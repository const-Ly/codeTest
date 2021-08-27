<template>
  <div class="cms">
    <el-card>
      <el-form label-width="120px" size="small">
        <el-form-item label="特权金类型：">
          <el-radio-group v-model="param.taskType">
            <el-radio :label="1">渠道新手特权金</el-radio>
            <el-radio :label="2">通用特权金</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否区分用户：" v-if="param.taskType ===2">
          <el-radio-group v-model="param.isDistinguish">
            <el-radio :label="1">区分</el-radio>
            <el-radio :label="2">不区分</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="param.taskType ===1 || param.isDistinguish === 2">
          <el-form-item label="特权金面额：">
            <el-input class="w200" v-model="param.amount" v-only-num="param.amount" :max-len="3"></el-input>
          </el-form-item>
          <el-form-item v-if="param.taskType === 2" label="补偿金币：">
            <el-input class="w200" v-model="param.compensateGold" v-only-num="param.compensateGold" :max-len="5"></el-input>
            <p class="font-info">本权益被偷后，补充给被偷者的金币数量</p>
          </el-form-item>
          <el-form-item label="有效期：">
            <el-radio-group v-model="param.expireType">
              <el-radio :label="1">按天计算</el-radio>
              <el-radio :label="2">按时间计算</el-radio>
            </el-radio-group>
            <div v-if="param.expireType === 1">
              <el-input v-model="param.expireDay" v-only-num="param.expireDay" :max-len="3" class="w80"></el-input>&nbsp;天
            </div>
            <div v-else>
              <el-input v-model="param.expireHour" v-only-num="param.expireHour" :max-len="2" class="w80"></el-input>&nbsp;小时
              <el-input v-model="param.expireMinute" v-only-num="param.expireMinute" :max-len="2" class="w80 ma-l-20"></el-input>&nbsp;分
            </div>
          </el-form-item>
          <el-form-item label="是否限量：">
            <el-radio-group v-model="param.isLimit">
              <el-radio :label="1">限量</el-radio>
              <el-radio :label="2">不限量</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="限制数量：" v-if="param.isLimit === 1">
            <el-input class="w200" v-model="param.number" v-only-num="param.number" :max-len="8"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="新用户面额：">
            <el-input class="w200" v-model="param.newerAmount" v-only-num="param.newerAmount" :max-len="3"></el-input>
          </el-form-item>
          <el-form-item label="补偿金币：">
            <el-input class="w200" v-model="param.newerCompensateGold" v-only-num="param.newerCompensateGold" :max-len="5"></el-input>
            <p class="font-info">本权益被偷后，补充给被偷者的金币数量</p>
          </el-form-item>
          <el-form-item label="有效期：">
            <el-radio-group v-model="param.expireTypeNewer">
              <el-radio :label="1">按天计算</el-radio>
              <el-radio :label="2">按时间计算</el-radio>
            </el-radio-group>
            <div v-if="param.expireTypeNewer === 1">
              <el-input v-model="param.expireDayNewer" v-only-num="param.expireDayNewer" :max-len="3" class="w80"></el-input>&nbsp;天
            </div>
            <div v-else="">
              <el-input v-model="param.expireHourNewer" v-only-num="param.expireHourNewer" :max-len="2" class="w80"></el-input>&nbsp;小时
              <el-input v-model="param.expireMinuteNewer" v-only-num="param.expireMinuteNewer" :max-len="2" class="w80 ma-l-20"></el-input>&nbsp;分
            </div>
          </el-form-item>
          <el-form-item label="是否限量：">
            <el-radio-group v-model="param.isLimitNewer">
              <el-radio :label="2">不限量</el-radio>
              <el-radio :label="1">限量</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="限制数量：" v-if="param.isLimitNewer === 1">
            <el-input class="w200" v-model="param.newerLimitNum" v-only-num="param.newerLimitNum" :max-len="8"></el-input>
          </el-form-item>
          <el-form-item label="老用户面额：">
            <el-input class="w200" v-model="param.olderAmount" v-only-num="param.olderAmount" :max-len="3"></el-input>
          </el-form-item>
          <el-form-item label="补偿金币：">
            <el-input class="w200" v-model="param.olderCompensateGold" v-only-num="param.olderCompensateGold" :max-len="5"></el-input>
            <p class="font-info">本权益被偷后，补充给被偷者的金币数量</p>
          </el-form-item>
          <el-form-item label="有效期：">
            <el-radio-group v-model="param.expireTypeOlder">
              <el-radio :label="1">按天计算</el-radio>
              <el-radio :label="2">按时间计算</el-radio>
            </el-radio-group>
            <div v-if="param.expireTypeOlder === 1">
              <el-input v-model="param.expireDayOlder" v-only-num="param.expireDayOlder" :max-len="3" class="w80"></el-input>&nbsp;天
            </div>
            <div v-else="">
              <el-input v-model="param.expireHourOlder" v-only-num="param.expireHourOlder" :max-len="2" class="w80"></el-input>&nbsp;小时
              <el-input v-model="param.expireMinuteOlder" v-only-num="param.expireMinuteOlder" :max-len="2" class="w80 ma-l-20"></el-input>&nbsp;分
            </div>
          </el-form-item>
          <el-form-item label="是否限量：">
            <el-radio-group v-model="param.isLimitOlder">
              <el-radio :label="2">不限量</el-radio>
              <el-radio :label="1">限量</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="限制数量：" v-if="param.isLimitOlder === 1">
            <el-input class="w200" v-model="param.olderLimitNum" v-only-num="param.olderLimitNum" :max-len="8"></el-input>
          </el-form-item>
        </template>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveTask">提交保存</el-button>
          <el-button class="ma-l-15" @click="$router.back()">返回</el-button>
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
      param:{
        id:null,
        taskType:1, // 特权金类型 1渠道新手 2 通用
        isDistinguish:2, // 是否区分新老用户 区分1 不区分2  默认不区分
        amount:'', //特权金面额 在【渠道新手特权金】或者 【通用特权金--不区分】时有效
        isLimit:2, // 是否限量 在【渠道新手特权金】或者 【通用特权金--不区分】时有效
        number:'', // 限制数量 在【渠道新手特权金】或者 【通用特权金--不区分】时并且选中【限量】
        newerAmount:'', // 新客特权金面额
        isLimitNewer:2, // 新客是否限量 1限量 2 不限量，默认不限量
        newerLimitNum:'',// 新客限制数量，只在新客选中【限量】时使用
        olderAmount:'',// 老客特权金面额
        isLimitOlder:2,//老客是否限量 1限量 2 不限量，默认不限量
        olderLimitNum:'',// 老客限制数量，只在新客选中【限量】时使用
        expireType: 1, // 通用特权金（或新手特权金） & 不区分新老用户 类型
        expireDay: '', // 通用特权金（或新手特权金） & 不区分新老用户 天
        expireHour: '', // 通用特权金（或新手特权金） & 不区分新老用户 小时
        expireMinute: '', // 通用特权金（或新手特权金） & 不区分新老用户 分钟
        expireTypeNewer: 1, // 通用特权金 & 区分-新用户 类型
        expireDayNewer: '', // 通用特权金 & 区分-新用户 天
        expireHourNewer: '', // 通用特权金 & 区分-新用户 小时
        expireMinuteNewer: '', // 通用特权金 & 区分-新用户 分钟
        expireTypeOlder: 1, // 通用特权金 & 区分-老用户 类型
        expireDayOlder: '', // 通用特权金 & 区分-老用户 天
        expireHourOlder: '', // 通用特权金 & 区分-老用户 小时
        expireMinuteOlder: '', // 通用特权金 & 区分-老用户 分钟
        compensateGold: '', //不区分用户-补偿金币
        newerCompensateGold: '', // 新用户-补偿金币
        olderCompensateGold: '' // 老用户-补偿金币
      }
     }
    },
    mounted () {
      this.getInfo()
    },
    methods:{
      getInfo () {
        this.taskId = this.$route.query.id
        if(this.taskId){
          document.title = '编辑'
          document.querySelector('.el-breadcrumb').lastChild.querySelector('span').textContent = '编辑'
          this.$service.privilege.task.getTaskDetail({taskId:this.taskId}).then(res => {
            res.isDistinguish = res.isDistinguish || 2
            res.isLimit       = res.isLimit || 2
            res.isLimitNewer  = res.isLimitNewer || 2
            res.isLimitOlder  = res.isLimitOlder || 2
            res.expireType    = res.expireType || 1
            res.expireTypeNewer = res.expireTypeNewer || 1
            res.expireTypeOlder = res.expireTypeOlder || 1
            res.compensateGold = res.compensateGold || ''
            res.newerCompensateGold = res.newerCompensateGold || ''
            res.olderCompensateGold = res.olderCompensateGold || ''
            this.param = res
          })
        }
      },
      checkParam () {
        let taskState = this.param.taskType == 1 || (this.param.isDistinguish == 2 && this.param.taskType == 2),
            state = this.param.taskType == 2 && this.param.isDistinguish == 1;
        if(this.param.taskType === 1 || this.param.isDistinguish === 2){ //渠道新手特权金 或者 通用特权金不区分
          if(this.param.amount <1){
            this.$message.warning("请输入1-999特权金面额");return
          }
          if(this.param.compensateGold === 0){
            this.$message.warning("补偿金币必须是1到99999的整数");return
          }
          if(!this.privValid('', taskState)) return
          if(this.param.isLimit === 1 && this.param.number < 1){
            this.$message.warning("请输入1-99999999限制数量");return
          }
        }else{
          if(this.param.newerAmount <1){
            this.$message.warning("请输入1-999新用户面额");return
          }
          if(this.param.newerCompensateGold  === 0){
            this.$message.warning("补偿金币必须是1到99999的整数");return
          }
          if(!this.privValid('Newer', state)) return
          if(this.param.isLimitNewer === 1 && (this.param.newerLimitNum === "" || this.param.newerLimitNum === null)){
            this.$message.warning("请输入0-99999999新用户限制数量");return
          }
          if(this.param.olderAmount <1){
            this.$message.warning("请输入1-999老用户面额");return
          }
          if(this.param.olderCompensateGold  === 0){
            this.$message.warning("补偿金币必须是1到99999的整数");return
          }
          if(!this.privValid('Older', state)) return
          if(this.param.isLimitOlder === 1 && (this.param.olderLimitNum === "" || this.param.olderLimitNum === null)){
            this.$message.warning("请输入0-99999999限制数量");return
          }
        }
        return true
      },
      privValid (str, state) {
        let param = this.param,
            type = `expireType${str}`, 
            day = `expireDay${str}`, 
            hour = `expireHour${str}`, 
            minute = `expireMinute${str}`;
        if(state) {
          if(param[type] === 1 && !param[day]) {
            this.$message.warning('请输入1-999特权金有效期'); return
          } 
          if(param[type] === 2){
            if(!param[hour] && !param[minute]) {
              this.$message.warning('请输入有效的特权金有效期'); return
            }
            if(param[hour] > 23) {
              this.$message.warning('请输入0-23小时数');return
            }
            if(param[minute] > 59) {
              this.$message.warning('请输入0-59分钟数');return
            }
          }
        }
        return true;
      },
      saveTask () {
        if(this.checkParam()){
          this.$service.privilege.task.saveTask(this.param).then(res => {
            this.$router.back()
          })
        }
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>
