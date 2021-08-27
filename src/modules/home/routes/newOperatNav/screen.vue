<template>
  <div class="screen">
    <el-form label-width="120px">
      <el-form-item label="终端类型：">
        <el-checkbox v-model="clientType.iosFlag">iOS</el-checkbox>
        <el-checkbox v-model="clientType.androidFlag">Android</el-checkbox>
        <el-checkbox v-model="clientType.miniappFlag">小程序</el-checkbox>
        <el-checkbox v-model="clientType.mFlag">M站</el-checkbox>
      </el-form-item>
      <el-form-item label="iOS版本：" v-if="clientType.iosFlag">
        <el-select v-model="iOSVC" placeholder="请选择">
          <el-option
            :disabled="iOSVZ > 0 && item.versionNum > iOSVZ"
            v-for="item in iOSVs"
            :key="item.versionNum"
            :label="item.appVersion"
            :value="item.versionNum"
          ></el-option>
        </el-select>
        <span class="gray">——</span>
        <el-select v-model="iOSVZ" placeholder="请选择">
          <el-option
            :disabled="iOSVC > 0 && item.versionNum < iOSVC"
            v-for="item in iOSVs"
            :key="item.versionNum"
            :label="item.appVersion"
            :value="item.versionNum"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Android版本：" v-if="clientType.androidFlag">
        <el-select v-model="AndroidVC" placeholder="请选择">
          <el-option
            :disabled="AndroidVZ > 0 && item.versionNum > AndroidVZ"
            v-for="item in AndroidVs"
            :key="item.versionNum"
            :label="item.appVersion"
            :value="item.versionNum"
          ></el-option>
        </el-select>
        <span class="gray">——</span>
        <el-select v-model="AndroidVZ" placeholder="请选择">
          <el-option
            :disabled="AndroidVC > 0 && item.versionNum < AndroidVC"
            v-for="item in AndroidVs"
            :key="item.versionNum"
            :label="item.appVersion"
            :value="item.versionNum"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型：">
        <el-checkbox v-model="customerType.newVisitor">新访客</el-checkbox>
        <el-checkbox v-model="customerType.oldVisitor">老访客</el-checkbox>
        <el-checkbox v-model="customerType.customer">老客</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="search" @click="check">查询</el-button>
        <el-button class="clear" @click="defaultData">清空</el-button>
        <el-button class="clear" @click="add">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="params.list" border style="width: 100%">
      <el-table-column prop="sequence" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
      <el-table-column prop="enableTime" label="启用时间" width="140"></el-table-column>
      <el-table-column prop="disableTime" label="禁用时间" width="180"></el-table-column>
      <el-table-column label="图标" width="100">
        <template slot-scope="scope">
          <img width="80" :src="scope.row.imageUrl">
        </template>
      </el-table-column>
      <el-table-column prop="clientTypeDes" label="终端类型"></el-table-column>
      <el-table-column prop="customerTypeDes" label="用户类型">

      </el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column label="操作" class-name="operation" width="150">
        <template slot-scope="scope">
          <span @click="detial(scope.row)">详情</span>
          <span>|</span>
          <span @click="edit(scope.row)">编辑</span>
          <span>|</span>
          <span v-if="active==1 || active==4" @click="open(scope.row, active)">禁用</span>
          <span v-else @click="open(scope.row, active)">启用</span>
          <span>|</span>
          <span><router-link target="_blank" :to="'log?id='+scope.row.id">日志</router-link></span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="params.pageNum"
      :page-count="params.pages"
      @current-change="changePage"
      background
      layout="prev, pager, next"
    ></el-pagination>
    <el-dialog :visible.sync="dialogVisible" width="300px">
      <el-date-picker v-model="disabledTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="disabled">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
   props: ['active'],
  data () {
    return {
      operationNavigationBarId: '',
      dialogVisible: false,
      disabledTime: '',
      pageNum: 1,
      pageSize: 20,
      bottomType: 1,
      iOSVC: '',
      iOSVZ: '',
      AndroidVC: '',
      AndroidVZ: '',
      userType: '',
      clientType:{},
      iOSVs: [],
      AndroidVs: [],
      customerType: {},
      tableData: [],
      params: {}
    }
  },
  methods: {
    add () {
      let str = this.active == 4?'?bottom=1':'';
      window.location.href = `/view/banner/operateNavManage/newCreate.html${str}`
    },
    detial (row) {
      window.location.href = `/view/banner/operateNavManage/newDetail.html?operationNavigationBarId=${row.id}`
    },
    edit (row) {
      let str = row.bottomType == 1?'&bottom=1':'';
      window.location.href = `/view/banner/operateNavManage/newEdit.html?operationNavigationBarId=${row.id}${str}`
    },
    open (row) {
      this.operationNavigationBarId = row.id
      this.dialogVisible = true
    },
    disabled () {
      let text = '启用';
      if (this.active == 1 || this.active == 4) {
        text = '禁用'
      }
      if (!this.disabledTime || this.disabledTime == '' || this.disabledTime.length < 1) {
        this.$message.warning(`请选择${text}时间`)
        return
      }
      let operationNavigationBarId = this.operationNavigationBarId
      let enableStatus
      if (this.active == 1 || this.active == 4) {
        enableStatus = 3
      }else{
        enableStatus = 1
      }

      let param =  new FormData();
      param.append('enableStatus', enableStatus);
      param.append('operationNavigationBarId', operationNavigationBarId);
      param.append('time', this.disabledTime);
      this.$service.home.newOperatNav.changeStatus(param).then(res => {
        if (res) {
          this.search()
          this.dialogVisible = false
        }
      })
    },
    setParams () {
      let enableStatus
      let clientType = {
        iosFlag: this.clientType.iosFlag?1:0,
        androidFlag: this.clientType.androidFlag?1:0,
        miniappFlag: this.clientType.miniappFlag?1:0,
        mFlag: this.clientType.mFlag?1:0
      }
      let customerType = {
        newVisitor: this.customerType.newVisitor?1:0,
        oldVisitor: this.customerType.oldVisitor?1:0,
        customer: this.customerType.customer?1:0
      }
      if(this.active == 4) {
        this.bottomType = 1
        enableStatus = 1
      } else if (this.active == 1) {
        this.bottomType = 0
        enableStatus = 1
      } else {
        this.bottomType = undefined
        enableStatus = this.active
      }
      
      let param = {
        pageIndex: this.params.pageNum,
        pageSize: 20,
        bottomType: this.bottomType,
        clientType: clientType,
        customerType: customerType,
        enableStatus: enableStatus,
        iosVersionInfo: {
          versionNumFrom: this.iOSVC,
          versionNumTo: this.iOSVZ
        },
        androidVersionInfo: {
          versionNumFrom: this.AndroidVC,
          versionNumTo: this.AndroidVZ
        }
      }
      return param
    },
    check() {
      this.params.pageNum = 1
      this.search()
    },
    changePage() {
      this.search()
    },
    search () {
      let param = this.setParams()
      if (!param.clientType.iosFlag && !param.clientType.androidFlag && !param.clientType.miniappFlag && !param.clientType.mFlag) {
        this.$message.warning('至少选择一个终端类型')
        return
      }
      if (!param.customerType.newVisitor && !param.customerType.oldVisitor && !param.customerType.customer) {
        this.$message.warning('至少选择一个用户类型')
        return
      }
      this.$service.home.newOperatNav.pageList(param).then(res => {
        this.params = res
      })
    },
    log(data) {
      this.$router.push({path: `log?id=${data.id}`})
    },
    defaultData () {
      this.clientType = {
        iosFlag: false,
        androidFlag: false,
        miniappFlag: true,
        mFlag: true
      }
      this.customerType = {
        newVisitor: true,
        oldVisitor: true,
        customer: true
      }
      this.iOSVC = ''
      this.iOSVZ = ''
      this.AndroidVC = ''
      this.AndroidVZ = ''
    },
    getVersion () {
      this.$service.home.newOperatNav.appVersion({platform: 1, fromVersionNum: 118}).then(res => {
        this.iOSVs = res
      })
      this.$service.home.newOperatNav.appVersion({platform: 2, fromVersionNum: 257}).then(res => {
        this.AndroidVs = res
      })
    }
  },
  updated () {

  },
  mounted () {
    this.getVersion()
    this.defaultData()
    this.search()
  }
}
</script>

<style scoped>
.gray {
  color: #999;
}
.screen {
  background: #fff;
}
.operation span {
  cursor: pointer;
}
.operation span a {
  color: #606266;
}
</style>
