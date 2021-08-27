<template>
  <div class="cms">
    <el-card class="box-card">
      <span slot="header">阶梯团信息</span>
      <el-form label-width="150px" size="small">
        <el-form-item label="ID：">
             {{ detail.activityId }}({{ detail.auditStatusDes }})
        </el-form-item>
        <el-form-item label="生效新客补贴：">
           {{ detail.newerSubsidy | placeholder }} 元/人 (审核值：{{ detail.verifyingNewerSubsidy }})
        </el-form-item>
        <el-form-item label="生效拼团人数：">
           {{ detail.groupSize | placeholder }} 元/人 (审核值：{{ detail.verifyingGroupSize }})
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <span slot="header">基础信息</span>
      <el-form label-width="150px" size="small">
        <el-form-item label="活动名称：">{{ detail.activityName }}</el-form-item>
        <el-form-item label="活动状态：">{{ detail.activitiStatusDes }}</el-form-item>
        <el-form-item label="活动时间：">{{ detail.beginTime }} - {{ detail.endTime }}</el-form-item>
        <el-form-item label="商品数：">{{ detail.remainingProductNumber }}/{{ detail.totalProductNumber }}</el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-b-40 ma-t-10">
      <!-- 表格数据 -->
      <el-table :data="selectedlist" style="width: 100%" size="small">
        <el-table-column label="商品编号" prop="productId"></el-table-column>
        <el-table-column label="商品名称" prop="shortTitle"></el-table-column>
        <el-table-column label="销售价" width="150">
          <template slot-scope="scope">{{ scope.row.minSuPrice | currency }} - {{scope.row.maxSuPrice | currency(" ")}}</template>
        </el-table-column>
        <el-table-column label="商家优惠">
          <template slot-scope="scope">{{ scope.row.supplierDiscount | percentage }}</template>
        </el-table-column>
        <el-table-column label="可售状态">
          <template slot-scope="scope">
            <span :title="scope.row.sellStatus == 2?scope.row.unsellReason:''">{{ scope.row.sellStatusName | placeholder }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序权重">
          <template slot-scope="scope">{{ scope.row.weight }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 吸底区域 Begin -->
    <suction-bottom :show-ok="false" cancel-btn="关闭"></suction-bottom>

  </div>
</template>

<script>
  const SuctionBottom = () => import('@/components/panel/suctionBottom')
  export default {
    name: 'detail',
    data () {
      return {
        detail:{
          activityId:"",
          newerSubsidy:"",
          verifyingNewerSubsidy:"",
          groupSize:"",
          verifyingGroupSize:"",
          activityName:"",
          activityStatus:"",
          activitiStatusDes:"",
          auditStatus:"",
          auditStatusDes:"",
          beginTime:"",
          endTime:"",
          remainingProductNumber:"",
          totalProductNumber:""
        },
        selectedlist:[] //已选择的商品列表
      }
    },
    components:{
      SuctionBottom
    },
    created () {
      this.activityInfo()
      this.getSelectedList()
    },
    methods: {
      // 查询活动详情
      activityInfo () {
        this.$service.activity.ladderGroup.activityInfo({activityId:this.$route.params.id}).then(res => {
          this.detail = res
        })
      },
      //查看某个活动的已选择商品列表
      getSelectedList () {
        this.$service.activity.ladderGroup.selectedList({activityId:this.$route.params.id}).then(res => {
          this.selectedlist = res
        })
      }
    }
  }
</script>
