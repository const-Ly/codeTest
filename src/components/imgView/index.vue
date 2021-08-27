<template>
  <img :src="src" :width="width" :height="height" :alt="alt" @click="handleEnlarge">
</template>
<script>
import Vue from 'vue'
import popup from './popup'
export default {
  name: 'img-view',
  props: {
    src: {
      default: '',
      requred: true,
      type: String
    },
    alt: {
      default: '',
      type: String
    },
    width: {
      default: '100px',
      type: String
    },
    height: {
      default: '100px',
      type: String
    },
    lock:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    handleEnlarge () {
      //生成单例弹窗
      if (document.querySelector('#popup-wrap') && this.popup) {
        this.popup.handleShow({src:this.src,alt:this.alt})
      } else {
        const PopupComponent = Vue.extend(popup)
        const component = new PopupComponent().$mount()
        Vue.prototype.popup = component
        document.body.appendChild(component.$el)
        this.popup.handleShow({src:this.src,alt:this.alt})
      }
      var app = document.getElementById("app");
      this.lock && (app.classList.add("fixed-full"))
    }
  }
}

</script>
