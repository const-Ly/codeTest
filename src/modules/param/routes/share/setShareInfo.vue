<template>
  <div class="cms">
		<el-card class="box-card">
      <ul>
      	<li v-for="(item, index) in list">
      		<span class="index">{{index+1}}</span>
      		<!-- 渠道名称: 展示名称 + （解释名称）-->
      		<div class="shareName iBlock" >
      			<el-input class="editBox iBlock" v-model="item.shareChannelDisplayNameCopy" size="small" v-if="item.editStatus" maxlength="10"></el-input>
      			<span v-else>{{item.shareChannelDisplayName}}({{item.shareChannelName}})</span>
      		</div>
      		<!-- 操作 -->
	  			<div class="operation iBlock">
	  				<div class="deit" v-if="item.editStatus">
	      				<el-button type="success" icon="el-icon-check" circle size="mini"  @click="verifyJudge(item)"></el-button>
	      				<el-button type="danger" icon="el-icon-close" circle size="mini" @click="closeDeit(item)"></el-button>
	  				</div>
	  				<el-button type="primary" icon="el-icon-edit" circle size="mini" v-else @click="deit(item)" ></el-button>
	  			</div>
	  			<!-- 排序 -->
	  			<div class="sortItem iBlock">
	  				<i class="el-icon-caret-top font-blue sortArrow" @click="handleSort(index, list, -1)"></i>
			        <i class="el-icon-caret-bottom font-blue sortArrow" @click="handleSort(index, list, 1)"></i>
	  			</div>
	  			<!-- 确认修改弹层 -->
		      <el-dialog :visible.sync="showDeitDialog" width="30%"  :show-close="false">
			      <span>你确定修改{{myDeitData.shareChannelName}}名称为{{myDeitData.shareChannelDisplayNameCopy}}吗？</span>
			      <span slot="footer" class="dialog-footer">
			        <el-button size="small" type="primary" @click="saveDeit">确 定</el-button>
			        <el-button size="small" @click="showDeitDialog = false">取 消</el-button>
			      </span>
			    </el-dialog>
      	</li> 
      </ul>
      <!-- 按钮 -->
      <div class="btn">
      	<el-button type="primary" size="mini" @click="saveChannelSequence">保存排序</el-button>
      	<el-button type="primary" size="mini" @click="showReturnDialog = true">返回</el-button>
      </div>
      <!-- 返回按钮弹层 -->
	    <el-dialog :visible.sync="showReturnDialog" width="30%" :show-close="false">
	      <span>你确认离开该页面吗？离开后已修改的信息将会丢失</span>
	      <span slot="footer" class="dialog-footer">
	        <router-link class="bg-blue" size="small" :to="{ path: '../share' }" >确 定</router-link>
	        <el-button size="small" @click="showReturnDialog = false">取 消</el-button>
	      </span>
	    </el-dialog>
  	</el-card>
  </div>
</template>

<script type="text/javascript">
  export default {
      data() {
        return {
          list:[],
          showDeitDialog:false,
          showReturnDialog:false,
          myDeitData:''
        }
      },
      methods:{
          getList(val) {
            let self = this
            self.$service.param.share.getShareChannelList().then(res => {
              self.list = res.map(item => {
              	item.editStatus = false	// true编辑, false展示
              	item.shareChannelDisplayNameCopy = item.shareChannelDisplayName
              	return item
              })
           })
          },
          /* 排序 */
          handleSort(index,arr,sort){
          	let targetIndex
			     	let self = this
			     	if (sort > 0){ // 升序(向下)
			       	if (index === arr.length - 1) return
			       	targetIndex = index + 1
			     	} else {
			       	if (index === 0) return
			       	targetIndex = index - 1
			     	}
			     	arr.splice(index, 1, ...arr.splice(targetIndex, 1, arr[index]))
			    },
			    /* 编辑状态 */
			    deit(data){
			    	data.editStatus = true
			    },
			    /* 退出编辑 */
			    closeDeit (data) {
			    	data.shareChannelDisplayNameCopy = data.shareChannelDisplayName
			    	data.editStatus = false
			    },
			    /* 校验编辑内容 */
			    verifyJudge (data) {
			    	let self = this
		        if(data.shareChannelDisplayNameCopy.length == 0 ){
		        	self.$message.warning("请输入1-10字渠道名称")
		        	return
		        }
	          this.checkName(data)
	        },
	        /* 保存编辑内容 */
			    saveDeit (){
			    	let self = this
			    	let data = self.myDeitData
		        self.$service.param.share.updateShareChannelDisplayName({
		        	shareChannelId:data.shareChannelId,
		        	shareChannelDisplayName:data.shareChannelDisplayNameCopy
		        }).then(res => {
				    	data.editStatus = false
			        self.showDeitDialog = false
			        data.shareChannelDisplayName = data.shareChannelDisplayNameCopy
						})
			    },
			    /* 保存排序 */
			    saveChannelSequence () {
	          var arr =[]
	          for(var i=0; i<this.list.length; i++){
	          	arr.push(this.list[i].shareChannelId)
	          }
	          this.$service.param.share.saveShareChannelSequence(arr).then(res => {
		        })
					},
					/* 校验名称是否重复 */
					checkName (data) {
						let self = this
		        self.$service.param.share.validateChannelDisplayNameRepeat({
		        	shareChannelId:data.shareChannelId,
		        	shareChannelDisplayName:data.shareChannelDisplayNameCopy
		        }).then(res => {
							if (res) {
								self.myDeitData = data
			      		self.showDeitDialog = true
							}
						})
					}
      },
      mounted () {
        this.getList()
      }
  }
</script>
<style scoped>
	.iBlock{ display: inline-block; vertical-align: middle;}
	li{ padding: 10px 0; height: 32px;}
	li span{ line-height: 32px;}
	.index{ width: 50px; display: inline-block; text-align: center;}
	.shareName{ width: 300px;}
	.editBox{  width: 180px;}
	.operation{ margin-left: 20px; width: 150px;}
	.operation button{ padding: 6px;}
	.btn{ text-align: center; margin-top: 40px;}
	.btn button{ margin-right: 20px;}
	.bg-blue{ background-color: #409EFF; border-color: #409EFF; color: #fff; padding: 8px 15px; font-weight: 500; font-size: 12px; border-radius: 3px; line-height: 1; margin-right: 10px;}
</style>
