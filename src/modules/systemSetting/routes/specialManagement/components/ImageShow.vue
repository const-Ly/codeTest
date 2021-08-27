<template>
  <div>
    <img class="image" :src="currentImage.imgUrl" alt />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

const DEGAULT_IMAGE = require('@/assets/images/image-com.jpg');

export default {
  name: "image-show",
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  computed: {
    // 获取上传第一个图片,并显示在组件内容区域,获取不到显示默认图
    currentImage() {
      return this.info.imageConfigInfoList.find(item => {
        return item.imgUrl;
      }) || {imgUrl: DEGAULT_IMAGE};
    }
  },
  methods: {}
};
</script>

<style scoped>
.image {
  width: 100%;
  height: 300px;
}
</style>