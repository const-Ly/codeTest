<template>
  <div class="cms">
    <!-- 全局配置 -->
    <el-card class="box-card">
      <div slot="header">全局配置</div>
      <el-form label-width="150px" size="small">
        <el-form-item label="红包总开关：">
          <el-radio-group v-model="config.globalConfig.redPacketSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="红包总金额：">
          <el-radio-group v-model="config.globalConfig.redPacketAmountChoice">
            <el-radio :label="1">定额</el-radio>
            <el-radio :label="2">订单实付金额</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所定金额：" v-if="config.globalConfig.redPacketAmountChoice === 1">
          <el-input v-model="config.globalConfig.redPacketAmount" v-only-num="config.globalConfig.redPacketAmount" :max-len="2" class="w80"></el-input>
        </el-form-item>
        <el-form-item label="红包有效期：">
          <el-radio-group v-model="config.globalConfig.redPacketExpireType">
            <el-radio :label="1">按天</el-radio>
            <el-radio :label="2">按小时</el-radio>
          </el-radio-group>
          <div v-if="config.globalConfig.redPacketExpireType === 1">
            <el-input v-model="config.globalConfig.redPacketExpireDay" v-only-num="config.globalConfig.redPacketExpireDay" :max-len="3" class="w80"></el-input>&nbsp;天
          </div>
          <div v-else>
            <el-input v-model="config.globalConfig.redPacketExpireHour" v-only-num="config.globalConfig.redPacketExpireHour" :max-len="2" class="w80"></el-input>&nbsp;小时
            <el-input v-model="config.globalConfig.redPacketExpireMinute" v-only-num="config.globalConfig.redPacketExpireMinute" :max-len="2" class="w80"></el-input>&nbsp;分钟
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveGlobalConfig">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 特权金红包基本信息配置 -->
    <el-card class="box-card ma-t-10">
      <div slot="header">特权金红包基本信息配置</div>
      <el-form label-width="150px" size="small">
        <el-form-item label="拆红包人数：">
          <el-input v-model="config.baseInfoConfig.redPacketOpenCount" v-only-num="config.baseInfoConfig.redPacketOpenCount" :max-len="2" class="w80"></el-input>
          <div class="font-info">（为进入红包领取页的登录/注册人数，包含分享者自己{1-99}）</div>
        </el-form-item>
        <el-form-item label="邀请好友人数：">
          <el-input v-model="config.baseInfoConfig.redPacketInviteCount" v-only-num="config.baseInfoConfig.redPacketInviteCount" :max-len="2" class="w80"></el-input>
          <div class="font-info">（为通过红包链接邀请注册的新用户{1-99}）</div>
        </el-form-item>
        <el-form-item label="分享者下发限制/天：">
          <el-input v-model="config.baseInfoConfig.redPacketSharerGrantLimit" v-only-num="config.baseInfoConfig.redPacketSharerGrantLimit" :max-len="1" class="w80"></el-input>
          <div class="font-info">（领取成功第{n}天后可用，n取整数{0-7}）</div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveBaseInfoConfig">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 特权金红包小程序分享素材 -->
    <el-card class="box-card ma-t-10">
      <div slot="header">特权金红包小程序分享素材</div>
      <el-form label-width="150px" size="small">
        <el-form-item label="小程序分享标题：">
          <el-input v-model.trim="config.miniAppShareMaterial.redPacketMiniappShareTitle" :maxLength="40" class="w300"></el-input>
          <div class="font-info">支持动态变量：红包总金额{hbzje}</div>
        </el-form-item>
        <el-form-item label="小程序分享图片：">
          <upload action="/image/uploadImage?width=500&height=400&fileSize=300" :size='300' :height="80" :image-url="config.miniAppShareMaterial.redPacketMiniappShareImg" @success="config.miniAppShareMaterial.redPacketMiniappShareImg = $event" ></upload>
          <div class="font-info">必传、500×400，jpg/png，不大于300k</div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveMiniAppShareMaterial">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 特权金红包挂接分享控件顶部素材 -->
    <el-card class="box-card ma-t-10">
      <div slot="header">特权金红包挂接分享控件顶部素材</div>
      <el-form label-width="150px" size="small">
        <el-form-item label="分享组件弹窗文案：">
          <el-input v-model.trim="config.topBarShareMaterial.redPacketSharePopupCopy" :maxLength="20" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="分享组件弹窗图标：">
          <upload action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :image-url="config.topBarShareMaterial.redPacketShareGrantIco" @success="config.topBarShareMaterial.redPacketShareGrantIco = $event" ></upload>
          <div class="font-info">非必传，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveTopBarShareMaterial">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 特权金红包文字图片素材 -->
    <el-card class="box-card ma-t-10">
      <div slot="header">特权金红包文字图片素材</div>
      <el-form label-width="220px" size="small">
        <el-form-item label="邀请新用户文案：">
          <el-input v-model.trim="config.textAndImgMaterial.redPacketInviteCopy" :maxLength="30" class="w300"></el-input>
          <div class="font-info">应用场景：红包详情页，支持动态变量邀请人数：{invitation}</div>
        </el-form-item>
        <el-form-item label="支付成功页红包分享按钮文案：">
          <el-input v-model.trim="config.textAndImgMaterial.redPacketPayButtonCopy" :maxLength="10" class="w300"></el-input>
          <div class="font-info">使用场景：分享红包button，支付成功页红包图上等</div>
        </el-form-item>
        <el-form-item label="支付成功页红包弹层图：">
          <upload action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :image-url="config.textAndImgMaterial.redPacketPayPopupImg" @success="config.textAndImgMaterial.redPacketPayPopupImg = $event" ></upload>
          <div class="font-info">必传、尺寸不限，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="支付成功页红包分享按钮图：">
          <upload action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :image-url="config.textAndImgMaterial.redPacketPayButtonImg" @success="config.textAndImgMaterial.redPacketPayButtonImg = $event" ></upload>
          <div class="font-info">必传、尺寸不限，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="支付成功页广告图：">
          <upload action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :image-url="config.textAndImgMaterial.redPacketPayAdvertisementImg" @success="config.textAndImgMaterial.redPacketPayAdvertisementImg = $event" ></upload>
          <div class="font-info">必传、尺寸不限，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="红包中间页背景图：">
          <upload action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :image-url="config.textAndImgMaterial.redPacketDetailsBackgroundImg" @success="config.textAndImgMaterial.redPacketDetailsBackgroundImg = $event" ></upload>
          <div class="font-info">必传、尺寸不限，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveTextAndImgMaterial">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import Upload from '@/components/upload'
  export default {
    name: 'redbagConf',
    data () {
      return {
        config: {
          //全局配置
          globalConfig: {
            redPacketSwitch:0,
            redPacketAmountChoice:2,
            redPacketAmount:'',
            redPacketExpireType:1,
            redPacketExpireDay:'',
            redPacketExpireHour:'',
            redPacketExpireMinute:''
          },
          // 红包基本信息
          baseInfoConfig: {
            redPacketOpenCount:1,
            redPacketInviteCount:1,
            redPacketSharerGrantLimit:0
          },
          // 挂接分享空间顶部素材
          topBarShareMaterial: {
            redPacketSharePopupCopy:'',
            redPacketShareGrantIco:''
          },
          // 红包小程序分享素材
          miniAppShareMaterial: {
            redPacketMiniappShareTitle:'',
            redPacketMiniappShareImg:''
          },
          // 特权金红包文字图片素材
          textAndImgMaterial: {
            redPacketInviteCopy:'',
            redPacketPayButtonCopy:'',
            redPacketPayPopupImg:'',
            redPacketPayButtonImg:'',
            redPacketPayAdvertisementImg:'',
            redPacketDetailsBackgroundImg:''
          }
        }
      }
    },
    components: { Upload },
    created () {
      this.getConfigInfo()
    },
    methods: {
      getConfigInfo () {
        this.$service.privilege.redbagConf.query().then(res => {
          this.config = res
        })
      },
      saveGlobalConfig () {
        if(this.config.globalConfig.redPacketAmountChoice === 1 && this.config.globalConfig.redPacketAmount < 1){
          this.$message.warning('请输入1-99所定金额');return
        }
        if(this.config.globalConfig.redPacketExpireType === 1 && this.config.globalConfig.redPacketExpireDay < 1){
          this.$message.warning('请输入1-999天数');return
        }
        if(this.config.globalConfig.redPacketExpireType === 2 && (this.config.globalConfig.redPacketExpireHour === null || this.config.globalConfig.redPacketExpireHour === '' || this.config.globalConfig.redPacketExpireHour > 23)){
          this.$message.warning('请输入0-23小时数');return
        }
        if(this.config.globalConfig.redPacketExpireType === 2 && (this.config.globalConfig.redPacketExpireMinute === null || this.config.globalConfig.redPacketExpireMinute === '' || this.config.globalConfig.redPacketExpireMinute > 59)){
          this.$message.warning('请输入0-59分钟数');return
        }
        if(this.config.globalConfig.redPacketExpireType === 2 && this.config.globalConfig.redPacketExpireMinute === 0 && this.config.globalConfig.redPacketExpireHour === 0){
          this.$message.warning('请输入有效的特权金红包有效期');return
        }
        this.$service.privilege.redbagConf.globalConfig(this.config.globalConfig).then(res => {
          this.$message.success('提交成功')
        })
      },
      saveBaseInfoConfig () {
        if(this.config.baseInfoConfig.redPacketOpenCount < 1){
          this.$message.warning('请输入1-99拆红包人数');return
        }
        if(this.config.baseInfoConfig.redPacketInviteCount < 1){
          this.$message.warning('请输入1-99邀请好友人数');return
        }
        if(this.config.baseInfoConfig.redPacketSharerGrantLimit === '' || this.config.baseInfoConfig.redPacketSharerGrantLimit > 7){
          this.$message.warning('请输入0-7分享者下发限制/天');return
        }
        this.$service.privilege.redbagConf.baseInfoConfig(this.config.baseInfoConfig).then(res => {
          this.$message.success('提交成功')
        })
      },
      saveMiniAppShareMaterial () {
        if(this.config.miniAppShareMaterial.redPacketMiniappShareTitle === ''){
          this.$message.warning('请输入1-40字小程序分享标题');return
        }
        if(this.config.miniAppShareMaterial.redPacketMiniappShareImg === ''){
          this.$message.warning('请上传小程序分享图片');return
        }
        this.$service.privilege.redbagConf.miniAppShareMaterial(this.config.miniAppShareMaterial).then(res => {
          this.$message.success('提交成功')
        })
      },
      saveTopBarShareMaterial () {
        this.$service.privilege.redbagConf.topBarShareMaterial(this.config.topBarShareMaterial).then(res => {
          this.$message.success('提交成功')
        })
      },
      saveTextAndImgMaterial () {
        if(this.config.textAndImgMaterial.redPacketInviteCopy === ''){
          this.$message.warning('请输入1-30字邀请新用户文案');return
        }
        if(this.config.textAndImgMaterial.redPacketPayButtonCopy === ''){
          this.$message.warning('请输入1-10字支付成功页红包分享按钮文案');return
        }
        if(this.config.textAndImgMaterial.redPacketPayPopupImg === ''){
          this.$message.warning('请上传支付成功页红包弹层图');return
        }
        if(this.config.textAndImgMaterial.redPacketPayButtonImg === ''){
          this.$message.warning('请上传支付成功页红包分享按钮图');return
        }
        if(this.config.textAndImgMaterial.redPacketPayAdvertisementImg === ''){
          this.$message.warning('请上传支付成功页广告图');return
        }
        if(this.config.textAndImgMaterial.redPacketDetailsBackgroundImg === ''){
          this.$message.warning('请上传红包中间页背景图');return
        }
        this.$service.privilege.redbagConf.textAndImgMaterial(this.config.textAndImgMaterial).then(res => {
          this.$message.success('提交成功')
        })
      }
    }
  }
</script>
