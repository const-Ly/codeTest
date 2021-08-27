<template>
  <div class="cms">
	<el-card class="box-card">
			<div slot="header" class="clearfix">
		<span class="line-32">商品（{{total}}条）</span>
	  </div>
	  <el-form :inline="true" label-width="150px" size="small">
		<el-form-item label="上线时间：">
					<el-time-select v-model="param.onShelveTime" :picker-options="{ start: '08:00', step: '01:00', end: '22:00'}"
				placeholder="全部"></el-time-select>

		</el-form-item>
		<el-form-item label="商品编号：">
		  <el-input v-model.trim="param.spuId" maxlength="40"></el-input>
		</el-form-item>
				<el-form-item label="商家名称：">
		  <match @change="param.supplierId = ''" ref="supplierId" value-key="supplierName" @select="param.supplierId = $event.supplierId" :list="supplierList"></match>
		</el-form-item>
		<el-form-item label=" ">
		  <el-button type="primary" @click="getList(1)">查询</el-button>
		  <el-button @click="clearSearch()">清空</el-button>
		</el-form-item>
	  </el-form>
	</el-card>
	<el-card class="box-card ma-t-10">
		<el-table :data="list" style="width:100%">
				<el-table-column label="商品编号" prop="spuId"></el-table-column>
				<el-table-column label="商品名称" prop="goodsName"></el-table-column>
				<el-table-column label="商家名称" prop="supplierName"></el-table-column>
				<el-table-column label="提交时间" prop="supplierCommitTime"></el-table-column>
				<el-table-column label="上架情况">
					<template slot-scope="scope">
						<span v-if="scope.row.onShelveStatus === 1">待上架</span>
						<span v-else-if="scope.row.onShelveStatus === 2">已上架</span>
						<span class="red" v-else-if="scope.row.onShelveStatus === 3">已取消</span>
						<span v-else>--</span>
					</template>
				</el-table-column>
				<el-table-column label="排时形式">
					<template slot-scope="scope">
						<span v-if="scope.row.arrangeTimeForm === 1">手动</span>
						<span v-else-if="scope.row.arrangeTimeForm === 2">自动</span>
						<span v-else>--</span>
					</template>
				</el-table-column>
				<el-table-column label="预计上线时间">
					<template slot-scope="scope">
						<span class="w50 inline-block">{{scope.row.arrangeTime | placeholder}}</span>
						<div id="arrangeTime">
							<!-- 当天，且为待上架状态，限制最小时间 -->
							<div v-if="datePhases(param.originOnShelveDate) === 2 && scope.row.onShelveStatus === 1">
								<input type="button" value="排时" class="arrangeTimeBtn">
								<el-time-select class="w100"
									v-model="scope.row.arrangeTime"
									:picker-options="{ start: _time, step: '01:00', end: '22:00'}"
									:clearable="false"
									@focus="updateTime"
									@change="handleArrangeTimeChange(scope.row)" ></el-time-select>
							</div>
							<!-- 当天之后，全部显示 -->
							<div v-if="datePhases(param.originOnShelveDate) === 3">
								<input type="button" value="排时" class="arrangeTimeBtn">
								<el-time-select v-model="scope.row.arrangeTime" class="w100" :picker-options="{ start: '08:00', step: '01:00', end: '22:00'}" :clearable="false" @change="handleArrangeTimeChange(scope.row)"></el-time-select>
							</div>
						</div>
						
					</template>
				</el-table-column>
		</el-table>
		
	  <div class="cms-pagination"  v-if="pages>0">
		<el-pagination :current-page.sync="param.pageNum" @current-change="getList" :page-count="pages" background layout="prev, pager, next"></el-pagination>
	  </div>
	</el-card>
  </div>
</template>

<script type="text/javascript">
  import Match from '@/components/associativeMatch'
  export default {
		name: "dailyNewGoods",
	  data() {
		return {
			pages: 0,
			total: 0,
			list: [],
			param: {
				originOnShelveDate: this.$utils.date2str(new Date(this.$route.params.date -0)),
				onShelveTime: '',
				spuId: '',
				supplierId: '',
			  pageNum: 1,
			  pageSize: 50
			},
			supplierList: [],//商家列表
			_time: '' // 现在小时数
		}
	  },
	  components:{Match},
	  methods:{
		  getList(val) {
			this.param.pageNum = val || 1
		   	this.$service.activity.dailyNewGoods.goodsList(this.param).then(res => {
		   		this.param.pageNum = res.pageNum
			 		this.pages = res.pages
					this.total = res.total
					this.list = res.list
					})
			},
			// 重置查询区
		  clearSearch() {
				this.param.onShelveTime = ''
				this.param.supplierId = ''
				this.param.spuId = ''
				// 重置商家
			  this.$refs.supplierId.clear()
			},
			//获取商家信息
			getSupplier () {
			this.$service.activity.dailyNewGoods.getSupplierInfo({
				originOnShelveDate: this.param.originOnShelveDate
			}).then(res => {
					this.supplierList = res
				})
			},
			// 排时
			handleArrangeTimeChange (row){
				this.$service.activity.dailyNewGoods.arrangeTimeManual({
					applyId: row.applyId,
					arrangeTime:row.arrangeTime,
					originOnShelveDate: this.param.originOnShelveDate
				}).then(res => {
					this.$message.success("提交成功")
					this.getList()
				}).catch(err => {
					this.getList()
				})
			},
			// 时间段，1今天之前，2今天，3今天之后
			datePhases(oldDate) {
				// 今天之前
				if( new Date().getTime() - new Date(oldDate).getTime() > 86400000 ){
					return 1
				}
				// 今天
				if(new Date().getTime() - new Date(oldDate).getTime() < 86400000 && new Date().getTime() - new Date(oldDate).getTime() > 0 ){
					return 2
				}
				// 今天之后
				if( new Date().getTime() - new Date(oldDate).getTime() < 0 ){
					return 3
				}
			},
			// 获取现在小时
			updateTime (f) {
				let h = new Date().getHours() + 1
				h < 8 && (h = 8)
				h += ':00'
				h = h.length > 4 ? h : '0' + h
				this._time = h > '08:00' ? h : '08:00'
			}
	  },
	  mounted () {
			document.getElementsByClassName('el-breadcrumb__inner')[2].innerHTML =  this.$route.params.id
			document.getElementsByTagName('title')[0].innerHTML =  this.$route.params.id
			this.getSupplier ()
			this.getList()
			this.updateTime()
	  }
  }
</script>

<style type="text/css" >
	#arrangeTime{ position: relative; display: inline-block;}
	.arrangeTimeBtn{ 
		position: absolute;
		width: 100%;
		height: 100%;
		background: #fff;
		border: 1px solid #409EFF;
		cursor: pointer;
		color: #409EFF;
	}
	.red { color: red; }
	#arrangeTime .el-input__inner{ opacity: 0 !important;}
	#arrangeTime .el-input__prefix{ display: none;}
</style>
