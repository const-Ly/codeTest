<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="会员昵称：">
          <el-input  class="w200" v-model.trim="param.userNickName"></el-input>
        </el-form-item>
        <el-form-item label="活动名称：">
          <el-input v-model.trim="param.lotteryName" class="w200"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%">
    		<el-table-column label="奖品图片">
		    	<template slot-scope="scope">
            <img-view class="rewardImage" :src="scope.row.rewardImageUrl"></img-view>
          </template>
		    </el-table-column>
    		<el-table-column label="开奖方式">
		    	<template slot-scope="scope">
            {{ scope.row.lotteryTypeName }}<br/>
            <span v-if="scope.row.lotteryType === 0">{{ scope.row.lotteryNum }}人</span>
            <span v-else>{{ scope.row.lotteryTime }}</span>
          </template>
		    </el-table-column>
	      <el-table-column label="活动名称" prop="lotteryName"></el-table-column>
	      <el-table-column label="奖品数量" prop="rewardNum"></el-table-column>
	      <el-table-column label="创建时间" prop="createTime"></el-table-column>
	      <el-table-column label="会员ID/昵称" prop="winStatusName">
	      	<template slot-scope="scope">
            {{ scope.row.userId }}/{{ scope.row.createBy }}
          </template>
	      </el-table-column>
	      <el-table-column label="状态" prop="statusName"></el-table-column>
	      <el-table-column label="编辑">
	      	<template slot-scope="scope">
	      		<router-link v-if="scope.row.status === 2" :to="{ path: 'result/' + scope.row.lotteryId,append:true }"><el-button size="small" type="text">开奖结果</el-button></router-link>
          </template>
	      </el-table-column>
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
          param:{//请求参数
	          userNickName :'',	// 会员昵称
	          lotteryName :'',	// 活动名称
	          pageIndex :1,
	          pageSize  :20,
	        }
	      }
      },
      methods:{
          getList(val) {
            let self = this
            self.param.pageIndex = val || 1
           	self.$service.activity.luckDraw.getPersonLotteryPage(self.param).then(res => {
              self.param.pageIndex = res.pageNum
              self.pages = res.pages
              self.list = res.list
           	})
          }
      },
      mounted () {
        this.getList()
      }
  }
</script>
<style type="text/css" scoped>
  .rewardImage{ width: 150px; height: 77px;}
</style>
