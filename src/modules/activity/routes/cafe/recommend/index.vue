<template>
  <div class="cms">
    <el-card class="box-card ma-t-10">
      <div class="clearfix">
        <span>推荐咖啡</span>
        <el-button class="fr" type="primary" @click="dialogFormAdd=true">添 加</el-button>
      </div>
      <el-table :data="list" stripe style="width:100%" @sort-change="tableSortChange">
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
        <el-table-column label="添加时间" prop="recommendTime" sortable="custom"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="font-danger" @click=" handleDel(scope.row.customCoffeeId)">删 除</span>
          </template>
        </el-table-column>
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
    </el-card>
    <!-- 弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogFormAdd" v-if="dialogFormAdd">
      <addRecommendCofe v-model="dialogFormAdd" :onOffFromParent="dialogFormAdd" @ok="ok"></addRecommendCofe>
    </el-dialog>
  </div>
</template>

<script>
import addRecommendCofe from "./addRecommendCofe";
export default {
  data() {
    return {
      param: {
        pageNum: 1,
        pageSize: 10,
        sortField: 4,
        sortType: 0,
        coffeeId: ""
      },
      total: 0,
      pages: 10,
      list: [],
      dialogFormAdd: false
    };
  },
  components: { addRecommendCofe },
  methods: {
    getList(idx) {
      this.param.pageNum = idx || 1;
      this.$service.activity.cafe.queryAddedListByPage(this.param).then(res => {
        this.param.pageNum = res.pageNum;
        this.pages = res.pages;
        this.total = res.total;
        this.list = res.list || [];
      });
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
    handleDel(id) {
      this.$confirm("你确认将该咖啡从推荐咖啡池中移除吗？").then(_ => {
        this.param.coffeeId = id;
        this.$service.activity.cafe.deleteCoffee(this.param).then(res => {
          this.getList();
        });
      });
    },
    ok() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.coffeeCup {
  width: 80px;
  height: 80px;
}
</style>