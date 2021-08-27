<template>
  <el-card class="box-card ma-t-10">
    <div slot="header" class="clearfix">
      <span>操作日志（{{total}}条）</span>
    </div>
    <el-table :data="list" style="width:100%" size="small">
      <el-table-column  prop="operator" label="操作人"></el-table-column>
      <el-table-column  prop="operateTime" label="操作时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="font-blue" @click="handDetail(scope.row.logId)">详情</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getLog" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
    </div>
    <DetailDialog v-if="showDialog" :log-id="dialogProp.logId" :pop-code="param.popCode" :parm-name="dialogProp.parmName" @close="closeDialog"></DetailDialog>
    <el-dialog :visible.sync="oldOrderDialog" width="60%" title="老客订单相关">
    	<old-clients-order :editState="true" :logDetails="true" ref="oldOrder"></old-clients-order>
    </el-dialog>
  </el-card>
</template>

<script type="text/javascript">
  import DetailDialog from './DetailDialog'
  import OldClientsOrder from './oldClientsOrder'
  export default {
    name: 'log',
    data () {
      return {
        param:{
          popCode: this.$route.params.id,
          pageIndex: 1,
          pageSize: 20
        },
        pages: 0,
        total: 0,
        list: [{
          popCode: 0, // 1首页新访客, 2首页未注册新访客, 3首页已注册老访客, 4老客订单相关
          logId: '',
          operator: '操作人',
          operateTime: '时间'
        }],
        dialogProp: {
          logId: 0,
          title: '',
          parmName: 'logId'
        },
        showDialog: false,
        oldOrderDialog: false // 老客订单相关弹窗
      }
    },
    components: {
      DetailDialog, OldClientsOrder
    },
    methods: {
      getLog (val) {
        this.param.pageIndex = val || 1
        this.$service.systemSetting.dialogManagementOld.logs(this.param).then( res => {
          this.pages = res.pages
          this.total = res.total
          this.param.pageIndex = res.pageNum
          this.list = res.list || []
        })
      },
      handDetail (logId) {
        this.dialogProp.logId = logId
        if (this.param.popCode === '4') {
          this.oldOrderDialog = true
          this.$nextTick(() => {
            this.$refs.oldOrder.logId = logId
            this.$refs.oldOrder.getDetail()
          })
          return
        }
        this.dialogProp.title = this.$route.params.name
        this.dialogProp.parmName = 'logId'
        this.showDialog = true
      },
      closeDialog () {
        this.dialogProp = {
          popCode: '0',
          title: ''
        }
        this.showDialog = false
      }
    },
    mounted () {
      let str = this.$route.params.name + '日志'
      document.title = str
      document.querySelector('.el-breadcrumb').querySelectorAll('.el-breadcrumb__inner')[2].innerHTML = str
      this.getLog()
     
    }
  }
</script>


<style type="text/css" scoped>
</style>
