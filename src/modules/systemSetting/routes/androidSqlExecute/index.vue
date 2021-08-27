<template>
  <div class="cms">
    <el-card class="box-card ma-t-10">
      <el-button type="primary" @click="showAddVersionPop">添加</el-button>
      <el-table class="mar-t20" :data="dataList" border style="width: 100%">
        <el-table-column type="index" :index="computeIndex" label="序号" align="center" width="120">
          <!-- <template slot-scope="scope">
            <span>{{(param.pageNum - 1) * param.pagesize + index}}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="version" label="版本号" align="center" width="280"></el-table-column>
        <el-table-column prop="createBy" label="执行人" width="280" align="center"></el-table-column>
        <el-table-column prop="createTimeStr" label="执行时间" align="center"></el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change="getData($event)"
          :page-count="pages"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 添加弹窗 -->
    <dialog-pop
      :showStatus="dialogFormVisible"
      @changeShowStatus="hideAddVersionPop"
      @refreshList="getData()"
    ></dialog-pop>
  </div>
</template>

<script type="text/javascript">
import DialogPop from "./dialogPop";
import axios from "axios";

export default {
  name: "androidSqlExecute",
  data() {
    return {
      pages: 0, // 总页数
      param: {
        pageNum: 1,
        pageSize: 20,
        type: 1 // 1表示安卓。现阶段只有安卓类型
      },
      dataList: [], // 列表数据
      dialogFormVisible: false
    };
  },
  components: {
    DialogPop
  },
  created() {
    // 获取默认条件数据
    this.getData();
  },
  methods: {
    // 显示添加android版本的弹窗
    showAddVersionPop() {
      this.dialogFormVisible = true;
    },

    // 隐藏添加android版本的弹窗
    hideAddVersionPop() {
      this.dialogFormVisible = false;
    },

    computeIndex(index) {
      return parseInt(index) + 1 + (this.param.pageNum - 1) * this.param.pageSize
    },
    // 获取数据
    getData(val) {
      this.param.pageNum = val || 1;
      this.$service.systemSetting.androidSqlExecute
        .queryByPage(this.param)
        .then(data => {
          if (data) {
            this.dataList = data.list;
            this.param.pageNum = data.pageNum;
            this.pages = data.pages;
          }
        });
    }
  }
};
</script>
<style scoped>
.mar-t20 {
  margin-top: 20px;
}
.center {
  margin: 0 auto;
}
.layout-btn {
  position: absolute;
  right: 100px;
  top: 0;
}
</style>

