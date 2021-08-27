<template>
  <div class="cms">
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="key">任务名称：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.name}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">选择的任务：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.defaultTaskName}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">序号：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.sequence}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">开始时间：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.beginTime}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">结束时间：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.endTime}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">奖励内容：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.rewardType | rewardType}}</div>
        </el-col>
      </el-row>
      <el-row v-if="detailData.rewardType > 0 && detailData.rewardType < 5">
        <el-col :span="4">
          <div class="key">挂接场景值：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.sceneIdentify}}</div>
        </el-col>
      </el-row>
      <el-row v-if="detailData.rewardType === 5">
        <el-col :span="4">
          <div class="key">金币数量：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.goldNumber}}</div>
        </el-col>
      </el-row>
      <el-row v-if="detailData.rewardType === 5">
        <el-col :span="4">
          <div class="key">可偷金币：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.canStealGoldNumber | placeholder}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">ios版本下限：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.iosVersionFrom}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">android版本下限：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.androidVersionFrom}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">下发用户类型：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.customerType | customerType}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">是否固定路由：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.inhenceRouting | isFixedRouting}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">ios路由：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.iosRouting | isEmpty(getDtatSuccess)}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">android路由：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.androidRouting | isEmpty(getDtatSuccess)}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">小程序路由：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.miniAppRouting | isEmpty(getDtatSuccess)}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">M站路由：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.mRouting | isEmpty(getDtatSuccess)}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="key">任务描述：</div>
        </el-col>
        <el-col :span="8">
          <div class="value">{{detailData.taskDesc}}</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script type="text/javascript">
// 模拟数据
export default {
  name: 'taskCenterLogDetails',
  data() {
    return {
      detailData: {
        customerType: {}
      },
      getDtatSuccess: false
    }
  },
  mounted() {
    // 获取路由参数
    if (this.$route.params.taskId) {
      this.getLogDetails({ logId: this.$route.params.taskId })
    }
  },
  methods: {
    getLogDetails(param) {
      this.$service.systemSetting.taskCenter.getLogDetails(param).then(data => {
        if (data) {
          this.getDtatSuccess = true
          this.detailData = data
        }
      })
    }
  },
  filters: {
    // 奖励内容
    rewardType: key => {
      let str = ''
      switch (key) {
        case 1:
          str = '参团卡'
          break
        case 2:
          str = '抽奖卡'
          break
        case 3:
          str = '全民拼卡'
          break
        case 4:
          str = '特权金'
          break
        case 5:
          str = '金币'
          break
      }
      return str
    },
    // 用户类型
    customerType(obj) {
      let arr = []
      // 新访客
      if (obj.newVisitor === 1) {
        arr.push('新访客')
      }
      // 老访客
      if (obj.oldVisitor === 1) {
        arr.push('老访客')
      }
      // 老客
      if (obj.customer === 1) {
        arr.push('老客')
      }
      return arr.join(' / ')
    },
    // 是否是固定路由
    isFixedRouting(value) {
      let str = ''
      if (value === 1) {
        str = '固定路由'
      } else if (value === 0) {
        str = '自定义路由'
      }
      return str
    },
    // 是否有路由
    isEmpty: (value, getDtatSuccess) => {
      if (!getDtatSuccess) return ''
      if (value !== '' && value !== null) {
        return value
      } else {
        return '无'
      }
    }
  }
}
</script>
<style scoped>
.mar-t20 {
  margin-top: 20px;
}
.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.key {
  line-height: 32px;
  text-align: right;
}
.value {
  line-height: 32px;
  text-align: left;
  padding-left: 15px;
}
</style>

