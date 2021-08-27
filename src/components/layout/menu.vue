<template>
  <div class="side-menu">
    <div class="menu bg-black">
      <ul class="menu-list">
        <li class="menu-item" v-for="(data,idx) in menuData" :key="idx" @click="jump(data)" :class="{active:data.resName===menuName}">
          <p>{{data.resName}}</p>
        </li>
      </ul>
    </div>
    <div class="sub-menu">
      <el-menu :default-active="active" :unique-opened="true" class="el-menu-vertical-demo">
        <menu-tree :tree-data="subMenuData"></menu-tree>
      </el-menu>
    </div>
  </div>
</template>

<script>

import menuTree from './menuTree'
import {mapGetters} from 'vuex'
import menuPic from './menuPic'
export default {
  name: 'HelloWorld',
  data () {
    return {
      active: '',
      openeds: [],
      menuData: [],
      menuPic: menuPic
    }
  },
  computed: {
    ...mapGetters(['menuName']),
    subMenuData () {
      for (let value of this.menuData) {
        if (value.resName === this.menuName) {
          return value.subResList || []
        }
      }
    }
  },
  components: {
    menuTree
  },
  methods: {
    jump (data) {
      let url = data.subResList ? data.subResList[0].resUri : data.resUri
      window.location.href = url
    },
    transformPathToMenu () {
      this.active = this.$route.fullPath
      this.$route.matched.forEach(ele => {
        if (this.active !== ele.path) {
          this.openeds.push(ele.path)
        }
      })
    }
  },
  watch: {
    $route () {
      this.transformPathToMenu()
    }
  },
  mounted () {
    this.transformPathToMenu()
    this.$service.getMenus().then(res => {
      this.menuData = res
      // for (let i=0, item; item=this.menuData[i++]; ) {
      //   item.picUrl = i===6 ? this.menuPic[i-1].pic2 : this.menuPic[i-1].pic
      // }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
body { font-size: 14px;}
.side-menu { position: fixed; top: 60px; bottom: 0; left: 0; background-color: #272a33; border-right:1px solid #ddd; z-index: 12;}
.menu {width: 120px;height: 100% ; float: left; overflow-y: none;}
.menu-item { width: 120px; font-size: 14px; line-height: 20px; border-top: 1px solid #444; padding: 8px 0; color: #9499a6; position: relative; text-align: center; line-height: 2; cursor: pointer }
.menu-item.active { background: #1d2027; color: #eee}
.menu-item.active::before{
  content: ""; position: absolute; left: 5px; top: 12px; height:20px; width: 4px; border-radius: 2px; background-color: #eee;
}
.menu-item.active::after{
  content: ""; position: absolute; right: 0; top: 12px; height: 0; width: 0; border: 10px solid transparent; border-right-color:#eee;
}
.sub-menu{ height: 100% ;float: left; overflow: auto; width: 190px; background-color: #fff; }
.el-menu {height: 100%;}
.menu {height:100%; overflow: auto;}

</style>
