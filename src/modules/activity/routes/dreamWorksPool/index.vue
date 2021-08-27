<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="商品编号：">
          <el-input
            style="width:203px;"
            v-model.trim="param.productId"
            v-only-num.string="param.productId"
            maxlength="40"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input style="width:203px;" v-model.trim="param.shortTitle" maxlength="40"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="代理商：">
          <factorLenovoSearch v-model="param.channelCode"></factorLenovoSearch>
        </el-form-item>
        <el-form-item label="代理商分成：">
          <el-input
            class="w80"
            v-model.trim="param.channelDivideIntoStart"
            v-only-num.string="param.channelDivideIntoStart"
            maxlength="40"
          ></el-input>
          <span>-</span>
          <el-input
            class="w80"
            v-model.trim="param.channelDivideIntoEnd"
            v-only-num.string="param.channelDivideIntoEnd"
            maxlength="40"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="大V名称：">
          <DVLenovoSearch v-model="param.dvId"></DVLenovoSearch>
        </el-form-item>
        <el-form-item label="是否参加一起拼：">
          <el-select placeholder="请选择" v-model="param.joinTogGroup">
            <el-option label="全部" value></el-option>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="是否参加特权金：">
          <el-select placeholder="请选择" v-model="param.joinNovicePrivilegedGold">
            <el-option label="全部" value></el-option>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div class="table-header clearfix">
        <span>梦工厂商品</span>
        <el-button class="ma-l-20" type="primary" @click="handleExport">导出</el-button>
      </div>
      <el-table :data="list" style="width:100%">
        <el-table-column label="商品编号" prop="productId"></el-table-column>
        <el-table-column label="商品名称" prop="shortTitle"></el-table-column>
        <el-table-column label="商品价格">
          <template slot-scope="scope">{{scope.row.minSuPrice | currency}}-{{scope.row.maxSuPrice}}</template>
        </el-table-column>
        <el-table-column label="代理商" prop="channelName">
          <template slot-scope="scope">{{ scope.row.channelName? scope.row.channelName : '-' }}</template>
        </el-table-column>
        <el-table-column label="大V名称" prop="dvName">
          <template slot-scope="scope">{{ scope.row.dvName? scope.row.dvName : '-' }}</template>
        </el-table-column>
        <el-table-column label="代理商类型" prop="agentType">
          <template slot-scope="scope">{{ agentTypeMap(scope.row.agentType) }}</template>
        </el-table-column>
        <el-table-column label="代理商分成（%）">
          <template slot-scope="scope">{{ scope.row.agentDivideInto | percentage }}</template>
        </el-table-column>
        <el-table-column label="商品扣点（%）">
          <template slot-scope="scope">{{ scope.row.productCost | percentage }}</template>
        </el-table-column>
        <el-table-column label="商家优惠（%）">
          <template slot-scope="scope">{{ negativeMap(scope.row.supplierDiscount) }}</template>
        </el-table-column>
        <el-table-column label="是否参加一起拼">
          <template slot-scope="scope">{{ scope.row.joinTogGroup? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="一起拼平台优惠（%）">
          <template slot-scope="scope">{{ negativeMap(scope.row.togGroupPlatformDiscount) }}</template>
        </el-table-column>
        <el-table-column label="新用户/老客限额" prop="updateBy">
          <template slot-scope="scope">
            {{ scope.row.userCommonPrivilegeDiscountLimit!==null?scope.row.userCommonPrivilegeDiscountLimit:'-'}}
            /
            {{ scope.row.customerCommonPrivilegeDiscountLimit!==null?scope.row.customerCommonPrivilegeDiscountLimit:'-'}}
          </template>
        </el-table-column>
        <el-table-column label="是否参加特权金" prop="updateBy">
          <template slot-scope="scope">{{ scope.row.joinNovicePrivilegedGold? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="特权金平台优惠（%）">
          <template slot-scope="scope">{{ negativeMap(scope.row.privilegePlatformDiscount) }}</template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change="getList"
          background
          :page-count="pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import DVLenovoSearch from '@/components/DVLenovoSearch'
import factorLenovoSearch from '@/components/factorLenovoSearch'
export default {
  data () {
    return {
      param: {
        channelCode: '',
        dvId: '',
        channelDivideIntoStart: '',
        channelDivideIntoEnd: '',
        shortTitle: '',
        productId: '',
        joinTogGroup: '',
        joinNovicePrivilegedGold: '',
        orderByClause: '',
        pageNum: 1,
        pageSize: 20
      },
      list: [],
      total: 0,
      pages: 0
    }
  },
  components: { DVLenovoSearch, factorLenovoSearch },
  mounted () {
    this.getList()
  },
  methods: {
    getList (idx) {
      this.param.pageNum = idx || 1
      this.$service.activity.dreamWorksPool.getActivityProductByPage(this.param).then(res => {
        this.param.pageNum = res.pageNum || 1
        this.pages = res.pages
        this.total = res.total
        this.list = res.list || []
      })
    },
    search () {
      let bothExist =
        this.param.channelDivideIntoStart &&
        this.param.channelDivideIntoEnd
      if (
        bothExist &&
        this.param.channelDivideIntoEnd * 1 <=
          this.param.channelDivideIntoStart * 1
      ) {
        this.$message.warning('代理商分成：后值须大于前值')
        return false
      }

      this.getList()
    },
    clearSearch () {
      let _param = {
        channelCode: '',
        dvId: '',
        channelDivideIntoStart: '',
        channelDivideIntoEnd: '',
        shortTitle: '',
        productId: '',
        joinTogGroup: '',
        joinNovicePrivilegedGold: '',
        orderByClause: ''
      }
      this.param = Object.assign(this.param, _param)
    },
    handleExport () {
      let _param = JSON.parse(JSON.stringify(this.param))
      delete _param.pageNum
      delete _param.pageSize
      this.$service.activity.dreamWorksPool.exportExcel(_param).then(res => {
        window.open(res)
      })
    },
    agentTypeMap (agentType) {
      const map = {
        '1': '普通代理商',
        '2': '直客代理商'
      }
      if (agentType === null || agentType === '' || agentType === undefined) {
        return '--'
      } else {
        return map[agentType]
      }
    },
    negativeMap (val) {
      return (val === '' || val === null || val * 1 < 0) ? '--' : val + '%'
    }
  }
}
</script>

<style scoped></style>
