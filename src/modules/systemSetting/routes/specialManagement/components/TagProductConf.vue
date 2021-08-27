<template>
  <div class="m-t-10 flex">
    <span class>选择标签：</span>
    <div class="select-content">{{currentCompItem.tagName}}</div>
    <span class="color" @click="handleSelect">{{currentCompItem.tagName?"修改":"请选择"}}</span>
    <tag-product-pop></tag-product-pop>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import TagProductPop from "./TagProductPop";
export default {
  name: "tag-product-conf",
  data() {
    return {};
  },
  props: {},
  /**
   * currentCompItem 当前选中的组件
   */
  computed: {
    ...mapGetters(['currentCompItem'])
  },
  components: {
    TagProductPop
  },
  methods: {
    // 设置标签商品弹窗的显示或隐藏
    handleSelect() {
      this.$store.commit("setTagProductPopStatus", true);
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
  align-items: center;
}

.m-t-10 {
  margin-top: 10px;
}

.color {
  color: blue;
}

.color:hover {
  cursor: pointer;
}

.select-content {
  width: 200px;
  height: 24px;
  line-height: 24px;
  background: #f2f2f2;
  color: blue;
  border: 1px solid cyan;
  border-radius: 2px;
  margin-right: 4px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>