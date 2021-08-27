<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>防薅配置</span>
      </div>
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item class="text-first" label="防薅修正值：">
          <el-input v-only-num="bhConfig.bonusHunterAmount" :max-len="3" v-model="bhConfig.bonusHunterAmount" class="w120"></el-input>
          <span>&nbsp;元</span>
        </el-form-item>
        <el-form-item label>
          <el-button @click="bonusHunterSave" type="primary">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card logs" v-if="logList.list && logList.list.length > 0">
      <div slot="header" class="clearfix">
        <span>操作日志</span>
      </div>
      <el-table :data="logList.list" style="width: 100%">
        <el-table-column prop="operator" label="操作人"></el-table-column>
        <el-table-column prop="operateTime" label="操作时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click="logsDetail(scope.row.id)">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="logList.pages>0">
        <el-pagination :current-page.sync="logList.pageNum" @current-change="getLogList" :page-count="logList.pages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>

    <el-dialog title="操作日志详情" :visible.sync="bhDialogState" width="400px">
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="防薅修正值：">
          <span> {{logsInfo.bonusHunterAmount}}元</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bhDialogState: false,
      bhConfig: {},
      logsInfo: {},
      pageParam: {
        pageSize: 20,
        pageIndex: 1
      },
      logList: {}
    };
  },
  methods: {
    init() {
      this.$service.param.bonushunter.query().then(res => {
        this.bhConfig = res
      })
      this.getLogList(1)
    },
    getLogList(num) {
      this.pageParam.pageIndex = num
      this.$service.param.bonushunter.loglist(this.pageParam).then(res => {
        this.logList = res
      })
    },
    logsDetail(id) {
      this.bhDialogState = true;
      this.logsInfo = {}
      this.$service.param.bonushunter.logdetail({logId: id}).then(res => {
        this.logsInfo = res
      })
    },
    saveParam() {
      if(this.bhConfig.bonusHunterAmount === null || this.bhConfig.bonusHunterAmount === '' || this.bhConfig.bonusHunterAmount < 0 || this.bhConfig.bonusHunterAmount > 999) {
        this.$message.warning("请输入防薅修正值")
        return;
      }
      return {
        bonusHunterAmount: this.bhConfig.bonusHunterAmount
      }
    },
    bonusHunterSave() {
      let param = this.saveParam()
      if(param) {
        this.$service.param.bonushunter.save(param).then(res => {
          this.$message.success("提交保存成功")
          this.getLogList(1)
        })
      }
    }
  },
  computed: {
  },
  mounted() {
    this.init()
  }
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
.logs {
  margin-top: 30px;
}
.w120 {
  width: 120px;
}
.logs a {
  color: #409eff;
}
</style>

