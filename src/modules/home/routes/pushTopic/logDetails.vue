<template>
  <el-dialog title="日志详情" :visible.sync="showDialog" width="60%">
    <el-form label-width="150px">
      <el-form-item label="专题标题 ">
        <span>{{detail.title}}</span>
      </el-form-item>
      <el-form-item label="备注 ">
        <span>{{detail.remark}}</span>
      </el-form-item>
      <el-form-item label="开始生效时间 ">
        <span>{{detail.enableTime}}</span>
      </el-form-item>
      <el-form-item label="失效时间 ">
        <span>{{detail.disableTime}}</span>
      </el-form-item>
      <el-form-item label="banner图 ">
        <img-view class="cursor-pointer" :src="detail.bannerImage"></img-view>
      </el-form-item>
      <el-form-item label="商品导入 ">
        <el-table class="ma-t-20 tagTable" :data="detail.tags" border style="width: 500px">
          <el-table-column prop="tagName" label="标签名称"></el-table-column>
          <el-table-column prop="type" label="标签类型"></el-table-column>
          <el-table-column prop="onSaleProductNum" label="在售商品数"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="排序选择 ">
        <el-radio-group v-model="detail.orderRule">
          <el-radio disabled :label="1">默认排序</el-radio>
          <el-radio disabled :label="2">周销量排序</el-radio>
          <el-radio disabled :label="3">月销量排序</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="插入固定位置商品 ">
        <ul class="clearfix">
          <li class="ma-b-10 ma-r-20 fl" v-for="(item, i) in detail.placeholders" :key="i">
            <label>第{{i + 1}}位 </label>
            <span class="w160 inline-block ma-r-20 ma-l-10">{{detail.placeholders[i]}}</span>
          </li>
        </ul>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "logDetails",
  data () {
    return {
      showDialog: false,
      detail: { // 编辑回显的数据
        logId: '',
        title: '',
        remark: '',
        enableTime: '',
        disableTime: '',
        bannerImage: '',
        orderRule: 1, // 商品排序，1默认排序，2周销量排序 3月销量
        tags: [],
        // 八个固定商品
        placeholders: ['','','','','','','','']
      }
    }
  },
  methods: {
    // 获取编辑数据
    getDetail (logId) {
      this.$service.home.pushTopic.logInfo({'logId': logId}).then(res => {
        this.detail = res
      })
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.page-content {
  margin-left: 40px;
}
.sort {
  margin-top: 35px;
}
.insert-title {
  margin-top: 35px;
}
.insert-content {
  display: flex;
  flex-wrap: wrap;
}
.insert-content li {
  margin-top: 25px;
  margin-right: 40px;
}
.w160 {
  width: 170px;
}
.insert-content li label {
  padding-right: 15px;
}
.sub-btn {
  margin-left: 400px;
  margin-top: 35px;
}
.page-content tr td span {
  cursor: pointer;
}
.tagTable{
  max-height: 441px;
  overflow-y: auto;
}
</style>