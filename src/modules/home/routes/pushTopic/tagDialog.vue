<template>
  <el-dialog title="选择标签" width="60%" :visible.sync="dialogShow" @close ="params.tagName = ''">
    <div class="labels">
      <ul>
        <li>
          <label>标签名称 </label>
          <el-input style="margin-left: 15px;" class="w300" v-model="params.tagName" type="text"></el-input>
        </li>
        <li>
          <el-button type="primary" @click="getLabel(1)">搜索</el-button>
          <a class="font-blue ma-l-20" href="http://scm.biyao.com/view/tag/tagList.html" target="_blank">创建&查看标签</a>
        </li>
        <li>
          <el-table @select-all="selectAllList" @select="handleSelectionChange" ref="multipleTable" :data="tableList" style="width: 100%">
            <el-table-column prop="tagName" label="标签名称"></el-table-column>
            <el-table-column prop="type" label="标签类型"></el-table-column>
            <el-table-column prop="onSaleProductNum" label="在售商品数"></el-table-column>
            <el-table-column width="60" type="selection"></el-table-column>
          </el-table>
        </li>
        <li>
          <el-pagination class="pagination" :current-page.sync="params.pageIndex" :page-count="pages" @current-change="getLabel" background layout="prev, pager, next"></el-pagination>
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelTag">取 消</el-button>
      <el-button type="primary" @click="determine">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
  name: "labels",
  props:{
    echoList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 总页数
      pages: 1, 
      // 搜索的参数
      params: { 
        tagName: '',
        pageIndex: 1,
        pageSize: 10
      },
      dialogShow: false,
      selectListAll: [], // 所有选中内容
      selectListNum: 0, // 当前选中个数
      tableList: [] // 表格数据
    }
  },
  methods: {
    getLabel (val) {
      this.params.pageIndex = val || 1
      this.$service.home.pushTopic.labelList(this.params).then(res => {
        this.tableList = res.list
        this.params.pageIndex = res.pageNum
        this.pages = res.pages
        
        this.synSelectList()
      })
    },
    // 同步当前选中数组和所有选中数组内容
    synSelectList () {
      let i, j, item, e
      this.selectList = []
      this.selectListNum = 0
      for (i = 0; i < this.selectListAll.length; i++) {
        item = this.selectListAll[i]
        for (j = 0; j < this.tableList.length; j++) {
          e = this.tableList[j]
          if (item.tagId === e.tagId) {
            let _item = this.tableList[j]
            this.selectListNum++
            setTimeout(() => {
              this.$refs.multipleTable.toggleRowSelection(_item, true)
            })
          }
        }
      }
    },
    // 更改选中状态
    handleSelectionChange (arr, row) {
      if (arr.length > this.selectListNum) { // 增加勾选
        this.selectListAll.push(row)
        this.$refs.multipleTable.toggleRowSelection(row, true)
      } else { // 减少勾选
        for (let i = 0; i < this.selectListAll.length; i++) {
          if (row.tagId === this.selectListAll[i].tagId) {
            this.selectListAll.splice(i,1)
            break
          }
        }
      }
      this.selectListNum = arr.length
    },
    // 取消选择标签
    cancelTag () {
      this.dialogShow = false
      this.tableList = []
    },
    // 确认选择标签，将暂存的数据显示在页面
    determine () {
      this.$emit('syncData', this.selectListAll)
      this.dialogShow = false
      this.tableList = []
    },
    // 全选当前页
    selectAllList (arr) {
      let i, j, item, e, flag
      if (arr.length > 0) {
        for (i = 0; i < this.tableList.length; i++) {
          flag = true
          item = this.tableList[i]
          for (j = 0; j < this.selectListAll.length; j++) {
            e = this.selectListAll[j]
            if (item.tagId === e.tagId) {
              flag = false
              break
            }
          }
          if (flag) this.selectListAll.push(item)
        }
      } else {
        for (i = 0; i < this.selectListAll.length; i++) {
          item = this.selectListAll[i]
          for (j = 0; j < this.tableList.length; j++) {
            e = this.tableList[j]
            if (item.tagId === e.tagId) {
              this.selectListAll.splice(i--, 1)
              break
            }
          }
        }
      }
    },

    // 已选中数据备份
    listCopy (arr) {
      let i = 0
      this.selectListAll = []
      for (i = 0; i < arr.length; i++) {
        this.selectListAll.push(arr[i])
      }
    },

    // dialog init
    dialogInit (arr) {
      this.listCopy(arr)
      this.getLabel()
    }
  },
  mounted () {
    this.dialogInit(this.echoList)
  }
}
</script>
<style>
.labels ul li {
  margin-top: 30px;
}
.labels ul li:nth-child(1) {
  margin: 0;
}
</style>


