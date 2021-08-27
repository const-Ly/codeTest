<template>
  <div class="cms">
    <el-card>
      <div class="page-title">
        <div>文件管理</div>
        <div>
          <el-button type="primary" size="small" @click="showAddModel">添加</el-button>
        </div>
      </div>
    </el-card>

    <el-card class="box-card mar-t-20">
      <el-table :data="list">
        <el-table-column width="80" label="文件编号" prop="id"></el-table-column>
        <!-- <el-table-column label="文件名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="left">
              <p>{{ scope.row.fileName }}</p>
              <div slot="reference">
                {{ scope.row.fileName }}
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column label="文件名" prop="fileName"></el-table-column>
        <el-table-column label="文件名称" prop="title"></el-table-column>
        <el-table-column label="文件用途" prop="typeTxt"></el-table-column>
        <el-table-column width="100" label="文件大小(KB)" prop="size"></el-table-column>
        <el-table-column width="160" label="上传日期" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="font-danger" @click="deleteFile(scope.row.id)">删除</span>
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

    <!-- 添加文件 -->
    <el-dialog title="添加" :visible.sync="showAdd" width="600px">
      <el-form label-width="200px">
        <el-form-item label="文件用途：">
          <el-select class="w200" v-model="addFile.purpose" placeholder="请选择">
            <el-option
              v-for="item in fileType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件名称：">
          <el-input class="w200" v-model="addFile.title"></el-input>
          <span class="tips">不超过10个字</span>
        </el-form-item>
        <el-form-item label="上传文件：">
          <el-upload
            class="upload"
            action="http://cmsapp.biyao.com/common/fileUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :multiple="false"
            :data="{computeMD5:true, verifySize: 100 * 1024}"
            :with-credentials="true"
          >
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">zip、png、jpg、gif格式，最大100MB，文件名（不包含后缀）不超过50个字</div>
          </el-upload>
          <div :class="['upload-msg', uploadMsg.isOk ? '' : 'error']">{{uploadMsg.msg}}</div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
      </el-form>
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
      addFile: {
        purpose: "",
        title: "",
        fileName: "",
        size: "",
        md5Value: "",
        url: ""
      },
      fileType: [
        { value: "", label: "请选择" },
        { value: 2, label: "AR家居" },
        { value: 3, label: "AR眼镜试戴" },
        { value: 4, label: "定制" },
        { value: 1, label: "基础库" }
      ],
      uploadMsg: {
        isOk: true,
        msg: ""
      }
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    "addFile.title"(val) {
      this.$nextTick(_ => {
        const title = val.replace(/(^\s*)|(\s*$)/g, "");
        this.addFile.title = title.substr(0, 10);
      });
    }
  },
  methods: {
    getList(index) {
      this.param.pageIndex = index || 1;
      const params = {
        pageIndex: this.param.pageIndex,
        pageSize: this.param.pageSize
      };
      this.$service.systemSetting.appThinning.getFileList(params).then(res => {
        this.param.pageIndex = res.pageNum;
        this.pages = res.pages;
        this.list = res.list || [];
        this.list = this.list.map(item => {
          // if (item.fileName.length > 40) {
          //   const idx = item.fileName.lastIndexOf(".");
          //   const suffix = item.fileName.substring(idx);
          //   const name = item.fileName.substr(0, idx);
          //   item.fileName =
          //     item.fileName.substr(0, 40 - suffix.length) + "..." + suffix;
          // }
          if (item.title.length > 10) {
            item.title = item.title.substr(0, 10) + "...";
          }
          this.fileType.forEach(sItem => {
            if (sItem.value === item.purpose) item.typeTxt = sItem.label;
          });
          item.createTime = this.$utils.dateToString(new Date(item.createTime));
          return item;
        });
      });
    },
    deleteFile(id) {
      this.$confirm("删除后不可恢复，是否要删除当前记录？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$service.systemSetting.appThinning
          .deleteFileRecord({ id })
          .then(res => {
            this.$message.success("删除成功");
            this.getList();
          });
      });
    },
    showAddModel() {
      this.showAdd = true;
      this.addFile = {
        purpose: "",
        title: "",
        fileName: "",
        size: "",
        md5Value: "",
        url: ""
      };
      this.uploadMsg = {
        isOk: true,
        msg: ""
      };
    },
    // 上传图片
    uploadSuccess(e) {
      this.$store.commit("hideLoading");
      if (e.success) {
        this.uploadMsg = {
          isOk: true,
          msg: e.data.fileName
        };

        this.addFile.fileName = e.data.fileName;
        this.addFile.size = e.data.size;
        this.addFile.md5Value = e.data.md5Value;
        this.addFile.url = e.data.url;
      } else {
        this.uploadMsg = {
          isOk: false,
          msg: e.error.message
        };
      }
    },
    uploadError(e) {
      this.$store.commit("hideLoading");
      this.uploadMsg = {
        isOk: false,
        msg: e.error ? e.error.message : "上传出错"
      };
    },
    beforeUpload(file) {
      const accept = [
        "image/jpg",
        "image/png",
        "image/gif",
        "image/jpeg",
        "application/x-zip-compressed"
      ];
      // const type = [".zip", ".jpg", ".png", ".gif"];
      const size = 100;
      let idx = file.name.lastIndexOf(".");
      const suffix = file.name.substring(idx);
      const name = file.name.substr(0, idx);
      // const myType =
      //   accept.indexOf(file.type) > -1 && type.indexOf(suffix) > -1;
      const mySize = size * 1024 * 1024 >= file.size;
      if (name.length > 50) {
        this.uploadMsg = {
          isOk: false,
          msg: "上传失败, 文件名应不超过50字!"
        };
        return false;
      }
      /*if (!myType) {
        this.uploadMsg = {
          isOk: false,
          msg: "上传失败, 文件格式错误!"
        };
        return false;
      }*/
      if (!mySize) {
        this.uploadMsg = {
          isOk: false,
          msg: "上传失败, 文件大小超过限制!"
        };
        return false;
      }
      this.$store.commit("showLoading");
      //return mySize && myType;
      return mySize
    },
    // 提交添加表单
    submit() {
      if (!this.addFile.purpose) {
        this.$message.warning("请选择文件用途");
        return false;
      }
      if (!this.addFile.title) {
        this.$message.warning("请输入文件名称");
        return false;
      } else if (!this.addFile.title.replace(/(^\s*)|(\s*$)/g, "").length) {
        this.$message.warning("请输入文件名称");
        return false;
      } else if (this.addFile.title.length > 10) {
        this.$message.warning("文件名称不超过10个字");
        return false;
      }
      if (!this.addFile.fileName) {
        this.$message.warning("请上传文件");
        return false;
      }

      this.$service.systemSetting.appThinning
        .addFileRecord(this.addFile)
        .then(res => {
          this.param = {
            pageIndex: 1,
            pageSize: 20
          };
          this.addFile = {
            purpose: "",
            title: "",
            fileName: "",
            size: "",
            md5Value: "",
            url: ""
          };
          this.uploadMsg = {
            isOk: true,
            msg: ""
          };
          this.showAdd = false;
          this.$message.success("提交成功");
          this.getList();
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
.mar-t-20 {
  margin-top: 20px;
}
.tips {
  padding-left: 10px;
  font-size: 12px;
  color: #999;
}
.mar-l--10 {
  margin-left: -10px;
}
.upload {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-upload__tip {
  line-height: 22px;
  padding-left: 30px;
}
.upload-msg {
  font-size: 12px;
}
.upload-msg.error {
  color: #f56c6c;
}
</style>

