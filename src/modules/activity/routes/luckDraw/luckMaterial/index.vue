<template>
  <div class="cms">
    <el-card class="box-card">
      <h4 slot="header">平台抽奖素材</h4>
      <el-form ref="form" label-width="350px" size="small" class="input-normal">
        <el-form-item label="平台抽奖详情页分享标题：">
          <el-input v-model.trim="plate.shareTitle" :maxLength="40" class="w400"></el-input>
          <br/>(注：支持动态变量{title}=抽奖活动名称)
        </el-form-item>
        <el-form-item label="抽奖频道页顶部展示文案：">
          <el-input v-model.trim="plate.topCopy" :maxLength="30" class="w400"></el-input>
        </el-form-item>
        <el-form-item label="抽奖频道页（APP/M站）分享朋友圈微信好友标题：">
          <el-input v-model.trim="plate.wechatTitle" :maxLength="40" class="w400"></el-input>
        </el-form-item>
        <el-form-item label="抽奖频道页分享小程序标题：">
          <el-input v-model.trim="plate.miniTitle" :maxLength="40" class="w400"></el-input>
        </el-form-item>
        <el-form-item label="分享频道页小程序卡片：">
          <upload action="/image/uploadImage?width=500&height=400&fileSize=300" :width="125" :height="100" :size='300' :image-url="plate.miniImageUrl" @success="plate.miniImageUrl = $event" ></upload>
          <div class="font-info">尺寸500px*400px,jpg/png格式，不大于300k</div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="savePlateInfo">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20">
      <h4 slot="header">个人抽奖默认标题及入口开关</h4>
      <el-form ref="form" label-width="350px" size="small" class="input-normal">
        <el-form-item label="频道页个人抽奖入口开关：">
          <el-radio-group v-model="personal.personSwitch">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个人抽奖默认标题：">
           <ul>
             <li v-for="(item,idx) in personal.titleList" :key="idx">
               <el-input v-model.trim="personal.titleList[idx]" :maxLength="20" class="w400"></el-input>&nbsp;
               <el-button type="text" v-if="personal.titleList.length>1" class="font font-danger" @click="removePersonalTitle(idx)">删除</el-button>
             </li>
           </ul>
           <el-button type="text" class="font font-blue" v-show="personal.titleList.length<10" @click="addTitle">再添加一条</el-button>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="savePersonalTitle">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-20">
      <h4 slot="header">个人抽奖默认图及分享卡片图</h4>
      <div>
        <div class="font-info">默认图：尺寸750px*385px,jpg/png格式，不大于300k；<span class="ma-l-40">分享图：尺寸300px*300px,jpg/png格式，不大于300k；</span><span class="ma-l-40">小程序卡片图：尺寸500px*400px,jpg/png格式，不大于300k</span></div>
        <ul class="clearfix picSet">
          <li v-for="(item,idx) in personal.imageList" :key="idx">
             <upload  class="inline-block" :width="150" :height="77" action="/image/uploadImage?width=750&height=385&fileSize=300" :size='300' :image-url="item.defaultImageUrl" @success="item.defaultImageUrl = $event" ></upload>
             <upload class="inline-block" :width="77" :height="77" action="/image/uploadImage?width=300&height=300&fileSize=300" :size='300' :image-url="item.shareImageUrl" @success="item.shareImageUrl = $event" ></upload>
             <upload class="inline-block" :width="96" :height="77" action="/image/uploadImage?width=500&height=400&fileSize=300" :size='300' :image-url="item.miniImageUrl" @success="item.miniImageUrl = $event" ></upload>
             <span v-if="personal.imageList.length>1" class="font font-danger" @click="removePersonalImg(idx)">删除该组</span>
          </li>
         </ul>
         <el-button type="text" class="font font-blue" v-show="personal.imageList.length<10" @click="addImg">添加一组</el-button><br>
      </div>
      <el-form ref="form" label-width="350px" size="small" class="input-normal">
        <el-form-item label=" ">
          <el-button type="primary" @click="savePersonalImg">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  import Upload from '@/components/upload'
  export default {
    name: 'luckMaterial',
    data () {
      return {
        plate:{
          platformLotteryId:null,//平台抽奖素材id
          shareTitle:'',//平台抽奖详情页分享标题
          topCopy:'', // 抽奖频道页顶部文案
          wechatTitle:'', //抽奖频道页(APP&M站)分享朋友圈微信好友标题
          miniTitle:'', // 抽奖频道页分享小程序标题
          miniImageUrl:'',  //分享频道页小程序卡片图
          miniImageUrl:''   // 小程序卡片图
        },
        personal:{
          personLotteryId:null,
          personSwitch:0,
          titleList:[],
          imageList:[]
        }
      }
    },
    components:{Upload},
    mounted () {
      this.queryPlatformLotteryMatter()
      this.queryPersonLotteryMatter()
    },
    methods:{
      //查询平台抽奖素材信息
      queryPlatformLotteryMatter () {
        this.$service.activity.luckDraw.queryPlatformLotteryMatter().then(res => {
          this.plate = res
        })
      },
      // 查询个人抽奖素材信息
      queryPersonLotteryMatter () {
        this.$service.activity.luckDraw.queryPersonLotteryMatter().then(res => {
          this.personal = res
        })
      },
      checkPlateInfo () {
        if(this.plate.shareTitle === ''){
          this.$message.warning('请输入平台抽奖详情页分享标题');return
        }
        if(this.plate.topCopy === ''){
          this.$message.warning('请输入抽奖频道页顶部展示文案');return
        }
        if(this.plate.wechatTitle === ''){
          this.$message.warning('请输入抽奖频道页（APP/M站）分享朋友圈微信好友标题');return
        }
        if(this.plate.miniTitle === ''){
          this.$message.warning('请输入抽奖频道页分享小程序标题');return
        }
        if(this.plate.miniImageUrl === ''){
          this.$message.warning('请上传分享频道页小程序卡片');return
        }
        return true
      },
      savePlateInfo () {
        if(this.checkPlateInfo()){
          this.$service.activity.luckDraw.savePlatformLotteryMatter(this.plate).then(res => {
             this.$message.success('提交成功');
          })
        }
      },
      addTitle () {
        this.personal.titleList.push("")
      },
      removePersonalTitle (idx) {
        this.personal.titleList.splice(idx,1)
      },
      checkePersonTitle () {
        let arr = this.personal.titleList.filter(item => {
          return item === ''
        })
        //有选项内容为空 或者 一条数据没添加
        if(this.personal.titleList.length === 0 || arr.length>0){
          this.$message.warning("请输入个人抽奖默认标题");return
        }
        return true
      },
      savePersonalTitle () {
        if(this.checkePersonTitle()){
          let _param = JSON.parse(JSON.stringify(this.personal))
          delete _param.imageList
          this.$service.activity.luckDraw.savePersonLotteryTitle(_param).then(res => {
             this.$message.success('提交成功');
          })
        }
      },
      addImg () {
         this.personal.imageList.push({
           defaultImageUrl:'', //个人抽奖默认图
           shareImageUrl:'' // 分享卡片图
         })
      },
      removePersonalImg (idx) {
        this.personal.imageList.splice(idx,1)
      },
      checkePersonImg () {
        let arr = this.personal.imageList.filter(item => {
          return item.defaultImageUrl === '' || item.shareImageUrl === '' || !item.miniImageUrl
        })
        //有选项内容为空 或者 一条数据没添加
        if(this.personal.imageList.length === 0 || arr.length>0){
          this.$message.warning("请完整上传默认图、分享图及小程序卡片图");return
        }
        return true
      },
      savePersonalImg () {
        if(this.checkePersonImg()){
          let _param = JSON.parse(JSON.stringify(this.personal))
          delete _param.personSwitch
          delete _param.titleList
          this.$service.activity.luckDraw.savePersonLotteryImage(_param).then(res => {
             this.$message.success('提交成功');
          })
        }
      }
    }
  }
</script>
<style scoped>
  .picSet {padding-top: 10px;}
  .picSet li { float:left;margin-right: 20px; padding-bottom: 20px;}
  .picSet li span{position: relative;top:-35px;margin-left: 10px;}
</style>

