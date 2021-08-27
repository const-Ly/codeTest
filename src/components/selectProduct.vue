<template>
  <div class="cms">

    <!-- 可选择商品列表  -->
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span>可选择商品</span>
      </div>
      <!-- 表格数据 -->
      <el-table :data="sourceData" style="width: 100%" size="small">
        <el-table-column label="商品编号" prop="productId"></el-table-column>
        <el-table-column label="商品名称" width="150" prop="shortTitle"></el-table-column>
        <el-table-column label="销售价" width="150">
          <template slot-scope="scope">{{ scope.row.minSuPrice | currency }} - {{scope.row.maxSuPrice | currency(" ")}}</template>
        </el-table-column>
        <el-table-column label="商家优惠">
          <template slot-scope="scope">{{ scope.row.supplierDiscount | percentage }}</template>
        </el-table-column>

        <template v-if="selectableCols.length > 0">
          <el-table-column v-for="(col, idx) in selectableCols" :key="idx" :label="col.label">
            <template slot-scope="scope">
              <slot :name="'selectable-'+col.prop" :col="scope.row" :idx="scope.$index"></slot>
            </template>
          </el-table-column>
        </template>

        <el-table-column :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.selectable === 1" @click="addPro(scope.row)">选择</el-button>
            <el-button type="text" disabled v-else>已选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <slot name="pagenation"></slot>
    </el-card>
    <!-- 可选择商品列表  End -->

    <!-- 已选择商品列表 -->
    <el-card class="box-card ma-t-10">
      <div slot="header">
        <span>已选择商品( <span class="font-danger">{{ selectedIdList.length }}</span>/{{ total }} )</span>
      </div>
      <!-- 表格数据 -->
      <el-table :data="selectedData" style="width: 100%" size="small">
        <el-table-column label="商品编号" prop="productId"></el-table-column>
        <el-table-column label="商品名称" width="150" prop="shortTitle"></el-table-column>
        <el-table-column label="销售价" width="150">
          <template slot-scope="scope">{{ scope.row.minSuPrice | currency }} - {{scope.row.maxSuPrice | currency(" ")}}</template>
        </el-table-column>
        <el-table-column label="商家优惠">
          <template slot-scope="scope">{{ scope.row.supplierDiscount | percentage }}</template>
        </el-table-column>

        <template v-if="selectedCols.length > 0">
          <el-table-column v-for="(col, idx) in selectedCols" :key="idx" :label="col.label">
            <template slot-scope="scope">
              <slot :name="'selected-'+col.prop" :col="scope.row" :idx="scope.$index"></slot>
            </template>
          </el-table-column>
        </template>

        <el-table-column label="">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteItem(scope.row.productId, scope.$index)">删除选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 已选择商品列表 End -->

  </div>
</template>
<script>
  export default {
    name: 'selectProduct',
    props:{
      // 可选择的商品列表
      selectableList: {
        type: Array,
        default: () => ([])
      },
      // 已选择的商品列表
      selectedList: {
        type:Array,
        default: () => ([])
      },
      total:{
        type:Number,
        default: 200
      },
      // 动态插入的可选商品列
      selectableCols:{
        type: Array,
        default: () => ([])
      },
      // 动态插入的已选商品列
      selectedCols:{
        type: Array,
        default: () => ([])
      }
    },
    data () {
      return {
        selectedData: this.selectedList
      }
    },
    watch : {
    	selectedList (nv, ov) {
    		this.selectedData = nv
    	}
    },
    computed:{
      // 可选信息
      sourceData () {
        return this.selectableList.map( pro => {
          this.$set(pro, 'selectable', this.selectedIdList.indexOf(pro.productId) > -1 ? 0 : 1)
          // todo 配置新加属性
          this.selectedCols.forEach(col => {
            let val = (pro[col.prop] !== null && pro[col.prop] !== undefined) ? pro[col.prop] : (col.default !== undefined ? col.default : '')
            this.$set(pro, col.prop, val)
          })
          return pro
        })
      },
      // 已选中列表
      selectedIdList () {
        return this.selectedData.map( item => {
          return item.productId
        })
      }
    },
    methods:{
      // 渲染指定表头
      renderHeader (h, { column, $index }) {
        let self = this
        return h('span', {
          class: 'font font-blue',
          on: {
            click: () => {
              self.checkAll()
            }
          }
        }, "选择全部")
      },
      // 同步数据
      updateDate() {
        this.$emit('change', this.selectedData)
      },
      // 选择单个商品
      addPro (item) {
        if(this.selectedData.length >= this.total){
          this.$message.warning("最多选择"+this.total+"条商品")
        }else{
          item.selectable = 0
          this.selectedData.unshift({...item})
          this.updateDate()
        }
      },
      // 选择全部
      checkAll () {
        if( this.sourceData.length === 0 ) return false
        if(this.sourceData.length + this.selectedData.length > this.total ){
          this.$message.warning("最多选择"+this.total+"条商品");
        }else{
          let rel = this.sourceData.filter( item => item.selectable === 1)
          this.selectedData = rel.concat( this.selectedData )
          this.sourceData.forEach(item => {
            if(item.selectable === 1){//是可以选择的
              item.selectable = 0
            }
          })
          this.updateDate()
        }
      },
      // 后续操作更新
      refreshCheckedList (arr) {
        this.sourceData.forEach( item => {
          arr.forEach( subitem => {
            if(subitem.productId.toString() === item.productId){
              item.selectable = 0
            }
          })
        })
      },
      //删除单个已选择
      deleteItem (productId,idx) {
        this.selectedData.splice(idx,1)
        this.sourceData.forEach(item => {
          if(item.productId === productId){
            item.selectable = 1
          }
        })
        this.updateDate()
      },
      // 校验是否为空
      getCheckedList () {
        if(this.selectedData.length === 0){
          this.$message.warning("请至少选择一个商品");return false;
        }
        return this.selectedData
      },
      // 错误提示
      errorTip (txt, cb) {
        this.$alert(txt, '提示', {
          confirmButtonText: '确定',
          callback: () => {
            cb && cb()
          }
        });
      }
    }
  }
</script>
