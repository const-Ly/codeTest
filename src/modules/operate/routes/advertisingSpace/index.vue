<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true"  label-width="100px" class="demo-form-inline">
        <el-form-item label="编号：">
          <el-input v-model.trim="param.id" placeholder="请输入" v-only-num.string="param.id" maxLength="10"></el-input>
        </el-form-item>
        <el-form-item label="广告位置：">
          <el-select v-model="param.position">
            <el-option label="全部" value=""></el-option>
            <el-option label="朋友首页" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用用户：">
          <el-select v-model="param.customerType">
            <el-option label="全部" value=""></el-option>
            <el-option label="新访客" :value="1"></el-option>
            <el-option label="老访客" :value="2"></el-option>
            <el-option label="老客" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="param.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="待开始" :value="1"></el-option>
            <el-option label="进行中" :value="2"></el-option>
            <el-option label="已结束" :value="3"></el-option>
          </el-select>
        </el-form-item><br />
        <el-form-item label=" ">
          <el-button type="primary" @click="query(1)">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">共 <span class="font-danger" v-text="total"></span> 条</span>
        <el-button class="fr" type="primary" @click="add">添加</el-button>
      </div>
      <el-table :data="list" class="topic-table">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column label="广告位置">
          <template slot-scope="scope">
            <span>{{ positionList[scope.row.position] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="运营图">
          <template slot-scope="scope">
            <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl">
            <img v-else src="../../../../assets/images/imgerror.png">


          </template>
        </el-table-column>
        <el-table-column prop="customerTypeDes" label="适用用户"></el-table-column>
        <el-table-column prop="seq" label="排序位置"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ statusList[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始/结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.beginTime }} - {{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="updateBy" label="操作人"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span class="font-blue" @click="edit(scope.row)">编辑</span>
            <span class="font-blue" @click="details(scope.row)">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
        :current-page.sync="param.pageNum"
        :page-count="pages"
        @current-change="query"
        background layout="prev, pager, next"></el-pagination>
    </el-card>
  </div>
</template>
<script> 
export default {
  name: "recommendOperateList",
  data () {
    return {
      param: { // 查询参数
        pageNum: 1,
        pageSize: 20,
        id: '', // 编号
        position: '', // 位置 1 朋友首页，空：全部
        customerType: '', // 适用用户
        status: '' // 状态 1:待开始2:进行中3:已结束 空：全部
      },
      list: [], // 列表
      pages: 0, // 总页数
      total: 0, // 数组总数
      positionList: [ // 位置
        '全部',
        '朋友首页'
      ],
      customerTypeList: [ // 适用用户
        '全部',
        '新访客',
        '老访客',
        '老客'
      ],
      statusList: [ // 状态
        '全部',
        '待开始',
        '进行中',
        '已结束'
      ]
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    clear () { // 清空
      this.param.id = ''
      this.param.position = ''
      this.param.customerType = ''
      this.param.status = ''
    },
    query (num) { // 查询
      this.param.pageNum = num || 1
      this.$service.operate.advertisingSpace.pageList(this.param).then(res => {
        this.list = res.list || []
        this.param.pageNum = res.pageNum
        this.pages = res.pages
        this.total = res.total
      })
    },
    add () { // 跳转到添加页面
      window.open('/app/operate/#/advertisingSpace/add')
    },
    edit (row) { // 跳转编辑页面
      window.open(`/app/operate/#/advertisingSpace/edit/${row.id}`)
    },
    details (row) { // 跳转编辑页面
      window.open(`/app/operate/#/advertisingSpace/details/${row.id}`)
    }
  }
}
</script>
<style scoped>
.topic-table {
  margin-top: 15px;
}
.topic-table tr td img {
  width: 80px;
  height: 80px;
}
.pagination {
  margin-top: 20px;
  float: right;
  padding-bottom: 20px;
}
</style>


