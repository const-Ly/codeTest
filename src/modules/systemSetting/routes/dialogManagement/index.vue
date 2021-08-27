<template>
  <el-card class="box-card ma-t-10 cms">
    <div slot="header" class="clearfix">
      <span>弹窗列表</span>

      <router-link class="fr" :to="{ path: 'log',append:true }">
        <el-button size="small" type="primary">日志</el-button>
      </router-link>
    </div>
    <el-table :data="list" style="width:100%" size="small"  :default-expand-all="true">
      <el-table-column type="expand" width="40">
        <template slot-scope="scope">
          <el-table :data="scope.row.sonWindowEffectNumList" :show-header="false" style="width: 100%">
            <el-table-column width="40"></el-table-column>
            <el-table-column label="弹窗页面" prop="sonPopName"></el-table-column>
            <el-table-column label="启用状态"></el-table-column>
            <el-table-column label="生效中数量" prop="effectNum"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <span class="font-blue" @click="management(scope.row.popCode, props.row.sonPopCode)">管理</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>


      <el-table-column label="弹窗页面" prop="popName"></el-table-column>
      <el-table-column label="启用状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enableStatus">已启用</span>
          <span v-else>已禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="生效中数量" prop=" "></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="font-blue" @click="management(scope.row.popCode)">管理</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  
</template>

<script type="text/javascript">
  
  export default {
    name: 'dialogManagement',
    data () {
      return {
        list:[]
      }
    },
    components: {
      
    },
    methods: {
      getList () {
        this.$service.systemSetting.dialogManagement.queryWindowList().then( res => {
          this.list = res || []
        })
      },
      /* 
        popCode： 父弹窗枚举值
        sonPopCode： 子弹窗枚举值
      */
      management (popCode, sonPopCode) {
        if (sonPopCode) {
          /* 子弹窗 */
          // 首页新访客
          if (popCode === '1') {
            this.$router.push({path: '/dialogManagement/newVisitors/childManagement/' + sonPopCode})
          }
          // 首页未注册新访客
          if (popCode === '2') {
            this.$router.push({path: '/dialogManagement/unregisteredOldGuest/childManagement/' + sonPopCode})
          }
          // 首页已注册新访客
          if (popCode === '3') {
            this.$router.push({path: '/dialogManagement/registeredOldGuest/childManagement/' + sonPopCode})
          }
          // 老客订单相关
          if (popCode === '4') {
            this.$router.push({path: '/dialogManagement/oldGuest/childManagement/' + sonPopCode})
          }
          // 已付款
          if (popCode === '5') {
            this.$router.push({path: '/dialogManagement/paid/childManagement/' + sonPopCode})
          }
        }else {
          /* 父弹窗 */
          // 首页新访客
          if (popCode === '1') {
            this.$router.push({path: '/dialogManagement/newVisitors/parentManagement/' + popCode})
          }
          // 首页未注册新访客
          if (popCode === '2') {
            this.$router.push({path: '/dialogManagement/unregisteredOldGuest/parentManagement/' + popCode})
          }
          // 首页已注册新访客
          if (popCode === '3') {
            this.$router.push({path: '/dialogManagement/registeredOldGuest/parentManagement/' + popCode})
          }
          // 老客订单相关
          if (popCode === '4') {
            this.$router.push({path: '/dialogManagement/oldGuest/parentManagement/' + popCode})
          }
          // 已付款
          if (popCode === '5') {
            this.$router.push({path: '/dialogManagement/paid/parentManagement/' + popCode})
          }
        }
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>


<style type="text/css" scoped>
</style>
