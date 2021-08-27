<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
          v-model="localSearchItemCardId"
          placeholder="道具批次，精准查询"
          style="width:200px;margin-right:8px;"
        ></el-input>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      style="width:100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column label width="30">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model="localChooseItemCardId">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column label="道具批次" prop="id"></el-table-column>
      <el-table-column label="道具类型" prop="type">
        <template slot-scope="scope">{{opts.type[scope.row.type]}}</template>
      </el-table-column>
      <el-table-column label="有效期">
        <template slot-scope="scope">
          <template v-if="scope.row.type === 4">
            <span>--</span>
          </template>
          <template
            v-if="scope.row.type != 4 && scope.row.periodStrategy === 1"
          >{{scope.row.periodDays}}天</template>
          <template
            v-else-if="scope.row.type != 4 && scope.row.periodStrategy != 1"
          >{{scope.row.periodHours}}小时{{scope.row.periodMinutes | numFormat}}分</template>
        </template>
      </el-table-column>
      <el-table-column label="剩余数量">
        <template slot-scope="scope">
          <template v-if="scope.row.type === 4">
            <span>--</span>
          </template>
          <template v-else>
            <template v-if="scope.row.limitStatus">{{scope.row.remainAmount}}</template>
            <template v-else>不限量</template>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="最后操作">
        <template
          slot-scope="scope"
        >{{scope.row.operator + ' '}}{{scope.row.updateTime | date2dateStr}}</template>
      </el-table-column>
    </el-table>
    <div class="cms-pagination" v-if="pages>0">
      <el-pagination
        :current-page.sync="param.pageNum"
        @current-change="getList"
        background
        :total="total"
        :pager-count="5"
        :page-size="param.pageSize"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
    <div style="text-align:center;margin-top:18px">
      <el-button type="primary" @click="onSubmit">提交保存</el-button>
      <el-button @click="close">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["propsType", "propsIndex"],
  data() {
    return {
      param: {
        id: "",
        pageNum: 1,
        pageSize: 10,
        type: "",
        status:1
      },
      opts: {
        type: [
          "",
          "全民拼卡",
          "参团卡",
          "抽奖卡",
          "金币",
          "",
          "立减金",
          "超级回馈卡",
          "买二反一卡"
        ]
      },
      list: [],
      pages: 0,
      total: 0,
      localSearchItemCardId: "",
      localChooseItemCardId: "",
      localType: "",
      localRightsMoney: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(pageNow) {
      this.param.pageNum = pageNow || 1;
      this.param.type = this.propsType;
      this.$service.privilege.hook.propsPageList(this.param).then(res => {
        this.total = res.total;
        this.pages = res.pages;
        this.list = res.list;
        this.param.pageNum = res.pageNum;
      });
    },
    handleCurrentChange(val) {
      if (val) {
        this.localChooseItemCardId = val.id;
        this.localType = val.type;
        if (this.localType === 6) {
          this.localRightsMoney = val.rightsMoney;
        }
      }
    },
    onSearch() {
      this.param.id = this.localSearchItemCardId;
      this.getList();
    },
    onSubmit() {
      if (this.localChooseItemCardId) {
        this.$store.state.rewardsCardRightsGroup.rightsList[
          this.propsIndex
        ].rightsContent = this.localChooseItemCardId;
        if (this.localType === 6) {
          this.$store.state.rewardsCardRightsGroup.rightsList[
            this.propsIndex
          ].rightsMoney = this.localRightsMoney;
        }
        this.close();
      } else {
        this.$message.warning("请至少选择一条数据");
      }
    },
    close() {
      this.$store.state.rewardsCardRightsGroup.onOffList.splice(
        this.propsIndex,
        1,
        false
      );
    }
  },
  filters: {
    numFormat(v) {
      return v > 9 ? v : "0" + v;
    },
    date2dateStr(val) {
      if (!val) return null;
      val = new Date(val);
      let Y = val.getFullYear();
      let M = val.getMonth() + 1;
      let D = val.getDate();
      return [Y, M > 9 ? M : "0" + M, D > 9 ? D : "0" + D].join("-");
    }
  },
  watch: {
    propsType() {
      this.getList();
    }
  }
};
</script>

<style scoped>
</style>