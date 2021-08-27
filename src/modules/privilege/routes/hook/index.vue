<template>
  <div class="cms">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button class="fr" type="primary" size="small" @click="handleAddProject">添加项目</el-button>
        <el-button class="fr ma-r-20" type="danger" size="small" @click="handleConfig">全局配置</el-button>
      </div>
      <el-table
        :data="list"
        row-key="id"
        :expand-row-keys="expandRowKeys">
        <el-table-column type="expand" width="50">
          <template slot-scope="props">
            <el-table :data="props.row.redBagSceneDtoList" :show-header="false">
              <el-table-column width="50"></el-table-column>
              <el-table-column width="250"></el-table-column>
              <el-table-column width="100"></el-table-column>
              <el-table-column prop="sceneName"></el-table-column>
              <el-table-column prop="sceneIdentify"></el-table-column>
              <el-table-column label="特权金操作" width="140">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.enabled === 1 ? '已开启' : '已关闭'" placement="top">
                    <span class="font-blue" @click="handleSwitch(scope.row.id, scope.row.enabled ===1?0:1)">{{ scope.row.enabled === 1?"关闭":"开启" }}</span>
                  </el-tooltip>
                  <router-link :to="{ path:'list/'+scope.row.id,append:true}"><span class="font-blue">有效关联（{{ scope.row.effectiveTaskCount }}）</span></router-link>
                </template>
              </el-table-column>
              <el-table-column label="道具卡操作" width="140">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.propsEnableStatus === 1 ? '已开启' : '已关闭'" placement="top">
                    <span
                      class="font-blue"
                      @click="handleSwitchCard(scope.row)">
                      {{ scope.row.propsEnableStatus === 1?"关闭":"开启" }}
                    </span>
                  </el-tooltip>
                  <router-link :to="{ path:'card/'+scope.row.sceneId, append:true}"><span class="font-blue">有效道具（{{ scope.row.effectivePropsNum }}）</span></router-link>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span class="font-blue" @click="handleEditScene(scope.row)">编辑</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" prop="projectName" width="250"></el-table-column>
        <el-table-column label="渠道ID" prop="channelId" width="100">
          <template slot-scope="scope">
            {{scope.row.channelId === null || scope.row.channelId === '' ? '--' : scope.row.channelId}}
          </template>
        </el-table-column>
        <el-table-column label="场景名称"></el-table-column>
        <el-table-column label="场景标识"></el-table-column>
        <el-table-column label="特权金操作" width="140"></el-table-column>
        <el-table-column label="道具卡操作" width="140"></el-table-column>
        <el-table-column label="场景项目操作">
          <template slot-scope="scope">
            <span class="font-blue" @click="handleEditProject(scope.row.id, scope.row.projectName, scope.row.channelId)">编辑</span>
            <span class="font-blue" @click="showAddScene(scope.row.id)">添加场景</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination background layout="prev, pager, next" :current-page="param.pageIndex" :page-count="pages" @current-change="getProjectByPage($event)"></el-pagination>
      </div>
    </el-card>

    <!-- 全局配置 -->
    <el-dialog title="全局配置" :visible.sync="globalConfig" width="50%">
      <el-form label-width="300px" size="small">
        <el-form-item label="小程序使用特权金：">
          <el-radio-group v-model="configParam.isEnabled">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" size="small" @click="saveConfig">提交</el-button>
          <el-button class="ma-l-20" size="small" @click="globalConfig = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加项目 -->
    <el-dialog :title="projectParam.id?'项目名称':'添加项目'" :visible.sync="addProject" width="500px">
      <el-form label-width="100px" size="small">
        <el-form-item label="项目名称：">
          <el-input v-model.trim="projectParam.projectName" :maxLength="20" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="渠道ID：">
          <el-input v-if="projectParam.id" :disabled="true" v-model="projectParam.channelTxt" class="w300"></el-input>
          <el-input v-else v-model.trim="projectParam.channelId" :maxLength="3" class="w300"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" size="small" @click="saveProject">提交</el-button>
          <el-button class="ma-l-20" size="small" @click="addProject = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加场景 -->
     <el-dialog :title="sceneParam.id?'场景名称':'添加场景'" :visible.sync="addScene" width="540px">
      <el-form label-width="100px" size="small">
        <el-form-item label="场景名称：">
          <el-input v-model.trim="sceneParam.sceneName" :maxLength="20" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="场景标识：">
          <el-input v-model.trim="sceneParam.sceneIdentify" :disabled="!!sceneParam.id" :maxLength="20" class="w300"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" size="small" @click="handleAddScene">提交</el-button>
          <el-button class="ma-l-20" size="small" @click="addScene = false">返回</el-button>
        </el-form-item>
        <el-form-item label=" ">
          <span class="font-danger">信息一旦提交成功，场景标识无法更改删除，请谨慎操作！</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  name: 'hook',
  data () {
    return {
      param:{
        pageIndex:1,
        pageSize:20
      },
      list: [],
      pages: 0,
      globalConfig:false, //全局配置是否展示
      configParam:{},//全局配置的参数
      addProject:false, //添加项目
      projectParam: {
        id: null,
        projectName: '',
        channelId: '',
        channelTxt: ''
      },
      addScene: false, // 添加场景
      sceneParam: {
        id: null,
        projectId:"",
        sceneName:"",
        sceneIdentify:""
      },
      sceneId: '',     // 编辑时 场景id
      expandRowKeys: []
    }
  },
  mounted () {
    if (this.$store.state.projectId) {
      this.getProject(this.$store.state.projectId)
    } else {
      this.getProjectByPage()
    }
  },
  watch: {
    'projectParam.channelId' (v) {
      if (v !== '--') {
        let value = parseInt(v, 10)
        if (isNaN(value)) {
          this.projectParam.channelId = ''
        } else if (value < 1) {
          this.projectParam.channelId = ''
        } else if (value > 999) {
          this.projectParam.channelId = parseInt(value / 10)
        } else {
          this.projectParam.channelId = value
        } 
      }
    }
  },
  methods:{
    // 获取项目列表
    getProjectByPage (pageNow) {
      this.param.pageIndex = pageNow || 1
      this.$service.privilege.hook.getProjectByPage(this.param).then(res => {
        this.pages = res.pages
        this.param.pageIndex = res.pageNum
        this.list = res.list
        if (this.$store.state.projectId) {
          this.$nextTick(() => {
            this.expandRowKeys = [this.$store.state.projectId]
            this.$store.commit('setProjectId', '')
          })
        }
      })
    },
    // 处理开启与关闭
    handleSwitch (id,status) {
      let _switch = status === 1?"开启":"关闭"
      this.$confirm("你确认"+ _switch +"该场景挂接“特权金任务”吗？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.privilege.hook.switchScene({sceneId:id, isEnabled:status}).then(res => {
          this.getProjectByPage()
        })
      })
    },
    // 处理道具卡开启关闭
    handleSwitchCard (row) {
      let _switch = row.propsEnableStatus === 1 ? '关闭' : '开启'
      this.$confirm(`你确定${_switch}该场景标识道具卡挂接吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          sceneId: row.sceneId,
          isEnabled: row.propsEnableStatus === 1 ? 0 : 1,
          sceneIdentify: row.sceneIdentify,
          projectId: row.projectId
        }
        this.$service.privilege.hook.switchPropsStatus(param).then(res => {
          this.getProjectByPage()
        })
      })
    },
    // 获取全局配置信息
    getConfig () {
    	let self = this
      self.$service.privilege.hook.getConfig({}).then(res => {
        self.configParam = res
        self.globalConfig = true
      })
    },
    handleConfig () {
      this.getConfig()
    },
    // 保存全局配置
    saveConfig () {
      this.$service.privilege.hook.saveConfig(this.configParam).then(res => {
        this.$message.success('保存成功')
        this.globalConfig = false
      })
    },
    // 初始化添加项目弹框
    handleAddProject () {
      this.projectParam.channelTxt = ''
      this.projectParam.channelId = ''
      this.projectParam.projectName = ''
      this.projectParam.id = null
      this.addProject = true
    },
    // 保存项目
    saveProject () {
      const params = {
        projectName: this.projectParam.projectName
      }
      if (this.projectParam.id) {
        params.id = this.projectParam.id
      }
      params.channelId = this.projectParam.channelId
      if(params.projectName === '') {
        this.$message.warning('请输入1-20字项目名称');return
      }
      if (!params.id && (params.channelId === null || params.channelId === '')) {
        this.$message.warning('请输入1-999整数的渠道ID');
        return false
      }
      this.$service.privilege.hook.saveProject(params).then(res => {
        this.$message.success('提交成功')
        this.addProject = false
        this.getProjectByPage()
      })
    },
    // 显示添加场景弹框
    showAddScene (id) {
      this.addScene = true
      this.sceneParam.id = null
      this.sceneParam.projectId = id
      this.sceneParam.sceneName = ''
      this.sceneParam.sceneIdentify = ''
    },
    // 添加场景
    handleAddScene () {
      let reg = new RegExp('^[a-zA-Z0-9]{1,20}$')
      if(this.sceneParam.sceneName === ""){
        this.$message.warning('请输入1-20字场景名称');return
      }
      if (!reg.test(this.sceneParam.sceneIdentify)) {
        this.$message.warning('请输入1-20字英文数字唯一的场景标识')
        return false
      }
      this.$service.privilege.hook.saveScene(this.sceneParam).then(res => {
        this.$message.success('提交成功')
        this.addScene = false
        this.getProjectByPage()
      })
    },

    // 编辑项目名称
    handleEditProject (pId, pName, cId) {
      this.addProject = true
      this.projectParam.id = pId
      this.projectParam.projectName = pName
      this.projectParam.channelTxt = cId === null || cId === '' ? '--' : cId
      this.projectParam.channelId = cId
    },
    // 编辑场景名称
    handleEditScene (row) {
      this.addScene = true
      this.sceneParam.id = row.id
      this.sceneParam.projectId = row.projectId
      this.sceneParam.sceneName = row.sceneName
      this.sceneParam.sceneIdentify = row.sceneIdentify
    },
    // 获取项目所在页数
    getProject (id) {
      const params = {
        projectId: id,
        pageSize: this.param.pageSize
      }
      this.$service.privilege.hook.getIndexByProjectId(params).then(res => {
        this.param.pageIndex = res || 1
        this.getProjectByPage(this.param.pageIndex)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-button.ma-r-20{  margin-right: 20px; }
</style>
