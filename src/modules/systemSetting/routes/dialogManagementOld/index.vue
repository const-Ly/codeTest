<template>
  <el-card class="box-card ma-t-10">
    <div slot="header" class="clearfix">
      <span>弹窗列表</span>
    </div>
    <el-table :data="list" style="width:100%" size="small">
      <el-table-column label="弹窗页面">
        <template slot-scope="scope">
          <span v-if="scope.row.popCode === '4'" class="font-blue" @click="oldOrderDialog = true">{{scope.row.popName}}</span>
           <span v-else class="font-blue" @click="handDetail(scope.row)">{{scope.row.popName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enableStatus">已启用</span>
          <span v-else>已禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link v-if="scope.row.popCode === '1'" :to="{ path: 'newVisitorEdit', append:true }">
            <span class="font-blue">编辑</span>
          </router-link>
          <router-link v-if="scope.row.popCode === '2'" :to="{ path: 'oldNoLoginVisitorEdit', append:true }">
            <span class="font-blue">编辑</span>
          </router-link>
          <router-link v-if="scope.row.popCode === '3'" :to="{ path: 'oldLoginVisitorEdit', append:true }">
            <span class="font-blue">编辑</span>
          </router-link>
          <router-link v-if="scope.row.popCode === '4'" :to="{ path: 'oldClientsOrder', append:true }">
            <span class="font-blue">编辑</span>
          </router-link>
          <router-link :to="{ path: 'log/'+scope.row.popCode +'/'+ scope.row.popName, append:true }">
            <span class="font-blue ma-l-10">日志</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <DetailDialog v-if="showDialog" :pop-code="dialogProp.popCode" @close="closeDialog"></DetailDialog>
    <el-dialog :visible.sync="oldOrderDialog" width="60%" title="老客订单相关">
    	<old-clients-order :editState="true"></old-clients-order>
    </el-dialog>
  </el-card>
  
</template>

<script type="text/javascript">
  import DetailDialog from './DetailDialog'
  import OldClientsOrder from './oldClientsOrder'
  export default {
    name: 'dialogManagementOld',
    data () {
      return {
        list: [
          /* {
            popCode: '', // 1首页新访客, 2首页未注册老访客, 3首页已注册老访客, 4老客订单相关
            popName: '', // 
            enableStatus: false // 启用状态（false：禁用；true：启用）
          } */
        ],
        dialogProp: {
          popCode: 0,
          title: '',
        },
        showDialog: false,
        oldOrderDialog: false // 老客订单相关弹窗
        
      }
    },
    components: {
      DetailDialog, OldClientsOrder
    },
    methods: {
      queryAllConfig () {
        this.$service.systemSetting.dialogManagementOld.queryAllConfig().then( res => {
          this.list = res || []
        })
      },
      handDetail (row) {
        this.dialogProp.popCode = row.popCode
        this.dialogProp.title = row.popName
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
      this.queryAllConfig()
    }
  }
</script>


<style type="text/css" scoped>
</style>
