<template>
  <div class="cms">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="批次号：">
          <el-input v-model="localSerach.id" v-only-num.string="localSerach.id" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="localSerach.status" placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="草稿" :value="0"></el-option>
            <el-option label="生效中" :value="1"></el-option>
            <el-option label="已结束" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchList">查询</el-button>
          <el-button type="deafult" @click="clearParams">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="ma-t-10">
      <div class="table-header clearfix">
        <span>
          立减金包（
          <span style="color:#F56C6C">{{reduceMoneyBag.listParam.total}}</span>条 ）
        </span>
        <router-link :to="{ path: '/reduceMoneyBag/add' }">
          <el-button class="fr ma-l-20" type="primary">添加</el-button>
        </router-link>
      </div>
      <el-table :data="reduceMoneyBag.list" style="width:100%">
        <el-table-column label="批次号" prop="id"></el-table-column>
        <el-table-column label="立减金包金额">
          <template slot-scope="scope">{{scope.row.minValue}}-{{scope.row.maxValue}}</template>
        </el-table-column>
        <el-table-column label="文案说明" prop="remark">
          <template slot-scope="scope">{{ scope.row.remark | placeholder }}</template>
        </el-table-column>
        <el-table-column label="数量" prop="number"></el-table-column>
        <el-table-column label="立减金比例（%）">
          <template slot-scope="scope">{{scope.row.terms.join('、')}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{statusMap(scope.row.status)}}</template>
        </el-table-column>
        <el-table-column label="最后操作">
          <template slot-scope="scope">
            <p>{{scope.row.operator}}</p>
            <p>{{scope.row.operateTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{ path: '/reduceMoneyBag/edit/'+ scope.row.id }">
              <el-button type="text" v-if="scope.row.status === 0">编辑</el-button>
            </router-link>
            <el-button
              type="text"
              v-if="scope.row.status === 0"
              @click="myChangeStatus(scope.row.id,1)"
            >启用</el-button>
            <el-button
              type="text"
              v-if="scope.row.status === 1"
              @click="myChangeStatus(scope.row.id,2)"
            >禁用</el-button>
            <router-link :to="{ path: '/reduceMoneyBag/details/'+ scope.row.id }">
              <el-button type="text" v-if="scope.row.status === 1 || scope.row.status === 2">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="reduceMoneyBag.listParam.pages>0">
        <el-pagination
          :current-page.sync="reduceMoneyBag.listParam.pageNum"
          @current-change="myGetList"
          background
          :page-count="reduceMoneyBag.listParam.pages"
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
        id: "",
        status: ""
      }
    };
  },
  methods: {
    ...mapActions({
      getList: "reduceMoneyBag_getList",
      changeStatus: "reduceMoneyBag_changeStatus"
    }),
    searchList() {
      this.getList({
        pageNum: 1,
        id: this.localSerach.id,
        status: this.localSerach.status
      });
    },
    clearParams() {
      this.localSerach = {
        id: "",
        status: ""
      };
    },
    statusMap(status) {
      const map = {
        0: "草稿",
        1: "生效中",
        2: "已结束"
      };
      return map[status];
    },
    myChangeStatus(id,status) {
      let str = status===1?'你是否确定启用该立减金包，启用后会被使用，不可再编辑？':'是否确认禁用该立减金包，禁用后不会再继续被使用？'
      this.$confirm(str, "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否"
      }).then(() => {
        this.changeStatus({
          id:id,
          status:status
        }).then(()=>{
          this.getList()
        })
      });
    },
    myGetList(pageNum){
      this.getList({
        pageNum:pageNum
      })
    }
  },
  mounted() {
    this.getList({
      pageNum:1,
      id:'',
      status:''
    });
  },
  computed: {
    ...mapState({
      reduceMoneyBag: state => state.reduceMoneyBag
    })
  }
};
</script>

<style scoped>
.table-header {
  height: 32px;
  line-height: 32px;
}
</style>
