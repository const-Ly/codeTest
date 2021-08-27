<template>
  <div>
    <el-dialog
      :title="popType[jumpType].name"
      :visible.sync="jumpPopStatus"
      :before-close="closePop"
      :append-to-body="true"
    >
      <div v-if="jumpType==1||jumpType==2||jumpType==4">
        <div class="header">
          <div class="select-value">
            <div class="m-r-10">{{popType[jumpType].selectOne}}</div>
            <!-- 商品第一个输入框没有联想功能 -->
            <el-input
              v-if="jumpType==1"
              class="w200"
              v-model="selectOneValue"
              maxlength="40"
              placeholder
            ></el-input>
            <!-- 专题和店铺第一个输入框有联想功能 -->
            <el-autocomplete
              v-else
              v-model="selectOneValue"
              :hide-loading="true"
              :fetch-suggestions="querySearchAsync"
              placeholder
            ></el-autocomplete>
          </div>
          <div class="select-value">
            <div class="m-r-10">{{popType[jumpType].selectTwo}}</div>
            <el-input
              class="w200"
              v-model="selectTwoValue"
              v-only-num.string="selectTwoValue"
              maxlength="40"
              placeholder
            ></el-input>
          </div>
          <div>
            <el-button class="w100" type="primary" @click="queryData(1)">查询</el-button>
          </div>
        </div>

        <!-- 商品信息 -->
        <el-table v-if="jumpType==1" :data="gridData" border max-height="500">
          <el-table-column property="productName" :label="popType[jumpType].selectOne" width>
            <template slot-scope="scope">
              <el-radio
                class="radio"
                :label="scope.row.productId"
                v-model="radioId"
                @change="change(scope.row)"
              >&nbsp;</el-radio>
              {{scope.row.productName}}
            </template>
          </el-table-column>
          <el-table-column property="productId" :label="popType[jumpType].selectTwo" width></el-table-column>
          <el-table-column :label="popType[jumpType].selectThree" width>
            <template slot-scope="scope">{{scope.row.minPrice}}-{{scope.row.maxPrice}}</template>
          </el-table-column>
        </el-table>

        <!-- 店铺信息 -->
        <el-table v-else-if="jumpType==2" :data="gridData" border max-height="500">
          <el-table-column property="supplierName" :label="popType[jumpType].selectOne" width>
            <template slot-scope="scope">
              <el-radio
                class="radio"
                :label="scope.row.supplierId"
                v-model="radioId"
                @change="change(scope.row)"
              >&nbsp;</el-radio>
              {{scope.row.supplierName}}
            </template>
          </el-table-column>
          <el-table-column property="supplierId" :label="popType[jumpType].selectTwo" width></el-table-column>
          <el-table-column :label="popType[jumpType].selectThree" width>
            <template
              slot-scope="scope"
            >{{scope.row.onShelfProductCount}}/{{scope.row.totalProductCount}}</template>
          </el-table-column>
        </el-table>

        <!-- 专题信息 -->
        <el-table v-else-if="jumpType==4" :data="gridData" border max-height="500">
          <el-table-column property="projectName" :label="popType[jumpType].selectOne" width>
            <template slot-scope="scope">
              <el-radio
                class="radio"
                :label="scope.row.projectId"
                v-model="radioId"
                @change="change(scope.row)"
              >&nbsp;</el-radio>
              {{scope.row.projectName}}
            </template>
          </el-table-column>
          <el-table-column property="projectId" :label="popType[jumpType].selectTwo" width></el-table-column>
        </el-table>
        <div class="cms-pagination" v-if="pages>0">
          <el-pagination
            :current-page.sync="pageNum"
            @current-change="queryData($event)"
            background
            :page-count="pages"
            layout="prev, pager, next"
          ></el-pagination>
        </div>
      </div>

      <!-- 自定义路由信息 -->
      <div class v-else-if="jumpType==6">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="Android路由">
            <el-input class="w-90" v-model.trim="androidRoute" maxlength="999" placeholder="{0-999}"></el-input>
          </el-form-item>
          <el-form-item label="IOS路由">
            <el-input class="w-90" v-model.trim="iosRoute" maxlength="999" placeholder="{0-999}"></el-input>
          </el-form-item>
          <el-form-item label="小程序">
            <el-input class="w-90" v-model.trim="miniappRoute" maxlength="999" placeholder="{0-999}"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 自定义链接信息 -->
      <div class v-else-if="jumpType==5">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="M站链接">
            <el-input class="w-90" v-model.trim="pcmRoute" maxlength="999" placeholder="{1-999}"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer-btn">
        <el-button @click="save" type="primary">保存</el-button>
        <el-button @click="closePop" class="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 1：代表商品弹窗
 * 2：代表店铺弹窗
 * 3：首页弹窗
 * 4：专题弹窗
 * 5：自定义链接
 * 6：自定义路由
 */
