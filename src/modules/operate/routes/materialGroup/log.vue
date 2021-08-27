<template>
  <div class="cms">
    <el-card class="box-card ma-t-10">
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%">
				<el-table-column label="操作人" prop="operator"></el-table-column>
				<el-table-column label="操作时间" prop="updateTime"></el-table-column>
		    <el-table-column label="操作" width="130">
		    	<template slot-scope="scope">
						<span class="font-blue" @click="openInfo(scope.row.id)">详情</span>
          </template>
		    </el-table-column>
	    </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
		</el-card>
		
		<!-- 弹框 -->
    <el-dialog :title="'素材组详情（素材组编号：'+ groupInfo.code +'）'" :visible.sync="infoAlert">
			<div class="alert-box">
				<material-info :groupInfo="groupInfo" :groupList="groupList" :flag="false"></material-info>
			</div>
		</el-dialog>
  </div>
</template>
<script type="text/javascript">
	import materialInfo  from '../components/materialInfo'

  export default {
		name: 'log',
		data() {
			return {
				param:{
					groupId: this.$route.params.id,
					pageIndex: 1,
					pageSize: 20
				},
				list:[],
				pages:0,
				infoAlert: false,
				groupInfo: {
					code: null,
					name: '',   // 名称
					scope: '',  // 范围
					desc: ''    // 描述
				},
				groupList: []
			}
		},
		components:{
			materialInfo
		},
		methods:{
			getList (idx) {
				this.param.pageIndex = idx || 1
				this.$service.operate.material.contentLog(this.param).then(res => {
					this.param.pageIndex = res.pageNum
					this.pages = res.pages
					this.list = res.list
				})
			},
			openInfo (id) {
				this.$service.operate.material.contentSnapshot({id}).then(res => {
					this.groupInfo.code = res.code
					this.groupInfo.name = res.name
					this.groupInfo.scope = res.scope
					this.groupInfo.desc = res.desc
					this.groupList = res.group.map(item => {
						if (item.conf.rule) {
							item.conf.rule = typeof item.conf.rule === 'string' ? JSON.parse(item.conf.rule) : item.conf.rule;
							if (item.type === '01') {
								item.conf.data = +item.conf.data;
							}
						}
            return item;
          })
					this.infoAlert = true
				})
			}
		},
		mounted () {
			this.getList()
		}
  }
</script>
<style type="text/css" scoped>
	.btn{ margin: 5px 5px 0 0; }
</style>
