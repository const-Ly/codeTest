<template>
  <el-form class="form-center" ref="form" label-width="200px" style="width:100%;">
    <el-form-item
      v-for="(item, index) in $store.state.rewardsCardRightsGroup.rightsList"
      v-bind:key="index"
      :label="rightsName(index)"
      style="width:650px;"
    >
      <span class="span-margin">类型</span>
      <el-select
        v-model="item.rightsType"
        placeholder="请选择"
        style="width: 120px;"
        :disabled="myDisabled"
      >
        <el-option label="立减金" :value="6"></el-option>
        <el-option label="抽奖卡" :value="3"></el-option>
      </el-select>
      <span class="span-margin2">内容</span>
      <span v-if="!item.rightsContent" class="font-blue" @click="showDialog(index)">请选择</span>
      <el-button
        :disabled="myDisabled"
        v-else
        @click="showDialog(index)"
        type="primary"
      >{{buttonContent(item)}}</el-button>
      <el-dialog
        :title="dialogName(index)"
        :visible.sync="$store.state.rewardsCardRightsGroup.onOffList[index]"
        v-if="$store.state.rewardsCardRightsGroup.onOffList[index]"
      >
        <rewardsCardRightsGroupDialog :propsType="item.rightsType" :propsIndex="index"></rewardsCardRightsGroupDialog>
      </el-dialog>
      <span
        class="font-danger fr"
        v-if="$store.state.rewardsCardRightsGroup.rightsList.length>1 && !myDisabled "
        @click="delRights(index)"
      >删除</span>
    </el-form-item>
    <el-form-item>
      <span
        v-if="$store.state.rewardsCardRightsGroup.rightsList.length<20 && !myDisabled"
        class="font-blue"
        @click="addRights"
      >添加一条</span>
    </el-form-item>
  </el-form>
</template>

<script>
import rewardsCardRightsGroupDialog from "./rewardsCardRightsGroupDialog";
export default {
  props: ["myDisabled"],
  data() {
    return {};
  },
  components: {
    rewardsCardRightsGroupDialog
  },
  methods: {
    rightsName(index) {
      let str = `权益${index + 1}：`;
      return str;
    },
    dialogName(index) {
      let str = `权益${index + 1}——权益内容`;
      return str;
    },
    buttonContent(item) {
      let content = "";
      if (item.rightsType === 6) {
        content = item.rightsContent + `（￥${item.rightsMoney}）`;
      } else {
        content = item.rightsContent;
      }
      return content;
    },
    addRights() {
      this.$store.state.rewardsCardRightsGroup.rightsList.push({
        cardType: 7,
        rightsType: "",
        rightsContent: ""
      });
    },
    delRights(index) {
      this.$store.state.rewardsCardRightsGroup.rightsList.splice(index, 1);
    },
    showDialog(index) {
      if (
        this.$store.state.rewardsCardRightsGroup.rightsList[index]
          .rightsType === ""
      ) {
        this.$message.warning("请先选择左边对应的类型");
      } else {
        this.$store.state.rewardsCardRightsGroup.onOffList.splice(
          index,
          1,
          true
        );
      }
    },
    closeDialog(index) {
      this.$store.state.rewardsCardRightsGroup.onOffList.splice(
        index,
        1,
        false
      );
    }
  },
  computed: {
    rightsListWatcher() {
      let arr = [];
      this.$store.state.rewardsCardRightsGroup.rightsList.forEach(
        (item, index) => {
          arr.push(item.rightsType);
        }
      );
      return arr;
    }
  },
  watch: {
    rightsListWatcher(newArr, oldArr) {
      if (newArr.length === oldArr.length) {
        let changedIndex = "";
        newArr.forEach((item, index) => {
          if (item !== oldArr[index]) {
            changedIndex = index;
            return false;
          }
        });
        this.$store.state.rewardsCardRightsGroup.rightsList[
          changedIndex
        ].rightsContent = "";
      }
    }
  }
};
</script>

<style scoped>
.span-margin {
  margin-left: 4px;
  margin-right: 8px;
}
.span-margin2 {
  margin-left: 14px;
  margin-right: 8px;
}
</style>