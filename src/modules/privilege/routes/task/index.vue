<template>
  <div class="cms">
    <el-card>
      <el-form :inline="true" label-width="100px" size="small">
        <el-form-item label="状态：">
          <el-select v-model="param.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="草稿" :value="1"></el-option>
            <el-option label="生效中" :value="2"></el-option>
            <el-option label="已结束" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务ID：">
          <el-input v-model="param.taskId" v-only-num.string="param.taskId"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="ma-l-15" @click="getTaskList()">查询</el-button>
          <el-button class="ma-l-15" @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">特权金任务(查询出<span class="font-danger"> {{ totalNum }} </span>条)</span>
        <router-link :to="{ path: 'action',append:true }">
          <el-button class="fr" type="primary" size="small">添加</el-button>
        </router-link>
      </div>
      <!-- 表格数据 -->
      <el-table :data="taskList" style="width: 100%" size="small">
        <el-table-column prop="id" label="任务ID"></el-table-column>
        <el-table-column prop="taskTypeName" label="特权金类型"></el-table-column>
        <el-table-column label="是否区分用户">
          <template slot-scope="scope">{{ scope.row.isDistinguishName | placeholder }}</template>
        </el-table-column>
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
        <el-table-column prop="statusName" label="状态"></el-table-column>
        <el-table-column label="最后操作">
          <template slot-scope="scope">
             <span>{{ scope.row.operator }} {{ scope.row.operatTime }}</span>
           </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
             <div v-if="scope.row.status === 1">
              <router-link :to="{ path: 'action',append:true,query:{id:scope.row.id} }">
                <span class="font-blue">编辑</span>
              </router-link>
              <span class="font-success" @click="handleAction(scope.row.id,1)">启用</span>
             </div>
             <div v-else-if="scope.row.status === 2">
              <router-link :to="{ path: 'view/'+scope.row.id,append:true }">
                <span class="font-blue">查看</span>
              </router-link>
               <span class="font-danger" @click="handleAction(scope.row.id,2)">终止</span>
             </div>
             <div v-else>
              <router-link :to="{ path: 'view/'+scope.row.id,append:true }">
                <span class="font-blue">查看</span>
              </router-link>
             </div>
           </template>
        </el-table-column>
      </el-table>

      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="pageChange"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'task',
    data () {
     return {
      param:{
        status:'',
        taskId:'',
        pageIndex:1,
        pageSize:20
      },
      taskList: [],
      pages:0,
      totalNum:0
     }
    },
    mounted(){
      this.getTaskList()
    },
    methods:{
      pageChange (val) {
        this.getTaskList(val)
      },
      getTaskList (pageNow) {
        this.param.pageIndex = pageNow || 1
        this.$service.privilege.task.getTaskByPage(this.param).then(res => {
          this.pages = res.pages
          this.param.pageIndex = res.pageNum
          this.totalNum = res.total
          this.taskList = res.list
        })
      },
      // 重置查询条件
      reset () {
        this.param.status = ""
        this.param.taskId = ''
      },
      // 启用/终止
      handleAction (id,status){
        let tip = status === 1 ? "你确定启用该特权金任务吗？" : "你确认终止该特权金任务吗?"
        this.$confirm(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$service.privilege.task.switchTask({taskId:id,status:status}).then(res => {
            this.getTaskList()
          })
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>
