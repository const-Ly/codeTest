<template>
  <div>
    <el-card>
      <div class="m-t-10">
        <span>楼层类型：{{floorInfo[currentCompItem.floorType].floorName}}</span>
      </div>
      <div class="m-t-10">
        <span>说明：{{floorInfo[currentCompItem.floorType].explain}}</span>
      </div>
      <div class="m-t-10">
        <span v-if="currentCompItem.projectDetaiId">楼层ID：{{currentCompItem.projectDetaiId}}</span>
        <span v-else>楼层ID：{{getProjectId}}{{currentCompItem.floorType | zeroFill}}{{currentIndex | addOne | zeroFill}}</span>
      </div>
      <component :is="renderComp(currentCompItem.floorType).componentConf" ref="child"></component>
    </el-card>
  </div>
</template>

<script>

const FLOOR_INFO = {
  "1": {
    floorName: "图片",
    explain: "图片，支持轮播，多张图片，以轮播形式展示，且要求多张图片尺寸统一，建议宽度为1125px，高度不低于90px",
  },
  "2": {
    floorName: "标签商品",
    explain: "此商品数据来源与SCM标签商品数据",
  },
  "3": {
    floorName: "推荐商品",
    explain: "推荐商品为统一提供，不可编辑修改",
  },
  "4": {
    floorName: "间隔",
    explain: "作为每个楼层的间隔辅助",
  },
}

import { mapState, mapGetters } from "vuex";

import ImageConf from "./ImageConf";
import TagProductConf from "./TagProductConf";
import RecommendProductConf from "./RecommendProductConf";
import SpaceConf from "./SpaceConf";

export default {
  name: "common-conf",
  data() {
    return {
      floorInfo: FLOOR_INFO
    }
  },
  props: {
  },
  methods: {
    // 渲染配置组件
    renderComp(type) {
      return this.formMapList.filter(item => item.type == type)[0];
    }
  },
  /**
   * formMapList 整体数据的说明列表
   * currentCompItem 当前选中的组件元素
   * getProjectId 当前的专题ID
   * currentIndex 当前组件所在的索引位置
   */
  computed: {
    ...mapGetters(["formMapList", "currentCompItem", "getProjectId"]),
    ...mapState(["currentIndex",]),
  },
  components: {
    ImageConf,
    TagProductConf,
    RecommendProductConf,
    SpaceConf,
  },
  filters: {
    // 补零
    zeroFill: function(value) {
      value = String(value)
      if (value.length > 1) return value;
      return "0" + value;
    },
    // 加1
    addOne: function(value) {
      return Number(value) + 1;
    }
  }
};
</script>

<style scoped>
.m-b-20 {
  margin-bottom: 20px;
}
.m-t-10 {
  margin-top: 10px;
}
</style>