<template>
  <div class="cms">
  	<el-card class="box-card mar-t20">
      <div class="clearfix pa-b-10">
        <span class="line-30">项目名称：</span>{{ projectName | subStr(10) }}
        <span class="line-30 ma-l-40">应用场景：</span>{{ sceneName | subStr(10) }}
        <el-button class="fr" size="small" type="primary" @click="addNewTask= true;connectParam = {}">关联新任务</el-button>
      </div>

      <el-table :data="list"  border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column label="任务名称">
          <template slot-scope="scope">
            <router-link :to="{ path: '/boosterTask/detail/'+scope.row.taskId}"><span class="font-blue">{{scope.row.taskName}}</span></router-link>
          </template>
        </el-table-column>
        <el-table-column prop="relationBy" label="关联人"></el-table-column>
        <el-table-column prop="effectiveTime" label="有效时间"></el-table-column>
        <el-table-column label="状态">
        	<template slot-scope="scope">
        		<span>{{ scope.row.effectiveStatusString }}<span v-if="scope.row.invalid===1">（{{ scope.row.toVoidBy }}）</span></span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.invalid===0" @click="openAbolish(scope.row)" type="text">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
    <el-dialog :visible.sync="addNewTask" v-if="addNewTask" width="60%">
    	<connect-task @add="addTask"></connect-task>
    	<span slot="footer" class="dialog-footer">
		    <el-button size="small" type="primary" @click="qotoConnect">关联场景</el-button>
		    <el-button size="small" @click="addNewTask = false">返回</el-button>
		  </span>
    </el-dialog>

  </div>
</template>
<script>
	const ConnectTask = () => import('./connectNewTask')
export default {
	data() {
		return {
      projectName: '',
      sceneName: '',

      pages:0,
			param: {
				sceneId: this.$route.query.id,
				pageIndex: 1,
				pageSize: 20
			},
			list:[],

      addNewTask:false,
			connectParam:{}
		}
	},
	components:{
		ConnectTask
	},
	methods:{
    getProjectNameAndSceneName () {
      this.$service.activity.boosterConfig.getProjectNameAndSceneName({sceneId:this.param.sceneId}).then(res => {
        this.projectName = res.projectName
        this.sceneName = res.scenceName
      })
    },
    getList(val) {
      this.param.pageIndex = val || 1
      this.$service.activity.boosterConfig.tasksList(this.param).then(res => {
        this.param.pageIndex = res.pageNum
        this.pages = res.pages
        this.list = res.list
      })
    },
		openAbolish(row) { //作废
      let self = this
      this.$confirm('你确认要作废该任务的关联吗？作废后将不可以恢复。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.activity.boosterConfig.abolish({id:row.id}).then(res => {
          self.getList()
        })
      })
		},
	  //获取任务id和关联时间
	  addTask (param) {
	  	this.connectParam = Object.assign({},param)
	  },
    qotoConnect () {
      if(!!!this.connectParam.taskId){
        this.$message.warning("请选择关联任务");return;
      }
      if(!!!this.connectParam.date){
        this.$message.warning("请选择关联生效时间");return;
      }
      this.$service.activity.boosterConfig.gotoConnect({
          taskId: this.connectParam.taskId,
          sceneId: this.param.sceneId,
          startEffectTime: this.date2str(this.connectParam.date[0]),
          endEffectTime: this.date2str(this.connectParam.date[1])
      }).then(res => {
        this.addNewTask = false
        this.getList()
      })
    },
	  date2str(date) {
	  	let y = date.getFullYear()
	  	let m = (date.getMonth()+1)<10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)
	  	let d = date.getDate()<10 ? '0'+date.getDate() : date.getDate()
	  	let h = date.getHours()<10 ? '0'+date.getHours() : date.getHours()
	  	let f = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes()
	  	let s = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds()
			return y +'-'+ m +'-'+ d +' '+ h +':'+ f +':'+ s
		}
	},
	mounted() {
		this.getList()
    this.getProjectNameAndSceneName()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table__expanded-cell[class*=cell] {
    padding:0;
  }
  .el-table__expanded-cell[class*=cell]  .el-table__header-wrapper {
    display: none;
  }
</style>
