<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        size="small"
        class="input-normal mar-t20"
      >
        <el-form-item label="任务状态：">
          <el-checkbox-group v-model="form.status">
            <el-checkbox :label="1">未开始</el-checkbox>
            <el-checkbox :label="2">进行中</el-checkbox>
            <el-checkbox :label="3">已结束</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-checkbox-group v-model="form.enableStatus">
            <el-checkbox
              v-for="(item, index) in enableStatusArr"
              :label="item.id"
              :key="index"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="ios版本下限：">
          <el-select v-model="form.iosVersion" placeholder="请选择" style="width: 300px;" clearable>
            <el-option
              v-for="item in iosVersionArr"
              :key="item.versionNum"
              :label="item.appVersion"
              :value="item.versionNum +'-'+item.appVersion"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="android版本下限：">
          <el-select
            v-model="form.androidVersion"
            placeholder="请选择"
            style="width: 300px;"
            clearable
          >
            <el-option
              v-for="item in androidVersionArr"
              :key="item.versionNum"
              :label="item.appVersion"
              :value="item.versionNum +'-'+item.appVersion"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下发用户类型：">
          <el-checkbox-group v-model="form.visitorType">
            <el-checkbox
              v-for="(item, index) in visitorArr"
              :label="item.id"
              :key="index"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="searchBtn">查询</el-button>
          <el-button type="primary" plain @click="clear">清空</el-button>
          <div class="layout-btn">
            <router-link :to="{ path: '../setTask', append:true }" target="_blank">
              <el-button type="primary">任务设置</el-button>
            </router-link>
            <el-button type="primary" @click="addTask">新增</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="sequence" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
        <el-table-column prop="defaultTaskName" label="选择任务" width="120" align="center"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
        <el-table-column label="奖励内容" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.rewardType | selectRewardType}}
            <span v-if="scope.row.rewardType===5">（{{scope.row.goldNumber}}）</span>
          </template>
        </el-table-column>
        <el-table-column prop="androidVersionFrom" label="android版本下限" align="center"></el-table-column>
        <el-table-column prop="iosVersionFrom" label="ios版本下限" align="center"></el-table-column>
        <el-table-column prop="customerTypeDes" label="下发用户类型" align="center"></el-table-column>
        <el-table-column label="是否启用" width="90" align="center">
          <template slot-scope="scope">{{scope.row.enableStatus | isEnableStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="enableProhibit(scope.$index, scope.row, dataList)"
              type="text"
              size="small"
              v-if="scope.row.enableStatus"
            >禁用</el-button>
            <el-button
              @click.native.prevent="enableProhibit(scope.$index, scope.row, dataList)"
              type="text"
              size="small"
              v-if="!scope.row.enableStatus"
            >启用</el-button>
            <span class>|</span>
            <el-button
              @click.native.prevent="toEdit(scope.$index, scope.row, dataList)"
              type="text"
              size="small"
            >编辑</el-button>
            <span class>|</span>
            <el-button
              @click.native.prevent="seeJournal(scope.$index,scope.row, dataList)"
              type="text"
              size="small"
            >日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change="getData"
          :page-count="pages"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "taskCenterList",
  data() {
    return {
      pages: 0, // 总页数
      total: 0, // 总条数
      form: {
        status: [1, 2, 3], // 任务状态
        enableStatus: [1], // 是否启用
        iosVersion: "", // ios 版本
        androidVersion: "", // android 版本
        visitorType: [] // 访客类型
      },
      param: {
        pageNum: 1,
        pageSize: 10,
        customerType: {},
        status: [1, 2, 3],
        enableStatus: true,
        androidVersionNumFrom: "",
        iosVersionNumFrom: ""
      },
      dataList: [], // 列表数据
      visitorArr: [
        { name: "新访客", id: 1 },
        { name: "老访客", id: 2 },
        { name: "老客", id: 3 }
      ],
      enableStatusArr: [{ name: "已启用", id: 1 }, { name: "已禁用", id: 2 }],
      iosVersionArr: [], // ios 版本号
      androidVersionArr: [], // Android 版本号
    };
  },
  mounted() {
    this.getAppVersion();
    // 获取默认条件数据
    this.getData();
  },
  methods: {
    // 启用/禁用
    enableProhibit(index, row, dataList, type) {
      let str = "";
      let message = "";
      let enableStatus = -1; //0 禁用  1 启用
      if (row.enableStatus) {
        // 启用状态
        str = "是否禁用?";
        enableStatus = 0;
      } else {
        str = "是否启用?";
        enableStatus = 1;
      }
      // 二次确认
      this.$confirm(str, "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否"
      }).then(() => {
        this.setEnableProhibit(
          {
            id: row.id,
            enableStatus: enableStatus
          },
          row
        );
      });
    },
    // 设置 启用禁用
    setEnableProhibit(param, row) {
      this.$service.systemSetting.taskCenter
        .changeEnableStatus(param)
        .then(res => {
          if (res) {
            this.$message.success("操作成功");
            row.enableStatus = !row.enableStatus;
          }
        });
    },
    // 编辑
    toEdit(index, row, dataList) {
      // this.$router.push(`/taskCenter/taskCenterEdit/${row.id}`)
      window.open(
        `http://cms.biyao.com/app/systemSetting/#/taskCenter/taskCenterEdit/${row.id}`
      );
    },
    // 日志
    seeJournal(index, row, dataList) {
      this.$router.push(`/taskCenter/taskCenterLog/${row.id}`);
    },
    getAppVersion() {
      let param1 = {
        platform: 1, // 1:IOS 2:Android
        fromVersionNum: 123 // 写死的值 123
      };
      let param2 = {
        platform: 2, // 1:IOS 2:Android
        fromVersionNum: 263 // 写死的值  263
      };
      this.$service.systemSetting.taskCenter
        .queryAppVersion(param1)
        .then(res => {
          this.iosVersionArr = res;
        });
      this.$service.systemSetting.taskCenter
        .queryAppVersion(param2)
        .then(res => {
          this.androidVersionArr = res;
        });
    },
    // addTask 新增
    addTask() {
      // this.$router.push('/taskCenter/taskCenterAdd')
      window.open(
        "http://cms.biyao.com/app/systemSetting/#/taskCenter/taskCenterAdd"
      );
    },
    // 查询、分页
    searchBtn() {
      let form = this.form;
      let param = this.param;
      // 任务状态
      form.status = form.status.sort((a, b) => {
        return a - b;
      });
      param.status = form.status;
      // 是否启用  启用  1  禁用 2
      let isEnable = form.enableStatus.indexOf(1) > -1 ? true : false;
      let isProhibit = form.enableStatus.indexOf(2) > -1 ? true : false;
      if (isProhibit && isEnable) {
        param.enableStatus = null; // 都选  赋值为 null
      } else {
        if (isProhibit) {
          param.enableStatus = false; // False 禁用
        } else if (isEnable) {
          param.enableStatus = true; // True 启用
        } else {
          param.enableStatus = null; // 都不选认为 全查
        }
      }
      // ios版本下限
      if (form.iosVersion !== "") {
        let iosVArr = form.iosVersion.split("-");
        param.iosVersionNumFrom = iosVArr[0];
      } else {
        param.iosVersionNumFrom = "";
      }
      // android版本下限
      if (form.androidVersion !== "") {
        let androidVArr = form.androidVersion.split("-");
        // param.androidVersionFrom = androidVArr[1]
        param.androidVersionNumFrom = androidVArr[0];
      } else {
        param.androidVersionNumFrom = "";
      }
      // 访客类型
      if (form.visitorType.length > 0) {
        param.customerType.newVisitor =
          form.visitorType.indexOf(1) > -1 ? 1 : null;
        param.customerType.oldVisitor =
          form.visitorType.indexOf(2) > -1 ? 1 : null;
        param.customerType.customer =
          form.visitorType.indexOf(3) > -1 ? 1 : null;
      } else {
        param.customerType = {};
      }
      this.getData(1);
    },
    // 获取数据
    getData(val) {
      this.param.pageNum = val || 1;
      this.$service.systemSetting.taskCenter
        .searchTaskList(this.param)
        .then(data => {
          if (data) {
            this.dataList = data.list;
            this.param.pageNum = data.pageNum;
            this.total = data.total;
            this.pages = data.pages;
          }
        });
    },
    // 清空
    clear() {
      this.form.status = []; // 任务状态
      this.form.enableStatus = [1]; // 是否启用
      this.form.iosVersion = ""; // ios 版本
      this.form.androidVersion = ""; // android 版本
      this.form.visitorType = []; // 访客类型
    },
    warningMes(str) {
      this.$message.warning(str);
    }
  },
  filters: {
    selectRewardType(value) {
      let str = "";
      switch (value) {
        case 1:
          str = "参团卡";
          break;
        case 2:
          str = "抽奖卡";
          break;
        case 3:
          str = "全民拼卡";
          break;
        case 4:
          str = "特权金";
          break;
        case 5:
          str = "金币";
          break;
      }
      return str;
    },
    isEnableStatus(value) {
      let str = "";
      if (value) {
        str = "已启用";
      } else {
        str = "已禁用";
      }
      return str;
    }
  }
};
</script>
<style scoped>
.mar-t20 {
  margin-top: 20px;
}
.mar-l10 {
  margin-left: 10px;
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

