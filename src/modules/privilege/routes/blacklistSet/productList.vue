<template>
  <div>
    <el-table :data="list" @selection-change="handleSelectionChange" border size="small">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="productId"  label="商品编号"></el-table-column>
      <el-table-column prop="shortTitle"  label="商品名称"></el-table-column>
      <el-table-column prop="supplierName"  label="商家名称"></el-table-column>
      <el-table-column  label="销售价">
        <template slot-scope="scope">
          {{scope.row.minPrice| currency}}- {{scope.row.maxPrice}}
        </template>
      </el-table-column>
      <template v-if="type === '1'">
        <el-table-column  label="商家优惠">
          <template slot-scope="scope">
          	<span v-if="scope.row.supplierDiscount === null">{{scope.row.supplierDiscount | placeholder}}</span>
          	<span v-else>{{scope.row.supplierDiscount | percentage}}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台优惠">
          <template slot-scope="scope">
          	<span v-if="scope.row.platformDiscount === null">{{scope.row.platformDiscount | placeholder}}</span>
          	<span v-else>{{scope.row.platformDiscount | percentage}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column  label="操作" width="70">
        <template slot-scope="scope">
          <span class="font-danger" @click="handleDel(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="cms-pagination" v-if="list.length>0">
      <el-pagination background layout="prev, pager, next" :current-page="pageNow" :page-count="pageCount" @current-change="platProPageChange"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list",
    props:{
      list:{
        type:Array,
        default () {
          return []
        }
      },
      pageNow:{
        type:Number,
        default:1
      },
      pageCount: {
        type:Number,
        default: 0
      },
      type:{
        type:String,
        default:"1"
      }
    },
    methods:{
      //选项发生变化
      handleSelectionChange (rows) {
        this.$emit('select',rows)
      },
      //当前页发生变化
      platProPageChange (pageIndex) {
        this.$emit('page',pageIndex)
      },
      //删除逻辑
      handleDel (row) {
        this.$service.privilege.blacklist.batchRemoveBlacklistProduct({
          userType:this.type,
          productInfoList:[{productId:row.productId,shortTitle:row.shortTitle}]
        }).then(res => {
          this.$emit('del')
        })
      }
    }
  }
</script>


