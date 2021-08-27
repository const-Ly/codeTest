<template>
  <div>
    <el-dialog title="标签商品-标签选择" :visible.sync="tagProductPopStatus" :before-close="closePop" :append-to-body="true">
      <div class="header">
        <div class="select-value">
          <div class="m-r-10">标签名称</div>
          <el-input class="w200" v-model="tagName" maxlength="40" placeholder></el-input>
        </div>
        <div class="select-value">
          <div class="m-r-10">显示名称</div>
          <el-input class="w200" v-model="displayName" maxlength="40" placeholder></el-input>
        </div>
        <div>
          <el-button class="w100" type="primary" @click="queryData(1)">查询</el-button>
        </div>
      </div>
      <!-- 商品信息 -->
      <el-table :data="dataList" border max-height="500">
        <el-table-column property="tagName" label="标签名称" width>
          <template slot-scope="scope">
            <el-radio class="radio" :label="scope.row.tagId" v-model="radioId" @change="change(scope.row)">&nbsp;</el-radio>
            {{scope.row.tagName}}
          </template>
        </el-table-column>
        <el-table-column property="displayName" label="显示名称" width></el-table-column>
        <el-table-column label="商品数量" width>
          <template slot-scope="scope">{{scope.row.onShelfProductCount}}/{{scope.row.totalProductCount}}</template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageNum" @current-change="queryData($event)" background :page-count="pages" layout="prev, pager, next"></el-pagination>
      </div>
      <div class="footer-btn">
        <el-button @click="save" type="primary">保存</el-button>
        <el-button @click="closePop" class="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

import axios from "axios";

export default {
  name: "tag-product-pop",
  data() {
    return {
      dataList: [],
      param: {
        pageNum: 1,
        pageSize: 10,
      },
      pages: 0,
      tagName: "",
      displayName: "",
      radioId: null,
      pageSize: 10,
      selection: {}
    };
  },
  props: {},
  /**
   * tagProductPopStatus 标签商品弹窗的显示状态
   */
  computed: {
    ...mapState(["tagProductPopStatus"])
  },
  watch: {
    // 监听标签商品的显示状态,显示状态请求弹窗的第一页数据
    tagProductPopStatus(newValue) {
      if (newValue) {
        this.$service.systemSetting.specialManagement.queryTagByPage(this.param).then(res => {
          if (res) {
            this.dataList = res.list;
            this.param.pageNum = res.pageNum;
            this.pages = res.pages;
          }
        });
      }
    }
  },
  methods: {
    // 设置弹窗的默认参数
    recoverDefaultValue() {
      this.param = {
        pageNum: 1,
        pageSize: 10,
      }
      this.radioId = null;
      this.selection = {};
      this.dataList = [];
      this.pages = 0;
      this.displayName = '';
      this.tagName = '';
    },

    // 关闭弹窗
    closePop() {
      this.recoverDefaultValue();
      this.$store.commit("setTagProductPopStatus", false);
    },
    // 单选框绑定值变化时触发的事件（选中的 Radio label 值）
    change(row) {
      this.radioId = row.tagId;
      this.selection = row;
    },

    // 保存
    save() {
      if (!this.radioId) {
        this.$message.warning("必须选择一个标签");
        return
      }
      this.$store.commit("setTagProductSelection", this.selection);
      this.closePop();
    },

    // 点击查询按钮
    queryData(val) {
      // return;
      this.param.pageNum = val || 1;
      this.$service.systemSetting.specialManagement.queryTagByPage({
        tagName: this.tagName,
        displayName: this.displayName,
        ...this.param
      }).then(res => {
        if (res) {
          this.dataList = res.list;
          this.param.pageNum = res.pageNum;
          this.pages = res.pages;
        }
      });
    }
  }
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
}

.select-value {
  display: flex;
  align-items: center;
}

.w200 {
  width: 200px;
}

.w100 {
  width: 100px;
}

.m-r-10 {
  margin-right: 10px;
}

.cms-pagination {
  display: flex;
  justify-content: flex-end;
}

.footer-btn {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel {
  margin-left: 50px;
}
</style>