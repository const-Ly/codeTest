<template>
  <div class="cms">
    <el-card class="card-margin">
      <div class="header">
        <div class="left">道具卡 ({{total}}条)</div>
        <div class="right">
          <router-link :to="{ path: 'add', append: true }">
            <el-button type="primary" @click="addItemCard">添加</el-button>
          </router-link>
        </div>
      </div>
      <div class="search-form">
        <el-form :inline="true" :model="params">
          <el-form-item label="状态：">
            <el-select v-model="params.status" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="草稿" :value="0"></el-option>
              <el-option label="生效中" :value="1"></el-option>
              <el-option label="已结束" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="道具类型：">
            <el-select v-model="params.type" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="全民拼卡" :value="1"></el-option>
              <el-option label="参团卡" :value="2"></el-option>
              <el-option label="抽奖卡" :value="3"></el-option>
              <el-option label="金币" :value="4"></el-option>
              <el-option label="立减金" :value="6"></el-option>
              <el-option label="买二返一卡" :value="8"></el-option>
              <el-option label="超级回馈卡" :value="7"></el-option>
              <el-option label="保护罩" :value="9"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="道具批次：">
            <el-input v-model="params.id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchList">查询</el-button>
            <el-button type="deafult" @click="clearParams">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <el-table :data="list" style="width:100%">
        <el-table-column label="道具批次" prop="id"></el-table-column>
        <el-table-column label="道具类型" prop="type">
          <template slot-scope="scope">{{opts.type[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="道具名称">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 4">--</span>
            <span v-else>{{scope.row.name}}</span>
          </template>
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
            <template v-if="scope.row.type === 4 || scope.row.type === 6 || scope.row.type === 7">
              <span>--</span>
            </template>
            <template v-else>
              <template v-if="scope.row.limitStatus">{{scope.row.remainAmount}}</template>
              <template v-else>不限量</template>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{opts.status[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="最后操作">
          <template
            slot-scope="scope"
          >{{scope.row.operator + ' '}}{{scope.row.updateTime | date2dateStr}}</template>
        </el-table-column>
        <el-table-column label="操作" prop="id">
          <template slot-scope="scope">
            <template v-if="scope.row.status === 0">
              <router-link :to="{ path: `edit/${scope.row.id}`, append: true}">
                <span class="font-blue">编辑</span>
              </router-link>
              <span class="font-blue" @click="openCard(scope.row.id)">启用</span>
            </template>
            <template v-if="scope.row.status === 1">
              <span class="font-blue" @click="closeCard(scope.row.id)">终止</span>
              <router-link :to="{ path: `details/${scope.row.id}`, append:true}">
                <span class="font-blue">查看</span>
              </router-link>
            </template>
            <template v-if="scope.row.status === 2">
              <router-link :to="{ path: `details/${scope.row.id}`, append:true}">
                <span class="font-blue">查看</span>
              </router-link>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="total>page.pageSize">
        <el-pagination
          :current-page.sync="page.pageNum"
          @current-change="getList"
          background
          :total="total"
          :pager-count="5"
          :page-size="page.pageSize"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "itemCardList",
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 20
      },
      // 福袋预留
      opts: {
        status: ["草稿", "生效中", "已结束"],
        type: [
          "",
          "全民拼卡",
          "参团卡",
          "抽奖卡",
          "金币",
          "",
          "立减金",
          "超级回馈卡",
          "买二反一卡",
          "保护罩"
        ]
      },
      list: [],
      total: 0,
      params: {
        status: "",
        type: "",
        id: ""
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 搜索
    searchList() {
      this.getList(1);
    },
    clearParams() {
      this.params = {
        status: "",
        type: "",
        id: ""
      };
    },
    getList(index = 1) {
      const params = {
        pageNum: index,
        pageSize: this.page.pageSize
      };
      if (this.params.status !== "") {
        params.status = this.params.status;
      }
      if (this.params.type !== "") {
        params.type = this.params.type;
      }
      if (this.params.id !== "") {
        params.id = this.params.id;
      }
      this.$service.privilege.itemCard.getCardsByPage(params).then(res => {
        this.total = res.total;
        this.list = res.list;
        this.page.pageNum = res.pageNum;
      });
    },
    // 添加道具卡
    addItemCard() {
      this.$router.push({ path: "" });
    },
    // 关闭，开启道具卡
    openCard(id) {
      this.$confirm(
        "你确定启用该道具卡吗？启用后将不可再进行编辑？",
        "二次确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        const params = {
          id,
          changeStatus: 1
        };
        this.$service.privilege.itemCard.changeCardStatus(params).then(res => {
          this.$message.success("启用成功");
          this.getList();
        });
      });
    },
    closeCard(id) {
      this.$confirm("你确认终止该道具卡吗？", "二次确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const params = {
          id,
          changeStatus: 0
        };
        this.$service.privilege.itemCard.changeCardStatus(params).then(res => {
          this.$message.success("终止成功");
          this.getList();
        });
      });
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
  }
};
</script>

<style scoped>
.card-margin {
  margin-bottom: 20px;
}
.header::after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.card-margin .left {
  float: left;
}
.card-margin .right {
  float: right;
}
.search-form .el-select {
  width: 120px;
}
.search-form .el-form-item {
  margin-right: 20px;
}
</style>
