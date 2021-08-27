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
        <el-button class="fr" type="primary" @click="showDialog">设置金额</el-button>
      </div>
      <el-row>
        <el-col :span="10">类目名称</el-col>
        <el-col :span="4">商家最低优惠金额</el-col>
        <el-col :span="4">映射开关</el-col>
      </el-row>
      <div style="max-height:500px;overflow-y:scroll">
        <el-tree :data="list" :props="props" node-key="categoryId" ref="tree" default-expand-all show-checkbox>
          <el-row slot-scope="{ node, data }" style="width:100%">
            <el-col :span="10">{{ data.categoryName }}</el-col>
            <el-col :span="4">
              <div :class="data.level === 2?'ma-ls-10':data.level=== 3?'ma-ls-20':''">
              	<span v-if="data.lowestDiscountAmount">{{ data.lowestDiscountAmount }}元</span>
              	<span v-else>&nbsp;</span>
              </div>
            </el-col>
            <el-col :span="4">
              <template v-if="data.level === 3">{{ data.mappingSwitchName}}</template>
              <template v-else><span style="opacity:0">占位符</span></template>
            </el-col>
          </el-row>
        </el-tree>
      </div>
    </el-card>
    <!-- 编辑类目信息 -->
    <el-dialog title="编辑" :visible.sync="editDialog" width="50%">
      <el-form label-width="200px">
        <el-form-item label="映射开关：">
          <el-radio-group v-model="categoryInfo.mappingSwitch" @change="categoryInfo.lowestDiscountAmount = ''">
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
        // 编辑相关参数
        editDialog:false,
        categoryInfo:{
          categoryIdList:[],
          mappingSwitch:0,
          lowestDiscountAmount: '',
          allowanceDiscountRatio: ''
        },
        checkedLeafIdList: [],
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
      showDialog () {
        this.checkedLeafIdList = this.$refs.tree.getCheckedNodes(true)
        if(this.checkedLeafIdList.length === 0){
           return this.$message.warning("请至少选择一个三级类目")
        } 
        this.categoryInfo.mappingSwitch = 0
        this.categoryInfo.allowanceDiscountRatio = ''
        this.editDialog = true
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
          this.$message.warning("津贴抵扣比例必填，且必须小于等于选择类目的有效扣点比例 减 2")
          return false
        }
        this.categoryInfo.categoryIdList = this.checkedLeafIdList.map( item => {
          return item.categoryId
        })
        this.$service.activity.deployManage.saveOrUpdActivityCategory(this.categoryInfo)
        .then(res => {
          if(res.msg){
        		this.$message.warning(res.msg)
        	}else{
        		this.$message.success("提交成功")
          }
          this.getList()
	        this.editDialog = false
        }).catch(err => {
          if (err.code) {
            this.getList()
	          this.editDialog = false
          }
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
