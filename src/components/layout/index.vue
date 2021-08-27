<template>
  <div class="hello">
    <top></top>
    <el-container>
      <side-menu></side-menu>
      <el-main class="main">
        <div class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-nav">
              <el-breadcrumb-item >{{menuName}}</el-breadcrumb-item>
              <template v-for="(match,index) in $route.matched">
                <el-breadcrumb-item v-if="match&&match.meta.pathName" :key="index">{{match.meta.pathName||match.name||match.components.default.name}}</el-breadcrumb-item>
              </template>
            </el-breadcrumb>
            <el-button v-if="breadcrumbBtn.fullPath===$route.fullPath" class="breadcrumb-btn" type="text" @click="breadcrumbBtn.callback">{{breadcrumbBtn.name}}</el-button>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import top from './top'
import sideMenu from './menu'
import {mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['menuName','breadcrumbBtn'])
  },
  components: {
    top,
    sideMenu
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb-btn { float: right; margin-top: 5px;margin-right: 20px;}
.breadcrumb-nav { padding: 10px; height: 30px; line-height: 30px;float:left; position: relative}
.main { margin: 60px 0 0 310px}
.content { padding: 20px 0; border-top: 1px solid #ccc;}

</style>
