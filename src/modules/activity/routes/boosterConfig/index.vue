<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form inline class="demo-form-inline">
        <el-button class="right mar-b28" type="primary" size="small" @click="openProject">添加项目</el-button>
      </el-form>
	    <el-table :data="list" :default-expand-all="true">
	      <el-table-column type="expand">
	        <template slot-scope="props">
	          <el-table :data="props.row.list">
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column prop="sceneName"></el-table-column>
              <el-table-column prop="sceneIdentify"></el-table-column>
              <el-table-column>
  	            <template slot-scope="scope">
                  <router-link :to="{ path:'info',append:true,query:{id:scope.row.id} }"><span class="font-blue">有效任务（{{ scope.row.taskCount }}）</span></router-link>
  	            </template>
              </el-table-column>
            </el-table>
	        </template>
	      </el-table-column>
	      <el-table-column label="业务ID" prop="id"></el-table-column>
	      <el-table-column label="项目名称" prop="projectName"></el-table-column>
	      <el-table-column label="应用场景"></el-table-column>
	      <el-table-column label="场景标识"></el-table-column>
	      <el-table-column label="操作">
	        <template slot-scope="scope">
	          <el-button size="mini" type="primary" @click="openScene(scope.row)">添加场景</el-button>
	        </template>
	      </el-table-column>
	    </el-table>
    </el-card>

    <el-dialog title="添加项目" :visible.sync="addProjectVisible" width="40%">
      <el-form ref="form" label-width="120px" size="small">
        <el-form-item label="项目名称：">
          <el-input v-model.trim="projectParam.projectName" :maxlength="20" placeholder="请输入项目名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="addProject">提 交</el-button>
        <el-button size="small" @click="addProjectVisible=false">返 回</el-button>
      </span>
      <p class="font-danger">信息一旦提交成功，无法更改删除，请谨慎操作。</p>
    </el-dialog>

    <el-dialog :title="projectNameText" :visible.sync="addSceneVisible" width="40%">
      <el-form ref="form" label-width="120px" size="small">
        <el-form-item label="场景名称：">
          <el-input v-model.trim="sceneParam.sceneName" :maxlength="20" placeholder="请输入场景名称"></el-input>
        </el-form-item>
        <el-form-item label="场景标识：">
          <el-input v-model.trim="sceneParam.sceneIdentify" :maxlength="20" placeholder="请输入唯一英文标识"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="addScene">提 交</el-button>
        <el-button size="small" @click="addSceneVisible=false">返 回</el-button>
      </span>
      <p class="font-danger">信息一旦提交成功，无法更改删除，请谨慎操作。</p>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      addProjectVisible: false,
      projectParam: {
        projectName: ''
      },

      addSceneVisible: false,
      projectNameText: '',
      sceneParam: {
        projectId: '',
        sceneName: '',
        sceneIdentify: ''
      },

      list: []
    }
  },
  methods:{
    openProject() {
      this.projectParam.projectName = ''
      this.addProjectVisible = true
    },
    addProject() {
      if (this.projectParam.projectName === "") {
        this.$message.warning('请输入1-20字项目名称')
        return false
      }
      this.$service.activity.boosterConfig.addProject(this.projectParam).then(res => {
        this.addProjectVisible = false
        this.getList()
      })
    },
    openScene(row) {
      this.addSceneVisible = true
      this.sceneParam.sceneName = ""
      this.sceneParam.sceneIdentify = ""
      this.sceneParam.projectId = row.id
      this.projectNameText = '添加（'+ row.projectName +'）场景'
    },
    addScene() {
      let reg = new RegExp('^[a-zA-Z0-9]{1,20}$')
      if (this.sceneParam.sceneName === "") {
        this.$message.warning('请输入1-20字场景名称')
        return false
      }
      if (!reg.test(this.sceneParam.sceneIdentify)) {
        this.$message.warning('请输入1-20字英文场景唯一标识')
        return false
      }
      this.$service.activity.boosterConfig.addScene(this.sceneParam).then(res => {
        this.addSceneVisible = false
        this.getList()
      })
    },
    getList() {
      this.$service.activity.boosterConfig.list().then(res => {
        this.list = res
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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
