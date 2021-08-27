<template>
  <div class="cms">

    <el-card class="box-card">
      <el-form ref="form" label-width="240px" input-width="220px" size="small">
        <el-form-item label="任务总开关：" class="none">
          <el-radio-group v-model="param.friendHelpSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="新用户小程序兑换权益配置开关：">
          <el-radio-group v-model="param.friendHelpMinapp">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单sku权益上限：">
          <el-input class="sku-input" v-model="param.friendHelpSkuLimit" @blur="skuValid" v-only-num.float="param.friendHelpSkuLimit" :max-len="3" size="small">
          </el-input>
        </el-form-item>
        <p class="sku-text">同一sku，同一个类型权益，同一用户最多获取的主副权益上限值，范围0.1-1之间。</p>
        <el-button type="primary" size="small" class="ma-l-40" @click="save('ruleForm')">保存</el-button>
      </el-form>
    </el-card>

    <el-card class="box-card mar-t20">
      <el-form inline class="demo-form-inline" size="small">
        <el-form-item>
          <el-input placeholder="请输入任务名称" v-model.trim="listParam.taskName">
              <el-button slot="append" @click="getList()">搜索</el-button>
          </el-input>
        </el-form-item>
        <router-link :to="{ path: 'add',append:true }"><el-button class="right" size="small" type="primary">新建助力</el-button></router-link>
      </el-form>
      <el-table :data="list"  border>
        <el-table-column prop="taskId" label="任务ID"></el-table-column>
        <el-table-column label="助力任务名称">
          <template slot-scope="scope">
            <router-link :to="{ path: 'detail/'+scope.row.taskId,append:true }"><span class="font-blue">{{scope.row.taskName}}</span></router-link>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column prop="updateBy" label="修改人"></el-table-column>
        <el-table-column prop="statusName" label="任务状态"></el-table-column>
        <el-table-column label="操作" class-name="opr" width="135">
          <template slot-scope="scope">
            <router-link :to="{ path: 'detail/'+scope.row.taskId,append:true }"><span class="font-blue">查看</span></router-link>
            <router-link v-if="scope.row.status==0" :to="{ path: 'modify/'+scope.row.taskId,append:true }"><span class="font-blue">修改</span></router-link>
            <a href="javascript:;" v-if="scope.row.isRelation==1"><span @click="scene(scope.row.taskId)" class="font-blue">场景</span></a>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pageCount>0">
        <el-pagination :current-page.sync="listParam.pageIndex" @current-change="getList" :page-count="pageCount"  background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
    <el-dialog :visible.sync="showSceneDialog" v-if="showSceneDialog" title="关联场景" width="40%">
      <scene :task-id="taskId"></scene>
		  <div slot="footer" class="dialog-footer align-center">
		  	<el-button type="primary" @click="closeScene" size="small">关 闭</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
import scene from './scene';
export default {
  name: '',
  data () {
    let self = this
    return {
      breadcrumbBtn: {
        name: '操作日志',
        fullPath: '/boosterTask',
        callback () {
          self.$router.push({path:'/boosterTask/logs'})
        }
      },
      showSceneDialog: false,
      param: {
        friendHelpSwitch: 0,     // 任务总开关
        friendHelpMinapp: 1,     // 新用户小程序兑换权益配置开关
        friendHelpSkuLimit: 0.5  // 单sku权益领取限制
      },
      pageCount:0,
      listParam: {
        taskName: '',   // 任务名称，用于搜索
        pageIndex: 1,   // 当前页
        pageSize: 20
      },
      list:[],
      taskId: ''
    }
  },
  methods:{
    closeScene(){
      this.showSceneDialog = false;
    },
    scene(taskId){
      this.taskId = taskId;
      this.showSceneDialog = true;
    },
    save(formName) {
      if(!this.skuValid()) return;
      this.$service.activity.boosterTask.saveDetails(this.param).then(res => {
        this.$message.success('保存成功！')
      })
      
    },
    getDetails() {
      this.$service.activity.boosterTask.getDetails()
      .then(res => {
        this.param.friendHelpSwitch = res.friendHelpSwitch
        this.param.friendHelpMinapp = res.friendHelpMinapp
        this.param.friendHelpSkuLimit = res.friendHelpSkuLimit
      })
    },
    getList(val) {
      this.listParam.pageIndex = val || 1
      this.$service.activity.boosterTask.list(this.listParam)
      .then(res => {
        this.pageCount = res.pages
        this.listParam.pageIndex = res.pageNum
        this.list = res.list
      })
    },
    skuValid(){
      let reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{1})))$/;
      if(this.param.friendHelpSkuLimit > 1 || this.param.friendHelpSkuLimit < 0.1){
        this.$message.warning("权益上限可输入的范围是0.1-1")
        return false;
      }
      if(!reg.test(this.param.friendHelpSkuLimit)){
        this.$message.warning("权益上限值至多保留一位小数")
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.getDetails()
    this.getList()
  },
  beforeMount() {
    this.$store.commit('updateBreadcrumbBtn', this.breadcrumbBtn)
  },
  components: {
    scene
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cms-pagination {
    text-align: center;
    margin-top: 20px;
  }
  .w120 {
    display: inline-block;
    width: 120px;
  }
  .right {
    float: right;
  }
  .mar-l10 {
    margin-left: 10px;
  }
  .ma-l-40{
    margin-top: 20px;
    margin-left:425px;
  }
  .mar-t20 {
    margin-top: 20px;
  }
  .pad-l10 {
    padding-left: 10px;
  }
  .sku-input{
    width: 240px;
  }
  .opr span{
    padding-right: 5px;
    border-right: 1px solid #409EFF;
    line-height: 1;
    height: 14px;
    display: inline-block;
  }
  .opr a:last-child span{
    border: 0px;
  }
  .sku-text{
    margin-left: 240px;
    text-align: left;
    color: #999;
    font-size: 12px;
  }
</style>
