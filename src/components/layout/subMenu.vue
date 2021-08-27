<template>
  <div class="sub-menu">
     <el-menu
      class="el-menu-vertical-demo">
      <div  v-for="data in subMenuData" :key="data.resName" >
        <el-submenu  v-if="data.subResList" :index="data.resUri" :class="{'menu-active':$route.fullPath==data.resUri.split('#')[1]}"  @click="menuChange(data.resUri)">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{data.resName}}</span>
          </template>
          <el-menu-item
          v-for="subData in data.subResList"
          :key="subData.resName"
          :index="data.resUri"
          :class="{'is-active':$route.fullPath==data.resUri.split('#')[1]}"
          @click="menuChange(subData.resUri)"
          >{{subData.resName}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="data.resUri" v-else :class="{'menu-active':$route.fullPath==data.resUri.split('#')[1]}" @click="menuChange(data.resUri)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{data.resName}}</span>
        </el-menu-item >
      </div>
      <!-- <menu-tree :tree-data="subMenuData"></menu-tree> -->
    </el-menu>
  </div>
</template>

<script>
import menuTree from './menuTree1'
import {mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['menuName'])
  },
  components: {
    menuTree
  },
  props: {
    subMenuData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuChange (path) {
      if (path.indexOf('#') !== -1 && path.indexOf('.index') === -1) {
        this.$router.push(path.split('#')[1])
      } else {
        window.location.href = path
      }
    }
  },
  // watch: {
  //   $route () {
  //     this.routerPaths = this.$route.fullPath.split('/')
  //     if (!this.routerPaths[1]) {
  //       this.routerPaths[1] = this.subMenuData[0].resUri
  //     }
  //   }
  // },
  mounted () {
    if (this.menuName === '前台类目管理') {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.el-menu-item.is-active {
    color: #303133;
}
.el-menu-item.menu-active {
  color: #409EFF;
}
.sub-menu{ height: 100% ;float: left;  overflow-y: auto; width: 190px; }
@media only screen and (max-width:1000px){
  .sub-menu {width: 160px; }
}
</style>
