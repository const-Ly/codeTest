<template>
  <div class="fl">
    <div class="fl">
      <!-- 此透明盒子存在的意义是，强行触发vue组件update生命周期 -->
      <div style="display:none;">{{this.dataFromParent}}</div>
      <span style="color:#909399">比例（%）</span>
      <span class="span-width-150" v-if="typeFromParent==='detail'">{{local.proportion}}</span>
      <el-input
        v-else
        class="w150"
        v-model="local.proportion"
        v-only-num="local.proportion"
        maxlength="3"
        @input="inputProportion"
      ></el-input>
    </div>
    <div class="fl">
      <span style="color:#909399" class="ma-l-40 ma-r-10">有效期</span>
    </div>
    <div class="fl width-350">
      <el-radio-group
        v-model="local.expireType"
        @change="changeExpireType"
        :disabled="typeFromParent==='detail'"
      >
        <el-radio :label="1">按天</el-radio>
        <el-radio :label="2">按时间计算</el-radio>
      </el-radio-group>
      <div class="ma-t-10">
        <template v-if="local.expireType===1">
          <span class="span-width-30" v-if="typeFromParent==='detail'">{{local.expireDay}}</span>
          <el-input
            v-else
            class="day-input"
            v-model="local.expireDay"
            v-only-num="local.expireDay"
            maxlength="3"
            @input="inputExpireDay"
          ></el-input>天
        </template>
        <template v-else>
          <span class="span-width-30" v-if="typeFromParent==='detail'">{{local.expireHour}}</span>
          <el-input
            v-else
            class="day-input"
            v-model="local.expireHour"
            v-only-num="local.expireHour"
            maxlength="2"
            @input="inputExpireHour"
          ></el-input>小时
          <span class="mar-right"></span>
          <span class="span-width-30" v-if="typeFromParent==='detail'">{{local.expireMinute}}</span>
          <el-input
            v-else
            class="day-input"
            v-model="local.expireMinute"
            v-only-num="local.expireMinute"
            maxlength="2"
            @input="inputExpireMinute"
          ></el-input>分钟
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// 此页面使用了vuex作状态提升和逻辑分离，具体路径见 "../../store/modules/reduceMoneyBag"
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      local: {
        proportion: "",
        expireType: 1,
        expireDay: "",
        expireHour: "",
        expireMinute: ""
      }
    };
  },
  props: ["dataFromParent", "indFromParent", "typeFromParent"],
  methods: {
    inputProportion(e) {
      this.reduceMoneyBag.vuexTerms[this.indFromParent].proportion = e;
    },
    changeExpireType(e) {
      this.reduceMoneyBag.vuexTerms[this.indFromParent].expireType = e;
    },
    inputExpireDay(e) {
      this.reduceMoneyBag.vuexTerms[this.indFromParent].expireDay = e;
    },
    inputExpireHour(e) {
      this.reduceMoneyBag.vuexTerms[this.indFromParent].expireHour = e;
    },
    inputExpireMinute(e) {
      this.reduceMoneyBag.vuexTerms[this.indFromParent].expireMinute = e;
    }
  },
  mounted() {
    this.local = this.dataFromParent;
    if (this.dataFromParent.expireType === 1) {
      this.local.expireHour = "";
      this.local.expireMinute = "";
    } else {
      this.local.expireDay = "";
    }
  },
  computed: {
    ...mapState({
      reduceMoneyBag: state => state.reduceMoneyBag
    })
  },
  updated() {
    this.local = this.dataFromParent;
  }
};
</script>

<style scoped>
.day-input {
  display: inline-block;
  width: 100px;
  margin-right: 10px;
}
.mar-right {
  display: inline-block;
  width: 30px;
}
.width-350 {
  width: 350px;
}
.span-width-30 {
  display: inline-block;
  width: 30px;
}
.span-width-150 {
  display: inline-block;
  width: 150px;
}
</style>
