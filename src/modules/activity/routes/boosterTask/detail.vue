<template>
  <div class="cms">

  	<el-card class="box-card">
	  	<!-- 表单 Begin -->
	    <el-form label-width="150px">
	      <el-form-item label="助力ID：">
		    <span v-text="detail.taskId"></span>
		  </el-form-item>
	      <el-form-item label="任务名称：">
		    <span v-text="detail.taskName"></span>
		  </el-form-item>
		  <el-form-item label="任务完成有效期：">
		    <el-col :span="1" class="align-center"><span v-text="detail.validPeriod"></span></el-col>
		     <el-col :span="1">&nbsp;天</el-col>
		    <el-col :span="3"><span class="font-info">最长15天</span></el-col>
		  </el-form-item>
		  <el-form-item label="可发起助力用户：">
		    <span v-for="(item,key) in launchList" v-text="item" :key="key" class="ma-r-20"></span>
		  </el-form-item>
		  <el-form-item label="可参与助力用户：">
		    <span v-for="(item,key) in handInList" v-text="item" :key="key" class="ma-r-20"></span>
		  </el-form-item>
      <el-form-item label="助力失败副权益用户">
		    <span v-for="(item,key) in failInList" v-text="item" :key="key" class="ma-r-20"></span>
		  </el-form-item>
	    </el-form>
	    <!-- 表单 End -->
	</el-card>
	<br>
    <!-- 关联权益 Begin -->
    <el-collapse v-model="activeName">
    	<el-collapse-item name="1">
    		<template slot="title">
		      <span class="font-blue">发起助力用户完成任务获得权益</span>
		    </template>
    		<el-table :data="detail.initiateUserRightsList" style="width: 100%" size="small" :row-key="getRowKeys" :expand-row-keys="initExpands">
		      <el-table-column type="expand" width="30">
		        <template slot-scope="props">
			        <el-table size="small" :show-header="false" :data="props.row.rightsList" style="width: 100%">
			          <el-table-column prop="" width="180"></el-table-column>
			          <el-table-column>
			          	<template slot-scope="scope">
			          		<a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">{{scope.row.rightsName}}</a>
			          	</template>
			          </el-table-column>
			          <el-table-column prop="rightsTypeName" width="200"></el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			                <a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">查看</a>
			            </template>
			          </el-table-column>
			        </el-table>
		        </template>
		      </el-table-column>
		      <el-table-column label="目标用户" prop="userTypeName" width="150">
		      </el-table-column>
		      <el-table-column label="权益名称">
		      	<template slot-scope="props">
		          	<span class="font-danger" v-if="props.row.rightsList.length === 0">待添加</span>
		        </template>
		      </el-table-column>
		      <el-table-column label="权益类型" width="200">
		      </el-table-column>
		      <el-table-column label="操作" width="200"></el-table-column>
		    </el-table>
    	</el-collapse-item>
    	<el-collapse-item name="2">
    		<template slot="title">
		      <span class="font-blue">参与助力用户成功获得权益</span>
		    </template>
		    <el-table :data="detail.joinUserRightsList" style="width: 100%" size="small" :row-key="getRowKeys" :expand-row-keys="joinExpands">
		      <el-table-column type="expand" width="30">
		        <template slot-scope="props">
			        <el-table size="small" :show-header="false" :data="props.row.rightsList" style="width: 100%">
			          <el-table-column prop="" width="180"></el-table-column>
			          <el-table-column>
			          	<template slot-scope="scope">
			          		<a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">{{scope.row.rightsName}}</a>
			          	</template>
			          </el-table-column>
			          <el-table-column prop="rightsTypeName" width="200"></el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			                <a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">查看</a>
			            </template>
			          </el-table-column>
			        </el-table>
		        </template>
		      </el-table-column>
		      <el-table-column label="目标用户" prop="userTypeName" width="150">
		      </el-table-column>
		      <el-table-column label="权益名称">
		      	<template slot-scope="props">
		          	<span class="font-danger" v-if="props.row.rightsList.length === 0">待添加</span>
		        </template>
		      </el-table-column>
		      <el-table-column label="权益类型" width="200">
		      </el-table-column>
		      <el-table-column label="操作" width="200"></el-table-column>
		    </el-table>
    	</el-collapse-item>
    	<el-collapse-item name="3">
    		<template slot="title">
		      <span class="font-blue">助力失败副权益</span>
		    </template>
		    <el-table :data="detail.failureRightsList" style="width: 100%" size="small" :row-key="getRowKeys" :expand-row-keys="failExpands">
		      <el-table-column type="expand" width="30">
		        <template slot-scope="props">
			        <el-table size="small" :show-header="false" :data="props.row.rightsList" style="width: 100%">
			          <el-table-column prop="" width="180"></el-table-column>
			          <el-table-column>
			          	<template slot-scope="scope">
			          		<a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">{{scope.row.rightsName}}</a>
			          	</template>
			          </el-table-column>
			          <el-table-column prop="rightsTypeName" width="200"></el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			                <a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">查看</a>
			            </template>
			          </el-table-column>
			        </el-table>
		        </template>
		      </el-table-column>
          <el-table-column label="目标用户" prop="userTypeName" width="150">
		      </el-table-column>
		      <el-table-column label="权益名称">
		      	<template slot-scope="props">
		          	<span class="font-danger" v-if="props.row.rightsList.length === 0">待添加</span>
		        </template>
		      </el-table-column>
		      <el-table-column label="权益类型" width="200">
		      </el-table-column>
		      <el-table-column label="操作" width="200"></el-table-column>
	      </el-table>
    	</el-collapse-item>
    </el-collapse>
    <!-- 关联权益 End -->

    <!-- 吸底区域 Begin -->
    <suction-bottom :showOk="false">
    </suction-bottom>
	<!-- 吸底区域 End -->
  </div>
