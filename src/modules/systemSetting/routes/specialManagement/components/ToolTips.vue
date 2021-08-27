<template>
  <div :class="['w100', 'fixed', isMenuTop ? 'top' : '']">
    <div active-text-color="#303133" class="el-menu">
      <el-tooltip
        class="w80 margin"
        v-for="(item) in toolTipList"
        :key="item.floorType"
        effect="dark"
        content="双击添加"
        placement="right"
      >
        <el-button type="primary" plain @dblclick.native="addConf(item.floorType)">{{item.tagName}}</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolTipList: [
        {
          floorType: 1,
          tagName: "图片"
        },
        {
          floorType: 2,
          tagName: "标签商品"
        },
        {
          floorType: 3,
          tagName: "推荐商品"
        },
        {
          floorType: 4,
          tagName: "间隔"
        }
      ]
    };
  },

  props: {
    isMenuTop: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    addConf(type) {
      this.$emit("addConf", type);
    }
  }
};
</script>

<style scoped>
.w100 {
  width: 100px;
}
.w80 {
  width: 80px;
}
.margin {
  margin-bottom: 10px;
  margin-left: 10px;
}

.el-menu {
  border: none;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.top{
  top: 70px;
}
.fixed {
  position: fixed;
}
</style>