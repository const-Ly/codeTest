<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>规则配置(<span class="font-danger">{{ total }}</span>条)</span>
      <router-link :to="{ path: 'add',append:true }"><el-button class="fr" size="small" type="primary">添加</el-button></router-link>
    </div>
    <!-- 表格数据 -->
    <el-table :data="list" style="width:100%" size="small">
      <el-table-column label="编号" prop="ruleId"></el-table-column>
      <el-table-column label="标题" prop="ruleTitle"></el-table-column>
      <el-table-column label="使用范围" prop="useScopeStr"></el-table-column>
      <el-table-column label="最后编辑人" prop="updateBy"></el-table-column>
      <el-table-column label="最后编辑时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="font-success" @click="handleView(scope.row.ruleId)">预览</span>
          <span class="font-warning" @click="viewUrl(scope.row.ruleId)">查看链接</span>
          <router-link class="font-blue" :to="{ path: 'add?id='+scope.row.ruleId, append:true }"><span>编辑</span></router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="cms-pagination"  v-if="pages>0">
      <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
    </div>
    <el-dialog title="查看链接" :visible.sync="dialogVisible" width="40%">
      <div>
        <span ref="url">{{ url }} </span>&nbsp;<span class="font-blue" @click="handleCopy">复制</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    name: 'rule',
    data () {
      return {
        param: {
          pageIndex: 1,
          pageSize: 20
        },
        pages: 0,
        list: [],
        total:0,
        dialogVisible: false,
        url: ''
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList (pageNow) {
        this.param.pageIndex = pageNow || 1
        this.$service.param.rule.getRuleConfigPageList(this.param).then(res => {
          this.list = res.list
          this.pages = res.pages
          this.param.pageIndex = res.pageNum
          this.total = res.total
        })
      },
      viewUrl (id) {
        this.$service.param.rule.ruleUrl({ruleId: id}).then(res => {
          this.url = res
          this.dialogVisible = true
        })
      },
      // 处理复制到剪贴板
      handleCopy () {
        const copyDom = this.$refs['url']
        //创建选中范围
        const range = document.createRange();
        range.selectNode(copyDom);
        //移除剪切板中内容
        window.getSelection().removeAllRanges();
        //添加新的内容到剪切板
        window.getSelection().addRange(range);
        //复制
        const successful = document.execCommand('copy');
        try{
         successful && this.$message.success('已复制')
        } catch(err){
            alert('Oops , unable to copy!');
        }
      },
      // 处理预览
      handleView (id) {
        this.$service.param.rule.detail({ruleId: id}).then(res => {
          const win = window.open('','', 'height=800, width=414')
          win.document.write('<html><head><title>'+res.ruleTitle+'</title><link href="//cdn.quilljs.com/1.3.6/quill.core.css" rel="stylesheet"></head><body>')
          win.document.write('<div class="ql-editor">'+res.ruleContent+'</div>')
          win.document.write('</body></html>');
        })
      }
    }
  }
</script>
