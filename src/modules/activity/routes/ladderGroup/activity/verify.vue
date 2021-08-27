<template>
  <el-dialog :visible.sync="show" width="60%" :title="title" class="verify">
    <el-form :inline="true" label-width="100px" size="small">
      <el-form-item label="活动ID：">{{ info.activityId }}</el-form-item>
      <el-form-item label="活动名称：">{{ info.activityName }}</el-form-item><br>
      <el-form-item label="提交人：">{{ info.submitter }}</el-form-item>
      <el-form-item label="提交时间：">{{ info.submitTime }}</el-form-item><br>
      <template v-if="enumVal === 2">
        <el-form-item label="初审结果：">{{ info.firstVerifyResult | placeholder }}</el-form-item>
        <el-form-item label="初审信息：">
          <span v-if="info.firstVerifyOperator">{{ info.firstVerifyOperator +" " + info.firstVerifyTime}}</span>
          <span v-else>--</span>
        </el-form-item><br>
      </template>
      <template v-else>
        <el-form-item label="开始时间：">{{ info.beginTime }}</el-form-item>
        <el-form-item label="结束时间：">{{ info.endTime }}</el-form-item><br>
      </template>

      <el-form-item label="商品数：">{{ info.remainingProductNumber }}</el-form-item>
      <el-form-item label="拼团人数：">{{ info.groupSize }}</el-form-item><br>
      <el-form-item label="新客补贴：">{{ info.newerSubsidy }} 元/人</el-form-item>
      <template v-if="enumVal === 0">
        <el-form-item label="审核状态：">{{ info.auditStatusDes }}</el-form-item><br>
        <el-form-item label="初审结果：">{{ info.firstVerifyResult | placeholder }}</el-form-item>
        <el-form-item label="初审信息：">
          <span v-if="info.firstVerifyOperator">{{ info.firstVerifyOperator +" ," + info.firstVerifyTime}}</span>
          <span v-else>--</span>
        </el-form-item><br>
        <el-form-item label="二审结果：">{{ info.secondVerifyResult | placeholder }} <span v-if="info.auditStatus === 4">,{{info.secondVerifyRejectReason}}</span></el-form-item>
        <el-form-item label="二审信息：">
          <span v-if="info.secondVerifyOperator">{{ info.secondVerifyOperator +" ," + info.secondVerifyTime}}</span>
          <span v-else>--</span>
        </el-form-item>
      </template>
      <template v-else>
        <br><el-form-item :label="enumVal === 1?'审核结果：':'二审：'">
          <el-radio-group v-model="param.result">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="0">审核驳回</el-radio>
          </el-radio-group>
        </el-form-item><br>
        <el-form-item label="原因：" v-if="enumVal ===2 && param.result === 0">
          <el-input v-model.trim="param.verifyMessage" :maxLength="10"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" v-if="enumVal !== 0">
      <el-button size="small" type="primary" @click="submitAudit">确认审核</el-button>
      <el-button size="small" @click="show=false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'verify',
    props:{
      enumVal:{ // 枚举值  0查看  1初审  2 二审
        type:Number,
        default:0
      },
      info:{
        type:Object,
        default: () => ({})
      }
    },
    data () {
      return {
        param:{
          result:1,
          verifyMessage:"",
          verifyType:1,
          activityId:"",
          verifyTermId:""
        },
        show:false
      }
    },
    computed:{
      title () {
        return this.enumVal === 0?"查看审核":this.enumVal === 1?"初审审核":"二审审核"
      }
    },
    watch:{
      info (nv,ov) {
        this.param.verifyType = this.enumVal
        this.param.activityId = this.info.activityId
        this.param.verifyTermId = this.info.verifyTermId
      }
    },
    methods:{
      // 初始化弹框信息
      init () {
        this.param.result = 1
        this.param.verifyMessage = ''
      },
      submitAudit () {
        if(this.enumVal === 2 && this.param.result === 0 && this.param.verifyMessage === ''){
          this.$message.warning('请输入1-10字驳回原因');return false
        }
        this.$service.activity.ladderGroup.verify(this.param).then(res => {
          this.$message.success('审核成功')
          this.show= false
          this.$emit('reload')
        })
      }
    }
  }
</script>
<style>
  .verify .el-form-item {width:360px;}
</style>
