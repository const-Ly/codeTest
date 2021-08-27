<template>
  <div class="cms">
    <ul>
      <li v-for="(cell,idx) in cellList" :key="idx" class="ma-b-10">
        <slot :cell="cell" name="cell"></slot>
        <el-button size="small" type="text" class="font-danger ma-l-20" @click="delItem(idx)" v-if="cellList.length>1">删除</el-button>
      </li>
    </ul>
    <el-button type="primary" size="small" v-if="cellList.length < maxNum" @click="addItem">再添加一条</el-button>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'dynamicCell',
    props:{
      list:{
        type:Array,
        default: () => ([])
      },
      conf:{
        type:Object,
        default: () => ({
          title: ''
        })
      },
      maxNum:{
        type:Number,
        default: 10
      }
    },
    data () {
      return {
        cellList: []
      }
    },
    watch:{
      list (nv, ov) {
        this.cellList = nv
        if(nv.length === 0){
          this.cellList.push({ ...this.conf })
        }
      }
    },
    created () {
      // 初始化数据为空时，默认追加一条空数据
      if(this.cellList.length === 0){
        this.cellList.push({ ...this.conf })
      }
    },
    methods:{
      // 删除
      delItem (idx) {
        this.cellList.splice(idx, 1)
      },
      // 增加一条
      addItem () {
        let conf = { ...this.conf }
        this.cellList.push(conf)
      }
    }
  }
</script>
