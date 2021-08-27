<template>
  <div>
    <el-card>
      <div class="m-t-10">
        <span class="material-group-label">楼层类型：专题属性</span>
      </div>
      <div class="m-t-10">
        <span class="material-group-label">专题名称：</span>
        <el-input
          class="w250"
          placeholder="输入页面名称"
          v-model="specialInfo.projectName"
          :maxlength="40"
        ></el-input>
      </div>
      <div class="m-t-10">
        <span class="material-group-label">分享标题：</span>
        <el-input
          class="w250"
          placeholder="将在分享时显示"
          v-model="specialInfo.shareTitle"
          :maxlength="40"
        ></el-input>
      </div>
      <div class="m-t-10">
        <span class="material-group-label">分享描述：</span>
        <el-input
          class="w250"
          placeholder="将在分享时显示"
          v-model="specialInfo.shareAlert"
          :maxlength="40"
        ></el-input>
      </div>
      <div class="m-t-10 flex-center">
        <span class="material-group-label">分享图片：</span>
        <upload
          class="inline-block"
          @success="handleShareImage"
          :imageUrl="specialInfo.shareImage"
          action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300"
          :size="300"
          :width="200"
        ></upload>
      </div>
      <div class="m-t-10 flex-center">
        <span class="material-group-label">分享卡片：</span>
        <upload
          class="inline-block"
          @success="handleShareCardImage"
          :imageUrl="specialInfo.shareCardImage"
          action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300"
          :size="300"
          :width="200"
        ></upload>
      </div>
    </el-card>
  </div>
</template>

<script>
import Upload from "@/components/upload";
export default {
  name: "special-conf",
  data() {
    return {
    };
  },

  props: {
    specialInfo: {
      type: Object,
      default: {}
    }
  },

  components: {
    Upload
  },

  methods: {
    handleShareImage(value) {
      this.$emit("handleShareImage", value);
    },
    handleShareCardImage(value) {
      this.$emit("handleShareCardImage", value);
    }
  }
};
</script>

<style scoped>
.m-t-10 {
  margin-top: 10px;
}
.w250 {
  width: 250px;
}
.flex-center {
  display: flex;
  align-items: center;
}
</style>