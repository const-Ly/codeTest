<template>
  <div class="cms">
    <!-- 警告、搜索框 -->
    <el-card class="box-card">
      <div class="warning">
        <el-alert title="本页面主要管理地震预警信息及预警白名单" type="warning" show-icon :closable="false"></el-alert>
      </div>
      <el-form>
        <el-form-item label="预警编号">
          <el-input class="w200" v-only-num="findWarningId" maxlength="10" v-model="findWarningId"></el-input>
          <el-button type="primary" @click="search" class="ma-l-10">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card ma-t-10">
      <div class="clearfix">
        <span>记录预警</span>
        <router-link :to="{ path: 'earlyWarning/add' }">
          <el-button class="fr ma-l-20" type="primary">添加预警</el-button>
        </router-link>
        <router-link :to="{ path: 'earlyWarning/whiteList'}">
          <el-button class="fr" type="primary" plain>管理白名单</el-button>
        </router-link>
      </div>
      <el-table :data="list" stripe style="width:100%">
        <el-table-column label="预警编号" prop="eventId"></el-table-column>
        <el-table-column label="更新时间" prop="operateTime"></el-table-column>
        <el-table-column label="操作人" prop="operator"></el-table-column>
        <el-table-column label="预警接收人" prop="warningReceiver"></el-table-column>
        <el-table-column label="更新次数" prop="update"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <router-link :to="{ path: 'earlyWarning/edit/' + scope.row.id}">
              <span class="font-blue">重 发</span>
            </router-link>
            <span>|</span>
            <span class="font-blue" @click="showInfo(scope.row.id)">查 看</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码等信息来自后台 -->
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change=" getList "
          background
          :page-count="pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 【查看】弹框 -->
    <el-dialog title="预警信息详情" :visible.sync="dialogFormVisible">
      <edit pageTypeFromParent="show" :parmaFromParent="this.detailParma"></edit>
      <div style="text-align:right">
        <el-button type="primary" @click="dialogFormVisible = false">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import edit from "./edit";

export default {
  name: "earlyWarning",
  data() {
    return {
      param: {
        pageNum: 1,
        pageSize: 20,
        eventId: ""
      },
      total: 0,
      pages: 0,
      list: [],
      dialogFormVisible: false,
      warningDetailsId: "",
      findWarningId: "",
      detailParma: {}
    };
  },
  components: {
    edit
  },
  
  methods: {
    getList(idx, eventId) {
      this.param.pageNum = idx || 1;
      this.param.eventId = eventId || "";
      this.$service.operate.earlyWarning
        .getEQwarningsByPage(this.param)
        .then(res => {
          this.param.pageNum = res.pageNum;
          this.pages = res.pages;
          this.total = res.total;
          this.list = res.list || [];
        });
    },
    showInfo(eventId) {
      this.warningDetailsId = eventId || "";
      this.$service.operate.earlyWarning
        .getEQwarningDetail({ id: this.warningDetailsId })
        .then(res => {
          if (res.signature === null) res.signature = [];
          if (res.whiteList === null) res.whiteList = [];
          if (res.warningReceiver === "全部白名单") res.warningReceiver = "";
          // this.param = res;
          this.detailParma = res;
          this.dialogFormVisible = true;
        });
    },
    search() {
      this.getList(1, this.findWarningId);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>


  
<style scoped>
.warning {
  border: 1px solid orange;
  margin-bottom: 20px;
}
.ma-l-10 {
  margin-left: 10px;
}
.ma-l-20 {
  margin-left: 20px;
}
</style>