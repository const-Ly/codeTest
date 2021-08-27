<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form inline class="demo-form-inline">
        <el-button class="right mar-b28" type="primary" size="small" @click="openDialog(null,'addProject')">添加项目</el-button>
      </el-form>
	    <el-table :data="list" style="width:100%"  :default-expand-all="true">
	      <el-table-column type="expand" width="40">
	        <template slot-scope="props">
	          <el-table :data="props.row.sceneInfoList" :show-header="false" style="width: 100%">
              <el-table-column width="190">
              	<template slot-scope="scope">
                  <span></span>
  	            </template>
              </el-table-column>
              <el-table-column prop="sceneName"></el-table-column>
              <el-table-column prop="sceneIdentify"></el-table-column>
              <el-table-column prop="enabledName"></el-table-column>
              <el-table-column>
  	            <template slot-scope="scope">
                  <span class="font-blue" @click="openDialog(scope.row,'operatorDialog')">弹层</span>&nbsp;&nbsp;&nbsp;
                  <span v-if="scope.row.enabled===0" class="font-blue"  @click="switchScene(scope.row)">开启</span>
                  <span v-else class="font-blue"  @click="switchScene(scope.row)">关闭</span>
  	            </template>
              </el-table-column>
            </el-table>
	        </template>
	      </el-table-column>
		    <el-table-column label="项目名称" prop="projectName" width="150"></el-table-column>
		    <el-table-column label="应用场景">
		    	<template slot-scope="scope">
            <span></span>
          </template>
		    </el-table-column>
		    <el-table-column label="场景标识">
		    	<template slot-scope="scope">
            <span></span>
          </template>
		    </el-table-column>
		    <el-table-column label="是否开启">
		    	<template slot-scope="scope">
            <span></span>
          </template>
		    </el-table-column>
	      <el-table-column label="操作">
	        <template slot-scope="scope">
	          <el-button size="mini" type="primary" @click="openDialog(scope.row,'addScene')">添加场景</el-button>
	        </template>
	      </el-table-column>
	    </el-table>
    </el-card>

    <el-dialog :title="dialogTit" :visible.sync="publicDialog" width="40%">
      <el-form ref="form" label-width="120px" size="small">
        <div v-if="dialogType==='addProject'"><!-- 添加项目 -->
        	<el-form-item label="项目名称：">
	          <el-input v-model.trim="projectName" :maxlength="20"></el-input>
	        </el-form-item>
        </div>
        <div v-else-if="dialogType==='addScene'"><!-- 添加场景-->
	        <el-form-item label="场景名称：">
	          <el-input v-model.trim="sceneParm.sceneName" :maxlength="20"></el-input>
	        </el-form-item>
	        <el-form-item label="场景标识：">
	          <el-input v-model.trim="sceneParm.sceneIdentify" :maxlength="20"></el-input>
	        </el-form-item>
        </div>
        <div v-else-if="dialogType==='operatorDialog'"><!-- 项目弹层文案编辑 -->
	        <el-form-item label="弹层信息描述：">
	          <el-input v-model.trim="maskParm.maskDesc" :maxlength="40"></el-input>
	        </el-form-item>
	        <el-form-item label="取消按钮：">
	          <el-input v-model.trim="maskParm.maskCancelDesc" :maxlength="4"></el-input>
	        </el-form-item>
	        <el-form-item label="确认按钮：">
	          <el-input v-model.trim="maskParm.maskConfirmDesc" :maxlength="4"></el-input>
	        </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitDialog">提 交</el-button>
        <el-button size="small" @click="publicDialog=false">返 回</el-button>
      </span>
      <p class="font-danger">{{dialogFooter}}</p>
    </el-dialog>

  </div>
</template>

