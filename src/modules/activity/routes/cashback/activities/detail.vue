<template>
  <div class="cms">
  	<el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础信息</span>
      </div>
      <el-form label-width="180px" size="small">
      	<el-form-item label="ID：">{{param.activityId}}</el-form-item>
      	<el-form-item label="活动名称：">{{param.activityName}}</el-form-item>
      	<el-form-item label="活动状态：">{{param.statusDesc}}</el-form-item>
      	<el-form-item label="活动时间：">{{param.startTime}} 到 {{param.finishTime}}</el-form-item>
        <el-form-item label="抽奖商品池：">{{ param.poolName }}</el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'detail',
    data () {
      return {
      	activityId:this.$route.params.id,
      	param:{}
      }
    },
    methods:{
      getList (pageNow) {
        this.$service.activity.cashback.activityDetail({'activityId':this.activityId}).then(res => {
          this.param = res
        })
      },
      toBack(){
      	this.$router.back()
      }
    },
    mounted () {
      this.getList()
    },
  }
</script>
<style scoped>
</style>
