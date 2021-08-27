<template>
  <div>
  	<!--表单  begin-->
    <el-form size="small" label-width="150px">
	    <el-form-item label="关联生效时间：">
	    	<el-date-picker v-model="defaultDateTime" type="datetimerange" range-separator="-"
		      start-placeholder="开始日期" end-placeholder="结束日期" @change="dateTimeChange">
		    </el-date-picker>
	    </el-form-item>
	    <el-form-item label="">
	    	<el-input placeholder="请输入任务名称" class="input-with-select" v-model.trim="param.taskName">
			    <el-button slot="append" icon="el-icon-search" @click="searchList()"></el-button>
			  </el-input>
	    </el-form-item>
	  </el-form>
	  <!--表单  end-->
	  <!--场景列表 begin-->
	  <el-table :data="sceneList" border size="small">
      <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.taskId" v-model="taskId" @change.native="getTemplateRow(scope.row.taskId)">&nbsp;</el-radio>
          </template>
      </el-table-column>
	    <el-table-column property="taskId" label="任务ID"></el-table-column>
	    <el-table-column property="taskName" label="助力任务名称"></el-table-column>
	    <el-table-column property="createTime" label="创建时间"></el-table-column>
	    <el-table-column property="createBy" label="创建人"></el-table-column>
	  </el-table>
	  <!--场景列表 end-->
	  <!--分页信息 begin-->
	  <div class="align-center ma-t-20" v-if="pages>0">
	  	<el-pagination :current-page.sync="param.pageIndex" @current-change="searchList" :page-count="pages" background layout="prev, pager, next"></el-pagination>
	  </div>
	  <!--分页信息 end-->
	  
  </div>
</template>

<script>
  export default {
  	name:'connectTask',
  	data () {
  		return {
  			param: {
					status: "0",
  				taskName:'',
  				pageIndex:1,
  				pageSize: 20
  			},
  			pages: 0,
  			sceneList:[],

  			taskId:'',

  			defaultDateTime:[
  				new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1,0,0,0),
  				new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+2,0,0,0)
  			]
  		}
  	},
  	mounted () {
  		this.searchList()
  	},
  	methods:{
  		searchList (pageNow) {
  			this.param.pageIndex = pageNow || 1
  			this.$service.activity.boosterTask.list(this.param).then(res => {
  				this.param.pageIndex = res.pageNum
  				this.pages = res.pages
  				this.sceneList = res.list
  			})
  		},
      getTemplateRow (taskId) {
        let self = this
        this.taskId = taskId
        this.$emit('add',{
          taskId:self.taskId,
          date:self.defaultDateTime
        })
      },
  		dateTimeChange () {
        let self = this
  			this.$emit('add',{
          taskId:self.taskId,
          date:self.defaultDateTime
        })
  		}
  	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ma-t-20{
  	margin-top: 20px;
  }
  .left {
    float: left;
  }
  span.left {
    margin: 0 10px;
  }
</style>