<script>
export default {
	name:"projectMount",
  data () {
    return {
      list: [],
			dialogTit: '',	//弹层标题
			publicDialog: false,	// 公用弹层
			dialogType: '',		// 用来判断调用类型 。  addProject：添加项目，addScene：添加场景，operatorDialog：项目弹层文案编辑
			dialogFooter:'',	// 弹层底部提示
			projectId: '',
			projectName: '',	// 项目名称
			sceneParm: {	// 添加场景参数
				sceneName: '',
				sceneIdentify: ''
			},
			maskParm: {
        maskDesc:"",
        maskCancelDesc:"",
        maskConfirmDesc:""
      }	// 项目弹层文案编辑参数
    }
  },
  computed: {
    sceneParam () {
  		let self = this
      return {
      	sceneName: self.sceneParm.sceneName,	
				sceneIdentify: self.sceneParm.sceneIdentify,
				projectId: self.projectId
      }
    }
  },
  methods:{
    getList() {
      this.$service.activity.appActiveRights.getProjectAndScene().then(res => {
        this.list = res
      })
    },
    /* 调起dialog对话框 */
    openDialog(row,dialogType){		// dialogType:用来判断调用类型 。  addProject：添加项目，addScene：添加场景，operatorDialog：项目弹层文案编辑 
    	let self = this
    	self.dialogType = dialogType
    	if(dialogType === 'addProject'){
    		self.dialogTit = '添加项目'
    		self.projectName = ''
    		self.dialogFooter = '信息一旦提交成功，无法更改删除，请谨慎操作。'
    	}else if(dialogType === 'addScene'){
    		self.dialogTit = '添加场景'
        self.sceneParm.sceneName = ''
        self.sceneParm.sceneIdentify = ''
    		self.projectId = row.id
    		self.dialogFooter = '信息一旦提交成功，无法更改删除，请谨慎操作。'
    	}else if(dialogType === 'operatorDialog'){
    		self.$service.activity.appActiveRights.getSceneMask({sceneId:row.id}).then(res => {
	        self.maskParm = res
	    		self.dialogTit = '项目弹层文案编辑'
	    		self.dialogFooter = ''
		    })
    	}
      self.publicDialog = true
    },
    /* 对话框内容提交 */
    submitDialog() {
    	let self = this
      let reg = new RegExp('^[a-zA-Z0-9]{1,20}$')	// 限制英文数字1-20字
    	if(self.dialogType === 'addProject'){	// 	添加项目
    		if (self.projectName === "") {
	        self.$message.warning('请输入项目名称')
	        return false
	      }
				self.$service.activity.appActiveRights.addProject({projectName:self.projectName}).then(res => {
	        self.publicDialog = false
	        self.$message.success("提交成功")
	        self.getList()
	      })
    	}else if(self.dialogType === 'addScene'){	// 添加场景
    		if (self.sceneParm.sceneName === "") {
	        self.$message.warning('请输入场景名称')
	        return false
	      }
    		if (self.sceneParm.sceneIdentify === "") {
	        self.$message.warning('请输入场景标识')
	        return false
	      }
    		if (!reg.test(self.sceneParm.sceneIdentify)) {
	        self.$message.warning('请输入英文数字场景标识')
	        return false
	      }
	      self.$service.activity.appActiveRights.addScene(self.sceneParam).then(res => {
	        self.publicDialog = false
	        self.$message.success("提交成功")
	        self.getList()
	      })
    	}else if(self.dialogType === 'operatorDialog'){	// 项目弹层文案编辑
    		if (self.maskParm.maskDesc === "") {
	        self.$message.warning('请输入弹层信息描述')
	        return false
	      }
    		if (self.maskParm.maskCancelDesc === "") {
	        self.$message.warning('请输入取消按钮')
	        return false
	      }
    		if (self.maskParm.maskConfirmDesc === "") {
	        self.$message.warning('请输入确认按钮')
	        return false
	     }
    		self.$service.activity.appActiveRights.saveSceneMask(self.maskParm).then(res => {
	        self.publicDialog = false
	        self.$message.success("提交成功")
	      })
    	}
    },
    /* 开启关闭场景 */
    switchScene(row) {
    	let self = this
    	// 0关闭，1开启
    	let hint = row.enabled === 0 ? '你确认开启该场景挂接“APP激活权益金”吗？' : '你确认关闭该场景挂接“APP激活权益金”吗？'
    	this.$confirm( hint , '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.$service.activity.appActiveRights.switchScene({
	    		id : row.id,
	    		enabled : row.enabled === 0 ? 1 : 0
	    	}).then(res => {
		        self.$message.success("提交成功")
		        self.getList()
		    })
      }).catch(() => {
      	// 取消             
      });
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style type="text/css" scoped>
  p {
    text-align: center;
  }
  .right {
    float: right;
  }
  .mar-b28 {
    margin-bottom: 28px;
  }
  .el-table__expanded-cell[class*=cell] {
    padding:0;
  }
  .el-table__expanded-cell[class*=cell]  .el-table__header-wrapper {
    display: none;
  }
</style>
