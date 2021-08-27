<template>
  <div>
    <div class="m-t-10 flex">
      <span class="material-group-label">辅助高度：</span>
      <el-slider class="w180 m-20" @input='changeHeight' :min='MIN_NUM' v-model="projectDetails[currentIndex].spaceHeight" :show-tooltip="false"></el-slider>
      <span>{{projectDetails[currentIndex].spaceHeight}}</span>
    </div>
    <div class="m-t-10 flex">
      <span class="material-group-label">背景颜色：</span>
      <el-color-picker @change='changeColor' v-model="projectDetails[currentIndex].spaceColor"></el-color-picker>
    </div>
  </div>
</template>

<script>
import {  mapState } from "vuex";

export default {
  name: "space-conf",
  data() {
    return {
      MIN_NUM: 1
    };
  },

  methods: {
    changeHeight(value) {
      this.$store.commit("updateSpaceCompHeight", value)
    },
    changeColor(value) {
      this.$store.commit("updateSpaceCompColor", value)
    },
  },
  /**
   * projectDetails  专题内容详情
   * currentIndex 当前当中组件的索引
   */
  computed: {
    ...mapState(["projectDetails", "currentIndex"])
  },
};
</script>

<style scoped>
.w180 {
  width: 180px;
}
.flex {
  display: flex;
  align-items: center;
}
.m-20 {
  margin: 0 20px;
}
.m-t-10 {
  margin-top: 10px;
}
</style>