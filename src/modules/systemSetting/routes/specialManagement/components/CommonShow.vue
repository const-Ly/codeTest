<template>
  <el-card>
    <component :is="renderComp(info.floorType).componentShow" :info="info" ref="child"></component>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";

import ImageShow from "./ImageShow";
import TagProductShow from "./TagProductShow";
import RecommendProductShow from "./RecommendProductShow";
import SpaceShow from "./SpaceShow";

export default {
  name: "common-show",
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 渲染内容组件
    renderComp(type) {
      return this.formMapList.filter(item => item.type == type)[0];
    }
  },
  /**
   * formMapList 整体数据的说明列表
   */
  computed: {
    ...mapGetters(["formMapList"])
  },
  components: {
    ImageShow,
    TagProductShow,
    RecommendProductShow,
    SpaceShow,
  }
};
</script>

<style scoped>


</style>