const POP_TYPE = {
  "0": {
    name: "",
    selectOne: "",
    selectTwo: "",
    selectThree: ""
  },
  "1": {
    name: "跳转信息-商品",
    selectOne: "商品名称",
    selectTwo: "商品编号",
    selectThree: "商品售价",
    url: ""
  },
  "2": {
    name: "跳转信息-店铺",
    selectOne: "商家名称",
    selectTwo: "商家ID",
    selectThree: "商品数量",
    url: ""
  },
  "3": {
    name: "跳转信息-首页",
    selectOne: "商品名称",
    selectTwo: "商品编号",
    url: ""
  },
  "4": {
    name: "跳转信息-专题",
    selectOne: "专题名称",
    selectTwo: "专题编号",
    url: ""
  },
  "5": {
    name: "跳转信息-自定义链接",
    url: ""
  },
  "6": {
    name: "跳转信息-自定义路由",
    url: ""
  }
};

const API_URL = {
  "1": "queryProductByPage",
  "2": "querySupplierByPage",
  "4": "queryByPage"
};

const ERROR_MESSAGE = {
  "1": "请选择一个商品",
  "2": "请选择一个有效的商家店铺",
  "4": "请选择一个专题",
  "5": "请填写M站链接",
  "6": "请完整填写跳转信息"
};

import { mapState } from "vuex";

import axios from "axios";

