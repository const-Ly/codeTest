<template>
  <div id="popup-wrap">
    <transition name="el-fade-in-linear">
      <div v-show="show" class="img-view-wrap" @click="handleHide"> </div>
    </transition>
    <transition name="el-zoom-in-top">
     <img v-show="show" ref="bigImg" :src="info.src" :class="dirClass" @click="clickImg" :alt="info.alt">
    </transition>
  </div>
</template>

<script>
export default {
  name: 'popup',
  data () {
    return {
      info: {},
      show: false,
      clientWidth:0,
      clientHeight:0,
      eleWidth:0,
      eleHeight:0
    }
  },
  computed:{
    dirClass () {
      if(this.eleWidth > this.clientWidth && this.eleHeight > this.clientHeight){//尺寸上宽高均超过可视区
        return "img-view-enlarge-img-xy-overflow"
      }else if(this.eleWidth > this.clientWidth && this.eleHeight < this.clientHeight){//宽度超过可视区，高度在可视区
        return "img-view-enlarge-img-x-overflow"
      }else if(this.eleWidth < this.clientWidth && this.eleHeight > this.clientHeight){//高度超过可视区，宽度在可视区
        return "img-view-enlarge-img-y-overflow"
      }
      return "img-view-enlarge-img"
    }
  },
  mounted () {
    this.clientWidth = document.body.clientWidth || document.documentElement.clientWidth
    this.clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    this.$nextTick(()=>{
      this.eleWidth = this.$refs.bigImg.width
      this.eleHeight = this.$refs.bigImg.height
    })
  },
  methods: {
    handleShow (info) {
      this.info = info
      this.show = true
    },
    handleHide () {
      this.show = false
      var app = document.getElementById("app")
      var box = document.querySelector('#popup-wrap')
      app.classList.remove("fixed-full")
      document.body.removeChild(box)
    },
    clickImg () {
      if(this.dirClass === 'img-view-enlarge-img-xy-overflow'){
        this.handleHide()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-view-wrap { position: fixed; width: 100%; height: 100%; left: 0; top: 0; background: rgba(0,0,0,.3); z-index: 9998}
.img-view-enlarge-img { position: absolute; left: 50%; top: 50%; z-index: 9999; -webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);}
.img-view-enlarge-img-x-overflow{position: absolute;left:0;top: 50%;z-index: 9999;-webkit-transform:translate3d(0%,-50%,0);transform:translate3d(0%,-50%,0);}
.img-view-enlarge-img-y-overflow{position: absolute;left:50%;top:0;z-index: 9999;-webkit-transform:translate3d(-50%,0%,0);transform:translate3d(-50%,0%,0);}
.img-view-enlarge-img-xy-overflow{position: absolute;left:0;top:0;z-index: 9999;-webkit-transform:translate3d(0%,0%,0);transform:translate3d(0%,0%,0);}

</style>
