<template>
  <el-card class="box-card ma-t-10">
    <div slot="header" class="clearfix">
      <span>操作日志（{{total}}条）</span>
    </div>
    <el-table :data="list" style="width:100%" size="small">
      <el-table-column  prop="operator" label="操作人"></el-table-column>
      <el-table-column  prop="operateTime" label="操作时间"></el-table-column>
      <el-table-column label="操作内容">
        <template slot-scope="scope">
          <span v-if="scope.row.logType === 1">{{scope.row.popName}}</span>
          <span v-else-if="scope.row.logType === 2">{{scope.row.sonPopName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="font-blue" @click="openDialog(scope.row)">详情</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageNum" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
    </div>
    <!-- 父弹窗 -->
    <el-dialog :visible.sync="newVisitorsParentDialog" width="60%" title="">
      <new-visitors-parent ref="newVisitorsParent" name="newVisitorsParent" :editState="editState" :id="logId" :isLog="isLog"></new-visitors-parent>
    </el-dialog>
    <el-dialog :visible.sync="unregisteredOldGuestParentDialog" width="60%" title="">
      <unregistered-old-guest-parent ref="unregisteredOldGuestParent" name="unregisteredOldGuestParent" :editState="editState" :id="logId" :isLog="isLog"></unregistered-old-guest-parent>
    </el-dialog>
    <el-dialog :visible.sync="registeredOldGuestParentDialog" width="60%" title="">
      <registered-old-guest-parent ref="registeredOldGuestParent" name="registeredOldGuestParent" :editState="editState" :id="logId" :isLog="isLog"></registered-old-guest-parent>
    </el-dialog>
    <el-dialog :visible.sync="oldGuestParentDialog" width="60%" title="">
      <old-guest-parent ref="oldGuestParent" name="oldGuestParent" :editState="editState" :id="logId" :isLog="isLog"></old-guest-parent>
    </el-dialog>
    <el-dialog :visible.sync="paidParentDialog" width="60%" title="">
      <paid-parent ref="paidParent" name="paidParent" :editState="editState" :id="logId" :isLog="isLog"></paid-parent>
    </el-dialog>
    <!-- 子弹窗 -->
    <el-dialog :visible.sync="newVisitorsChildDialog" width="60%" title="">
      <new-visitors-child-add ref="newVisitorsChildAdd" name="newVisitorsChildAdd" :sonPopCode="sonPopCode" :editState="editState" :id="logId" :isLog="isLog"></new-visitors-child-add>
    </el-dialog>
    <el-dialog :visible.sync="unregisteredOldGuestChildDialog" width="60%" title="">
      <unregistered-old-guest-child-add ref="unregisteredOldGuestChildAdd" name="unregisteredOldGuestChildAdd" :sonPopCode="sonPopCode" :editState="editState" :id="logId" :isLog="isLog"></unregistered-old-guest-child-add>
    </el-dialog>
    <el-dialog :visible.sync="registeredOldGuestChildDialog" width="60%" title="">
      <registered-old-guest-child-add ref="registeredOldGuestChildAdd" name="registeredOldGuestChildAdd" :sonPopCode="sonPopCode" :editState="editState" :id="logId" :isLog="isLog"></registered-old-guest-child-add>
    </el-dialog>
    <el-dialog :visible.sync="oldGuestChildDialog" width="60%" title="">
      <old-guest-child-add ref="oldGuestChildAdd" name="oldGuestChildAdd" :sonPopCode="sonPopCode" :editState="editState" :id="logId" :isLog="isLog"></old-guest-child-add>
    </el-dialog>
    <el-dialog :visible.sync="paidChildDialog" width="60%" title="">
      <paid-child-add ref="paidChildAdd" name="paidChildAdd" :sonPopCode="sonPopCode" :editState="editState" :id="logId" :isLog="isLog"></paid-child-add>
    </el-dialog>
    
  </el-card>
  
</template>

<script type="text/javascript">
  import OldGuestParent from './oldGuest/parentManagement'
  import PaidParent from './paid/parentManagement'
  import NewVisitorsParent from './newVisitors/parentManagement'
  import UnregisteredOldGuestParent from './unregisteredOldGuest/parentManagement'
  import RegisteredOldGuestParent from './registeredOldGuest/parentManagement'
  
  import OldGuestChildAdd from './oldGuest/childAdd'
  import PaidChildAdd from './paid/childAdd'
  import NewVisitorsChildAdd from './newVisitors/childAdd'
  import UnregisteredOldGuestChildAdd from './unregisteredOldGuest/childAdd'
  import RegisteredOldGuestChildAdd from './registeredOldGuest/childAdd'
  
  export default {
    name: 'dialogManagementOld',
    data () {
      return {
        param: {
          pageNum: 1,
          pageSize: 20,
        },
        list: [],
        pages: 0, // 总页数
        total: 0,
        logId: '',
        editState: true, // 禁用状态
        isLog: true, // 是否日志快照
        sonPopCode: '', // 子弹窗枚举

        oldGuestParentDialog: false,
        paidParentDialog: false,
        newVisitorsParentDialog: false,
        unregisteredOldGuestParentDialog: false,
        registeredOldGuestParentDialog: false,

        
        oldGuestChildDialog: false,
        paidChildDialog: false,
        newVisitorsChildDialog: false,
        unregisteredOldGuestChildDialog: false,
        registeredOldGuestChildDialog: false,
      }
    },
    components: {
      OldGuestChildAdd, PaidChildAdd, NewVisitorsChildAdd, UnregisteredOldGuestChildAdd, RegisteredOldGuestChildAdd, OldGuestParent, PaidParent, NewVisitorsParent, UnregisteredOldGuestParent, RegisteredOldGuestParent
    },
    methods: {
      getList (val) {
        this.param.pageNum = val || 1
        this.$service.systemSetting.dialogManagement.queryLogsByPage(this.param).then( res => {
          this.param.pageNum = res.pageNum
          this.list = res.list
          this.pages = res.pages
          this.total = res.total
        })
      },
      openDialog (row) {
        this.logId = row.logId
        /*   
          1	首页新访客
          2	首页未注册新访客
          3	首页已注册老访客
          4	老客订单相关
          5	已付款
        */
        // 父弹窗
        if (row.logType === 1) {
          if (row.popCode === '1') {
            this.$nextTick(_ => {
              this.$refs.newVisitorsParent.getDetail()
            })
            return this.newVisitorsParentDialog = true 
          }
          if (row.popCode === '2') {
            this.$nextTick(_ => {
              this.$refs.unregisteredOldGuestParent.getDetail()
            })
            return this.unregisteredOldGuestParentDialog = true 
          }
          if (row.popCode === '3') {
            this.$nextTick(_ => {
              this.$refs.registeredOldGuestParent.getDetail()
            })
            return this.registeredOldGuestParentDialog = true 
          }
          if (row.popCode === '4') {
            this.$nextTick(_ => {
              this.$refs.oldGuestParent.getDetail()
            })
            return this.oldGuestParentDialog = true 
          }
          if (row.popCode === '5') {
            this.$nextTick(_ => {
              this.$refs.paidParent.getDetail()
            })
            return this.paidParentDialog = true 
          }
        }
        
        // 子弹窗
        if (row.logType === 2) {
          this.sonPopCode = row.sonPopCode
          if (row.popCode === '1') {
            this.$nextTick(_ => {
              this.$refs.newVisitorsChildAdd.getPageInfo()
            })
            return this.newVisitorsChildDialog = true
          } 
          if (row.popCode === '2') {
            this.$nextTick(_ => {
              this.$refs.unregisteredOldGuestChildAdd.getPageInfo()
            })
            return this.unregisteredOldGuestChildDialog = true
          } 
          if (row.popCode === '3') {
            this.$nextTick(_ => {
              this.$refs.registeredOldGuestChildAdd.getPageInfo()
            })
            return this.registeredOldGuestChildDialog = true
          }
          if (row.popCode === '4') {
            this.$nextTick(_ => {
              this.$refs.oldGuestChildAdd.getPageInfo()
            })
            return this.oldGuestChildDialog = true
          }
          if (row.popCode === '5') {
            this.$nextTick(_ => {
              this.$refs.paidChildAdd.getPageInfo()
            })
            return this.paidChildDialog = true
          }
        }
        
        
      }
    },
    mounted () {
      this.getList ()
    }
  }
</script>


<style type="text/css" scoped>
</style>
