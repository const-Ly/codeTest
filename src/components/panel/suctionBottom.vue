<template>
	<div>
		<div class="suction-bottom">
			<div class="btn-set">
				<el-button size="small" v-if="showOk" type="primary" @click="handleOk">{{ okBtn }}</el-button>
				<el-button size="small" @click="handleCancel">{{ cancelBtn }}</el-button>
			</div>
			<slot name="tip"></slot>
		</div>
		<el-dialog :title="title" :visible.sync="visible" width="30%">
		  <slot name="warning"></slot>
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" type="primary" @click="sureTodo">确 定</el-button>
		    <el-button size="small" @click="cancelTodo">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		name:"suction-bottom",
		data () {
			return {
				visible:false
			}
		},
		props:{
			showOk:{
				type:Boolean,
				default:true
			},
			pureBack:{
				type:Boolean,
				default:false
			},
			okBtn: {
				type:String,
				default:"提交保存"
			},
			cancelBtn: {
				type:String,
				default:"返回"
			},
			title:{
				type:String,
				default:""
			}
		},
		methods:{
			handleOk () {
				this.$emit('okFn')
			},
			handleCancel () {
				if(this.pureBack){
					this.$router.back()
				}else if(this.showOk){//显示返回拦截
					this.visible = !this.visible
				}else {
					if(history.length>1){
						this.$router.back()
					}else{//新窗口打开
						window.close()
					}
				}
			},
			sureTodo () {
				this.visible = !this.visible
				this.$emit('okFnByDialog')
			},
			cancelTodo () {
				this.visible = !this.visible
			}
		}
	}
</script>

<style scoped>
	.suction-bottom {
		position: fixed;
		left:330px;
		right:20px;
		bottom:0;
		z-index: 99;
		padding:20px;
		background-color: #fff;
		border-top: 1px solid #DCDFE6;
		text-align: center;
	}
</style>
