<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="120px" size="small">
        <el-form-item label="抽奖活动ID：">
          <el-input  class="w200" v-model="param.lotteryId" v-only-num.string="param.lotteryId"></el-input>
        </el-form-item>
        <el-form-item label="抽奖活动名称：">
          <el-input v-model.trim="param.lotteryName" class="w200"></el-input>
        </el-form-item>
      	<el-form-item label="奖品ID：">
          <el-input  class="w200" v-model="param.rewardId" v-only-num.string="param.rewardId"></el-input>
        </el-form-item>
        <el-form-item label="奖品名称：">
          <el-input v-model.trim="param.rewardName" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="开奖方式：">
          <el-select v-model="param.lotteryType" class="w200">
            <el-option v-for="item in selects.lotteryTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户等级：">
          <el-select v-model="param.userVlevel" class="w200">
            <el-option v-for="item in selects.userVlevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="APP专享：">
          <el-select v-model="param.appOnly" class="w200">
            <el-option v-for="item in selects.appOnlys" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="口令抽奖：">
          <el-select v-model="param.needPasswd" class="w200">
            <el-option v-for="item in selects.needPasswds" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组队类型：">
          <el-select v-model="param.groupType" class="w200">
            <el-option v-for="item in selects.groupTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖品来源：">
          <el-select v-model="param.source" class="w200">
            <el-option v-for="item in selects.sources" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动状态：">
          <el-select v-model="param.status" class="w200">
            <el-option v-for="item in selects.statuss" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否置顶：">
          <el-select v-model="param.top" class="w200">
            <el-option v-for="item in selects.tops" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
    		<div slot="header" class="clearfix">
          <span>抽奖列表</span>
      		<router-link :to="{ path: 'add_one',append:true }"><el-button class="fr" size="small" type="primary">添加抽奖</el-button></router-link>
        </div>
      <!-- 表格数据 -->
    	<el-table :data="list" style="width:100%" size="small">
	      <el-table-column label="抽奖活动">
		    	<template slot-scope="scope">
            {{ scope.row.lotteryId }}<br/>{{ scope.row.lotteryName | subStr(12) }}
          </template>
		    </el-table-column>
				<el-table-column label="状态/开始时间">
		    	<template slot-scope="scope">
            {{ scope.row.statusName }}<br/>{{ scope.row.startTime }}
          </template>
		    </el-table-column>
		    <el-table-column label="开奖方式">
		    	<template slot-scope="scope">
            {{ scope.row.lotteryTypeName }}<br/>
            <span v-if="scope.row.lotteryType === 1">{{ scope.row.lotteryTime }}</span>
            <span v-else>{{ scope.row.lotteryNum }}人</span>
          </template>
		    </el-table-column>
		    <el-table-column label="用户等级/APP专享">
		    	<template slot-scope="scope">
            {{ scope.row.userVlevelName }}<br/>{{ scope.row.appOnlyName }}
          </template>
		    </el-table-column>
		    <el-table-column label="奖品来源/组队类型">
		    	<template slot-scope="scope">
            {{ scope.row.sourceName }}<br/>{{ scope.row.groupTypeName }}
            <span v-if="scope.row.groupType === 1"> {{ scope.row.forceGroupNum }}人</span>
            <span v-if="scope.row.groupType === 2"> {{ scope.row.nonForceGroupNum }}人</span>
          </template>
		    </el-table-column>
		    <el-table-column label="口令">
		    	<template slot-scope="scope">
            {{ scope.row.passwdStatusName }}<br/>
            <span v-if="scope.row.needPasswd === 1">{{ scope.row.passwd | subStr(12) }}</span>
          </template>
		    </el-table-column>
		    <el-table-column label="奖品">
		    	<template slot-scope="scope">
            {{ scope.row.rewardName | subStr(12) }}<br/>×{{ scope.row.rewardNum }}
          </template>
		    </el-table-column>
		    <el-table-column label="创建">
		    	<template slot-scope="scope">
            {{ scope.row.createBy }}<br/>{{ scope.row.createTime }}
          </template>
		    </el-table-column>
		    <el-table-column label="操作" width="130">
		    	<template slot-scope="scope">
		    		<router-link v-if="scope.row.status === 0 || scope.row.status === 1" :to="{ path: 'edit_one/'+scope.row.lotteryId, append:true }">
		    			<span class="font-blue">编辑</span>
		    		</router-link>
		    		<router-link v-if="scope.row.status === 2 || scope.row.status === 3" :to="{ path: 'view_one/'+scope.row.lotteryId, append:true }">
		    			<span class="font-blue">查看</span>
		    		</router-link>
		    		<span class="font-success"  v-if="scope.row.top === 0" @click="handleUp(scope.row)">置顶</span>
            <span class="font-info"  v-if="scope.row.top === 1" @click="handleAbrogate(scope.row)">取消置顶</span><br/>
            <span class="font-danger"  v-if="scope.row.status === 0 || scope.row.status === 1" @click="handleCloseLuckDraw(scope.row.lotteryId)">关闭抽奖</span>
		    		<router-link v-if="scope.row.status === 2" :to="{ path: 'result/'+scope.row.lotteryId, append:true }">
		    			<span class="font-warning">开奖结果</span>
						</router-link>
						<span class="font-success" @click="showPath(scope.row)">查看地址</span>
          </template>
		    </el-table-column>
	    </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="param.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
		</el-card>
		
		<!-- 弹框 -->
    <el-dialog :visible.sync="showPathFlag">
			<el-form label-width="180px" size="small">
				<el-form-item label="M站地址：">
					<span>https://m.biyao.com/lotteryDraw/lotteryDetails?lotteryId={{ lotteryId }}&type={{ type }}</span>
				</el-form-item>
				<el-form-item label="小程序地址：">
					<span>/pages/lottery/lotteryPage/lotteryPage?lotteryId={{ lotteryId }}&teamId=</span>
				</el-form-item>
			</el-form>
		</el-dialog>
  </div>
