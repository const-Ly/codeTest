<template>
  <el-card class="box-card">
    <span slot="header">活动选品配置</span>
    <el-row class="wrap-box">
      <el-col :span="4">
        <ul class="type-list">
          <li v-for="(item, idx) in list" :class="{active:activeIdx === item.value }" @click="getConf(item.value)">{{ item.label }}</li>
        </ul>
      </el-col>
      <el-col :span="20">
        <div class="cfg-title">选品配置</div>
        <el-form label-width="120px" size="small" class="activitySelection">
          <el-form-item label="销售渠道：">{{ info.saleChannel | placeholder }}</el-form-item>
          <el-form-item label="销售类型：">{{ info.saleType | placeholder }}</el-form-item>
          <el-form-item label="商品类型：">{{ info.productType | placeholder }}</el-form-item>
          <el-form-item label="增值服务：">{{ info.valAddServices | placeholder }}</el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">
  export default {
  	name: "activitieSelection",
    data() {
      return {
        list:[
          { label:"商家选品", value:1 },
          { label:"一起拼选品", value:2 },
          { label:"特权金选品", value:3 },
          { label:"抢返现选品", value:4 },
          { label:"阶梯团选品", value:5 }
        ],
        activeIdx:1,
        info: {}
      }
    },
    created () {
      this.getConf()
    },
    methods:{
      getConf (val) {
        if(val !== this.activeIdx) {
          this.activeIdx = val || 1
          this.$service.activity.deployManage.getActivityProductConfig({activityProductType: this.activeIdx}).then( res => {
            this.info = res
          })
        }
      }
    }
  }
</script>
<style>
  .wrap-box{border:1px solid #ddd;}
  .type-list {
    width:100%;
    border-right: 1px solid #ddd;
  }
  .type-list li {
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    background-color: #ccc;
    cursor: pointer;
  }
  .type-list li.active {
    color:#1b9fd4;
    background-color: #fff;
  }
  .cfg-title {
    line-height: 40px;
    padding-left:20px;
    border-bottom: 1px solid #ddd;
    margin:0 10px;
  }
  .activitySelection .el-form-item {margin-bottom: 0}
</style>
