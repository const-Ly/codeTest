<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true"  label-width="100px" class="demo-form-inline">
        <el-form-item label="专题ID">
          <el-input v-model.trim="params.id" v-only-num.string="params.id"></el-input>
        </el-form-item>
        <el-form-item label="专题名称">
          <el-input v-model.trim="params.title"></el-input>
        </el-form-item>
        <el-form-item label="修改人">
          <el-input v-model.trim="params.updateBy"></el-input>
        </el-form-item>
        <el-form-item label="生效状态">
          <el-select v-model="params.status">
            <el-option v-for="item in takeEffect" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item><br />
        <el-form-item label=" ">
          <el-button type="primary" @click="query(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span>推送专题</span>
        <el-button class="fr" type="primary" @click="added">新建</el-button>
      </div>
      <el-table :data="topicList" class="topic-table">
        <el-table-column prop="id" label="专题id"></el-table-column>
        <el-table-column prop="title" label="专题标题"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="statusDes" label="生效状态"></el-table-column>
        <el-table-column prop="updateTime" label="最后修改时间"></el-table-column>
        <el-table-column prop="updateBy" label="最后修改人"></el-table-column>
        <el-table-column label="链接">
          <template slot-scope="scope">
            <span class="font-blue" v-clipboard:copy="scope.row.appRouting" v-clipboard:success="copySuccess" v-clipboard:error="copyError" @click="changeLinkType(1)">app</span>
            <span class="ma-l-10 font-blue" v-clipboard:copy="scope.row.h5Routing" v-clipboard:success="copySuccess" v-clipboard:error="copyError" @click="changeLinkType(2)">H5</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <span class="font-blue" @click="edit(scope.row)">编辑</span>
            <span class="ma-l-10 font-blue" @click="log(scope.row)">日志</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" :current-page.sync="params.pageIndex" :page-count="pages" @current-change="query" background layout="prev, pager, next"></el-pagination>
    </el-card>
  </div>
</template>
<script> 
export default {
  name: "pushTopic",
  data () {
    return {
      // 弹窗状态
      dialogVisible: false,
      // 下拉选择框内容
      takeEffect: [
        {
          value: '',
          label: '全部',
        },
        {
          value: 1,
          label: '生效中',
        }, {
          value: 0,
          label: '失效',
        }
      ],
      // 查询参数
      params: {
        pageIndex: 1,
        pageSize: 20,
        id: '',
        title: '',
        updateBy: '',
        status: ''
      },
      pages: 0,
      // 查询结果列表
      topicList: [],
      linkType: 1 // 链接类型， 1 app -- 路径,2 H5 -- 链接
    }
  },
  methods: {
    // 查询
    query (val) {
      this.params.pageIndex = val || 1
      this.$service.home.pushTopic.topicList(this.params).then(res => {
        this.topicList = res.list
        this.params.pageIndex = res.pageNum
        this.pages = res.pages
      })
    },
    changeLinkType (type) {
      // 1 app -- 路径,2 H5 -- 链接
      this.linkType = type === 1 ? '路径' : '链接'
    },
    // 复制成功
    copySuccess () {
      this.$message.success('复制' + this.linkType + '成功')
    },
    // 复制错误
    copyError () {
      this.$message.warning('复制' + this.linkType + '失败，请重新复制')
    },
    // 跳转到添加页面
    added () {
      this.$router.push({path: '/pushTopic/added'})
    },
    // 跳转编辑页面
    edit (row) {
      this.$router.push({
        path: `/pushTopic/edit/${row.id}`
      })
    },
    // 跳转日志页面
    log (row) {
      this.$router.push({
        path: `/pushTopic/log/${row.id}` 
      })
    }
  },
  mounted () {
    this.query()
  }
}
</script>
<style scoped>
.push-topic {
  background: #fff;
}
.topic-table {
  margin-top: 15px;
}
.topic-table tr td span {
  cursor: pointer;
}
.pagination {
  margin-top: 20px;
  float: right;
  padding-bottom: 20px;
}
</style>


