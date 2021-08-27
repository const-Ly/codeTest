<template>
  <div class="container">
    <span class="material-group-label">跳转信息：</span>
    <div v-if="info.jumpType" class="border" @click="checkSelectPop">
      {{info.selectName||options[info.jumpType].label}}
      <div @click.stop="deleteSelectValue()" class="delete el-icon-close"></div>
    </div>
    <el-select
      class="w90"
      :value="''"
      size="mini"
      @change="setSelectValue($event)"
      clearable
      :placeholder="info.jumpType?'修改':'请选择'"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
const OPTIONS = {
  "1": {
    value: "1",
    label: "商品"
  },
  "2": {
    value: "2",
    label: "店铺"
  },
  "3": {
    value: "3",
    label: "首页"
  },
  "4": {
    value: "4",
    label: "专题"
  },
  "5": {
    value: "5",
    label: "自定义链接"
  },
  "6": {
    value: "6",
    label: "自定义路由"
  }
};

import { mapGetters } from "vuex";

import JumpPop from "./JumpPop";

export default {
  data() {
    return {
      options: OPTIONS,
      value: ""
    };
  },
  props: {
    info: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["currentCompItem"])
  },
  updated() {
    console.log(this.info);
  },
  components: { JumpPop },
  methods: {
    setSelectValue(value) {
      this.$store.commit("setCurrentImageItemIndex", this.index);

      if (value != 3) {
        // 需要弹起选择弹窗
        this.$store.commit("setJumpType", value);
        this.$store.commit("setJumpPopStatus", true);
      } else {
        this.$store.commit("setImageConfigInfoItemJumpType", {
          value: value,
          index: this.index
        });
        this.$store.commit(
          "setImageConfigInfoItemJumpLableValue",
          OPTIONS[value].label
        );
      }
    },

    // 删除选择的内容
    deleteSelectValue() {
      this.$store.commit("deleteImageConfigInfoItemSelected", this.index);
    },

    // 点击选择的查看
    checkSelectPop() {
      this.$store.commit("setCurrentImageItemIndex", this.index);
      this.$store.commit("setCheckJumpPopStatus", true);
    }
  }
};
</script>

<style scoped>
.container {
  width: 310px;
  display: flex;
  align-items: center;
}
.w90 {
  width: 90px;
}

.border {
  width: 110px;
  padding-right: 20px;
  padding-left: 10px;
  height: 24px;
  line-height: 24px;
  background: #f2f2f2;
  color: blue;
  border: 1px solid cyan;
  border-radius: 2px;
  margin-right: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.delete {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>