</template>
<script type="text/javascript">
  export default {
    	name: "luckDrawList",
      data() {
        let self = this
        return {
	        pages:0,
					list:[],
					showPathFlag: false,
					lotteryId: '0',
					type: '1',
          param:{//请求参数
	          lotteryId:'',	// 抽奖活动id
	          lotteryName:'',	// 抽奖活动名称
	          rewardId:'',	// 奖品id
	          rewardName:'',	// 奖品名称
	          lotteryType:null,	// 开奖方式(0满人开奖 1定时开奖)
	          userVlevel:null,	// 用户v等级限制（0：v及以上 1：v1及以上 2:v2及以上3：v3及以上 4：v4及以上 5：v5及以上）全部的时候这个字段不传值，即为null
	          appOnly:null,	// 是否app专享(0否 1是)
	          needPasswd:null,	// 口令抽奖(为0是关闭,1是开启)
	          groupType:null,	// 组队类型（0个人 1强制组队 2非强制组队）
	          source:null,	// 奖品来源（0平台  1商家）
	          status:null,	// 活动状态（0 待开始，1进行中，2已开奖，3已关闭）
	          top:null,	// 是否置顶(0否1是)
	          pageIndex:1,
	          pageSize:20,
	        },
	        selects:{
		        lotteryTypes:[	// 开奖方式
							{value: null, label: '全部'},
							{value: 1, label: '定时开奖'},
							{value: 0, label: '满人开奖'}
			      ],
		        userVlevels:[		// 用户等级
							{value: null, label: '全部'},
							{value: 0, label: 'V及以上'},
							{value: 1, label: 'V1及以上'},
							{value: 2, label: 'V2及以上'},
							{value: 3, label: 'V3及以上'},
							{value: 4, label: 'V4及以上'},
							{value: 5, label: 'V5及以上'}
			      ],
		        appOnlys:[			// APP专享
		        	{value: null, label: '全部'},
		        	{value: 0, label: '关闭'},
		        	{value: 1, label: '开启'}
			      ],
		        needPasswds:[		// 口令抽奖
		        	{value: null, label: '全部'},
		        	{value: 0, label: '关闭'},
		        	{value: 1, label: '开启'}
			      ],
			      groupTypes:[		// 组队类型
		        	{value: null, label: '全部'},
		        	{value: 0, label: '不可组队'},
		        	{value: 1, label: '强制组队'},
		        	{value: 2, label: '非强制组队'}
			      ],
		        sources:[				// 奖品来源
		        	{value: null, label: '全部'},
		        	{value: 0, label: '平台奖品'},
		        	{value: 1, label: '商家奖品'}
			      ],
		        statuss:[				// 活动状态
		        	{value: null, label: '全部'},
		        	{value: 0, label: '待开始'},
		        	{value: 1, label: '进行中'},
		        	{value: 2, label: '已开奖'},
		        	{value: 3, label: '已关闭'}
			      ],
		        tops:[					// 是否置顶
		        	{value: null, label: '全部'},
		        	{value: 1, label: '是'},
		        	{value: 0, label: '否'}
			      ]
	       	}
        }
      },
      methods:{
          getList(val) {
            let self = this
            self.param.pageIndex = val || 1
           	self.$service.activity.luckDraw.getLotteryPage(self.param).then(res => {
              self.param.pageIndex = res.pageNum
              self.pages = res.pages
              self.list = res.list
           	})
          },
          handleUp(row) {	// 置顶
        		let self = this
		        self.handleConfirm('你确认置顶该抽奖活动？',function(){
		        	self.$service.activity.luckDraw.stickLottery({
		        		lotteryId	: row.lotteryId,
		        		top	: 1
		        	}).then(res => {
		        		self.getList();
							})
		        })
          },
          handleAbrogate(row) {	// 取消置顶
        		let self = this
		        self.handleConfirm('你确认取消置顶该抽奖活动？',function(){
		        	self.$service.activity.luckDraw.stickLottery({
		        		lotteryId	: row.lotteryId,
		        		top	: 0
		        	}).then(res => {
		        		self.getList();
							})
		        })
					},
					showPath(row) {
						this.showPathFlag = true
						this.lotteryId = row.lotteryId
						this.type = row.source
					},
          handleCloseLuckDraw(lotteryId) {	// 关闭抽奖
        		let self = this
		        self.handleConfirm('你确认关闭该抽奖活动吗？关闭后不可恢复',function(){
		        	self.$service.activity.luckDraw.closeLottery({lotteryId	: lotteryId}).then(res => {
		        		self.getList();
							})
		        })
          },
          handleConfirm(hint,followUp) {	// 二次确认提示框
          	this.$confirm(hint, '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(followUp)
          }
      },
      mounted () {
        this.getList()
      }
  }
</script>
<style type="text/css" scoped>
  .btn{ margin: 5px 5px 0 0;}
</style>
