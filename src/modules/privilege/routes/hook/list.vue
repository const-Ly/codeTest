<template>
  <div class="cms">
    <el-card>
      <div slot="header" class="clearfix">
        <span>项目名称：{{ info.projectName }}</span>
        <span class="ma-l-15">场景名称：{{ info.sceneName }}</span>
        <el-button class="fr" type="primary" size="small" @click="handleAddRelation">添加关联</el-button>
        <el-button style="margin-right: 10px;" class="fr" size="small" @click="goBack">返回</el-button>
      </div>
      <!-- 表格数据 -->
      <el-table :data="list" style="width: 100%" size="small">
        <el-table-column label="任务ID" prop="taskId"></el-table-column>
        <el-table-column label="特权金类型" prop="taskTypeName"></el-table-column>
        <el-table-column label="特权金面额">
          <template slot-scope="scope">
             <span v-if="scope.row.taskType === 1 || scope.row.isDistinguish === 2">{{ scope.row.amount | currency }}</span>
             <span v-else>{{ scope.row.newerAmount | currency }},{{ scope.row.olderAmount | currency }}</span>
           </template>
        </el-table-column>
        <el-table-column label="任务状态" prop="taskStatusName"></el-table-column>
        <el-table-column label="关联人" prop="createBy"></el-table-column>
        <el-table-column label="有效时间">
          <template slot-scope="scope">
             {{ scope.row.startEffectTime }}-<br/>{{ scope.row.endEffectTime }}
           </template>
        </el-table-column>
        <el-table-column label="来源名称" prop="sourceName"></el-table-column>
        <el-table-column label="数据标签">
          <template slot-scope="scope">
            <span v-if="['', null].indexOf(scope.row.minValue) > -1">不关联</span>
	          <span v-else>
	            {{ scope.row.labelTitle }} 
	            [ {{ scope.row.minValue }} , {{ scope.row.maxValue }} )
	          </span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
             {{ scope.row.sceneTaskStatusName }}<span v-if="scope.row.sceneTaskStatus === 4">({{ scope.row.disuseBy }})</span>
           </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="handleVoid(scope.row.sceneTaskId)" class="font-blue" v-if="scope.row.sceneTaskStatus ===1 || scope.row.sceneTaskStatus === 2">作废</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="getRelationProjectByPage($event)"></el-pagination>
      </div>
    </el-card>

    <!-- 添加关联 -->
    <el-dialog title="添加关联" :visible.sync="addRelation" width="60%">
      <el-form size="small" label-width="150px">
        <el-form-item label="关联生效时间：">
          <el-date-picker v-model="defaultDateTime" format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="-"></el-date-picker>
        </el-form-item>
        <el-form-item label="关联数据标签：">
	        <el-select v-model="relationParam.labelId" class="w300">
            <el-option v-for="item in selectList" :key="item.id" :label="item.id ? item.labelTitle + '[' + item.minValue + ',' + item.maxValue + ')' : item.labelTitle" :value="item.id"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="来源名称：">
          <el-input v-model.trim="relationParam.sourceName" :maxLength="8" class="w400"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-input class="w400" v-model="taskParam.taskId" v-only-num.string="taskParam.taskId" placeholder="任务ID">
            <el-button slot="append" icon="el-icon-search" @click="getTaskList()"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="taskList" border size="small">
        <el-table-column label="" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="relationParam.taskId" @change.native="relationParam.taskId = scope.row.id">&nbsp;</el-radio>
            </template>
        </el-table-column>
        <el-table-column property="id" label="任务ID"></el-table-column>
        <el-table-column property="taskTypeName" label="特权金类型"></el-table-column>
        <el-table-column label="特权金面额">
           <template slot-scope="scope">
             <span v-if="scope.row.taskType === 1 || scope.row.isDistinguish === 2">{{ scope.row.amount | currency }}</span>
             <span v-else>{{ scope.row.newerAmount | currency }},{{ scope.row.olderAmount | currency }}</span>
           </template>
        </el-table-column>
        <el-table-column label="剩余数量">
          <template slot-scope="scope">
             <span v-if="scope.row.taskType === 1 || scope.row.isDistinguish === 2">{{ scope.row.surplus | placeholder('不限量') }}</span>
             <span v-else>{{ scope.row.newerSurplus | placeholder('不限量')}},{{ scope.row.olderSurplus | placeholder('不限量')}}</span>
           </template>
        </el-table-column>
      </el-table>
      <!--分页信息 begin-->
      <div class="align-center ma-t-20" v-if="taskPages>0">
        <el-pagination :current-page.sync="taskParam.pageIndex" @current-change="getTaskList($event)" :page-count="taskPages" background layout="prev, pager, next"></el-pagination>
      </div>
      <div class="align-center ma-t-20">
        <el-button size="small" type="primary" @click="handleRelation">确认关联</el-button>
        <el-button size="small" @click="addRelation = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'list',
    data () {
     return {
      info:{},
      param:{
        pageIndex:1,
        pageSize:20,
        sceneId: this.$route.params.id
      },
      list: [],
      pages:0,
      // 添加关联相关
      defaultDateTime:[],
      addRelation: false,
      relationParam:{ //添加关联的参数
        projectId:'',
        sceneId:'',
        startEffectTime:'',
        endEffectTime:'',
        sourceName:'',
        taskId:'',
        labelId:''
      },
      selectList:[],	// 关联数据标签列表
      // 任务相关
      taskParam:{
        taskId:"",
        status:2,
        pageIndex:1,
        pageSize:20
      },
      taskList:[],
      taskPages:0
     }
    },
    mounted () {
      this.getSceneDetail()
      this.getRelationProjectByPage()
    },
    methods:{
      // 获取场景关联的项目
      getSceneDetail () {
        this.$service.privilege.hook.getSceneDetail({sceneId:this.$route.params.id}).then(res => {
          this.info = res
          this.relationParam.projectId = res.projectId
          this.relationParam.sceneId = res.sceneId
        })
      },
      // 获取场景挂接的任务
      getRelationProjectByPage (pageNow) {
        this.param.pageIndex = pageNow || 1
        this.$service.privilege.hook.getRelationProjectByPage(this.param).then(res => {
          this.pages = res.pages
          this.param.pageIndex = res.pageNum
          this.list = res.list
        })
      },
      // 作废
      handleVoid (id) {
        this.$confirm("你确认作废该场景与该任务的关联？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$service.privilege.hook.cancelRelation({sceneTaskId:id}).then(res => {
            this.getRelationProjectByPage()
          })
        })
      },
      // 初始化关联弹层
      handleAddRelation () {
        this.defaultDateTime = []
        this.relationParam.startEffectTime = ""
        this.relationParam.endEffectTime = ""
        this.relationParam.sourceName = ""
        this.relationParam.taskId = ""
        this.relationParam.labelId = ""
        this.taskParam.taskId = ""
        this.getTaskList()
        this.getSelectList()
        this.addRelation = true
      },
      // 加载特权金任务
      getTaskList (pageNow) {
        this.taskParam.pageIndex = pageNow || 1
        this.$service.privilege.task.getTaskByPage(this.taskParam).then(res => {
          this.taskPages = res.pages
          this.taskParam.pageIndex = res.pageNum
          this.taskList = res.list
        })
      },
      // 保存关联
      handleRelation () {
        if(this.defaultDateTime !== null){
          this.relationParam.startEffectTime = this.$utils.dateToString(this.defaultDateTime[0])
          this.relationParam.endEffectTime = this.$utils.dateToString(this.defaultDateTime[1])
        }
        if(this.relationParam.startEffectTime === "" || this.relationParam.endEffectTime === ""){
          this.$message.warning('请输入关联生效时间');return;
        }
        if(this.relationParam.sourceName === ""){
          this.$message.warning('请输入1-8字来源名称');return;
        }
        if(this.relationParam.taskId === ""){
          this.$message.warning('请关联一个生效中的任务');return;
        }
        this.$service.privilege.hook.saveRelation(this.relationParam).then(res => {
          this.$message.success('关联成功')
          this.addRelation = false
          this.getRelationProjectByPage()
        })
      },
      getSelectList (){
      	this.$service.privilege.hook.selectList().then(res => {
          this.selectList = res
          this.selectList.unshift({
	        	id:'',
	        	labelTitle:'不关联',
	        	minValue:'',
	        	maxValue:''
	        })
        })
      },
      goBack () {
        this.$router.back()
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.fullPath === '/hook') {
        this.$store.commit('setProjectId', this.info.projectId)
      }
      next()
    }
  }
</script>
