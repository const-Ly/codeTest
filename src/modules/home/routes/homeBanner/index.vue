<template>
  <div class="cms">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="编号：">
          <el-input v-model="localSerach.id" v-only-num.string="localSerach.id" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select placeholder="请选择" v-model="localSerach.status">
            <el-option label="全部" value></el-option>
            <el-option label="待开始" :value="1"></el-option>
            <el-option label="进行中" :value="2"></el-option>
            <el-option label="已结束" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="searchList">查 询</el-button>
          <el-button type="deafult" @click="clearParams">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="ma-t-10">
      <div class="table-header clearfix">
        <span>
          共
          <span style="color:#F56C6C">{{total}}</span>
          条
        </span>
        <el-button class="fr ma-l-20" type="primary" @click="windowOpen('/app/home/#/homeBanner/add')">添加</el-button>
      </div>
      <el-table :data="list" style="width:100%">
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="轮播图">
          <template slot-scope="scope">
            <img-view v-if="scope.row.imgUrl" class="pic" :src="scope.row.imgUrl"></img-view>
            <img v-else class="pic" src="@/assets/images/imgerror.png" />
          </template>
        </el-table-column>
        <el-table-column label="排序位置" prop="seq"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{statusMap(scope.row.status)}}</template>
        </el-table-column>
        <el-table-column label="开始时间" prop="beginTime"></el-table-column>
        <el-table-column label="结束时间" prop="endTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作人" prop="updateBy"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="text" @click="windowOpen(`/app/home/#/homeBanner/details/${scope.row.id}`)">查看</el-button>
              <el-button type="text" @click="windowOpen(`/app/home/#/homeBanner/edit/${scope.row.id}`)">编辑</el-button>
          </template>
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
export default {
  data () {
    return {
      localSerach: {
        id: '',
        status: ''
      },
      param: {
        pageNum: 1,
        pageSize: 20,
        id: '',
        status: ''
      },
      list: [],
      pages: 0,
      total: 0
    }
  },
  methods: {
    getList (idx) {
      this.param.pageNum = idx || 1
      this.$service.home.homeBanner
        .getListHomeBanner(this.param)
        .then(res => {
          this.param.pageNum = res.pageNum || 1
          this.pages = res.pages
          this.total = res.total
          this.list = res.list || []
        })
    },
    searchList () {
      this.param.id = this.localSerach.id
      this.param.status = this.localSerach.status
      this.getList()
    },
    clearParams () {
      this.localSerach = {
        id: '',
        status: ''
      }
    },
    statusMap (status) {
      const map = {
        1: '待开始',
        2: '进行中',
        3: '已结束'
      }
      return map[status]
    },
    windowOpen (url) {
      window.open(url)
    }
  },
  mounted () {
    this.getList()
  }
}
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
