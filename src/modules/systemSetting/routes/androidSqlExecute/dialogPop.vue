<template>
  <div class="cms">
    <!-- 添加弹窗 -->
    <el-dialog title="添加版本号-执行SQL" width="22%" :before-close="hidePop" :visible.sync="showStatus">
      <div class="container">
        <div class="add-text">添加版本号：</div>
        <el-input
          class="w-60"
          :class="firstTipsCss?'border-red':''"
          maxlength="3"
          @blur="checkoutFirstNum"
          @input="handleFirstInputValue"
          :value="firstNum"
        ></el-input>
        <span class="circle-dot">.</span>
        <el-input
          class="w-60"
          :class="secondTipsCss?'border-red':''"
          maxlength="3"
          @blur="checkoutSecondNum"
          @input="handleSecondInputValue"
          :value="secondNum"
        ></el-input>
        <span class="circle-dot">.</span>
        <el-input
          class="w-60"
          :class="thirdTipsCss?'border-red':''"
          maxlength="3"
          @blur="checkoutThirdNum"
          @input="handleThirdInputValue"
          :value="thirdNum"
        ></el-input>
      </div>
      <div class="toast-text mar-20">{{textTips}}</div>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit">执 行</el-button>
        <el-button @click="hidePop">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dialog-pop",
  data() {
    return {
      firstTipsCss: false,
      secondTipsCss: false,
      thirdTipsCss: false,
      firstNum: "", // 第一个数字
      secondNum: "", // 第二个数字
      thirdNum: "", // 第三个数字
      textTips: "" // 输入异常的文案提示
    };
  },
  props: {
    showStatus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 关闭弹窗并清除输入框值和样式
    hidePop() {
      this.$emit("changeShowStatus");
      this.setDefaultPopValue();
      this.setDefaultPopCss();
    },

    // 输入框值初始化
    setDefaultPopValue: function() {
      this.firstNum = "";
      this.secondNum = "";
      this.thirdNum = "";
    },

    // 输入框样式初始化
    setDefaultPopCss: function() {
      this.firstTipsCss = false;
      this.secondTipsCss = false;
      this.thirdTipsCss = false;
      this.textTips = "";
    },

    // 处理输入框的文字。只支持输入数字，第一个输入框不能输入0
    handleFirstInputValue(value) {
      this.firstNum = value.replace(/\D/g, "").replace(/^[0]+/g, "");
    },

    handleSecondInputValue(value) {
      this.secondNum = value.replace(/\D/g, "");
    },

    handleThirdInputValue(value) {
      this.thirdNum = value.replace(/\D/g, "");
    },

    /**
     * 输入框失去焦点的校验
     * 第一个输入框的校验是【1-999】 input输入框已限制最大支持3位数
     * 第二和第三个输入框的校验是【0-999】 input输入框已限制最大支持3位数
     */
    checkoutFirstNum() {
      this.setDefaultPopCss();
      if (this.firstNum == "") {
        this.textTips = "仅支持[1-999]";
        this.firstTipsCss = true;
      }
    },

    checkoutSecondNum() {
      this.setDefaultPopCss();
      if (this.secondNum == "") {
        this.textTips = "仅支持[0-999]";
        this.secondTipsCss = true;
      }
    },

    checkoutThirdNum() {
      this.setDefaultPopCss();
      if (this.thirdNum == "") {
        this.textTips = "仅支持[0-999]";
        this.thirdTipsCss = true;
      }
    },

    // 点击提交时，校验输入框是否为空
    checkEmpty() {
      this.setDefaultPopCss();
      if (this.firstNum && this.secondNum && this.thirdNum) {
        return false;
      } else {
        if (this.firstNum == "") {
          this.firstTipsCss = true;
        } else if (this.secondNum == "") {
          this.secondTipsCss = true;
        } else if (this.thirdNum == "") {
          this.thirdTipsCss = true;
        }
        this.textTips = "三个输入框均不能为空";
        return true;
      }
    },

    // 提交事件
    submit() {
      // 校验是否为空
      if (this.checkEmpty()) {
        return;
      }

      let param = {
        primaryVersion: this.firstNum,
        secondaryVersion: this.secondNum,
        revision: this.thirdNum,
        type: 1 // 类型：1代表安卓
      };
      this.$service.systemSetting.androidSqlExecute.add(param).then(res => {
        if(res) {
          this.$message.success("执行成功");
          this.hidePop();
          this.$emit("refreshList");
        }
      });
    }
  }
};
</script>

<style scoped>
.add-text {
  display: inline-block;
}

.w-60 {
  width: 60px;
}

.mar-20 {
  margin: 20px 0px;
}

.toast-text {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: red;
}

.border-red >>> .el-input__inner {
  border: 1px solid red;
}

.dialog-footer {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.circle-dot {
  display: inline-flex;
  width: 10px;
  height: 32px;
  font-size: 16px;
  align-items: flex-end;
  justify-content: center;
}
</style>

