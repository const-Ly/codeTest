<template>
  <div class="cms">
    <el-card class="box-card">
			<div slot="header" class="clearfix">
        <span class="line-32">每日上新（{{total}}条）</span>
      </div>
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="上新日期：">
					<el-date-picker v-model="param.beginTime" class="w200" type="date" placeholder="选择日期"></el-date-picker>
					<el-date-picker v-model="param.endTime" class="w200" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="商品编号：">
          <el-input v-model.trim="param.spuId" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearSearch()">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
    	<el-table :data="list" style="width:100%">
				<el-table-column label="上新日期" prop="onShelveDate"></el-table-column>
				<el-table-column label="商品数" prop="goodsNum"></el-table-column>
				<el-table-column label="排时商品数" prop="arrangeTimeNum"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<router-link class="font-blue" :to="{ path: 'goods/' + scope.row.onShelveDate +  '/' + scope.row.originOnShelveDate,append:true }">管理</router-link>
					</template>
				</el-table-column>
	    </el-table>
	    
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageNum" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    	name: "dailyNewGoods",
      data() {
        return {
					pages: 0,
					total: 0,
	        list: [],
          param: {
						beginTime: new Date().getTime() - 3600 * 1000 * 24 * 7,
						endTime: new Date().getTime() + 3600 * 1000 * 24 * 7,
						spuId: '',
	          pageNum: 1,
	          pageSize: 20
	        }
        }
      },
      methods:{
          getList(val) {
            this.param.pageNum = val || 1
            let _param = {
              spuId: this.param.spuId,
              pageNum: this.param.pageNum,
              pageSize: this.param.pageSize
            }
            if (this.param.beginTime) {
              _param.beginTime = this.$utils.date2str(new Date(this.param.beginTime))
            } else {
              _param.beginTime = ''
            }
            if (this.param.endTime) {
              _param.endTime = this.$utils.date2str(new Date(this.param.endTime))
            } else {
              _param.endTime = ''
            }
           	this.$service.activity.dailyNewGoods.list(_param).then(res => {
           		this.param.pageNum = res.pageNum
              this.pages = res.pages
							this.total = res.total
							this.list = res.list
						 })
          },
          clearSearch() {
						this.param.beginTime = new Date().getTime() - 3600 * 1000 * 24 * 7
						this.param.endTime = new Date().getTime() + 3600 * 1000 * 24 * 7
						this.param.spuId = ''
          }
      },
      mounted () {
        this.getList()
      }
  }
</script>

<style type="text/css" scoped>
</style>
