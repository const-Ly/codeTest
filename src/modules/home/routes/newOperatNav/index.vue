<template>
  <div id="new_operat_nav">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已启用" name="1">
        <screen v-if="activeName == 1" :active="activeName"></screen>
      </el-tab-pane>
      <el-tab-pane label="待启用" name="2">
        <screen v-if="activeName == 2" :active="activeName"></screen>
      </el-tab-pane>
      <el-tab-pane label="已禁用" name="3">
        <screen v-if="activeName == 3" :active="activeName"></screen>
      </el-tab-pane>
      <el-tab-pane label="兜底配置" name="4">
        <screen v-if="activeName == 4" :active="activeName"></screen>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import screen from './screen'
import vTable from './table'

export default {
  data () {
    return {
      activeName: '1',
      pageNum: 1,
      pageNum: 1,
      pageSize: 20,
      bottomType: 0,
    }
  },
  components: {
    screen, vTable
  },
  methods: {
    
    handleClick (e) {
      this.getPagelist()
    },
    getPagelist() {
      
    }
  },
  mounted () {

  }
}
</script>

<style>
#new_operat_nav {
  background: #fff;
  padding: 10px;
}
</style>

