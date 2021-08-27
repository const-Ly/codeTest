<template>
  <div class="cms">
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-form>
        <el-form-item label="手机号">
          <el-input class="w200" maxlength="11" v-only-num="findPhone" v-model="findPhone"></el-input>
          <el-button type="primary" @click="search" class="ma-l-10">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表单 -->
    <el-card class="box-card ma-t-10">
      <div class="clearfix" v-if="this.pageType!=='choose'">
        <span>白名单列表</span>
        <el-button class="fr ma-l-20" type="primary" @click="dialogFormVisible=true">导 入</el-button>
        <router-link :to="{ path: '/earlyWarning' }">
          <el-button class="fr" type="primary" plain>地震预警</el-button>
        </router-link>
      </div>
      <!-- 常规表单 -->
      <el-table :data="list" stripe style="width:100%" v-if="this.pageType!=='choose'">
        <el-table-column label="UID" prop="uid"></el-table-column>
        <el-table-column label="昵称" prop="nickname"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="font-danger" @click=" handleDel(scope.row.id,scope.row.phone)">删 除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 选择表单 -->
      <el-table :data="list" stripe style="width:100%" v-if="this.pageType ==='choose'">
        <el-table-column label width="30">
          <template slot-scope="scope">
            <el-radio :label="scope.row" v-model="chooseWhiteList">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="UID" prop="uid"></el-table-column>
        <el-table-column label="昵称" prop="nickname"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change=" getWhiteList "
          background
          :page-count="pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
      
    </el-card>
    <!-- 导入弹框 -->
    <el-dialog title="导入白名单" :visible.sync="dialogFormVisible" width="20%">
      <el-form>
        <el-form-item label="导入模板：">
          导入模板.xlsx (
          <span class="font-blue" @click="download">下载导入模板</span> )
        </el-form-item>
        <el-form-item label="导入：">
          <file-upload
            @success="uploadSuccess()"
            action="/EQwarning/importWhiteList"
            @defer="uploadResult"
          >
            <el-button type="primary" slot="handle">选择表格</el-button>
          </file-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import FileUpload from "@/components/fileUpload";
import FileUpload from "../components/whiteListFileUpload";
export default {
  props: ["pageTypeFromParent"],
  data() {
    return {
      dialogFormVisible: false,
      findPhone: "",
      chooseWhiteList: "",
      pageType: "",
      param: {
        pageNum: 1,
        pageSize: 20,
        phone: ""
      },
      total: 0,
      pages: 0,
      list: [],
      uploadResult: {}
    };
  },
  components: { FileUpload },
  mounted() {
    this.pageType = this.pageTypeFromParent;
    if (this.pageType === "choose") {
      this.param.pageSize = 10;
    } else {
      this.param.pageSize = 20;
    }
    this.getWhiteList();
  },
  methods: {
    handleDel(id, phone) {
      this.$confirm("你确认将该信息从地震预警白名单信息中移除吗？").then(_ => {
        this.$service.operate.earlyWarning
          .deleteWhiteList({ id: id, phone: phone })
          .then(res => {
            this.getWhiteList(1);
          });
      });
    },
    getWhiteList(idx, phone) {
      this.param.pageNum = idx || 1;
      this.param.phone = phone || "";
      this.$service.operate.earlyWarning
        .getWhiteListsByPage(this.param)
        .then(res => {
          this.param.pageNum = res.pageNum;
          this.pages = res.pages;
          this.total = res.total;
          this.list = res.list || [];
        });
    },
    download() {
      this.$service.operate.earlyWarning.getWhiteListTemplate().then(res => {
        window.location.href = res;
      });
    },
    search() {
      if (this.findPhone.toString().length < 11 && this.findPhone.toString().length !== 0) {
        this.$message.warning("请输入11位手机号");
        return false;
      }
      this.getWhiteList(1, this.findPhone);
    },
    uploadSuccess() {
      this.dialogFormVisible = false;
      this.findPhone = "";
      this.getWhiteList(1);
    }
  },
  watch: {
    chooseWhiteList() {
      this.$emit("input", this.chooseWhiteList);
    }
  }
};
</script>

<style scoped>
.border-gary {
  border: 1px solid gray;
  border-radius: 50%;
}
.ma-l-10 {
  margin-left: 10px;
}
.ma-l-20 {
  margin-left: 20px;
}
</style>