<template>
  <div class="cms">
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">操作日志（{{total}}条）</span>
      </div>
      <el-table :data="dataList" style="width: 100%" :default-expand-all="false">
        <el-table-column label="操作人" prop="operator"></el-table-column>
        <el-table-column label="操作时间" prop="operateTime"></el-table-column>
        <el-table-column label="操作内容" prop="content"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <span v-show="scope.row.content == '启用' || scope.row.content == '作废'">--</span>
            <span
            class="font-blue"
            @click="openDialogVisible(scope.row.logId)"
            v-show="scope.row.content == '管理组'"
            >
              详情
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change="getList "
          background
          :page-count="pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="日志详情"
      :visible.sync="dialogVisible"
      width="70%">
      <add :logId="logId" :isLog="true"></add>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import Add from "./add";
export default {
  name: "log",
  components: { Add },
  data() {
    return {
      pages: 0,
      total: 0,
      param: {
        pageNum: 1,
        pageSize: 20,
        userGroupId: this.$route.params.id, // 用户组编号
      },
      dataList: [ // 列表数据
        {
          logId: '', // 日志编号
          content: '', // 操作内容
          operator: '', // 操作人
          operateTime: '' // 操作时间（格式：yyyy-MM-dd HH:mm:ss）
        }
      ],
      dialogVisible: false,
      logId: ''
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取数据
    getList(val) {
      this.param.pageNum = val || 1;
      this.$service.systemSetting.userGroupManagement.getLogList(this.param).then(res => {
        this.dataList = res.list;
        this.param.pageNum = res.pageNum;
        this.pages = res.pages;
        this.total = res.total;
      });
    },
    openDialogVisible (logId) {
      this.logId = logId
      this.dialogVisible = true
    },
  },
};
</script>
<style scoped>
</style>

