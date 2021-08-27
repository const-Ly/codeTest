<template>
  <div class="business">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>运营导航配置</span>
        <el-button style="float: right; padding: 3px 0" @click="add()" type="text">添加</el-button>
      </div>
      <el-table :data="params.list" border style="width: 100%">
          <el-table-column label="业务代码" prop="code"></el-table-column>
          <el-table-column prop="name" label="业务名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="option" @click="edit(scope.row)">编辑</span>
              <span class="option" @click="del(scope.row)">删除</span>
            </template> 
          </el-table-column>
        </el-table>
        <el-pagination :current-page.sync="params.pageNum" :page-count="params.pages" @current-change="changePage" background layout="prev, pager, next"></el-pagination>
    </el-card>
    

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="450px">
      <el-form ref="form" label-width="80px">
        <el-form-item label="业务代码">
          <el-input class="w200" :disabled="codeDisabel" v-only-num="businessForm.code" :max-len="5" v-model="businessForm.code"></el-input> 
          <span class="tis"><i>*</i> 1-99999的数字</span>
        </el-form-item>
        <el-form-item label="业务名称">
          <el-input class="w200" :maxlength="10" v-model="businessForm.name"></el-input>
          <span class="tis"><i>*</i> 1-10个字</span>
        </el-form-item>
        <el-form-item label="业务描述">
          <el-input class="w200" :maxlength="500" type="textarea" v-model="businessForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>


</template>

<script>
export default {
  data () {
    return {
      params: {},
      pageIndex: 1,
      pageSize: 20,
      dialogTitle: '添加',
      codeDisabel: false,
      dialogVisible: false,
      businessForm: {
        code: '',
        name: '',
        desc: ''
      },
      api: ''
    }
  },
  methods: {
    edit (row) {
      this.dialogTitle = '编辑'
      this.codeDisabel = true
      this.dialogVisible = true
      this.api = 'businesUpdate'
        this.businessForm = {
          code: row.code,
          name: row.name,
          desc: row.desc
        }
    },
    add () {
      this.codeDisabel = false
      this.dialogTitle = '添加'
      this.dialogVisible = true
      this.api = 'businesSave'
      this.businessForm = {
        code: '',
        name: '',
        desc: ''
      }
    },
    del (row) {
      let state = confirm('是否确定删除该业务类型')
      if(!state) {
        return
      }
      this.$service.home.newOperatNav.businessDel({code: row.code}).then(res => {
        if(res) {
          this.getList()
        }
      })
    },
    setParam () {
      return this.businessForm
    },
    changePage() {
      this.getList()
    },
    save () {
      let param = this.setParam()
      if (param.code == '') {
        this.$message.warning('请输入1-99999业务代码')
        return
      }
      if (param.name == '') {
        this.$message.warning('请输入1-10业务名称')
        return
      }
      this.$service.home.newOperatNav[this.api](param).then(res => {
        if(res) {
          this.getList()
          this.dialogVisible = false
        }
      })
    },
    getList () {
      this.$service.home.newOperatNav.businessList({pageIndex: this.params.pageNum, pageSize: 20}).then(res => {
        this.params = res
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>
.business {
  background: #fff;
}
.option {
  cursor: pointer;
}
.tis i {
  color: #f56c6c;
}
</style>