export default {
  name: "jump-pop",
  data() {
    return {
      popType: POP_TYPE,
      gridData: [],
      pages: 0,
      pageNum: 1,
      radioId: null,
      selection: {},
      selectOneValue: "",
      selectTwoValue: "",
      pageSize: 10,
      androidRoute: "",
      iosRoute: "",
      miniappRoute: "",
      pcmRoute: "",
      restaurants: []
    };
  },
  props: {
    // index: {
    //   type: Number,
    //   default: 0
    // },
    // info: {
    //   type: Object,
    //   default: {}
    // }
  },

  /**
   * jumpType 弹窗类型
   * jumpPopStatus 弹窗状态
   * currentImageItemIndex 当前图片组件的图片单元索引
   */
  computed: {
    ...mapState(["jumpType", "jumpPopStatus", "currentImageItemIndex"])
  },
  watch: {
    jumpPopStatus(newValue) {
      // 弹窗显示且有请求URL请求列表数据
      if (newValue && API_URL[this.jumpType]) {
        this.queryData(1);
      }
    }
  },

  methods: {
    // 恢复默认数据
    recoverDefaultValue() {
      this.pageNum = 1;
      this.radioId = null;
      this.selection = {};
      this.selectOneValue = "";
      this.selectTwoValue = "";
      this.androidRoute = "";
      this.iosRoute = "";
      this.miniappRoute = "";
      this.pcmRoute = "";
      this.restaurants = [];
      this.gridData = [];
      this.pages = 0;
    },

    // 关闭弹窗
    closePop() {
      this.recoverDefaultValue();
      this.$store.commit("setJumpType", 0);
      this.$store.commit("setJumpPopStatus", false);
      this.$store.commit("setCurrentImageItemIndex", 0);
    },
    // 单选框绑定值变化时触发的事件（选中的 Radio label 值）
    change(row) {
      if (this.jumpType == 1) {
        this.radioId = row.productId;
      }
      if (this.jumpType == 2) {
        this.radioId = row.supplierId;
      }
      if (this.jumpType == 4) {
        this.radioId = row.projectId;
      }
      this.selection = row;
    },

    // 保存按钮
    save() {
      // 商品、商家、专题
      if (this.jumpType == 1 || this.jumpType == 2 || this.jumpType == 4) {
        if (!this.radioId) {
          this.$message.warning(ERROR_MESSAGE[this.jumpType]);
          return;
        }
        // 商品
        if (this.jumpType == 1) {
          this.$store.commit(
            "setImageConfigInfoItemJumpLableValue",
            this.selection.productName
          );
          this.$store.commit("setImageConfigInfoItemJumpId", {
            id: "productId",
            value: this.selection.productId
          });
        }
        // 商家
        if (this.jumpType == 2) {
          this.$store.commit(
            "setImageConfigInfoItemJumpLableValue",
            this.selection.supplierName
          );
          this.$store.commit("setImageConfigInfoItemJumpId", {
            id: "supplierId",
            value: this.selection.supplierId
          });
        }

        // 专题
        if (this.jumpType == 4) {
          this.$store.commit(
            "setImageConfigInfoItemJumpLableValue",
            this.selection.projectName
          );
          this.$store.commit("setImageConfigInfoItemJumpId", {
            id: "projectId",
            value: this.selection.projectId
          });
        }
      }
      // 自定义链接
      if (this.jumpType == 5) {
        if (!this.pcmRoute) {
          this.$message.warning(ERROR_MESSAGE[this.jumpType]);
          return;
        }
        this.$store.commit(
          "setImageConfigInfoItemJumpLableValue",
          "自定义链接"
        );
        this.$store.commit(
          "setImageConfigInfoItemJumpSelectPcmRoute",
          this.pcmRoute
        );
      }
      // 自定义路由
      if (this.jumpType == 6) {
        if (this.androidRoute && this.iosRoute && this.miniappRoute) {
          this.$store.commit(
            "setImageConfigInfoItemJumpLableValue",
            "自定义路由"
          );
          this.$store.commit("setImageConfigInfoItemJumpSelectRoute", {
            androidRoute: this.androidRoute,
            iosRoute: this.iosRoute,
            miniappRoute: this.miniappRoute
          });
        } else {
          this.$message.warning(ERROR_MESSAGE[this.jumpType]);
          return;
        }
      }

      // 设置专题详情的图片组件属性的图片单元的跳转类型
      this.$store.commit("setImageConfigInfoItemJumpType", {
        value: this.jumpType,
        index: this.currentImageItemIndex
      });

      this.closePop();
    },

    // 联想查询
    querySearchAsync(queryString, cb) {
      if (!queryString) {
        this.restaurants = [];
        cb(this.restaurants);
        return;
      }

      let param = {
        pageNum: 1,
        pageSize: 200
      };
      let api = API_URL[this.jumpType];

      if (this.jumpType == 2) {
        param.supplierName = this.selectOneValue;
      }
      if (this.jumpType == 4) {
        param.projectName = this.selectOneValue;
        param.projectStatus = 1; // 1代表生效中的专题
      }
      this.$service.systemSetting.specialManagement[api](param).then(res => {
        if (res) {
          this.restaurants = res.list;
          this.pageNum = res.pageNum;
          this.pages = res.pages;
          this.restaurants.map(item => {
            if (this.jumpType == 4) {
              return (item.value = item.projectName);
            } else {
              return (item.value = item.supplierName);
            }
          });
          cb(this.restaurants);
        }
      });
    },

    // 获取分页或者点击查询接口参数和接口地址
    getParamUrl(pageNum) {
      let apiUrl = API_URL[this.jumpType];
      let param = {
        pageNum: pageNum || this.pageNum,
        pageSize: this.pageSize
      };
      if (this.jumpType == 1) {
        param.productName = this.selectOneValue;
        param.productId = this.selectTwoValue;
      }
      if (this.jumpType == 2) {
        param.supplierName = this.selectOneValue;
        param.supplierId = this.selectTwoValue;
      }
      if (this.jumpType == 4) {
        param.projectName = this.selectOneValue;
        param.projectId = this.selectTwoValue;
        param.projectStatus = 1; // 1代表生效中的专题
      }
      console.log(this.jumpType);
      return {
        apiUrl,
        param
      };
    },
    // 点击查询按钮或者打开弹窗时查询默认数据
    queryData(index) {
      let { apiUrl, param } = this.getParamUrl(index);
      this.$service.systemSetting.specialManagement[apiUrl](param).then(res => {
        if (res) {
          this.gridData = res.list;
          this.pageNum = res.pageNum;
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
.w-90 {
  width: 90%;
}
.m-r-10 {
  margin-right: 10px;
}
.m-0-30 {
  margin: 0 30px;
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