<template>
  <div>
    <div :style="{height: info.spaceHeight + 'px', backgroundColor: info.spaceColor}" class="space">
    </div>
  </div>
</template>

<script>
export default {
  name: "space-show",
  data() {
    return {
      
    };
  },

  props: {
    info: {
      type: Object,
      default: {}
    }
  },

   computed: {
  },
};
</script>

<style scoped>
.space {
  width: 100%;
}
</style>