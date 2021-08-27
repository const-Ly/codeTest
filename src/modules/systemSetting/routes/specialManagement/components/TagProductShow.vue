<template>
  <div>
    <img class="image" :src="defaultImage" alt="">
  </div>
</template>

<script>
export default {
  name: "tag-product-show",
  data(){
    return {
      defaultImage: require('@/assets/images/product-com.jpg')
    }
  },
  props: {},
  methods: {}
}
</script>

<style scoped>
.image {
  width: 100%;
  height: 500px;
}
</style>