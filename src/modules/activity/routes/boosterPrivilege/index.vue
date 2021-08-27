<template>
  <div class="cms">
  	<previlege-list @add="addRight"></previlege-list>
  	<el-dialog :visible.sync="dialogVisible" width="70%" v-if="dialogVisible">
	  	<right-product @checked="handleChecked" ref="product"></right-product>
	 </el-dialog>
  </div>
</template>

<script>
const PrevilegeList = () => import('./list')
const RightProduct = () => import('./rightProduct')
export default {
  name: 'previlege',
  data () {
    let self = this
  	return {
  		dialogVisible:false
  	}
  },
  components:{
  	PrevilegeList,
  	RightProduct
  },
  methods:{
  	handleChecked (row) {
  		this.dialogVisible = !this.dialogVisible
  		this.$router.push({path:'boosterPrivilege/add',query:{suid:row.skuId}})
  	},
  	addRight () {
  		this.dialogVisible = !this.dialogVisible
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
