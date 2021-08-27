<template>
  <el-row>
    <el-col :span="24" class="slides-header">
      <el-button class="add-btn" size="small" @click="jumpEdit(false)">添加轮播图</el-button>
      <el-button @click="saveSort" class="save-btn" size="small">保存排序</el-button>
      <div class="header">定制频道轮播图</div>
    </el-col>
    <el-col :span="24">
      <el-table :data="slidesList" border>
        <el-table-column prop="sequence" width="100" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="jumpTypeDesc" label="跳转类型"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column label="调整排序" width="150">
          <template slot-scope="scope">
            <i class="caret-top" @click="adjustmenSort(scope.$index, -1)"></i>
            <i class="caret-bottom" @click="adjustmenSort(scope.$index, 1)"></i>
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <span class="font-danger" @click="delSlides(scope.row)">删除</span>
            <span class="font-danger" @click="jumpEdit(scope.row)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      slidesList: []
    }
  },
  methods: {
    adjustmenSort(index, num) {
      let middleman, list = this.slidesList, n, p;
      if((index > 0 && num === -1) || (index < list.length - 1 && num === 1)) {
        n = list[index];
        p = list[index + num];
        list.splice(index + num, 1, n);
        list.splice(index, 1, p);
      }
    },
    getSlides() {
      this.$service.customized.slides.list().then(res => {
        this.slidesList = res
      });
    },
    jumpEdit(item) {
      let url = item? '/slides/edit?id='+item.id : '/slides/edit';
      this.$router.push({ path: url})
    },
    delSlides(item) {
      let state = confirm('是否删除该行记录？');
      if(state) {
        this.$service.customized.slides.deletel({id: item.id}).then(res => {
          this.$message.success('删除成功！');
          this.getSlides();
        });
      }
    },
    reParam() {
      let arr = [];
      this.slidesList.forEach(item => {
        arr.push(item.id);
      })
      return arr;
    },
    saveSort() {
      let params = this.reParam();
      if(params) {
         this.$service.customized.slides.sort(params).then(res => {
          this.$message.success('保存成功！');
          this.getSlides();
        });
      }
    }
  },
  mounted() {
    this.getSlides()
  }
}
</script>

<style>
.slides-header {
  height: 40px;
  border-radius: 3px;
  background-color: #fff;
}
.slides-header .header {
  line-height: 40px;
  margin-left: 30px;
}
.save-btn, .add-btn {
  float: right;
  margin-right: 20px;
  margin-top: 5px;
}
.caret-top {
  display: block;
  width: 0px;
  height: 0px;
  border-width: 0px 7px 7px 7px;
  border-style: solid;
  border-color: transparent transparent  #000 transparent;
  margin-bottom: 5px;
}
.caret-bottom { 
  display: block;
  width: 0px;
  height: 0px;
  border-width: 7px 7px 0px 7px;
  border-style: solid;
  border-color: #000 transparent transparent transparent;
}
/* .el-icon-caret-top {
  line-height: 30px;
}
.el-icon-caret-bottom {
  line-height: 10px;
} */
</style>


