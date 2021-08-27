<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>彩蛋配置</span>
      </div>
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="彩蛋开关：">
          <el-radio-group v-model="eggConfig.easterEggsSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="text-first" label="弹层文案：">
          <el-input v-model="eggConfig.easterEggsCopy" :maxlength="10" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="彩蛋面额：" class="text-first">
          <el-input class="w120 fl" v-only-num="eggConfig.easterEggsAmount" :max-len="3" v-model="eggConfig.easterEggsAmount"></el-input>
          <span>&nbsp;元</span>
        </el-form-item>
        <el-form-item label="彩蛋有效期：" class="text-first">
          <el-input class="w120 fl" v-only-num="eggConfig.easterEggsExpire" :max-len="4" v-model="eggConfig.easterEggsExpire"></el-input>
          <span>&nbsp;分钟</span>
        </el-form-item>
        <el-form-item label>
          <el-button @click="eggSave" type="primary">提交保存</el-button>
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
            <a href="javascript:;" @click="logsDetaile(scope.row.id)">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="logList.pages>0">
        <el-pagination
          :current-page.sync="logList.pageNum"
          @current-change="getPageList"
          :page-count="logList.pages"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog title="操作日志详情" :visible.sync="eggsDialogState" width="500px">
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="彩蛋开关：">
          <span>{{logsInfo.easterEggsSwitch === 1? '开启':'关闭'}}</span>
        </el-form-item>
        <el-form-item label="弹层文案：">
          <span>{{logsInfo.easterEggsCopy}}</span>
        </el-form-item>
        <el-form-item label="彩蛋面额：">
          <span>{{logsInfo.easterEggsAmount}}&nbsp;元</span>
        </el-form-item>
        <el-form-item label="彩蛋有效期：">
          <span>{{logsInfo.easterEggsExpire}}&nbsp;分钟</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eggsDialogState: false,
      eggConfig: {}, // 彩蛋配置
      logsInfo: {}, // 日志详情
      logList: {}, // 日志列表
      pageParam: {
        pageIndex: 1,
        pageSize: 20
      }
    };
  },
  methods: {
    init() {
      this.$service.activity.eggs.query().then(res => {
        this.eggConfig = res
      })
      this.getPageList(1)
    },
    getPageList(num) {
      this.pageParam.pageIndex = num
      this.$service.activity.eggs.loglist(this.pageParam).then(res => {
        this.logList = res
      })
    },
    logsDetaile(id) {
      this.eggsDialogState = true;
      this.logsInfo = {}
      this.$service.activity.eggs.logdetail({logId: id}).then(res => {
        this.logsInfo = res
      })
    },
    saveValid() {
      let param = this.eggConfig
      if(param.easterEggsCopy.trim() === null || param.easterEggsCopy.trim() === '') {
        this.$message.warning('请填写弹层文案')
        return
      }
      if(param.easterEggsAmount === null || param.easterEggsAmount === '' || param.easterEggsAmount < 1) {
        this.$message.warning('请输入彩蛋面额')
        return
      }
      if(param.easterEggsExpire === null || param.easterEggsExpire === '' || param.easterEggsExpire < 1) {
        this.$message.warning('请输入彩蛋有效期')
        return
      }
      return param
    },
    eggSave() {
      let param = this.saveValid()
      if(param) {
        this.$service.activity.eggs.save(param).then(res => {
          this.$message.success('提交保存成功')
          this.getPageList(1)
        })
      }
    }
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

