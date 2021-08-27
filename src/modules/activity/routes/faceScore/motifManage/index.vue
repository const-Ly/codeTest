<template>
  <div class="cms">
    <el-card class="box-card">
    	<el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="主题名称：">
          <el-input v-model.trim="param.motifName" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="主题性别：">
          <el-select v-model="param.motifGender" class="w200">
            <el-option label="全部" :value=0></el-option>
            <el-option label="男" :value=1></el-option>
            <el-option label="女" :value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getMotifManageList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">主题管理</span>
        <router-link :to="{ path: 'addMotif',append:true }">
          <el-button class="fr" type="primary" size="small">添加主题</el-button>
        </router-link>
        <el-button class="fr ma-r-10" type="warning" size="small" @click="getTopicSequenceList">调整主题序号</el-button>
      </div>
      <!-- 表格数据 -->
      <el-table :data="motifManageList" style="width: 100%" size="small">
        <el-table-column prop="ordinal" label="序号"></el-table-column>
        <el-table-column prop="motifId" label="主题ID"></el-table-column>
        <el-table-column prop="motifName" label="主题名称"></el-table-column>
        <el-table-column prop="motifGenderName" label="主题性别"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime | placeholder }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
          	<router-link :to="{ path: 'editMotif/'+scope.row.motifId, append:true }">
		    			<span class="font-blue">编辑</span>
		    		</router-link>
		    		<span class="font-danger ma-l-10" @click="delMotif(scope.row.motifId)">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="pageChange"></el-pagination>
      </div>
    </el-card>
    
    <!-- 调整主题序号 -->
    <el-dialog :visible.sync="topicSequence" width="50%" title="调整主题序号" class="mapBox">
      <el-table :data="topicSequenceList" style="width: 100%" size="small" class="max-h600">
        <el-table-column prop="ordinal" label="序号"></el-table-column>
        <el-table-column prop="motifName" label="主题名称"></el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime | placeholder }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调整优先级" width="120">
          <template slot-scope="scope">
          	<i class="el-icon-caret-top pa-10 cursor-pointer" @click="toTop(scope.row,scope.$index)"></i>
          	<i class="el-icon-caret-bottom pa-10 cursor-pointer " @click="toBottom(scope.row,scope.$index)"></i>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" >
        <el-button size="small" type="primary" @click="savegMotifs">提交保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  export default {
  	name: 'motifManage',
    data() {
      return {
      	pages:0,
      	param:{
      		motifName:'',	//主题名称
      		motifGender:0,	// 主题性别(0全部1男2女)
      		pageSize:20,
          pageIndex:1
      	},
      	motifManageList:[],	//主题列表
      	topicSequence:false,	//主题序号列表弹层
      	topicSequenceList:[]	//主题序号列表
      }
    },
    methods:{
    	// 查询主题管理列表
	    getMotifManageList(val) {
        let self = this
        self.param.pageIndex = val || 1
       	self.$service.activity.faceScore.queryTopicList(self.param).then(res => {
          self.pages = res.pages
          self.param.pageIndex = res.pageNum
          self.motifManageList = res.list
       	})
	    },
      pageChange (val) {
        this.getMotifManageList(val)
      },
			// 删除
      delMotif (motifId){
      	let self = this
      	self.$confirm('你确认要删除该主题及该主题下的模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	self.$service.activity.faceScore.deleteTopic({motifId:motifId}).then(res => {
	          self.$message.success("删除成功")
	          self.getMotifManageList()
	       	})
        })
      },
      // 查询主题序号列表
      getTopicSequenceList() {
        let self = this
      	self.$service.activity.faceScore.queryTopicSequenceList().then(res => {
          self.topicSequenceList = res
          self.topicSequence = true
       	})
      },
      swapArray(arr, idx1, idx2) {
			   arr[idx1] = arr.splice(idx2, 1, arr[idx1])[0];
			    return arr;
			},
      // 向上调整主题序号
      toTop(row,idx) {
        if(idx !== 0){
        	this.swapArray(this.topicSequenceList, idx, idx-1);
        }
      },
      // 向下调整主题序号
      toBottom(row,idx) {
        if(idx !== this.topicSequenceList.length - 1){
        	this.swapArray(this.topicSequenceList, idx, idx+1);
        }
      },
	  	savegMotifs() {
        let self = this
        if(self.topicSequenceList.length === 0){
        	self.topicSequence = false
        	return false
        }
        let motifs = []
        self.topicSequenceList.forEach(function(item){
        	motifs.push(item.motifId)
        })
        self.topicSequence = false
        self.$service.activity.faceScore.saveTopicSequenceList({motifIdList:motifs}).then(res => {
          self.$message.success("提交成功")
          this.getMotifManageList(1)
       	})
      }
    },
    mounted () {
      this.getMotifManageList()
    }
  }
</script>
<style type="text/css" scoped>
	.ma-r-10{ margin-right: 10px;}
	.max-h600{ max-height: 300px; overflow-y: auto;}
	.max-h600.el-table::before{ height: 0; overflow: hidden;}
	.pa-10{ padding: 10px;}
</style>
