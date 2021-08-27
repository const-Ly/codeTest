<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="活动名称">
          <el-input v-model.trim="param.activityName" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker v-model="param.startTimeBegin" type="datetime" format="yyyy-MM-dd HH:mm" @change="handleStartTimeBegin"></el-date-picker>
          <span class="range-input-split">至</span>
          <el-date-picker v-model="param.startTimeEnd" type="datetime" format="yyyy-MM-dd HH:mm" @change="handleStartTimeEnd"></el-date-picker>
        </el-form-item><br>
        <el-form-item label="状态：">
          <el-select v-model="param.status" class="w300">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="待开始" :value="1"></el-option>
            <el-option label="进行中" :value="2"></el-option>
            <el-option label="已结束" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearSearch()">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span>抢返现活动（查询{{total}}条）</span>
        <router-link :to="{ path: 'add',append:true }">
        	<el-button class="fr" type="primary" size="small">添加</el-button>
        </router-link>
      </div>
    	<el-table :data="list" style="width:100%"  :default-expand-all="false">
	      <el-table-column label="ID">
	      	<template slot-scope="scope">
            <router-link :to="{ path: 'detail/' + scope.row.activityId,append:true }">
		        	<span class="font-blue">{{scope.row.activityId}}</span>
		        </router-link>
          </template>
	      </el-table-column>
		    <el-table-column label="活动名称" prop="activityName"></el-table-column>
		    <el-table-column label="状态" prop="statusDesc"></el-table-column>
		    <el-table-column label="开始时间" prop="startTime"></el-table-column>
		    <el-table-column label="结束时间" prop="finishTime"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
            <div v-if="scope.row.status === 1 || scope.row.status === 2">
            	<router-link :to="{ path: 'edit/' + scope.row.activityId,append:true }"><span class="font-blue">编辑</span></router-link>
            	<span class="font-danger ma-l-10" @click="handleStop(scope.row.activityId)">结束</span>
            </div>
          </template>
		    </el-table-column>
	    </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
    
  </div>
</template>

<script type="text/javascript">
  export default {
    	name: "activities",
      data() {
        let self = this
        return {
	        pages:0,
	        total:0,
	        list:[],
          param:{
	          activityName:'',
	          startTimeBegin:'',
	          startTimeEnd:'',
	          status:'',
	          pageSize:20,
	          pageIndex:1
	        }
	       
        	
        }
      },
      methods:{
          getList(val) {
            let self = this
	          self.param.pageIndex = val || 1
	          self.$service.activity.cashback.activityPageList(self.param).then(res => {
	            self.pages = res.pages
	            self.param.pageIndex = res.pageNum
	            self.list = res.list
	            self.total = res.total
	          })
          },
          // 清空查询条件
          clearSearch() {
	          this.param.activityName = ''
	          this.param.startTimeBegin = ''
	          this.param.startTimeEnd = ''
	          this.param.status = '-1'
          },
          // 结束活动
          handleStop(activityId){
          	this.$confirm('是否确认结束活动？', '提示', {
		          confirmButtonText: '是',
		          cancelButtonText: '否',
		          type: 'warning'
		        }).then(() => {
		          this.$service.activity.cashback.finish({'activityId':activityId}).then(res => {
		            this.getList()
		          })
		        })
          },
		      // 处理开始时间的变化
          handleStartTimeBegin (date) {
            this.param.startTimeBegin = this.$utils.dateToString(date)
          },
          // 处理到期时间的变化
          handleStartTimeEnd (date) {
            this.param.startTimeEnd = this.$utils.dateToString(date)
          }
      },
      mounted () {
        this.getList()
      }
  }
</script>

<style type="text/css" scoped>
</style>
