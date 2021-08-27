<template>
  <el-card class="box-card ma-t-10">
    <div slot="header" class="clearfix ma-b-20">
      <span>弹窗页面： {{tit}}</span>
      <router-link class="fr" :to="'/dialogManagement/registeredOldGuest/childAdd/'+ param.sonPopCode">
        <el-button size="small" type="primary">添加</el-button>
      </router-link>
    </div>
    <el-tabs class="ma-b-20" v-model="effectStatus" @tab-click="handleClick">
      <el-tab-pane label="生效中" name="2"></el-tab-pane>
      <el-tab-pane label="待开始" name="1"></el-tab-pane>
      <el-tab-pane label="已失效" name="3"></el-tab-pane>
    </el-tabs>
    
    <el-table :data="list" style="width:100%" size="small">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="弹窗顺序">
        <template slot-scope="scope">
          第{{scope.row.popSeqNum}}条
        </template>
      </el-table-column>
      <el-table-column label="生效状态" prop="effectStatusName"></el-table-column>
      <el-table-column label="生效时间">
        <template slot-scope="scope">
          {{scope.row.effectStartTime}} - {{scope.row.effectEndTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="font-blue ma-r-20" @click="handleDetails(scope.row.sonNodeId)">查看</span>
          <router-link :to="'/dialogManagement/registeredOldGuest/childEdit/'+ param.sonPopCode +'/' + scope.row.sonNodeId">
            <span class="font-blue" >编辑</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="cms-pagination"  v-if="pages>0">
      <el-pagination :current-page.sync="param.pageNum" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
    </div>
    <el-dialog :visible.sync="showDialog" width="60%" title="">
      <child-add ref="details" :editState="editState" :id="id"></child-add>
    </el-dialog>
  </el-card>
</template>

<script type="text/javascript">
  import ChildAdd from './childAdd'
  export default {
    name: 'childManagement',
    data () {
      return {
        tit: null, // 子页面名称
        param: {
          pageNum: 1,
          pageSize: 20,
          effectStatus: 2, // 生效状态枚举（1-待生效、2-生效中、3-已失效）
          popCode: '3',
          sonPopCode: this.$route.params.sonPopCode
        },
        list: [],
        pages: 0, // 总页数
        effectStatus: '2', // 组件里需要用字符串，但数据返回的是数字，所以自行转换一下
        showDialog: false, // 详情弹窗
        id: '', // 选中行的id ，用于编辑/查看 时传参用
        editState: true, // 组件ChildAdd 是否禁用状态
        dialogNum: 0
      }
    },
    components: {
      ChildAdd
    },
    methods: {
      getList (val) {
        this.param.pageNum = val || 1
        this.param.effectStatus = parseInt(this.effectStatus)
        this.$service.systemSetting.dialogManagement.querySonNodeListByPage(this.param).then( res => {
          this.param.pageNum = res.pageNum
          this.list = res.list
          this.pages = res.pages
        }) 
      },
      handleClick (tab, event) {
        this.effectStatus = tab.name
        this.getList(1)
      },
      handleDetails (id) {
        this.id = id
        this.dialogNum > 0 && this.$nextTick(_ => {
          this.$refs.details.getPageInfo()
        })
        this.dialogNum++
        this.showDialog = true
        
      }
    },
    mounted () {
      let titArr = {
        301 : '已注册老访客'
      }
      this.tit = titArr[this.$route.params.sonPopCode]
      document.title = this.tit
      document.querySelector('.el-breadcrumb').querySelectorAll('.el-breadcrumb__inner')[2].innerHTML = this.tit
      this.getList()
    }
  }
</script>


<style type="text/css" scoped>
</style>
