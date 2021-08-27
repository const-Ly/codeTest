<template>
  <div class="cms">

    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span class="line-32">一起拼频道页banner图</span>
    	</div>
      <el-table :data="bannerConfigList" :show-header="false">
    		<el-table-column label="" width="240">
		    	<template slot-scope="scope">
			      <upload class="w200" action="/image/uploadImage?width=750&height=385&fileSize=300" @success="scope.row.bannerUrl = $event" :imageUrl="scope.row.bannerUrl" :width="150" :height="77"></upload>
         </template>
		    </el-table-column>
		    <el-table-column label="">
		    	<template slot-scope="scope">
			      <el-form size="small" label-width="120px">
			        <el-form-item :label="(scope.$index+1) + '、跳转类型：'">
			          <el-select v-model="scope.row.jumpType" class="w200" @change="scope.row.jumpContent.id = '';scope.row.jumpContent.name = ''">
			            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
			          </el-select>
			        </el-form-item>
			        <el-form-item class="relative" v-if="scope.row.jumpType === 30" label="选择商品：">
			          <el-input class="w200" v-model="scope.row.jumpContent.id" v-only-num:jumpContent-id.string="bannerConfigList" :key="scope.$index" placeholder="请输入一起拼商品编号" @blur="querySkuInfo(scope.row.jumpContent)"></el-input>
			          <div class="abs w200">{{scope.row.jumpContent.name}}</div>
			        </el-form-item>
			        <el-form-item v-if="scope.row.jumpType === 11" label="专题名称：">
			          <match :val="scope.row.jumpContent.name" wClass="w200" value-key="title" @change="scope.row.jumpContent.id = '';scope.row.jumpContent.name = $event" @select="scope.row.jumpContent.id = $event.topicId;scope.row.jumpContent.name = $event.title" :list="onlineTopic" placeholder=""></match>
			        </el-form-item>
			        <el-form-item v-if="scope.row.jumpType === 21" label="标签名称：">
			          <match :val="scope.row.jumpContent.name" wClass="w200"  value-key="name" @change="scope.row.jumpContent.id = '';scope.row.jumpContent.name = $event" @select="scope.row.jumpContent.id = $event.id;scope.row.jumpContent.name = $event.name" :list="scmTagList" placeholder=""></match>
			        </el-form-item>
			      </el-form>
        </template>
		    </el-table-column>
		    <el-table-column label="序号">
		    	<template slot-scope="scope">
				      <el-form size="small" label-width="100px">
				        <el-form-item label="序号：">
				        	<el-input class="w80" v-model="scope.row.sequence" v-only-num:sequence="bannerConfigList" :key="scope.$index" :max-len="2"></el-input>
				        </el-form-item>
				      </el-form>
	        </template>
		    </el-table-column>
      </el-table>
      <div class="pd20 font-info">备注：图片尺寸750*385，jpg/png格式，小于300k，同组元素填写完整方有效，前端展示位置以序号从小到大排列。</div>
      <el-button type="primary" @click="saveBannerConfig" size="small">提交保存</el-button>
    </el-card>

    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span class="line-32">一起拼频道页（运营位1）</span>
    	</div>
      <el-form label-width="200px" size="small">
        <el-form-item label="频道页模块开关：">
        	<el-radio-group v-model="operationsConfig1.channelSwitchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="参团落地页模块开关：">
          <el-radio-group v-model="operationsConfig1.groupSwitchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="模块标题：">
        	<el-input class="w300" v-model.trim="operationsConfig1.operationsTitle" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="选择商品：">
        	<template v-if="operationsConfig1.operationsContent.length > 0">
        		<div v-for="(item,idx) in operationsConfig1.operationsContent" :key="item.id" class="ma-b-25 relative">
	        		<el-input class="w200" v-model="item.id" v-only-num:id.string="operationsConfig1.operationsContent" :key="idx" placeholder="请输入一起拼商品编号" @blur="querySkuInfo(item)"></el-input>
	        		<span class="ma-l-10 font-blue" v-if="operationsConfig1.operationsContent.length > 1" @click="operationOneDel(idx)">删除</span>
	        		<div class="abs w300" v-if="item.name !== ''">{{item.name}}</div>
	        	</div>
        	</template>
        	<span class="font-blue" v-if="operationsConfig1.operationsContent.length < 20" @click="operationOneAdd">添加一条</span>
        </el-form-item>
        <el-form-item label="">
        	<el-button type="primary" @click="saveOperationsConfig(1)" size="small">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span class="line-32">一起拼频道页（运营位2）</span>
    	</div>
      <el-form label-width="200px" size="small">
				<el-form-item label="运营位banner图：">
					<upload class="w170 fl" 
					action="/image/uploadImage?width=750&height=160&fileSize=300" 
					@success="operationsConfig2.imageUrl = $event" 
					:image-url="operationsConfig2.imageUrl" 
					:width="150" :height="32">
					</upload>
					<span class="font-dark0">尺寸750×160，jpg/png，不超过300k</span>
				</el-form-item>
        <el-form-item label="频道页模块开关：">
          <el-radio-group v-model="operationsConfig2.channelSwitchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="参团落地页模块开关：">
          <el-radio-group v-model="operationsConfig2.groupSwitchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="模块标题：">
        	<el-input class="w300" v-model.trim="operationsConfig2.operationsTitle" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="更多跳转标签：">
        	<match :val="operationsConfig2.operationsContent[0].name" @change="operationsConfig2.operationsContent[0].id = '';operationsConfig2.operationsContent[0].name = $event" value-key="name" @select="operationsConfig2.operationsContent[0].id = $event.id;operationsConfig2.operationsContent[0].name = $event.name" :list="scmTagList" placeholder=""></match>
        </el-form-item>
        <el-form-item label="">
        	<el-button type="primary" @click="saveOperationsConfig(2)" size="small">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span class="line-32">一起拼频道页（运营位3）</span>
    	</div>
      <el-form label-width="200px" size="small">
				<el-form-item label="运营位banner图：">
					<upload class="w170 fl" 
					action="/image/uploadImage?width=750&height=160&fileSize=300" 
					@success="operationsConfig3.imageUrl = $event" 
					:image-url="operationsConfig3.imageUrl" 
					:width="150" :height="32">
					</upload>
					<span class="font-dark0">尺寸750×160，jpg/png，不超过300k</span>
				</el-form-item>
        <el-form-item label="频道页模块开关：">
          <el-radio-group v-model="operationsConfig3.channelSwitchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="参团落地页模块开关：">
          <el-radio-group v-model="operationsConfig3.groupSwitchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="模块标题：">
        	<el-input class="w300" v-model.trim="operationsConfig3.operationsTitle" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="更多跳转标签：">
        	<match :val="operationsConfig3.operationsContent[0].name" value-key="name" @change="operationsConfig3.operationsContent[0].id = '';operationsConfig3.operationsContent[0].name = $event" @select="operationsConfig3.operationsContent[0].id = $event.id;operationsConfig3.operationsContent[0].name = $event.name" :list="scmTagList" placeholder=""></match>
        </el-form-item>
        <el-form-item label="">
        	<el-button type="primary" @click="saveOperationsConfig(3)" size="small">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">一起拼频道页（运营位4）</span>
      </div>
      <el-form label-width="200px" size="small">
        <el-form-item label="运营位banner图：">
          <upload class="w170 fl" 
          action="/image/uploadImage?width=750&height=160&fileSize=300" 
          @success="operationsConfig4.imageUrl = $event" 
          :image-url="operationsConfig4.imageUrl" 
          :width="150" :height="32">
          </upload>
          <span class="font-dark0">尺寸750×160，jpg/png，不超过300k</span>
        </el-form-item>
        <el-form-item label="模块开关：">
          <el-radio-group v-model="operationsConfig4.switchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="模块标题：">
          <el-input class="w300" v-model.trim="operationsConfig4.operationsTitle" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveOperationsConfig(4)" size="small">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span class="line-32">一起拼频道页（优先推荐标签商品）</span>
    	</div>
      <el-form label-width="180px" size="small">
        <el-form-item label="频道页商品列表展示形式：">
        	<el-radio-group v-model="operationsConfig101.displayForm">
            <el-radio :label="1">单排</el-radio>
            <el-radio :label="2">双排</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="模块开关：">
          <el-radio-group v-model="operationsConfig101.switchStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item v-if="operationsConfig101.switchStatus === 1" label="推荐标签：">
        	<match :val="operationsConfig101.operationsContent[0].name" value-key="name" @change="operationsConfig101.operationsContent[0].id = '';operationsConfig101.operationsContent[0].name = $event" @select="operationsConfig101.operationsContent[0].id = $event.id;operationsConfig101.operationsContent[0].name = $event.name" :list="scmTagList" placeholder=""></match>
        </el-form-item>
        <el-form-item label="">
        	<el-button type="primary" @click="saveOperationsConfig(101)" size="small">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>
