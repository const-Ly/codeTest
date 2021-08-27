<template>
  <div>
    <div
      class="image-list"
      v-for="(itemImage, index) in currentCompItem.imageConfigInfoList"
      :key="index"
    >
      <div
        @click="deleteImageItem(index)"
        :class="[currentCompItem.imageConfigInfoList.length > 1 ? 'del el-icon-close':'']"
      ></div>
      <upload
        class="inline-block"
        @success="handleUploadImage($event, index)"
        @imageMeasurement="handleImageMeasurement($event)"
        action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300"
        :size="300"
        :width="310"
        :uploadedIndex="uploadedIndex"
        :isLimitMeasurement="isLimitMeasurement"
        :limitWidth="limitWidth"
        :limitHeight="limitHeight"
        :accept="'image/jpg,image/png,image/gif,image/jpeg'"
        :type="['.jpg','.jpeg','.png','.gif']"
        :imageUrl="itemImage.imgUrl"
        :errorMessage="errorMessage"
      ></upload>
      <select-com class="m-t-10 flex" :info="itemImage" :index="index"></select-com>
    </div>
    <jump-pop></jump-pop>
    <check-jump-pop></check-jump-pop>
    <el-button
      v-if="currentCompItem.imageConfigInfoList.length < 9"
      class="button"
      type="primary"
      plain
      @click="addImageUnit"
    >+添加一致图片</el-button>

    <!-- <jump-pop></jump-pop> -->
  </div>
</template>

<script>
import Upload from "@/components/upload";
import SelectCom from "./SelectCom";
import JumpPop from "./JumpPop";
import CheckJumpPop from "./CheckJumpPop";

import { mapGetters } from "vuex";

export default {
  name: "image-conf",
  data() {
    return {
      errorMessage: "请确认图片格式或大小",
      isLimitMeasurement: true,
      limitWidth: 0,
      limitHeight: 0
    };
  },
  components: { Upload, SelectCom, JumpPop, CheckJumpPop },
  props: {},
  /**
   * currentCompItem 当前选中的组件元素
   */
  computed: {
    ...mapGetters(["currentCompItem"]),
    uploadedIndex: function() {
      return this.currentCompItem.imageConfigInfoList.filter(item => {
        return item.imgUrl;
      }).length;
    }
  },
  watch: {
    /**
     * 监听当前图片组件的内容是否发生变化,如果发生变化就要判断是否校验图片格式
     */
    currentCompItem() {
      if (this.currentCompItem.imageConfigInfoList.length > 0) {
        let url = this.currentCompItem.imageConfigInfoList[0].imgUrl;
        this.getImageWidthHeight(url);
      }
    }
  },
  mounted() {
    // 如果是编辑状态,有图片则要获取图片格式,为了添加图片单元校验
    if (this.currentCompItem.imageConfigInfoList.length > 0) {
      let url = this.currentCompItem.imageConfigInfoList[0].imgUrl;
      this.getImageWidthHeight(url);
    }
  },
  methods: {
    // 获取已上传图片的宽高
    getImageWidthHeight(url) {
      if (!url) {
        this.limitWidth = 0;
        this.limitHeight = 0;
        return;
      }
      let image = new Image();
      image.onload = () => {
        this.limitWidth = image.width;
        this.limitHeight = image.height;
      };
      image.src = url;
    },

    // 给图片组件属性添加图片单元
    addImageUnit() {
      this.$store.commit("updateImageConfigInfoList", {
        imgUrl: "",
        jumpType: 0,
        selectName: ""
      });
    },

    // 删除图片单元
    deleteImageItem(index) {
      if (confirm("确认删除该图片单元？")) {
        this.$store.commit("deleteImageConfigInfoItem", index);
        let flag = false;
        // 遍历当前选中的图片组件单元
        let item = this.currentCompItem.imageConfigInfoList;
        for (let i = 0; i < item.length; i++) {
          if (item[i].imgUrl) {
            flag = true;
            break;
          }
        }
        if(!flag) {
          this.limitWidth = 0;
          this.limitHeight = 0;
        }
      }
    },

    // 获取已上传图片的宽高
    handleImageMeasurement(obj) {
      this.limitWidth = obj.width;
      this.limitHeight = obj.height;
    },

    // 上传图片成功的处理方法,也可能是删除图片成功
    handleUploadImage(url, index) {
      if (!this.limitHeight || !this.limitWidth) {
        this.getImageWidthHeight(url);
      }
      this.$store.commit("setImageConfigInfoItemUrl", {
        index,
        url
      });

      let imageList = this.currentCompItem.imageConfigInfoList;
      // 说明是删除图片
      if (url == "") {
        let item = imageList.find(item => {
          return item.imgUrl;
        });
        if (!item) {
          this.limitWidth = 0;
          this.limitHeight = 0;
        }
      }
    }
  }
};
</script>

<style scoped>
.image-list {
  margin-top: 20px;
  border: 1px solid #18e5ec;
  padding: 10px 0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.del {
  position: absolute;
  width: 20px;
  height: 20px;
  text-align: center;
  margin-left: -15px;
  font-size: 15px;
  line-height: 20px;
  color: #18e5ec;
  display: block;
  background-color: #fff;
  border: 1px solid #18e5ec;
  border-radius: 50%;
  z-index: 1000;
  cursor: pointer;
  top: -10px;
  right: -10px;
}
.button {
  width: 100%;
  margin-top: 20px;
}
.inline-block {
  width: 90%;
  display: inline-block;
  margin-bottom: 10px;
}
</style>