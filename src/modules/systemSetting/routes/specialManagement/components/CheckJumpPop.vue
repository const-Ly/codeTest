<template>
  <div v-if="checkJumpPopStatus">
    <el-dialog
      :title="popType[checkJumpItem.jumpType].name"
      :visible.sync="checkJumpPopStatus"
      :before-close="closePop"
      :append-to-body="true"
    >
      <el-form label-position="right" label-width="100px">
        <el-form-item v-if="checkJumpItem.jumpType==3" label="首页"></el-form-item>
        <el-form-item v-if="checkJumpItem.jumpType==2" label="商家ID:">{{checkJumpItem.supplierId}}</el-form-item>
        <el-form-item v-if="checkJumpItem.jumpType==1" label="商品编号:">{{checkJumpItem.productId}}</el-form-item>
        <el-form-item v-if="checkJumpItem.jumpType==4" label="专题编号:">{{checkJumpItem.projectId}}</el-form-item>
        <el-form-item class="max-height" v-if="checkJumpItem.jumpType==5" label="M站链接:">{{checkJumpItem.pcmRoute}}</el-form-item>
        <el-form-item class="max-height" v-if="checkJumpItem.jumpType==6" label="Android路由">{{checkJumpItem.androidRoute}}</el-form-item>
        <el-form-item class="max-height" v-if="checkJumpItem.jumpType==6" label="IOS路由:">{{checkJumpItem.iosRoute}}</el-form-item>
        <el-form-item class="max-height" v-if="checkJumpItem.jumpType==6" label="小程序路由:">{{checkJumpItem.miniappRoute}}</el-form-item>
      </el-form>
      <div class="flex-center">
        <el-button class="button" @click="closePop">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 1：代表商品弹窗
 * 2：代表店铺弹窗
 * 3：首页弹窗
 * 4：专题弹窗
 * 5：自定义链接
 * 6：自定义路由
 */
const POP_TYPE = {
  "0": {
    name: ""
  },
  "1": {
    name: "跳转信息-商品-查看"
  },
  "2": {
    name: "跳转信息-店铺-查看"
  },
  "3": {
    name: "跳转信息-首页-查看",
    url: ""
  },
  "4": {
    name: "跳转信息-专题-查看"
  },
  "5": {
    name: "跳转信息-自定义链接-查看"
  },
  "6": {
    name: "跳转信息-自定义路由-查看"
  }
};
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      popType: POP_TYPE
    };
  },
  props: {},
  computed: {
    ...mapState(["checkJumpPopStatus"]),
    ...mapGetters(["checkJumpItem"])
  },
  methods: {
    closePop() {
      this.$store.commit("setCheckJumpPopStatus", false);
    }
  }
};
</script>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
}

.max-height {
  max-height: 500px;
  overflow-y: scroll;
  word-break:break-all;
}
</style>