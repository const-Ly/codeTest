<template>
  <div class="cms">
    <el-card class="box-card">
    	<el-form inline class="demo-form-inline" size="small">
  	  	<el-form-item class="_width">
  	  		<el-select  v-model="rightsType">
  			    <el-option v-for="item in rightsTypeList" :key="item.value" :label="item.label" :value="item.value">
  			    </el-option>
  			</el-select>
  		</el-form-item>
  		<el-form-item class="_width">
  			<el-select  v-model="skuStatus">
  			    <el-option v-for="item in skuStatusList" :key="item.value" :label="item.label" :value="item.value">
  			    </el-option>
  			</el-select>
  		</el-form-item>
			<el-form-item class="_width">
  			<el-select  v-model="rightsStatus">
  			    <el-option v-for="item in rightsStatusList" :key="item.value" :label="item.label" :value="item.value">
  			    </el-option>
  			</el-select>
  		</el-form-item>
			<el-form-item class="_width">
  			<el-select  v-model="selectType">
  			    <el-option v-for="item in selectTypeList" :key="item.val" :label="item.label" :value="item.val">
  			    </el-option>
  			</el-select>
  		</el-form-item>
  		<el-form-item>
  			<el-input :placeholder="selectType===1?'请输入权益名称':'请输入SKUID'" v-model.trim="selectText" maxLength="50">
  			  <el-button slot="append" @click="searchRights()">搜索</el-button>
  			</el-input>
  		</el-form-item>
  		<el-form-item class="right" v-if="!isDialog">
  			<el-button type="primary"  @click="addRights">添加权益</el-button>
  		</el-form-item>
    	</el-form>
    	<el-table :data="rightsList"  border style="width: 100%" size="small" @selection-change="handleSelectionChange">
  	  	<el-table-column type="selection" width="60" v-if="isDialog"></el-table-column>
  	    <el-table-column prop="rightsId" label="权益ID"></el-table-column>
  	    <el-table-column label="权益名称">
          <template slot-scope="prop">
            <span v-if="isDialog">{{prop.row.rightsName}}</span>
            <router-link v-else class="font-blue" :to="{ path: 'detail/'+prop.row.rightsId,append:true }">{{prop.row.rightsName}}</router-link>
          </template>
        </el-table-column>
  	    <el-table-column v-if="!isDialog" prop="rightsStatusName" label="权益状态"></el-table-column>
				<el-table-column v-if="!isDialog" label="商品名称">
          <template slot-scope="prop">
						<a class="font-blue" :href="'http://www.biyao.com/products/'+prop.row.skuId+'-0.html'" target="_blank">{{prop.row.spuName}}</a>
          </template>
        </el-table-column>
  	    <el-table-column prop="createTime" label="创建时间"></el-table-column>
  	    <el-table-column prop="createBy" label="创建人"></el-table-column>
  	    <el-table-column prop="skuId" label="SUID"></el-table-column>
  	    <el-table-column prop="rightsTypeName" label="权益类型"></el-table-column>
  	    <el-table-column prop="rightsContent" label="权益内容"></el-table-column>
  	    <el-table-column prop="skuStatusName" label="su状态"></el-table-column>
				<el-table-column v-if="!isDialog" label="关联任务">
          <template slot-scope="prop">
            <span v-if="prop.row.isRelation===1" class="font-blue" @click="relationInfo(prop.row.rightsId)">查看</span>
						<span v-else>--</span>
          </template>
        </el-table-column>
				<el-table-column v-if="!isDialog" prop="rightsIssueLimist" label="剩余可发数量"></el-table-column>
				<el-table-column v-if="!isDialog" label="最近更新">
          <template slot-scope="prop">	
						<span v-if="!prop.row.updateBy">--</span>
            <span v-else>{{prop.row.updateBy}}<br/>{{prop.row.updateTime}}</span>
          </template>
        </el-table-column>
				<el-table-column v-if="!isDialog" label="操作">
          <template slot-scope="prop">
            <span class="font-blue" @click="copy(prop.row.rightsId)">复制</span>
            <span v-if="[0,2].indexOf(prop.row.rightStatus)>=0" class="font-blue" @click="updateTotalShow(prop.row.rightsId,prop.row.rightsIssueTotal)">修改权益发放总数</span>
          </template>
        </el-table-column>
    	</el-table>
    	<div class="cms-pagination">
    		<el-pagination background layout="prev, pager, next" :current-page="page.pageIndex" :page-count="page.pages" @current-change="pageChange"></el-pagination>
    	</div>
    </el-card>
		<!-- 查看关联任务 -->
    <el-dialog title="关联任务" :visible.sync="showRelation" width="40%">
      <div class="tab_cont">
        <el-table :data="taskList"  border style="width: 100%" size="small">
					<el-table-column prop="taskConfigId" label="任务ID"></el-table-column>
					<el-table-column prop="taskName" label="任务名称"></el-table-column>
					<el-table-column prop="createTime" label="添加时间"></el-table-column>
					<el-table-column prop="statusName" label="状态"></el-table-column>
				</el-table>
				<div class="cms-pagination">
					<el-pagination background layout="prev, pager, next" :current-page="taskPage.pageNum" :page-count="taskPage.pages" @current-change="updateRelationInfo"></el-pagination>
				</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showRelation=false">关 闭</el-button>
      </span>
    </el-dialog>
		<!-- 修改权益发放总数 -->
    <el-dialog title="修改权益发放总数" :visible.sync="showUpdateTotal" width="40%">
      <div>
				<el-form ref="form" label-width="180px" size="small">
					<el-form-item label="权益发放总数：">
						<el-col :span="12">
							<el-input v-model.trim="totalAfter" v-only-num="totalAfter" :maxLength="8"></el-input>
							<br/><span class="font-gray">注：只能增加数量</span>
						</el-col>
					</el-form-item>
				</el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="updateTotal">提 交</el-button>
        <el-button size="small" @click="showUpdateTotal=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'privilegeList',
  data () {
  	return {
  		rightsType:-1,
  		rightsTypeList:[{'value':-1,'label':'全部'},{'value':1,'label':'x元购'},{'value':2,'label':'0.a份碎片'},{'value':3,'label':'b份分割'}],
  		skuStatus:-1,
			skuStatusList:[{'value':-1,'label':'全部'},{'value':1,'label':'有效'},{'value':0,'label':'无效'}],
			rightsStatus:-1,
			rightsStatusList:[{'value':-1,'label':'全部'},{'value':0,'label':'未生效'},{'value':1,'label':'已生效'},{'value':2,'label':'已失效'},{'value':3,'label':'已作废'}],
			selectType:1,
			selectTypeList:[{'val':1,'label':'权益名称'},{'val':2,'label':'SKUID'}],
			selectText:'',
  		rightsList:[],	// 权益list
  		taskList:[],		// 任务list
  		page:{
  			pageIndex:1,
  			pages:0
			},
			taskPage:{
				pageIndex:1,
  			pages:0
			},
			_rightsId:0,			// 操作id	
			totalBefore:0,		// 修改权益发放总数 修改前
			totalAfter:0,			// 修改权益发放总数 修改后
			showRelation: false,		// 是否显示关联任务列表弹层
			showUpdateTotal: false	// 是否显示修改权益发放总数弹层
  	}
  },
  props:{
  	isDialog:{
  		type:Boolean,
  		default:false
  	},
  	filterList:{
  		type:Array,
  		default () {
  			return []
  		}
  	}
  },
  computed:{
  	param () {
			let self = this
  		return {
  			pageIndex:self.page.pageIndex,
  			pageSize:20,
  			rightsType:self.rightsType,
				skuStatus:self.skuStatus,
				rightsStatus:self.rightsStatus,
  			rightsName:self.selectType===1 ? self.selectText : '',
  			skuId:self.selectType===2 ? self.selectText : '',
  			notIncludeIdList:self.filterList.join(',')
  		}
  	}
  },
  mounted () {
  	this.searchRights()
  },
  methods:{
  	handleSelectionChange(val) {
       this.$emit('checkRight',val)
    },
    pageChange (pageIndex) {
    	this.searchRights(pageIndex)
    },
    searchRights (pageIndex) {
    	let self = this
			self.page.pageIndex = pageIndex || 1
    	self.$service.activity.boosterRight.getRightsList(self.param).then( res => {
    		self.page.pageIndex = res.pageNum
    		self.page.pages = res.pages
				self.rightsList = res.list || []
    	})
		},
		// 查看任务列表
		relationInfo (id, pageIndex) {
			let self = this
			let param = {
				rightsConfigId:id,
				pageIndex:pageIndex || 1,
				pageSize:20
			}
			self._rightsId = id
			self.$service.activity.boosterRight.getTaskList(param).then( res => {
				self.taskPage.pageIndex = res.pageNum
				self.taskPage.pages = res.pages
				self.taskList = res.list || []
				self.showRelation = true
    	})
		},
		// 任务列表翻页专用
		updateRelationInfo (pageIndex) {
			this.relationInfo(this._rightsId, pageIndex)
		},
		// 复制
		copy (id) {
			let self = this
			self.$service.activity.boosterRight.copy({rightsConfigId:id}).then( res => {
    		self.searchRights()
    	})
		},
		// 显示 “修改权益发放总数” 弹层
		updateTotalShow (id, total) {
			this._rightsId = id
			this.totalAfter = total
			this.totalBefore = total
			this.showUpdateTotal = true
		},
		// 修改权益发放总数
		updateTotal () {
			let self = this
			let param = {}
			if (self.totalAfter<=self.totalBefore) {
  			self.$message.warning("总数必须大于原数量！")
  			return
			} else {
  			self.$service.activity.boosterRight.updateTotal({
					rightsConfigId: self._rightsId,
					rightsIssueTotal: self.totalAfter
				}).then( res => {
					self.searchRights()
					self.showUpdateTotal = false
				})
  		}
		},
    addRights () {
    	this.$emit('add')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cms-pagination {
  	text-align: center;
  	margin-top: 20px;
  }
  .right {
  	float: right;
  }
	._width {
		width: 120px;
	}
	.tab_cont {
		max-height: 350px;
		overflow: auto;
	}
	.font-gray {
		color: #dcdfe6;
	}
</style>
