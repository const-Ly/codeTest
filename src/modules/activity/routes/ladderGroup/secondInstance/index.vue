<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="100px" size="small">
        <el-form-item label="">
          <el-select v-model="enumset.search" class="w100" @change="handleChange">
            <el-option label="活动名称" :value="1"></el-option>
            <el-option label="商品编号" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="w200" v-if="enumset.search === 1" v-model.trim="param.activityNameQuery"></el-input>
          <el-input class="w200" v-else v-model="param.spuIdQuery" v-only-num.string="param.spuIdQuery"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <div>
            <el-date-picker v-model="param.lowerBeginTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" class="w200"></el-date-picker> -
            <el-date-picker v-model="param.upperBeginTime" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" class="w200"></el-date-picker>
          </div>
        </el-form-item><br>
        <el-form-item label="审核状态：">
          <el-select v-model="param.auditStatus" class="w200">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="二审中" :value="2"></el-option>
            <el-option label="审核通过" :value="3"></el-option>
            <el-option label="审核驳回" :value="4"></el-option>
            <el-option label="已作废" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getData()" class="ma-l-20">查询</el-button>
          <el-button @click="clearParam">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span>阶梯团活动二审（查询出 <span class="font-danger">{{total}}</span> 条）</span>
      </div>
      <!-- 表格数据 -->
      <el-table :data="list" style="width:100%" size="small">
        <el-table-column label="ID">
          <template slot-scope="scope">
            <a :href="'http://cms.biyao.com/app/activity#/ladderGroup/list/view/'+scope.row.id" class="font-blue" target="_blank">{{ scope.row.id }}</a>
          </template>
        </el-table-column>
        <el-table-column label="活动名称" prop="name"></el-table-column>
        <el-table-column label="开始时间" prop="beginTime"></el-table-column>
        <el-table-column label="结束时间" prop="endTime"></el-table-column>
        <el-table-column label="商品数">
          <template slot-scope="scope">
            {{ scope.row.remainingProductNumber }}/{{ scope.row.totalProductNumber }}
          </template>
        </el-table-column>
        <el-table-column label="新客补贴" prop="newerSubsidy"></el-table-column>
        <el-table-column label="拼团人数" prop="groupSize"></el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
          <span class="font-blue" @click="viewVirify(scope.row.verifyTermId, 0)">{{ scope.row.auditStatusDes }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="scope.row.auditStatus === 2">
            <span class="font-warning" @click="viewVirify(scope.row.verifyTermId, 2)">审核</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getData" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-card>

    <!-- 审核详情 -->
    <verify :info="verifyResultInfo" :enum-val="verifyEnum" ref="verify" @reload="getData(1)"></verify>

  </div>
</template>

<script>
  import Verify from '../activity/verify'
  export default {
    name: 'secondInstance',
    data () {
      return {
        param: { // 查询参数
          activityNameQuery: '',
          spuIdQuery: '',
          lowerBeginTime:'',
          upperBeginTime: '',
          auditStatus:-1,
          pageIndex:1,
          pageSize:20
        },
        enumset: { // 枚举值管理
          search: 1 // 1 活动名称  2 商品编号
        },
        pages:0,
        total:0,
        list:[],
        // 审核弹框相关
        verifyEnum:0, // 0 查看审核   2 二审审核
        verifyResultInfo:{} // 审核单信息
      }
    },
    created () {
      this.getData()
    },
    components:{ Verify },
    methods: {
      handleChange () {// 切换【活动名称/商品编号】
        this.param.activityNameQuery = ""
        this.param.spuIdQuery = ""
      },
      clearParam () {// j初始化查询条件
        this.param.activityNameQuery = ""
        this.param.spuIdQuery = ""
        this.param.lowerBeginTime = ""
        this.param.upperBeginTime = ""
        this.param.auditStatus = -1
        this.enumset.search = 1
      },
      getData (pageNow) {// 获取活动数据
        this.param.pageIndex = pageNow || 1
        this.$service.activity.ladderGroup.secondVerifyList(this.param).then(res => {
          this.list = res.list
          this.pages = res.pages
          this.total = res.total
          this.param.pageIndex = res.pageNum
        })
      },
      viewVirify (id, enumVal) {// 查看审核信息
        this.$service.activity.ladderGroup.verifyResultInfo({verifyTermId: id,verifyType:2}).then(res => {
          this.verifyEnum = enumVal
          this.verifyResultInfo = res
          this.$refs["verify"].init()
          this.$refs["verify"].show = true
        })
      }
    }
  }
</script>
<style>
  .spec .el-form-item__content {margin-left: 15px;}
</style>
