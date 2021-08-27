<template>
  <div class="cms init-reset">
    <el-card>
      <div class="page-title">
        <div>版本管理</div>
        <div>
          <el-button class="mar-r-10" type="primary" size="small" @click="showMutilBindModel">批量关联</el-button>
          <el-button type="primary" size="small" @click="showAddModel">添加</el-button>
        </div>
      </div>
    </el-card>

    <el-card class="box-card mar-t-20">
      <el-table ref="versionTable" :data="list" @selection-change="selectionChange">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column label="版本编号" prop="versionTitle"></el-table-column>
        <el-table-column label="原始编号" prop="appVersionNum"></el-table-column>
        <el-table-column label="原始版本" prop="appVersion"></el-table-column>
        <el-table-column label="原始平台" prop="platform"></el-table-column>
        <el-table-column label="创建日期" prop="createTime"></el-table-column>
        <el-table-column label="默认关联文件" prop="relevanceDefault"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="font-blue" @click="showSingleBindModel(scope.row.id)">关联文件</span>
            <span class="font-danger" @click="deleteVersion(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="param.pageIndex"
          :page-count="pages"
          @current-change="getList($event)"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 添加版本 -->
    <el-dialog title="添加" :visible.sync="showAdd" width="600px">
      <el-form :model="addVersion" label-width="200px">
        <el-form-item label="原始版本：">
          <el-select class="w200" v-model="addVersion.appVersion" placeholder="请选择">
            <el-option label="请选择" value></el-option>
            <el-option
              v-for="item in versionList"
              :key="item.appVersion"
              :label="item.appVersion"
              :value="item.appVersion"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原始平台：">
          <el-select class="w200" v-model="addVersion.platform" placeholder="请选择">
            <el-option label="请选择" value></el-option>
            <el-option
              v-for="item in platformList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本编号：">
          <el-input class="w200" v-model="addVersion.versionTitle"></el-input>
          <span class="tips">不超过15字</span>
        </el-form-item>
        <el-form-item label="默认关联文件：">
          <el-radio-group v-model="addVersion.relevanceDefault">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitAdd">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 关联文件 -->
    <el-dialog title="关联文件" :visible.sync="showBind" width="1000px">
      <el-form
        label-position="right"
        :inline="true"
        label-width="100px"
        size="mini"
        class="form-margin"
      >
        <el-form-item label="文件编号：">
          <el-input class="w160" v-model="searchQuery.id"></el-input>
        </el-form-item>
        <el-form-item label="文件名称：">
          <el-input class="w160" v-model="searchQuery.title"></el-input>
        </el-form-item>
        <el-form-item label="文件名：">
          <el-input class="w160" v-model="searchQuery.fileName"></el-input>
        </el-form-item>
        <el-form-item label="文件用途：">
          <el-select class="w160" v-model="searchQuery.purpose" placeholder="请选择">
            <el-option
              v-for="item in fileType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pos-right">
          <el-button type="primary" @click="getFileList(1)" size="mini">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        ref="fileTable"
        :data="fileList"
        tooltip-effect="dark"
        class="file-table"
        size="mini"
        @selection-change="fileSelectionChange"
      >
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column
          width="80"
          :label="`(${fileStore.length + fileSelection.length}/${fileTotal})`"
          prop
        ></el-table-column>
        <el-table-column width="80" label="文件编号" prop="id"></el-table-column>
        <el-table-column width="160" label="文件名称" prop="title"></el-table-column>
        <el-table-column label="文件名" prop="fileName"></el-table-column>
        <el-table-column label="文件用途" prop="typeTxt"></el-table-column>
        <el-table-column width="160" label="上传时间" prop="createTime"></el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="filePage>0">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="fileParam.pageIndex"
          :page-count="filePage"
          @current-change="getFileList($event)"
        ></el-pagination>
      </div>
      <div class="model-footer">
        <el-button size="mini" type="primary" @click="submitBind">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      param: {
        pageIndex: 1,
        pageSize: 20
      },
      list: [],
      pages: 0,
      showAdd: false,
      addVersion: {
        appVersion: "",
        platform: "",
        versionTitle: "",
        relevanceDefault: false,
        appVersionNum: ""
      },
      verSelection: [],
      versionStore: [],
      versionList: [],
      platformList: [],
      showBind: false,
      searchQuery: {
        id: "",
        title: "",
        fileName: "",
        purpose: ""
      },
      fileType: [
        { value: "", label: "请选择" },
        { value: 2, label: "AR家居" },
        { value: 3, label: "AR眼镜试戴" },
        { value: 4, label: "定制" },
        { value: 1, label: "基础库" }
      ],
      fileList: [],
      fileSelection: [],
      fileStore: [],
      fileParam: {
        pageIndex: 1,
        pageSize: 20
      },
      filePage: 0,
      singleBindId: null,
      fileTotal: 0
    };
  },
  mounted() {
    this.getList();
    this.getAppVersion();
  },
  watch: {
    "addVersion.appVersion"(val) {
      this.platformList = [];
      this.addVersion.platform = "";
      if (val) {
        const currentVersion = this.versionList.filter(
          item => item.appVersion === val
        )[0];
        currentVersion.versionInfos.forEach(item => {
          this.platformList.push({
            label: item.platform,
            value: item.platform,
            appVersionNum: item.versionNum
          });
        });
      }
    },
    "addVersion.platform"(val) {
      if (val) {
        this.platformList.forEach(item => {
          if (val === item.value) {
            this.addVersion.appVersionNum = item.appVersionNum;
          }
        });
      }
    },
    "addVersion.versionTitle"(val) {
      this.$nextTick(_ => {
        const title = val.replace(/(^\s*)|(\s*$)/g, "");
        this.addVersion.versionTitle = title.substr(0, 15);
      });
    }
  },
  methods: {
    // 获取信息列表数据
    getList(index) {
      this.param.pageIndex = index || 1;
      const params = {
        pageIndex: this.param.pageIndex,
        pageSize: this.param.pageSize
      };
      const versionStore = this.versionStore.filter(item =>
        this.verSelection.every(sItem => sItem.id !== item.id)
      );
      this.versionStore = versionStore.concat(this.verSelection);
      this.verSelection = [];
      this.$service.systemSetting.appThinning
        .listVersionInfo(params)
        .then(res => {
          this.param.pageIndex = res.pageNum;
          this.pages = res.pages;
          this.list = res.list || [];
          let verSelection = [];
          this.list = this.list.map(item => {
            item.relevanceDefault = item.relevanceDefault ? "是" : "否";
            item.appVersionNum =
              item.appVersionNum.length > 10
                ? item.appVersionNum.substr(0, 10) + "..."
                : item.appVersionNum;
            item.createTime = this.$utils.dateToString(
              new Date(item.createTime)
            );
            verSelection = verSelection.concat(
              this.versionStore.filter(sItem => sItem.id === item.id)
            );
            return item;
          });
          const versionStore = this.versionStore.filter(item =>
            verSelection.every(sItem => sItem.id !== item.id)
          );
          this.versionStore = versionStore;
          this.verSelection = verSelection;
          this.$nextTick(_ => {
            this.list.forEach(item => {
              verSelection.forEach(sItem => {
                if (item.id === sItem.id) {
                  this.$refs.versionTable.toggleRowSelection(item, true);
                }
              });
            });
          });
        });
    },
    getFileList(index) {
      this.fileParam.pageIndex = index || 1;
      const fileStore = this.fileStore.filter(item =>
        this.fileSelection.every(sItem => sItem.id !== item.id)
      );
      this.fileStore = fileStore.concat(this.fileSelection);
      this.fileSelection = [];
      const searchQuery = this.searchQuery;
      const params = {
        pageIndex: this.fileParam.pageIndex,
        pageSize: this.fileParam.pageSize
      };
      if (searchQuery.id) {
        params.id = searchQuery.id;
      }
      if (searchQuery.title) {
        params.title = searchQuery.title;
      }
      if (searchQuery.fileName) {
        params.fileName = searchQuery.fileName;
      }
      if (searchQuery.purpose) {
        params.purpose = searchQuery.purpose;
      }
      this.$service.systemSetting.appThinning.getFileList(params).then(res => {
        this.fileParam.pageIndex = res.pageNum;
        this.filePage = res.pages;
        this.fileList = res.list || [];
        this.fileTotal = res.total;
        let fileSelection = [];
        this.fileList = this.fileList.map(item => {
          // if (item.fileName.length > 40) {
          //   const idx = item.fileName.lastIndexOf(".")
          //   const suffix = item.fileName.substring(idx)
          //   const name = item.fileName.substr(0, idx)
          //   item.fileName = item.fileName.substr(0, 40 - suffix.length) + '...' + suffix
          // }
          if (item.title.length > 10) {
            item.title = item.title.substr(0, 10) + "...";
          }
          this.fileType.forEach(sItem => {
            if (sItem.value === item.purpose) item.typeTxt = sItem.label;
          });
          item.createTime = this.$utils.dateToString(new Date(item.createTime));
          fileSelection = fileSelection.concat(
            this.fileStore.filter(sItem => sItem.id === item.id)
          );
          return item;
        });
        this.fileStore = this.fileStore.filter(item =>
          fileSelection.every(sItem => sItem.id !== item.id)
        );
        this.fileSelection = fileSelection;
        this.$nextTick(_ => {
          this.fileList.forEach(item => {
            fileSelection.forEach(sItem => {
              if (item.id === sItem.id) {
                this.$refs.fileTable.toggleRowSelection(item, true);
              }
            });
          });
        });
      });
    },
    getAppVersion() {
      this.$service.systemSetting.appThinning.queryAppVersion().then(list => {
        this.versionList = list;
      });
    },
    queryBindList(id) {
      this.$service.systemSetting.appThinning
        .selectedFileRecordList({ id })
        .then(list => {
          this.fileStore = list;
          this.getFileList();
        });
    },
    // 展示弹窗
    showAddModel() {
      this.showAdd = true;
      this.addVersion = {
        appVersion: "",
        platform: "",
        versionTitle: "",
        relevanceDefault: false,
        appVersionNum: ""
      };
      this.platformList = [];
    },
    showSingleBindModel(id) {
      this.showBind = true;
      this.fileParam = {
        pageIndex: 1,
        pageSize: 20
      };
      this.searchQuery = {
        id: "",
        title: "",
        fileName: "",
        purpose: ""
      };
      this.fileSelection = [];
      this.singleBindId = id;
      this.queryBindList(id);
    },
    showMutilBindModel() {
      if (!this.verSelection.length) {
        this.$message.warning("请至少选择一个版本");
        return false;
      }
      this.showBind = true;
      this.fileParam = {
        pageIndex: 1,
        pageSize: 20
      };
      this.searchQuery = {
        id: "",
        title: "",
        fileName: "",
        purpose: ""
      };
      this.singleBindId = null;
      this.fileSelection = [];
      this.fileStore = [];
      this.getFileList();
    },
    // 提交保存信息
    submitAdd() {
      if (!this.addVersion.appVersion) {
        this.$message.warning("请选择原始版本");
        return false;
      }
      if (!this.addVersion.platform) {
        this.$message.warning("请选择原始平台");
        return false;
      }
      if (!this.addVersion.versionTitle) {
        this.$message.warning("请输入版本编号");
        return false;
      } else if (
        !this.addVersion.versionTitle.replace(/(^\s*)|(\s*$)/g, "").length
      ) {
        this.$message.warning("输入的版本编号有误");
        return false;
      } else if (this.addVersion.versionTitle.length > 15) {
        this.$message.warning("版本编号不超过15个字");
        return false;
      }

      this.$service.systemSetting.appThinning
        .saveAppVersionInfo(this.addVersion)
        .then(res => {
          this.param = {
            pageIndex: 1,
            pageSize: 20
          };
          this.addVersion = {
            appVersion: "",
            platform: "",
            versionTitle: "",
            relevanceDefault: false,
            appVersionNum: ""
          };
          this.showAdd = false;
          this.platformList = [];
          this.$message.success("提交成功");
          this.getList();
        });
    },
    submitBind() {
      const params = {
        appVersionInfoIds: [],
        fileRecordIds: []
      };
      if (this.singleBindId) {
        params.appVersionInfoIds.push(this.singleBindId);
      } else {
        let versionStore = this.versionStore.filter(item =>
          this.verSelection.every(sItem => sItem.id !== item.id)
        );
        versionStore = versionStore.concat(this.verSelection);
        params.appVersionInfoIds = versionStore.map(item => item.id);
      }
      let fileStore = this.fileStore.filter(item =>
        this.fileSelection.every(sItem => sItem.id !== item.id)
      );
      fileStore = fileStore.concat(this.fileSelection);
      params.fileRecordIds = fileStore.map(item => item.id);
      // if (!params.fileRecordIds.length) {
      //   this.$message.warning('请至少关联一个文件')
      //   return false
      // }
      this.$service.systemSetting.appThinning
        .batchSavaRelevance(params)
        .then(res => {
          this.showBind = false;
          this.versionStore = [];
          this.verSelection = [];
          this.$message.success("提交成功");
          this.getList();
        });
    },
    // 批量选择切换
    selectionChange(selection) {
      this.verSelection = selection;
    },
    fileSelectionChange(selection) {
      this.fileSelection = selection;
    },
    // 删除版本
    deleteVersion(id) {
      this.$confirm("删除后不可恢复，是否要删除当前记录？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$service.systemSetting.appThinning
          .deleteAppVersionInfo({ id })
          .then(res => {
            this.$message.success("删除成功");
            this.versionStore = [];
            this.verSelection = [];
            this.getList();
          });
      });
    }
  }
};
</script>
<style scoped>
.page-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mar-r-10 {
  margin-right: 10px;
}
.mar-t-20 {
  margin-top: 20px;
}
.tips {
  padding-left: 10px;
  font-size: 12px;
  color: #999;
}
.file-search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}
.w160 {
  width: 160px;
}
.form-margin {
  margin-left: 36px;
}
.pos-right {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
}
.model-footer {
  margin-top: 20px;
  text-align: center;
}
.file-table {
  width: 100%;
}
</style>

