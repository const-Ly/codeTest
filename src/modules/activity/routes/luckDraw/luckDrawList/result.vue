<template>
  <div class="cms">
  	<el-card class="box-card">
      <div class="resultBox">
      	<span>抽奖状态：{{ result.lotteryStatusName }}（{{ result.lotteryTime }}）</span><br/>
      	<span>抽奖活动ID：{{ param.lotteryId }}</span>
      	<span>，抽奖名称：{{ result.lotteryName }}</span><br/>
      	<span>奖品ID：{{ result.rewardId }}</span>
      	<span>，奖品名称：{{ result.rewardName }}</span><br/>
      	<span>奖品来源：{{ result.sourceName }}</span>
      	<span>，奖品数量：{{ result.rewardNum }}件</span>
      	<span v-if="result.source === 0">，虚拟参与人数： {{ result.rebotNum }}人</span>
      	<span>，实际中奖人数： {{ result.actualWinNum }}人</span>
      	<span>，参与人数： {{ result.actorNum }}人</span>
      </div>
   </el-card>
    <el-card class="box-card ma-t-10">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="用户ID：">
          <el-input  class="w200" v-model="param.userId" v-only-num.string="param.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：">
          <el-input v-model.trim="param.userNickName" class="w200"></el-input>
        </el-form-item>
      	<el-form-item label="中奖单ID：">
          <el-input  class="w200" v-model="param.winListId" v-only-num.string="param.winListId"></el-input>
       </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%" size="small">
	      <el-table-column label="用户ID" prop="userId"></el-table-column>
	      <el-table-column label="用户昵称" prop="userNickName"></el-table-column>
	      <el-table-column label="参与时间" prop="joinTime"></el-table-column>
	      <el-table-column label="中奖状态" prop="winStatusName"></el-table-column>
		    <el-table-column label="中奖单ID">
		    	<template slot-scope="scope">{{ scope.row.winListId | placeholder }}</template>
		    </el-table-column>
		    <el-table-column label="发奖状态">
		    	<template slot-scope="scope">{{ scope.row.awardStatusName | placeholder }}</template>
		    </el-table-column>
		    <el-table-column label="查看及操作">
		    	<template slot-scope="scope" >
		    		<span class="font-blue" v-if="scope.row.winStatus === 1 && scope.row.awardStatus !== 0 && scope.row.awardStatus !== 4" @click="getReceiveInfo(scope.row.winListId)">收货信息</span>
		    		<span class="font-success" v-if="scope.row.awardStatus === 1 && scope.row.source === 0" @click="openDeliveryInfo(scope.row.winListId)">发奖</span>
		    		<span class="font-warning" v-if="scope.row.awardStatus === 2 || scope.row.awardStatus === 3" @click="getAwardInfo(scope.row.winListId)">发奖情况</span>
		    	</template>
		    </el-table-column>
	    </el-table>
	    <!-- 收货信息  -->
	    <el-dialog title="收货信息" :visible.sync="dialogReceiveInfo" width="40%">
			  <div class="dialogCont">
	      	<p>收货人姓名：{{ receiveInfo.receiverName }}</p>
	      	<p>手机号：{{ receiveInfo.telephone }}</p>
	      	<p>收货地址：{{ receiveInfo.address }}</p>
	    </div>
			</el-dialog>
			<!-- 发奖 -->
			<el-dialog title="发奖" :visible.sync="dialogDeliveryInfo" width="50%">
			  <el-form label-width="180px" size="small">
          <el-form-item label="发奖信息：">
	          <el-input v-model.trim="deliveryInfo" class="w300" :maxlength="40"></el-input>
	        </el-form-item>
      	</el-form>
			  <span slot="footer" class="dialog-footer">
       		<el-button type="primary" @click="submitDeliveryInfo" size="small">完成发奖</el-button>
			    <el-button @click="dialogDeliveryInfo = false" size="small">取 消</el-button>
			  </span>
			</el-dialog>
			<!-- 发奖情况 -->
			<el-dialog title="发奖情况" :visible.sync="dialogAwardInfo" width="50%">
			  <div class="dialogCont">
			  	<p>用户已经领取奖品，等待{{ awardInfo.sourceName }}发奖<br/>{{ awardInfo.receiveTime }}</p>
			  	<p v-if="awardInfo.source === 1">商家已发奖，运单号：{{ awardInfo.shipId }}<br/>{{ awardInfo.deliveryTime }}</p>
			  	<p v-else>平台已发奖，发奖信息：{{ awardInfo.deliveryInfo }}<br/>{{ awardInfo.deliveryTime }}</p>
			  	<p>发奖完成<br/>{{  awardInfo.finishedTime }}</p>
			  </div>
			</el-dialog>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  export default {
    	name: "luckDrawResult",
      data() {
        let self = this
        return {
	        pages:0,
	        list:[],
	        result:{},	// 抽奖活动结果，用于顶部展示
          param:{//请求参数
	          userId :null,	// 用户id
	          userNickName :'',	// 用户昵称
	          winListId :null,	// 中奖单id
	          lotteryId :this.$route.params.id,	// 抽奖活动id
	          pageIndex :1,
	          pageSize  :20,
	        },
	        receiveInfo:{},	// 收货信息内容
	        dialogReceiveInfo:false,	// 收货信息
	        deliveryInfo:'',	// 发奖信息
	        dialogDeliveryInfo:false,	// 发奖
	        awardInfo:{},
	        dialogAwardInfo:false,	// 发奖情况
	        deliveryInfoNow:null	// 当前发奖winListId
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
           	self.$service.activity.luckDraw.getLotteryResultPage(self.param).then(res => {
              self.param.pageIndex = res.pageNum
              self.pages = res.pages
              self.list = res.list
           	})
          },
          getReceiveInfo(winListId) {	// 获取收货信息
          	let self = this
      			self.$service.activity.luckDraw.getReceiveInfo({winListId:winListId}).then(res => {
              self.receiveInfo = res
              self.dialogReceiveInfo = true
           	})
          },
          submitDeliveryInfo() {	// 提交发奖信息
          	let self = this
          	if(self.deliveryInfo === ''){
          		this.$message({
			          message: '请输入1-40字发奖信息',
			          type: 'warning'
			        });
			        return false;
          	}
      			self.$service.activity.luckDraw.saveDeliveryInfo({
      				winListId:self.deliveryInfoNow,
      				deliveryInfo:self.deliveryInfo
      			}).then(res => {
      				this.$message({
			          message: '发奖成功',
			          type: 'success'
			        });
			        self.dialogDeliveryInfo = false
              this.getList()
           	})
          },
         	getAwardInfo(winListId) {	// 获取发奖情况 
         		let self = this
      			self.$service.activity.luckDraw.getAwardInfo({winListId:winListId}).then(res => {
              self.awardInfo = res
              self.dialogAwardInfo = true
           	})
         	},
         	openDeliveryInfo(winListId){	// 发奖
         		this.deliveryInfo = ''
         		this.deliveryInfoNow = winListId
         		this.dialogDeliveryInfo = true
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
  .dialogCont>p{ margin: 20px 30px; text-align: left;}
</style>
