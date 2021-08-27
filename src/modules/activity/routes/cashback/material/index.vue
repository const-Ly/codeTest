<template>
  <div class="cms">
    <el-card class="box-card">
      <h4 slot="header">抢返现频道介绍图</h4>
      <el-form ref="form" label-width="250px" size="small" class="input-normal">
        <el-form-item label="跳转页抽奖ID：">
        	<span class="font-blue" @click="chooseLotteryId">选择抽奖ID</span>
          <span>{{channel.lotteryId}}</span>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveChannel">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card m-t-10">
      <h4 slot="header">分享素材</h4>
      <el-form ref="form" label-width="250px" size="small" class="input-normal">
        <el-form-item label="抢返现详情页--分享标题：">
        	<el-input v-model.trim="share.detailPageTitle" :maxLength="40" class="w400"></el-input>
        </el-form-item>
        <el-form-item label="抢返现支付成功页--分享文案：">
        	<el-input v-model.trim="share.paySuccessPageInfo" :maxLength="40" class="w400"></el-input>
        </el-form-item>
        <el-form-item label="分享小程序卡片：">
          <upload action="/image/uploadImage?width=500&height=400&fileSize=300" :width="100" :height="80" :size='300' :image-url="share.miniSharePicUrl" @success="share.miniSharePicUrl = $event" ></upload>
          <div class="font-info">尺寸500px*400px,jpg/png格式，不大于300k</div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveShare">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="选择抽奖ID" :visible.sync="chooseDialog" width="60%">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="抽奖活动ID">
        	<el-input class="w300" v-model.trim="choose.lotteryId" v-only-num.string="choose.lotteryId"></el-input>
        </el-form-item>
        <el-form-item label="抽奖活动名称">
        	<el-input v-model.trim="choose.lotteryName" class="w300"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getLotteryPage(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="choose.list" style="width:100%" class="ma-t-20">
	      <el-table-column label="活动ID" prop="lotteryId"></el-table-column>
	      <el-table-column label="活动名称" prop="lotteryName"></el-table-column>
		    <el-table-column label="状态" prop="statusName"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
           <span class="font-blue" @click="handleLotteryId(scope.row.lotteryId)">选择</span>
          </template>
		    </el-table-column>
	    </el-table>
      <div class="cms-pagination"  v-if="choose.pages>0">
        <el-pagination :current-page.sync="choose.pageIndex" @current-change="getLotteryPage" :page-count="choose.pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>	
<script type="text/javascript">
  import Upload from '@/components/upload'
  export default {
    name: 'luckMaterial',
    data () {
      return {
        channel:{
          'lotteryId':''
        },
        share:{
          'detailPageTitle':'',
          'paySuccessPageInfo':'',
          'miniSharePicUrl':'',
        },
        chooseDialog:false,
        choose:{
          'lotteryId':'',
          'lotteryName':'',
          'list':[],
          'pageIndex':1
        }
      }
    },
    components:{Upload},
    methods:{
      getMaterial () {
        this.$service.activity.cashback.getMaterial().then(res => {
          this.channel.lotteryId = res.lotteryId
          this.share.detailPageTitle = res.detailPageTitle
          this.share.paySuccessPageInfo = res.paySuccessPageInfo
          this.share.miniSharePicUrl = res.miniSharePicUrl
        })
      },
      chooseLotteryId (){
      	this.getLotteryPage()
      	this.chooseDialog = true
      	
      },
      saveChannel(){
      	if(!this.channel.lotteryId){
      		this.$message.warning("请选择抽奖ID")
        	return
      	}
      	this.$service.activity.cashback.channelUpdate(this.channel).then(res => {
          this.$message.success("提交成功")
        })
      },
      saveShare(){
      	if(!this.share.detailPageTitle){
      		this.$message.warning("请输入抢返现详情页--分享标题")
        	return
      	}
      	if(!this.share.paySuccessPageInfo){
      		this.$message.warning("请输入抢返现支付成功页--分享文案")
        	return
      	}
      	if(!this.share.miniSharePicUrl){
      		this.$message.warning("请上传分享小程序卡片")
        	return
      	}
      	this.$service.activity.cashback.shareUpdate(this.share).then(res => {
          this.$message.success("提交成功")
        })
      },
      getLotteryPage(val){
        let param = {
          lotteryId: this.choose.lotteryId,
          lotteryName: this.choose.lotteryName,
          statusIn: '0,1',
          pageIndex: val || 1,
          pageSize: 20
        }
       	this.$service.activity.luckDraw.getLotteryPage(param).then(res => {
          this.choose.list = res.list || []
          this.choose.pages = res.pages
       	})
      },
      handleLotteryId(id){
      	this.channel.lotteryId = id
      	this.chooseDialog = false
      }
    },
    mounted () {
      this.getMaterial()
    },
  }
</script>
<style scoped>
</style>

