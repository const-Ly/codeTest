<template>
  <div class="cms">
  	<el-card class="box-card">
      <div class="resultBox">
      	<span>抽奖状态：{{ result.lotteryStatusName }}<i v-if="result.lotteryTime">（{{ result.lotteryTime }}）</i></span><br/>
      	<span>活动名称：{{ result.lotteryName }}</span>
      	<span>，奖品数量：{{ result.rewardNum }}件</span>
      	<span>，参与人数： {{ result.actorNum }}人</span>
      </div>
   </el-card>
    <el-card class="box-card ma-t-10">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="会员ID：">
          <el-input  class="w200" v-model="param.userId" v-only-num.string="param.userId"></el-input>
        </el-form-item>
        <el-form-item label="会员昵称：">
          <el-input v-model.trim="param.userNickName" class="w200"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%">
	      <el-table-column label="会员ID" prop="userId"></el-table-column>
	      <el-table-column label="会员昵称" prop="userNickName"></el-table-column>
	      <el-table-column label="参与时间" prop="joinTime"></el-table-column>
	      <el-table-column label="中奖状态" prop="winStatusName"></el-table-column>
	    </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  export default {
    	name: "personalLuckResult",
      data() {
        let self = this
        return {
	        pages:0,
	        list:[],
	        result:{},	// 抽奖活动结果，用于顶部展示
          param:{//请求参数
          	lotteryId :this.$route.params.id,	// 抽奖活动id
	          userId :null,	// 会员id
	          userNickName :'',	// 会员昵称
	          pageIndex :1,
	          pageSize  :20,
	        },
	        receiveInfo:{},	// 收货信息内容
	        dialogReceiveInfo:false,	// 收货信息
	        deliveryInfo:'',	// 发货信息
	        dialogDeliveryInfo:false,	// 发货
	        awardInfo:{},
	        dialogAwardInfo:false,	// 发奖情况
	        
	      }
      },
      methods:{
      		getLotteryResult() {	// 获取抽奖活动结果，用于顶部展示
            let self = this
      			self.$service.activity.luckDraw.getLotteryResultByLotteryId({lotteryId:this.$route.params.id}).then(res => {
              self.result = res
           	})
      		},
          getList(val) {
            let self = this
            self.param.pageIndex = val || 1
           	self.$service.activity.luckDraw.getPersonLotteryResultPage(self.param).then(res => {
              self.param.pageIndex = res.pageNum
              self.pages = res.pages
              self.list = res.list
           	})
          }
      },
      mounted () {
        this.getLotteryResult()
        this.getList()
      }
  }
</script>
<style type="text/css" scoped>
  .resultBox{ margin: 0 50px;}
  .resultBox i{ font-style: normal;}
</style>