</template>

<script>
const SuctionBottom = () => import('@/components/panel/suctionBottom')
export default {
  name: 'boosterTaskDetail',
  data () {
    return {
			activeName: [],
			initExpands: [],
			joinExpands: [],
			failExpands: [],
			getRowKeys(row){
				return row.userType;
			},
      detail: {
      	"taskId":"",
      	"taskName":"",
      	"validPeriod":"",
      	"initiateUserRightsList":[],
      	"joinUserRightsList":[],
      	"failureRightsList":[]
      }
    }
  },
  created () {
  	this.$service.activity.boosterTask.taskDetail({taskId:this.$route.params.id}).then(res => {
			this.detail = Object.assign({},res)
			this.toggleExpand('initiateUserRightsList', 'initExpands');
			this.toggleExpand('joinUserRightsList', 'joinExpands');
			this.toggleExpand('failureRightsList', 'failExpands');
			this.toggleCollapse();
  	})
  },
  components:{
  	SuctionBottom
  },
  computed: {
  	launchList () {
  		return this.detail.initiateUserRightsList.map(item => item.userTypeName)
  	},
  	handInList () {
  		return this.detail.joinUserRightsList.map(item => item.userTypeName)
		},
		failInList () {
			return this.detail.failureRightsList.map(item => item.userTypeName)
		}
  },
	methods: {
		toggleExpand(target, exp){
			let self = this, arr = [];
			self.detail[target].forEach(item => {
				arr.push(item.userType);
			});
			self[exp] = arr;
		},
		toggleCollapse(){
				let arr = [], detail = this.detail;
			if(detail.initiateUserRightsList.length > 0){
				arr.push('1');
			}
			if(detail.joinUserRightsList.length > 0){
				arr.push('2');
			}
			if(detail.failureRightsList.length > 0){
				arr.push('3');
			}
			this.activeName =  arr;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cms {
  	padding-bottom: 150px;
  }
  .ma-r-20 { margin-right: 20px }
</style>
