<template>
  <el-autocomplete v-model.trim="keyName" :value-key="valueKey" :fetch-suggestions="querySearch"  @change.native="handleChange" :class="wClass"  @select="handleSelect" :placeholder="placeholder"></el-autocomplete>
</template>
<script>
  export default {
    name: 'associativeMatch',
    props:{
      list:{
        type:Array,
        default () {
          return []
        }
      },
      wClass:{
        type: String,
        default: 'w300'
      },
      valueKey:{
        type:String,
        default:""
      },
      placeholder:{
        type: String,
        default: "请输入商家名称" //默认使用商家名称的模糊联想匹配
      },
      val:{
      	type:String,
      	default:""
      }
    },
    data () {
      return {
        keyName:this.val
      }
    },
    watch:{
    	val (nv,ov) {
    		this.keyName = nv
    	}
    },
    methods:{
      querySearch (queryString, cb) {
        let results = queryString ? this.list.filter(this.createFilter(queryString)) : this.list
        cb(results)
      },
      createFilter (queryString) {
        return (item) => {
          return item[this.valueKey].indexOf(queryString) > -1
        }
      },
      //处理每一次选项发生变化时，清空已选数据
      handleChange () {
        this.$emit('change',this.keyName)
      },
      //处理每次有新数据更换的时候
      handleSelect (item) {
        this.$emit('select',item)
      },
      clear () {
        this.keyName = ""
        this.handleChange()
      }
    }
  }
</script>
