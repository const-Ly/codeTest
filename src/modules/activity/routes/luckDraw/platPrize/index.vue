<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="120px" size="small">
        <el-form-item label="奖品ID：">
          <el-input  class="w200" v-model="param.rewardId" v-only-num.string="param.rewardId"></el-input>
        </el-form-item>
        <el-form-item label="奖品名称：">
          <el-input v-model.trim="param.rewardName" class="w200"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
  		<div slot="header" class="clearfix">
        <span>平台奖品</span>
    		<router-link :to="{ path: 'add',append:true }"><el-button class="fr" size="small" type="primary">添加奖品</el-button></router-link>
      </div>
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%">
	      <el-table-column label="奖品ID" prop="rewardId"></el-table-column>
	      <el-table-column label="奖品名称" prop="rewardName"></el-table-column>
	      <el-table-column label="奖品价值">
	      	<template slot-scope="scope">
            <span v-if="scope.row.rewardPrice !== '' && scope.row.rewardPrice !== null">￥</span>{{ scope.row.rewardPrice | placeholder }}
          </template>
	      </el-table-column>
	      <el-table-column label="剩余数量" prop="availableStore"></el-table-column>
	      <el-table-column label="锁定数量" prop="lockStore"></el-table-column>
	      <el-table-column label="创建时间" prop="createTime"></el-table-column>
	      <el-table-column label="创建人" prop="createBy"></el-table-column>
	      <el-table-column label="编辑">
	      	<template slot-scope="scope">
	      		<router-link :to="{ path: 'edit/' + scope.row.rewardId,append:true }"><el-button size="small" type="text">编辑</el-button></router-link>
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
    	name: "platPrize",
      data() {
        let self = this
        return {
	        pages:0,
	        list:[],
          param:{//请求参数
          	rewardId	:null,	// 奖品id
	          rewardName :'',	// 奖品昵称
	          pageIndex :1,
	          pageSize  :20,
	        },
	      }
      },
      methods:{
          getList(val) {
            let self = this
            self.param.pageIndex = val || 1
           	self.$service.activity.luckDraw.getPlatformRewardPage(self.param).then(res => {
              self.param.pageIndex = res.pageNum
              self.pages = res.pages
              self.list = res.list
           	})
          },
      },
      mounted () {
        this.getList()
      }
  }
</script>
<style type="text/css" scoped>
  .rewardImage{ width: 80px; height: 40px;}
</style>
