<template>
  <div class="cms">
  	<el-card class="box-card">
			<h4 slot="header">新手专享商品</h4>
      <el-form ref="form" label-width="200px" class="input-normal">
        <el-form-item label="新手专区标签开关：">
					<el-radio v-model="param.status" :label="1">开启</el-radio>
  				<el-radio v-model="param.status" :label="0" @change="param.tagId = ''">关闭</el-radio>
        </el-form-item>
        <el-form-item label="推荐标签：" v-show="param.status === 1">
					<el-select v-model="param.tagId" placeholder="请选择推荐标签" filterable>
						<el-option v-for="e in topicList" :key="e.productTagId" :label="e.productTagName" :value="e.productTagId"></el-option>
					</el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="update">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  export default {
  	name: 'newcustomer',
    data() {
      return {
      	param:{
      		status: 0,
	      	tagId: ''
				},
				topicList: []
      }
    },
    methods:{
	    getData () {
	      this.$service.activity.newcustomer.get().then(res => {
	        this.param.status = res.status
	        this.param.tagId = res.tagId
	      })
			},
			getTopicList () {
				this.$service.common.getAllProductTags().then(res => {
					this.topicList = res
				})
			},
			update () {
				this.$utils.testForm([
					{test: this.param.status === 1 && [null, ''].indexOf(this.param.tagId) >= 0, fun: _ => this.$message.warning('请输入选择有效的推荐标签')}
				], _ => {
					this.$service.activity.newcustomer.update(this.param).then(res => {
						res && this.$message.success('提交保存成功')
					})
				})
			}
    },
    mounted () {
			this.getData()
			this.getTopicList()
    }
  }
</script>
<style type="text/css" scoped>
	.ma-b-10{ margin-bottom: 10px;}
	.w120{ width: 120px;}
</style>
