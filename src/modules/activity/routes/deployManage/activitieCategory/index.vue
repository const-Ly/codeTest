<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="类目选择：">
          <el-cascader class="w300" :options="categoryList"  ref="category" change-on-select :props="config" @change="handleChange" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="映射开关：">
          <el-radio-group v-model="param.mappingSwitch">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>活动类目配置</span>
        <router-link :to="{ path: 'activitieCategoryBatch',append:true }">
          <el-button class="fr" type="primary">批量设置</el-button>
        </router-link>
      </div>
      <el-row>
        <el-col :span="7">类目名称</el-col>
        <el-col :span="3">津贴抵扣比例（%）</el-col>
        <el-col :span="3">扣点比例（%）</el-col>
        <el-col :span="3">商家最低优惠金额</el-col>
        <el-col :span="3">映射开关</el-col>
        <el-col :span="5">操作</el-col>
      </el-row>
      <div style="max-height:500px;overflow-y:scroll">
        <el-tree :data="list" :props="props" node-key="categoryId" default-expand-all>
          <el-row slot-scope="{ node, data }" style="width:100%">
            <el-col :span="7">{{ data.categoryName }}</el-col>
            <el-col :span="3">
              <div :class="data.level === 2?'ma-ls-10':data.level=== 3?'ma-ls-20':''">
                <span v-if="data.allowanceDiscountRatio">{{data.allowanceDiscountRatio}}</span>
                <span v-else>-</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div :class="data.level === 2?'ma-ls-10':data.level=== 3?'ma-ls-20':''">
                <span v-if="data.minDiscountPointRatio !== '' || data.minDiscountPointRatio !== null">
                  {{data.minDiscountPointRatio}}-{{data.maxDiscountPointRatio}}
                </span>
                <span v-else>-</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div :class="data.level === 2?'ma-ls-10':data.level=== 3?'ma-ls-20':''">
              	<span v-if="data.lowestDiscountAmount">{{ data.lowestDiscountAmount }}元</span>
              	<span v-else>&nbsp;</span>
              </div>
            </el-col>
            <el-col :span="3">
              <template v-if="data.level === 3">{{ data.mappingSwitchName}}</template>
              <template v-else><span style="opacity:0">占位符</span></template>
            </el-col>
            <el-col :span="5">
              <template v-if="data.level === 3">
                <span class="font-warning" @click="updateLevel3Id(data.categoryId, 2)">查看日志</span>
                <span class="font-blue ma-l-20" @click="updateLevel3Id(data.categoryId, 1)">编辑</span>
              </template>
            </el-col>
          </el-row>
        </el-tree>
      </div>
    </el-card>
  
    <!-- 查看日志 -->
    <el-dialog title="查看日志" :visible.sync="logsDialog" width="50%">
      <el-table :data="logList">
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="操作人" prop="operator"></el-table-column>
        <el-table-column label="操作时间" prop="createTime"></el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="logsPages>0" >
        <el-pagination :current-page="logsParam.pageIndex" @current-change="getLogList" :page-count="logsPages" background layout="prev, pager, next" ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

    <!-- 编辑类目信息 -->
    <el-dialog title="编辑" :visible.sync="editDialog" width="50%">
      <el-form label-width="200px">
        <el-form-item label="映射开关：">
          <el-radio-group v-model="categoryInfo.mappingSwitch" @change="mappingSwitchUpdata">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商家最低优惠金额（元）：" v-if="categoryInfo.mappingSwitch === 1">
          <el-input v-model="categoryInfo.lowestDiscountAmount" v-only-num="categoryInfo.lowestDiscountAmount" :max-len="2" class="w150"></el-input>
          <span class="font font-dark0">1-99的整数</span>
        </el-form-item>
        <el-form-item label="津贴抵扣比例（%）">
          <el-input v-model="categoryInfo.allowanceDiscountRatio" v-only-num="categoryInfo.allowanceDiscountRatio" :max-len="2" class="w150"></el-input>
          <span class="font font-dark0">0-99的整数</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="saveCategory">提交保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script type="text/javascript">
  export default {
    name: "activitieCategory",
    data () {
      return {
        param: {
          firstLevelBackendCategoryId: '',
          secondLevelBackendCategoryId: '',
          thirdLevelBackendCategoryId: '',
          mappingSwitch:-1
        },
        list: [], // 类目信息
        props:{
          label: 'categoryName',
          children: 'subCategoryList'
        },
        /* 日志相关参数 */
        logList: [], // 日志列表
        logsParam:{
          categoryId:null,
          pageIndex:1,
          pageSize:20
        },
        logsDialog:false,
        logsPages:0,

        // 编辑相关参数
        editDialog:false,
        categoryInfo:{
          categoryIdList:[],
          mappingSwitch:0,
          lowestDiscountAmount: '',
          allowanceDiscountRatio: ''
        },
        level3Id: null,
        config:{ //三级联动的配置
          value:'categoryId',
          label: 'categoryName',
          children: 'subCategoryList'
        },
        categoryList:[], //所有类目信息
      }
    },
    methods: {
      getList () {
        this.$service.activity.deployManage.getAllActivityCategoryList(this.param).then(res => {
          this.list = res
        })
      },
      updateLevel3Id (id, type) { // type  1编辑   2 查看日志
        this.level3Id = id
        if(type === 1){
          this.getDetail()
        }else {
          this.getLogList()
        }
      },
      // 获取三级类目详情
      getDetail () {
        this.$service.activity.deployManage.getActivityCategoryById({categoryId:this.level3Id}).then(res => {
          this.categoryInfo.categoryIdList = [res.categoryId ]
          this.categoryInfo.mappingSwitch = res.mappingSwitch
          this.categoryInfo.lowestDiscountAmount = res.lowestDiscountAmount
          this.categoryInfo.allowanceDiscountRatio = res.allowanceDiscountRatio || ''
          this.editDialog = true
        })
      },
      // 获取日志列表
      getLogList(pageNow) { 
        this.logsParam.pageIndex = pageNow || 1
        this.logsParam.categoryId = this.level3Id
        this.$service.activity.deployManage.stopActivity(this.logsParam).then(res => {
          this.logsParam.pageIndex = res.pageNum
          this.logsPages = res.pages
          this.logList = res.list
          this.logsDialog = true
        })
      },
      // 更新编辑弹层里面的商家最低优惠金额
      mappingSwitchUpdata () {
      	this.$service.activity.deployManage.getActivityCategoryById({categoryId:this.level3Id}).then(res => {
          this.categoryInfo.lowestDiscountAmount = res.lowestDiscountAmount
        })
      },
      // 保存类目信息
      saveCategory () {
        if(this.categoryInfo.mappingSwitch === 1 && this.categoryInfo.lowestDiscountAmount === ''){
          this.$message.warning("请输入商家最低优惠金额（元）")
          return false
        }else if(this.categoryInfo.mappingSwitch === 1 && this.categoryInfo.lowestDiscountAmount < 1){
        	this.$message.warning("商家最低优惠金额（元）必须是1到99的整数")
          return false
        }
        
        if(this.categoryInfo.allowanceDiscountRatio === '' || this.categoryInfo.allowanceDiscountRatio === null){
          this.$message.warning("请输入津贴抵扣比例（%）")
          return false
        }
        this.$service.activity.deployManage.saveOrUpdActivityCategory(this.categoryInfo).then(res => {
        	if(res.msg){
        		this.$message.warning(res.msg)
        	}else{
        		this.$message.success("提交成功")
        	}
          this.getList()
	        this.editDialog = false
        })
      },
      // 获取所有后台类目信息
      getBackendCategoryTree () {
        this.$service.common.getBackendCategoryTree().then(res => {
          this.categoryList = res
        })
      },
      //选择的三级联动信息
      handleChange (val) {
        let arr = val.concat(["","",""])
        this.param.firstLevelBackendCategoryId = arr[0]
        this.param.secondLevelBackendCategoryId = arr[1]
        this.param.thirdLevelBackendCategoryId = arr[2]
      },
    },
    created () {
      this.getList()
      this.getBackendCategoryTree()
    }
  }
</script>
