<template>
  <div class="cms">
    <el-card>
      <el-form :inline="true" label-width="100px">
        <el-form-item label="推荐商品ID：">
          <el-input
            v-model="localSerach.recommendId"
            v-only-num.string="localSerach.recommendId"
            maxlength="40"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model.trim="localSerach.productName" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="商品状态：">
          <el-select placeholder="请选择" v-model="localSerach.onSaleStatus">
            <el-option label="全部" value></el-option>
            <el-option label="在售中" :value="1"></el-option>
            <el-option label="不可售" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐状态：">
          <el-select placeholder="请选择" v-model="localSerach.recommendStatus">
            <el-option label="全部" value></el-option>
            <el-option label="待开始" :value="1"></el-option>
            <el-option label="进行中" :value="2"></el-option>
            <el-option label="已结束" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="searchList">查询</el-button>
          <el-button type="deafult" @click="clearParams">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="ma-t-10">
      <div class="table-header clearfix">
        <span>
          推荐商品共
          <span style="color:#F56C6C">{{publicPutOn.listParam.total}}</span> 条，进行中
          <span style="color:#F56C6C">{{publicPutOn.doingTotal}}</span> 条
        </span>
        <router-link :to="{ path: '/publicPutOn/add' }">
          <el-button class="fr ma-l-20" type="primary">添加</el-button>
        </router-link>
      </div>
      <el-table :data="publicPutOn.list" style="width:100%">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="推荐商品ID" prop="recommendId"></el-table-column>
        <el-table-column label="商品名称" prop="productName"></el-table-column>
        <el-table-column label="商品状态">
          <template slot-scope="scope">{{onSaleStatusMap(scope.row.onSaleStatus)}}</template>
        </el-table-column>
        <el-table-column label="商品推荐图">
          <template slot-scope="scope">
            <img-view class="pic" :src="scope.row.recommendImg"></img-view>
          </template>
        </el-table-column>
        <el-table-column label="排序位置" prop="seq"></el-table-column>
        <el-table-column label="推荐状态">
          <template slot-scope="scope">{{recommendStatusMap(scope.row.recommendStatus)}}</template>
        </el-table-column>
        <el-table-column label="更新时间" prop="operateTime"></el-table-column>
        <el-table-column label="启用时间" prop="enableTime"></el-table-column>
        <el-table-column label="禁用时间" prop="disableTime"></el-table-column>
        <el-table-column label="操作人" prop="operator"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{ path: '/publicPutOn/details/'+ scope.row.id }">
              <el-button type="text">查看</el-button>
            </router-link>
            <router-link :to="{ path: '/publicPutOn/edit/'+ scope.row.id }">
              <el-button type="text">编辑</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="publicPutOn.listParam.pages>0">
        <el-pagination
          :current-page.sync="publicPutOn.listParam.pageNum"
          @current-change="myGetList"
          background
          :page-count="publicPutOn.listParam.pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 此页面使用了vuex作状态提升和逻辑分离，具体路径见 "../../store/modules/reduceMoneyBag"
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      localSerach: {
        recommendId: "",
        productName: "",
        onSaleStatus: "",
        recommendStatus: ""
      },
      doingTotal: ""
    };
  },
  methods: {
    ...mapActions({
      getList: "publicPutOn_getList",
    }),
    searchList() {
      this.getList({
        pageNum: 1,
        recommendId: this.localSerach.recommendId,
        productName: this.localSerach.productName,
        onSaleStatus: this.localSerach.onSaleStatus,
        recommendStatus: this.localSerach.recommendStatus
      });
    },
    clearParams() {
      this.localSerach = {
        recommendId: "",
        productName: "",
        onSaleStatus: "",
        recommendStatus: ""
      };
    },
    // 商品状态映射
    onSaleStatusMap(status) {
      const map = {
        0: "不可售",
        1: "在售中"
      };
      return map[status];
    },
    // 推荐状态映射
    recommendStatusMap(status) {
      const map = {
        1: "待开始",
        2: "进行中",
        3: "已结束"
      };
      return map[status];
    },
    myGetList(pageNum) {
      this.getList({
        pageNum: pageNum
      });
    }
  },
  mounted() {
    this.getList({
      pageNum: 1,
      recommendId: "",
      productName: "",
      onSaleStatus: "",
      recommendStatus: ""
    });
  },
  computed: {
    ...mapState({
      publicPutOn: state => state.publicPutOn
    })
  }
};
</script>

<style scoped>
.table-header {
  height: 32px;
  line-height: 32px;
}
.pic {
  width: 80px;
  height: 80px;
}
</style>