<template>
  <div class="cms">
	<el-card class="box-card">
  	<!-- 表单 Begin -->
    <el-form ref="form" :model="param" label-width="170px" size="small">
      <el-form-item label="任务名称：">
	    <el-col :span="8"><el-input v-model.trim="taskName" :maxlength="40" @blur="testTaskName" placeholder="请输入1-40字符任务名称" clearable></el-input></el-col>
	  </el-form-item>
	  <el-form-item label="任务完成有效期：">
	    <el-col :span="8">
	    	<el-input v-model="validPeriod" v-only-num="validPeriod" :max-len="2" @blur="testValidPeriod"></el-input>
	    </el-col>
	    <el-col :span="1">&nbsp;天</el-col>
	    <el-col :span="3"><span class="font-info">最长15天</span></el-col>
	  </el-form-item>
	  <el-form-item label="可发起助力用户：">
			<el-checkbox :indeterminate="luanIndeter" label="all" @change="luanAllChange" v-model="luanCheck">全选</el-checkbox>
	    <el-checkbox-group v-model="luanchList" @change="luanChange">
        <el-checkbox label="-1">新用户</el-checkbox>
        <el-checkbox label="0">V</el-checkbox>
  		  <el-checkbox label="1">V1</el-checkbox>
  		  <el-checkbox label="2">V2</el-checkbox>
  		  <el-checkbox label="3">V3</el-checkbox>
  		  <el-checkbox label="4">V4</el-checkbox>
  		  <el-checkbox label="5">V5</el-checkbox>
  		</el-checkbox-group>
	  </el-form-item>
	  <el-form-item label="可参与助力用户：">
	    <el-checkbox :indeterminate="handIndeter" label="all" @change="handAllChange" v-model="handCheck">全选</el-checkbox>
				<el-checkbox-group v-model="handInList" @change="handChange">
					<el-checkbox label="-1">新用户</el-checkbox>
				</el-checkbox-group>
	  </el-form-item>
		<el-form-item label="助力失败副权益用户：">
			<el-checkbox :indeterminate="failIndeter" v-model="failCheck" @change="failAllChange" label="all">全选</el-checkbox>
				<el-checkbox-group @change="failChange" v-model="failInList">
					<el-checkbox label="-1">新用户</el-checkbox>
					<el-checkbox label="0">V</el-checkbox>
					<el-checkbox label="1">V1</el-checkbox>
					<el-checkbox label="2">V2</el-checkbox>
					<el-checkbox label="3">V3</el-checkbox>
					<el-checkbox label="4">V4</el-checkbox>
					<el-checkbox label="5">V5</el-checkbox>
				</el-checkbox-group>
	  </el-form-item>
    </el-form>
    <!-- 表单 End -->
	</el-card>

	<br>
    <!-- 关联权益 Begin -->
    <el-collapse v-model="activeName">
    	<el-collapse-item name="initiateUserRightsList">
    		<template slot="title">
		      <span class="font-blue">发起助力用户完成任务获得权益</span>
		    </template>
    		<el-table :data="initiateUserRightsList" style="width: 100%" size="small" :row-key="getRowKeys" :expand-row-keys="initExpand">
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
			            	<i class="el-icon-caret-top font-danger sortArrow" @click="handleSort(scope.$index, props.row.rightsList, -1)"></i>
			            	<i class="el-icon-caret-bottom font-success sortArrow" @click="handleSort(scope.$index, props.row.rightsList, 1)"></i>
			            </template>
			          </el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			                <a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">查看</a>
			                <el-button type="text" class="font-danger"  @click="deleteTask(scope.$index, props.row.rightsList, 'initiateUserRightsList')">删除</el-button>
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
		      <el-table-column label="权益类型" prop="str" width="200">
		      </el-table-column>
		      <el-table-column label="调整排序" prop="str" width="200">
		      </el-table-column>
		      <el-table-column label="操作" width="200">
		        <template slot-scope="props">
		          <el-button size="mini" @click="addInterest(props.row.rightsList, 'initiateUserRightsList',props.$index)">添加权益</el-button>
							<el-button size="mini" @click="copyInterests(props.row.userType, 'initiateUserRightsList')">复制</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
    	</el-collapse-item>
    	<el-collapse-item name="joinUserRightsList">
    		<template slot="title">
		      <span class="font-blue">参与助力用户成功获得权益</span>
		    </template>
		    <el-table :data="joinUserRightsList" style="width: 100%" size="small" :row-key="getRowKeys" :expand-row-keys="joinExpand">
		      <el-table-column type="expand" width="30">
		        <template slot-scope="props">
			        <el-table :show-header="false"  :data="props.row.rightsList" style="width: 100%">
			          <el-table-column prop="" width="180"></el-table-column>
			          <el-table-column>
			          	<template slot-scope="scope">
			          		<a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">{{scope.row.rightsName}}</a>
			          	</template>
			          </el-table-column>
			          <el-table-column prop="rightsTypeName" width="200"></el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			            	<i class="el-icon-caret-top font-danger sortArrow" @click="handleSort(scope.$index, props.row.rightsList, -1)"></i>
			            	<i class="el-icon-caret-bottom font-success sortArrow" @click="handleSort(scope.$index, props.row.rightsList, 1)"></i>
			            </template>
			          </el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			                <a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">查看</a>
			                <el-button type="text" class="font-danger"  @click="deleteTask(scope.$index, props.row.rightsList, 'joinUserRightsList')">删除</el-button>
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
		      <el-table-column label="权益类型" prop="str" width="200">
		      </el-table-column>
		      <el-table-column label="调整排序" prop="str" width="200">
		      </el-table-column>
		      <el-table-column label="操作" width="200">
		        <template slot-scope="props">
		          <el-button size="mini" @click="addInterest(props.row.rightsList,'joinUserRightsList',props.$index)">添加权益</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
    	</el-collapse-item>
    	<el-collapse-item name="failureRightsList">
    		<template slot="title">
		      <span class="font-blue">助力失败副权益</span>
		    </template>
		    <el-table :data="failureRightsList" style="width: 100%" size="small" :row-key="getRowKeys" :expand-row-keys="failExpand">
		      <el-table-column type="expand" width="30">
		        <template slot-scope="props">
			        <el-table :show-header="false"  :data="props.row.rightsList" style="width: 100%">
			          <el-table-column prop="" width="180"></el-table-column>
			          <el-table-column>
			          	<template slot-scope="scope">
			          		<a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">{{scope.row.rightsName}}</a>
			          	</template>
			          </el-table-column>
			          <el-table-column prop="rightsTypeName" width="200"></el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			            	<i class="el-icon-caret-top font-danger sortArrow" @click="handleSort(scope.$index, props.row.rightsList, -1)"></i>
			            	<i class="el-icon-caret-bottom font-success sortArrow" @click="handleSort(scope.$index, props.row.rightsList, 1)"></i>
			            </template>
			          </el-table-column>
			          <el-table-column width="200">
			            <template slot-scope="scope">
			                <a class="font-blue" target="_blank" :href="'/app/activity/#/boosterPrivilege/detail/'+scope.row.rightsId">查看</a>
			                <el-button type="text" class="font-danger"  @click="deleteTask(scope.$index, props.row.rightsList, 'failureRightsList')">删除</el-button>
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
		      <el-table-column label="权益类型" prop="str" width="200">
		      </el-table-column>
		      <el-table-column label="调整排序" prop="str" width="200">
		      </el-table-column>
		      <el-table-column label="操作" width="200">
		        <template slot-scope="props">
		          <el-button size="mini" @click="addInterest(props.row.rightsList,'failureRightsList',props.$index)">添加权益</el-button>
							<el-button size="mini" @click="copyInterests(props.row.userType, 'failureRightsList')">复制</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
    	</el-collapse-item>
    </el-collapse>
    <!-- 关联权益 End -->
  <!-- 吸底区域 Begin -->
  <suction-bottom @okFn="saveTask" @okFnByDialog="cancelTask">
  	<template>
			<span slot="warning">你确定要离开此页面吗？离开后已编辑得而数据可能面临丢失。</span>
		</template>
  </suction-bottom>
  <!-- 吸底区域 End -->

	  <!-- 选择权益目录 Begin -->
	  <el-dialog :visible.sync="showAddRightDialog" v-if="showAddRightDialog" width="70%">
		  <right-list :isDialog="true" ref="right" :filter-list="usedRightsId" @checkRight="checkRight"></right-list>
		  <div slot="footer" class="dialog-footer align-center">
		  	<el-button type="primary" @click="sureAddRight" size="small">确 定</el-button>
		    <el-button @click="showAddRightDialog = false" size="small">取 消</el-button>
		  </div>
		</el-dialog>
	  <!-- 选择权益目录 End -->
		<!-- 复制权益 -->
	  <el-dialog :visible.sync="showCopyRightDialog" width="300px" title="选择复制对象">
		  <copy-list @sure="setRightsList" :copydata="copyData"></copy-list>
		  <div slot="footer" class="dialog-footer align-center">
		  	<el-button type="primary" @click="copyConfirm" size="small">确 定</el-button>
		    <el-button @click="showCopyRightDialog=false" size="small">取 消</el-button>
		  </div>
		</el-dialog>
	  <!-- 复制权益 -->
  </div>
