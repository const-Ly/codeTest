<template>
  <div class="cms">
    <el-card class="box-card">
    	<el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="模板名称：">
          <el-input v-model.trim="param.templateName" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="主题名称：">
          <el-input v-model.trim="param.motifName" class="w300"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getTemplateManageList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">模板管理</span>
        <router-link :to="{ path: 'addTemplate',append:true }">
          <el-button class="fr" type="primary" size="small">添加模板</el-button>
        </router-link>
        <el-button class="fr ma-r-10" type="warning" size="small" @click="setBlends">批量设置融合度</el-button>
      </div>
      <!-- 表格数据 -->
      <el-table :data="TemplateList" style="width: 100%" size="small"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="motifName" label="主题名称"></el-table-column>
        <el-table-column prop="templateId" label="模板ID"></el-table-column>
        <el-table-column prop="templateName" label="模板名称"></el-table-column>
        <el-table-column label="融合度">
        	<template slot-scope="scope">{{ scope.row.blend | percentage }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime | placeholder }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否精选">
        	<template slot-scope="scope">
            <span v-if="scope.row.choiceness === 1">是</span>
            <span v-else="">否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
          	<router-link :to="{ path: 'editTemplate/'+scope.row.templateId, append:true }">
		    			<span class="font-blue">编辑</span>
		    		</router-link>
		    		<span class="font-danger ma-l-10" @click="delTemplate(scope.row.templateId)">删除</span>
		    		<span class="font-warning ma-l-10" v-if="scope.row.choiceness === 1" @click="setChoiceness(scope.row.templateId,0)">设为非精选</span>
		    		<span class="font-warning ma-l-10" v-else="scope.row.choiceness === 0" @click="setChoiceness(scope.row.templateId,1)">设为精选</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="pageChange"></el-pagination>
      </div>
    </el-card>
    
    <!-- 批量设置融合度 -->
    <el-dialog :visible.sync="topicSequence" width="50%" title="调整融合度" class="mapBox">
      <el-form ref="form" label-width="150px" size="small">
        <el-form-item label="融合度：">
          <el-input v-model="blend" v-only-num="blend" :max-len="3" class="w100 fl"></el-input>
          <span class="ma-l-10 fl">%</span>
          <span class="ma-l-20 fl font-dark0 ">* 0-100的整数</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button size="small" type="primary" @click="setTopicSequence">提交保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  export default {
  	name: 'templateManage',
    data() {
      return {
      	pages:0,
      	param:{
      		templateName:'',	//模板名称
      		motifName:'',	//主题名称
      		pageSize:20,
          pageIndex:1
      	},
      	TemplateList:[],	//模板列表
      	blend:'',	//批量融合度
      	topicSequence:false,	// 批量融合度弹层
      	checkedList:[],	//选中的信息集合
      }
    },
    methods:{
    	// 查询模板管理列表
	    getTemplateManageList(val) {
        let self = this
        self.param.pageIndex = val || 1
       	self.$service.activity.faceScore.queryTemplateList(self.param).then(res => {
          self.pages = res.pages
          self.param.pageIndex = res.pageNum
          self.TemplateList = res.list
       	})
	    },
      pageChange (val) {
        this.getTemplateManageList(val)
      },
			// 删除模板
      delTemplate (templateId){
      	let self = this
      	self.$confirm('你确认要删除该模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	self.$service.activity.faceScore.deleteTemplate({templateId:templateId}).then(res => {
	          self.$message.success("删除成功")
	          self.getTemplateManageList()
	       	})
        })
      },
      // 设置精选/非精选
      setChoiceness(id,type) {
        let self = this
      	self.$service.activity.faceScore.updateTemplate({
      		templateId:id,
      		choiceness:type
      	}).then(res => {
          self.getTemplateManageList()
       	})
      },
      //选择的商品信息
      handleSelectionChange (arr) {
        this.checkedList = arr.map(item => {
          return item.templateId
        })
      },
      // 调起设置融合度弹层
      setBlends(){
      	if(this.checkedList.length === 0){
          this.$message.warning("至少选择一行记录")
        }else {
          this.topicSequence = true
        }
      },
      // 批量设置融合度
      setTopicSequence() {
        let self = this
        self.topicSequence = false
        if(self.blend === ''){
        	self.$message.warning("请输入融合度")
      		self.blend = ''
        	return
        }
        if(self.blend > 100){
        	self.$message.warning("请输入0-100的整数融合度")
      		self.blend = ''
        	return
        }
      	self.$service.activity.faceScore.batchUpdateTemplate({
      		templateIdList:self.checkedList,
      		blend:self.blend
      	}).then(res => {
          self.getTemplateManageList()
       	})
      	self.blend = ''
      },
    },
    mounted () {
      this.getTemplateManageList()
    }
  }
</script>
<style type="text/css" scoped>
	.ma-r-10{ margin-right: 10px;}
</style>