<script type="text/javascript">
  import Match from '@/components/associativeMatch'
	import upload from '@/components/upload'
  export default {
    	name: "togetherOperation",
      data() {
        let self = this
        return {
					bannerConfigList:[],	// Banner图
					operationsConfig1: {
						'operationsContent':[{id:'',name:''}]
					},	// 运营位1频道页推荐信
					operationsConfig2: {
						'operationsContent':[{id:'',name:''}]
					},	// 运营位2频道页推荐信
					operationsConfig3: {
						'operationsContent':[{id:'',name:''}]
					},	// 运营位3频道页推荐信
          operationsConfig4:{},
          operationsConfig101: {
            'operationsContent':[{id:'',name:''}]
          },  // 运营位4频道页推荐信
					scmTagList:[],// scm标签列表
					onlineTopic:[],// 专题列表
					types:[	// 跳转类型
						{value: -1, label: '无跳转'},
            {value: 30, label: '一起拼商品'},
            {value: 11, label: '专题页'},
            {value: 21, label: '标签页'},
            {value: 35, label: '阶梯团频道页'}
					]
	      }
      },
    	components:{Match,upload},
      methods:{
          getInfo(val) {
            let self = this
            // 查询Banner图信息
            self.$service.activity.togetherOperation.getBannerConfigList().then(res => {
							for (let i=0; i<res.length; i++) {
								!res[i].sequence && (res[i].sequence = '')
							}
              self.bannerConfigList = res || []
           	})
            // 查询运营位1、2、3、4频道页推荐信息
            self.$service.activity.togetherOperation.queryOperationsConfig().then(res => {
							for (let i=0; i<res.length; i++) {
								res[i].operationsContent.length === 0 && (res[i].operationsContent.push({id:'', name:''}))
							}
              self.operationsConfig1 = res.filter(item => {
                return item.operationsType === 1
              })[0]
              self.operationsConfig2 = res.filter(item => {
                return item.operationsType === 2
              })[0]
              self.operationsConfig3 = res.filter(item => {
                return item.operationsType === 3
              })[0]
              self.operationsConfig4 = res.filter(item => {
                return item.operationsType === 4
              })[0]
              self.operationsConfig101 = res.filter(item => {
                return item.operationsType === 101
              })[0]
           	})
          },
          operationOneDel(index) {	// 运营位1，商品的删除
          	this.operationsConfig1.operationsContent.splice(index,1)
          },
          operationOneAdd(index) {	// 运营位1，商品的添加
          	this.operationsConfig1.operationsContent.push({id : '', name : ''})
          },
          querySkuInfo(item) {	// 查询有效的一起拼商品
          	item.name = ''
          	if(item.id === '')return this.$message.warning('请输入有效的一起拼商品编号')
          	this.$service.common.querySkuInfoById({spuid:item.id}).then(res => {
	            item.name = res.spuName
           	})
          },
          saveOperationsConfig(type) {	// 保存运营位1-4
						let _operationsConfig = {}
						switch (type) {
							case 1:
								_operationsConfig = this.operationsConfig1
								break
							case 2:
								_operationsConfig = this.operationsConfig2
								break
							case 3:
								_operationsConfig = this.operationsConfig3
								break
              case 4:
                _operationsConfig = this.operationsConfig4
                break
              case 101:
                _operationsConfig = this.operationsConfig101
						}
						if((type === 2 || type === 3 || type === 4) && (_operationsConfig.imageUrl === undefined || _operationsConfig.imageUrl === null || _operationsConfig.imageUrl === '')) {
							this.$message.warning('请上传运营位banner图')
							return false
						}

          	if(type !== 101 && !_operationsConfig.operationsTitle){
      				this.$message.warning('请输入模块标题')
      				return false
        		}

          	if(type === 1){
          		for(let i=0; i<_operationsConfig.operationsContent.length; i++){
          			let operationsContentNow = _operationsConfig.operationsContent[i]
          			if(!operationsContentNow.name){
          				this.$message.warning('请输入有效的一起拼商品编号')
          				return false
          			}
          		}
          	} else if((type === 2 || type === 3) && !_operationsConfig.operationsContent[0].id){
          		this.$message.warning('请选择有效的标签名称')
      				return false
          	} else if(type === 101 && _operationsConfig.switchStatus === 1 && !_operationsConfig.operationsContent[0].id ){
          		this.$message.warning('请选择有效的标签名称')
          		return false
          	}

          	this.$service.activity.togetherOperation.saveOperationsConfig(_operationsConfig).then(res => {
              this.$message.success('提交成功')
            })
          },
          queryAllSCMTagList() {	// 从SCM服务中查询所有有效的SCM信息
          	let self = this
          	this.$service.common.queryAllSCMTagList().then(res => {
              self.scmTagList = res
           	})
          },
			  	getOnlineTopicList(){	// 获取专题列表
			  		let self = this
          	this.$service.common.getOnlineTopicList().then(res => {
              self.onlineTopic = res
           	})
			  	},
			  	saveBannerConfig() { // 保存banner图内容
			  		let self = this
			  		for(var i =0; i<self.bannerConfigList.length; i++){
			  			let bannerNow = self.bannerConfigList[i]
        			if(bannerNow.sequence === 0){
		  					self.$message.warning('请输入1-99间有效序号')
        				return false
		  				}
		  				//无跳转 || 阶梯团频道页
        			if(bannerNow.jumpType === -1 || bannerNow.jumpType === 35){
        				if((bannerNow.bannerUrl && !bannerNow.sequence) || (!bannerNow.bannerUrl && bannerNow.sequence)){
        					self.$message.warning('每组数据仅可全部完整出现，或全部为空，请检查数据')
        					return false
        				}
        			}
        			// 一起拼商品
        			if(bannerNow.jumpType === 30 && (!bannerNow.bannerUrl || !bannerNow.sequence || !bannerNow.jumpContent.id)){
        				self.$message.warning('每组数据仅可全部完整出现，或全部为空，请检查数据')
      					return false
        			}else if(bannerNow.jumpType === 30 && !bannerNow.jumpContent.name){
        				self.$message.warning('请填写选择有效的跳转内容')
      					return false
        			}
        			// 专题页和标签页
        			if((bannerNow.jumpType === 11 || bannerNow.jumpType === 21) && (!bannerNow.bannerUrl || !bannerNow.sequence || !bannerNow.jumpContent.name)){
        				self.$message.warning('每组数据仅可全部完整出现，或全部为空，请检查数据')
      					return false
        			}else if((bannerNow.jumpType === 11 || bannerNow.jumpType === 21) && !bannerNow.jumpContent.id){
        				self.$message.warning('请填写选择有效的跳转内容')
      					return false
        			}
						}
			  		self.$service.activity.togetherOperation.batchSaveBannerConfig(self.bannerConfigList).then(res => {
			  			this.$message.success('提交保存成功')
           	})
			  	}
      },
      mounted () {
		    this.$nextTick(function(){
		        this.getInfo()
		        this.queryAllSCMTagList()
		        this.getOnlineTopicList()
		    });
		  }
  }
</script>
<style type="text/css" scoped>
  .ma-b-25{ margin-bottom: 25px;}
  .pd20{ padding: 20px;}
  .h30{ height: 30px;}
  .abs{ position: absolute;left: 0; top: 32px; line-height: 20px; font-size: 12px; background-color: #f5f7fa; overflow: hidden;}
	.w170{float: left; width: 170px;}
</style>