</template>

<script>
const SuctionBottom = () => import('@/components/panel/suctionBottom')
const RightList = () => import('../boosterPrivilege/list.vue')
const copyList = () => import('./copy.vue')
export default {
  name: 'addBoosterTask',
  data () {
    return {
			activeName: [],
			initExpand: [],
			joinExpand: [],
			failExpand: [],
			getRowKeys(row){
				return row.userType;
			},
			showCopyRightDialog: false, // 是否复制权益
			luanIndeter: false, // 失败权益是否为半选状态
			failIndeter: false, // 新用户权益是否为半选状态
			handIndeter: false,
			failCheck: true, // 失败权益默认全选
			luanCheck: false, // 新用户权益默认为不全选
			handCheck: false,
			luanMap: ["-1", "0", "1", "2", "3", "4", "5"], // 所有的失败权益等级
			failMap: ["-1", "0", "1", "2", "3", "4", "5"], // 默认选中的失败权益等级
			handMap: ["-1"],
      taskName: '', // 任务名称
	    validPeriod: '', // 任务有效期
      luanchList:[], // 可发起助力用户列表
			handInList: [], // 可参与助力用户列表
			failInList: ["-1", "0", "1", "2", "3", "4", "5"],
      initiateUserRightsList: [], // 可发起助力用户权益列表
      joinUserRightsList: [], // 可参与助力用户权益列表
      failureRightsList: [], // 助力失败副权益列表
      roleList:["新用户","V","V1","V2","V3","V4","V5"],
      showAddRightDialog:false,
      checkedRights:[], // 弹框选中的权益
			usedRightsId:[], //已经被使用的权益id
			copyData: [], // 复制权益的数据
			datatype: '', // 当前复制的是哪个数据
			pasteType: -2, // 数据粘贴的位置
			selectedBtn: false // 选中可复制的数据
    }
  },
  components:{
  	SuctionBottom,
		RightList,
		copyList
  },
  watch:{
  	luanchList (newVal,oldVal) {
			this.matchRel(newVal,"initiateUserRightsList")
  	},
  	handInList (newVal,oldVal) {
  		this.matchRel(newVal,"joinUserRightsList")
		},
		failInList (newVal,oldVal) {
  		this.matchRel(newVal,"failureRightsList")
  	}
  },
  computed: {
  	param () {
  		let self = this
  		return {
  			taskName: self.taskName, // 任务名称
	      	validPeriod: self.validPeriod, // 任务有效期
	      	initiateUserRightsList: self.hanlderParam(self.initiateUserRightsList), // 可发起助力用户列表
	      	joinUserRightsList: self.hanlderParam(self.joinUserRightsList), // 可参与助力用户列表
	      	failureRightsList: self.hanlderParam(self.failureRightsList) // 助力失败副权益列表
  		}
  	}
  },
  methods: {
		toggleExpand(target){
			let self = this, arr = [], str;
			switch(target){
				case 'initiateUserRightsList':
					str = 'initExpand';
				break;
				case 'joinUserRightsList':
					str = 'joinExpand';
				break;
				case 'failureRightsList':
					str = 'failExpand';
				break;
			}
			
			self[target].forEach(item => {
				if(item.rightsList.length > 0){
					arr.push(item.userType);
				}
			});
			self[str] = arr;
		},
		toggleCollapse(val){
			if(this[val].length > 0){
				if(this.activeName.indexOf(val) == -1){
					this.activeName.push(val);
				}
			}else{
				if(this.activeName.indexOf(val) > -1){
					this.activeName.splice(this.activeName.indexOf(val), 1);
				}
			}
		},
		copyConfirm(){
			let self = this, obj, index;
			self[self.datatype].forEach((item, i) => {
				if(item.userType == self.selectedBtn.userType){
					obj = [].concat(item.rightsList);
				}
				if(item.userType == self.pasteType){
					index = i;
				}
			});
			if(obj){
				self[self.datatype][index].rightsList = obj;
				this.toggleExpand(self.datatype);
			}
			this.showCopyRightDialog = false;
		},
		setRightsList(opt){
			this.selectedBtn = opt;
		},
		copyInterests(type, str){
			let arr = [], self = this, def, disabled;
			self.pasteType = type;
			self.datatype = str;
			self.showCopyRightDialog = true;
			self.luanMap.forEach((def, i) => {
				disabled = true;
				self[str].forEach((item, k) => {
					if(item.userType == def){
						if(item.rightsList.length > 0 && def != type){
							disabled = false;
						}
					}
				})
				arr.push({
					"userType": self.luanMap[i],
					"userTypeName": self.roleList[i],
					"status": false,
					"disabled": disabled,
					"index": i
				});
			})
			self.copyData = arr;
		},
		failAllChange(value){
			this.failInList = value? this.failMap : [];
			this.failIndeter = false;
		},
		failChange(value){
			let count = value.length;
			this.failCheck = count === this.failMap.length;
			this.failIndeter = count > 0 && count < this.failMap.length;
		},
		luanAllChange(val){ // 可发起助力用户全选
			this.luanchList = val? this.luanMap : [];
			this.luanIndeter = false;
		},
		luanChange(val){// 可发起助力用户单选
			let count = val.length;
			this.luanCheck = count === this.luanMap.length;
			this.luanIndeter = count > 0 && count < this.luanMap.length;
		},
		handAllChange(val){ // 可发起助力用户全选
			this.handInList = val? this.handMap : [];
			this.handIndeter = false;
		},
		handChange(val){// 可发起助力用户单选
			let count = val.length;
			this.handCheck = count === this.handMap.length;
			this.handIndeter = count > 0 && count < this.handMap.length;
		},
  	testTaskName () {
  		if(this.taskName === ""){
  			this.$message.warning('请输入1-40字符任务名称');return false
  		}
  		return true
  	},
  	testValidPeriod () {
  		if(this.validPeriod > 15 || this.validPeriod <1){
  			this.$message.warning('请输入1-15天任务有效期'); return false
  		}
  		return true
  	},
  	makeSame (target) {
  		let self = this
  		let item = self[target][0].rightsList
  		for(let i=0;i<self[target].length;i++){
  			self[target][i].rightsList = item.slice(0)
  		}
  	},
  	handleSort (index,arr,sort) {
  		let targetIndex
	    let self = this
	    if (sort > 0){ // 升序(向下)
	      if (index === arr.length - 1) return
	      targetIndex = index + 1
	    } else {
	      if (index === 0) return
	      targetIndex = index - 1
	    }
	    arr.splice(index, 1, ...arr.splice(targetIndex, 1, arr[index]))
  	},
  	deleteTask (index, arr, target) {
			arr.splice(index,1)
			this.toggleExpand(target);
  	},
  	addInterest (data,target,index) { // todo 请求接口返回数据
  		this.usedRightsId = data.map((item) => {
  			return item.rightsId
  		})
  		this.showAddRightDialog = !this.showAddRightDialog
  		window.localStorage.setItem('target',target)
  		window.localStorage.setItem('$index',index)
  	},
  	matchRel (newVal,targetVal) {
			let self = this, arr = [], rList;
			newVal.forEach((item,index) => {
				rList = [];
				self[targetVal].forEach((tar, i) => {
					if(item == tar.userType){
						rList = tar.rightsList;
					}
				})
				arr.push({
					"userType": item,
					"userTypeName": self.roleList[item*1+1],
					"rightsList": rList,
					"str": ' '
				})
			})
			self[targetVal] = arr;
			this.toggleCollapse(targetVal);
			self.toggleExpand(targetVal);
  		self[targetVal].sort((prev,next) => {
  			return prev.userType - next.userType
  		})
  	},
  	hanlderParam (arr){
  		let copy = JSON.parse(JSON.stringify(arr.slice(0)))
  		for(let i=0;i<copy.length;i++){
  			let item = copy[i]
  			if(item.rightsList){
  				delete item.userTypeName
  				for(let j=0;j<item.rightsList.length;j++){
  					let subItem = item.rightsList[j]
  					item.rightsList[j] = {"rightsId":subItem.rightsId}
  				}
  			}else {
  				copy[i] = {"rightsId":item.rightsId}
  			}
  		}
  		return copy
  	},
  	saveTask () {
  		let self = this
  		if(self.testTaskName() && self.testValidPeriod()) {
  			//校验参与助力用户
  			if(self.luanchList.length === 0) {
  				self.$message.warning("请选择可发起助力目标用户")
  				return
  			}
  			if(self.luanchList.length > 0 && self.initiateUserRightsList.filter((item) => {
  				return item.rightsList.length === 0
  			}).length > 0) {
  				self.$message.warning("请配置发起助力目标用户权益")
  				return
  			}
  			if(self.handInList.length === 0){
  				self.$message.warning("请选择可参与助力目标用户")
  				return
				}
				if(self.handInList.length > 0 && self.joinUserRightsList.filter((item) => {
  				return item.rightsList.length === 0
  			}).length > 0) {
  				self.$message.warning("请配置参与助力目标用户权益")
  				return
  			}
				if(self.failInList.length > 0 && self.failureRightsList.filter((item) => {
  				return item.rightsList.length === 0
  			}).length > 0){
  				self.$message.warning("请配置助力失败目标用户权益")
  				return
  			}
  			this.$service.activity.boosterTask.addTask(this.param).then( res => {
					this.$message.success('保存成功！')
  				this.$router.back()
  			})
  		}
  	},
  	cancelTask () {
  		this.$router.back()
  	},
  	checkRight (arr) {
  		this.checkedRights = arr.slice(0)
  	},
  	sureAddRight () { //确认添加权益到任务的目标用户下
  		let target = window.localStorage.getItem('target')
  		let $index = window.localStorage.getItem('$index')

  		if(this.checkedRights.length === 0){
  			this.$message.warning("请至少勾选一个权益")
  			return
  		}
  		if(target === 'initiateUserRightsList'){
  			this.initiateUserRightsList[$index].rightsList = this.initiateUserRightsList[$index].rightsList.concat(this.checkedRights)
  		}else if(target === 'joinUserRightsList') {
  			this.joinUserRightsList[$index].rightsList = this.joinUserRightsList[$index].rightsList.concat(this.checkedRights)
  		}else if(target === 'failureRightsList'){
				this.failureRightsList[$index].rightsList = this.failureRightsList[$index].rightsList.concat(this.checkedRights)
  		}
  		this.showAddRightDialog = false
			this.checkedRights = []
			this.toggleExpand(target);
  	}
	},
	mounted(){
		this.matchRel(this.failMap, "failureRightsList");
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cms {
  	padding-bottom: 150px;
  }
  .addRight {
  	float:right;
  	margin-top: 10px;
  	margin-right: 20px;
  }
  .line-30{
	line-height: 30px;
  }
  .cms .cms {
  	padding-bottom: 0;
  }
  .align-center {
  	text-align: center;
  }
</style>
