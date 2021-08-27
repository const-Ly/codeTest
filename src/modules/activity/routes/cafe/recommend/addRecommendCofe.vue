<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="咖啡馆名称">
        <el-input class="w200" v-model.trim="findCafe"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input class="w200" v-model.trim="findPhone" v-only-num.string="findPhone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜 索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width:100%"
      @selection-change="handleSelectionChange"
      @sort-change="tableSortChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="咖啡杯体图">
        <template slot-scope="scope">
          <img-view class="coffeeCup" :src="scope.row.coffeeCupImgUrl"></img-view>
        </template>
      </el-table-column>
      <el-table-column label="咖啡馆名称" prop="shopName"></el-table-column>
      <el-table-column label="用户昵称" prop="ownerNickName">
        <template slot-scope="scope">{{scope.row.ownerNickName?scope.row.ownerNickName:'--'}}</template>
      </el-table-column>
      <el-table-column label="手机号" prop="phoneNumber">
        <template slot-scope="scope">{{scope.row.phoneNumber?scope.row.phoneNumber:'--'}}</template>
      </el-table-column>
        <el-table-column label="design id" prop="designId">
          <template slot-scope="scope">{{scope.row.designId?scope.row.designId:'--'}}</template>
        </el-table-column>
      <el-table-column label="点赞数" prop="likeNum" sortable="custom"></el-table-column>
      <el-table-column label="销量" prop="salesNum" sortable="custom"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="cms-pagination" v-if="pages>0">
      <el-pagination
        :current-page.sync="param.pageNum"
        @current-change=" getList "
        background
        :page-count="pages"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
    <div style="text-align:center" class="ma-t-40">
      <el-button type="primary" @click="saveOrUpdata">保 存</el-button>
      <el-button plain @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["onOffFromParent"],
  data() {
    return {
      param: {
        pageNum: 1,
        pageSize: 5,
        sortField: 2,
        sortType: 0,
        coffeeShopName: "",
        phoneNumber: "",
        coffeeIdList: []
      },
      total: 0,
      pages: 0,
      list: [],
      findCafe: "",
      findPhone: "",
      multipleSelection: [],
      onOff: false
    };
  },
  methods: {
    getList(idx) {
      this.param.pageNum = idx || 1;
      // if (findCafe) {
      //   this.param.coffeeShopName = findCafe;
      // }
      // this.param.coffeeShopName = this.findCafe || "";
      this.$service.activity.cafe
        .queryUnAddedListByPage(this.param)
        .then(res => {
          this.param.pageNum = res.pageNum;
          this.pages = res.pages;
          this.total = res.total;
          this.list = res.list || [];
        });
    },
    search() {
      this.param.coffeeShopName = this.findCafe
      this.param.phoneNumber = this.findPhone
      this.getList(1);
    },
    tableSortChange(column) {
      const prop = {
        likeNum: 1,
        salesNum: 2,
        uv: 3,
        recommendTime: 4
      };
      const order = {
        descending: 0,
        ascending: 1
      };
      this.param.sortField = prop[column.prop];
      this.param.sortType = order[column.order];
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    saveOrUpdata() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请至少选择一条数据");
        return false;
      } else {
        this.param.coffeeIdList = [];
        this.multipleSelection.forEach(item => {
          this.param.coffeeIdList.push(item.customCoffeeId);
        });
        this.$service.activity.cafe.addCoffeeList(this.param).then(res => {
          let ok = true;
          this.$emit("ok");
          this.getList();
          this.cancel();
        });
      }
    },
    cancel() {
      this.$emit("input", this.onOff);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
</style>