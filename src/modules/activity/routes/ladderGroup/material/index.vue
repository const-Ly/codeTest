<template>
  <div class="cms">
    <el-card class="box-card">
      <span slot="header">基础页面文案</span>
      <el-form label-width="270px" size="small">
        <el-form-item label="文案1：">
          <el-input class="w200" v-model.trim="info.baseCopywriting.baseCopywritingNo1" :maxLength="40"></el-input>
          <div class="font-info">应用位置：阶梯团开团成功页</div>
        </el-form-item>
        <el-form-item label="文案2：">
          <el-input class="w200" v-model.trim="info.baseCopywriting.baseCopywritingNo2" :maxLength="40"></el-input>
          <div class="font-info">应用位置：阶梯团参团落地页</div>
        </el-form-item>
        <el-form-item label="文案3：">
          <el-input class="w200" v-model.trim="info.baseCopywriting.baseCopywritingNo3" :maxLength="40"></el-input>
          <div class="font-info">应用位置：团长拼团详情页（拼团中），团员拼团详情页（拼团中）、阶梯团参团成功页</div>
        </el-form-item>
        <el-form-item label="文案4：">
          <el-input class="w200" v-model.trim="info.baseCopywriting.baseCopywritingNo4" :maxLength="40"></el-input>
          <div class="font-info">应用位置：团长拼团详情页（拼团中）、团员拼团详情页（拼团中）</div>
          <div class="font-info">支持动态变量：当前参团人数{dqctrs}、当前用户获得返现金额{dqyhfxje}</div>
          <el-button type="primary" @click="saveCopywriting">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <span slot="header">分享配置</span>
      <el-form label-width="270px" size="small">
        <el-form-item label="阶梯团分享到朋友圈按钮是否展示开关：">
          <el-radio-group v-model="info.shareConfig.momentsShareSwitch">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分享标题：">
          <el-input class="w200" v-model.trim="info.shareConfig.title" :maxLength="40"></el-input>
          <div class="font-info">支持动态变量团长购买商品的制造商背景{manaufacturer}</div>
        </el-form-item>
        <el-form-item label="分享小程序卡片：">
          <upload :width="100" :height="80" action="/image/uploadImage?width=500&height=400&fileSize=300" :size='300' :image-url="info.shareConfig.miniAppCardImage" @success="info.shareConfig.miniAppCardImage = $event" ></upload>
          <div class="font-info">必传，500×400px，jpg/png,小于300k</div>
        </el-form-item>
        <el-form-item label="分享方图：">
          <upload action="/image/uploadImage?width=300&height=300&fileSize=300" :size='300' :image-url="info.shareConfig.previewImage" @success="info.shareConfig.previewImage = $event" ></upload>
          <div class="font-info">必传，300×300px，jpg/png,小于300k</div>
          <el-button type="primary" @click="saveShareConfig">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-10">
      <span slot="header">图片素材</span>
      <el-form label-width="270px" size="small">
        <el-form-item label="频道页banner图：">
          <upload :width="150" :height="77" action="/image/uploadImage?width=750&height=385&fileSize=300" :size='300' :image-url="info.imageMaterial.bannerImage" @success="info.imageMaterial.bannerImage = $event" ></upload>
          <div class="font-info">必传，750×385px，jpg/png,小于300k</div>
          <el-button type="primary" @click="saveImageMaterial">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import Upload from '@/components/upload'
  export default {
    name: 'material',
    data () {
      return {
        info:{
          baseCopywriting:{}, // 基础页面文案
          shareConfig:{}, // 分享配置
          imageMaterial:{} // 图片素材
        }
      }
    },
    components:{Upload},
    created () {
      this.getConfig()
    },
    methods: {
      // 获取阶梯团活动基础页面文案、分享配置、图片素材
      getConfig () {
        this.$service.activity.ladderGroup.getConfig().then(res => {
          this.info = res
        })
      },
      // 保存阶梯团活动基础页面文案
      saveCopywriting () {
        if(this.info.baseCopywriting.baseCopywritingNo1 === ''){
          this.$message.warning('请输入1-40字文案1');return;
        }
        if(this.info.baseCopywriting.baseCopywritingNo2 === ''){
          this.$message.warning('请输入1-40字文案2');return;
        }
        if(this.info.baseCopywriting.baseCopywritingNo3 === ''){
          this.$message.warning('请输入1-40字文案3');return;
        }
        if(this.info.baseCopywriting.baseCopywritingNo4 === ''){
          this.$message.warning('请输入1-40字文案4');return;
        }
        this.$service.activity.ladderGroup.saveCopywriting(this.info.baseCopywriting).then(res => {
          this.$message.success('保存成功')
        })
      },
      // 保存阶梯团活动分享配置
      saveShareConfig() {
        if(this.info.shareConfig.title === ''){
          this.$message.warning('请输入1-40字分享标题');return;
        }
        if(this.info.shareConfig.miniAppCardImage === ''){
          this.$message.warning('请上传分享小程序卡片');return;
        }
        if(this.info.shareConfig.previewImage === ''){
          this.$message.warning('请上传分享方图');return;
        }
        this.$service.activity.ladderGroup.saveShareConfig(this.info.shareConfig).then(res => {
          this.$message.success('保存成功')
        })
      },
      // 保存阶梯团活动图片素材
      saveImageMaterial () {
        if(this.info.imageMaterial.bannerImage === ''){
          this.$message.warning('请上传频道页banner图');return;
        }
        this.$service.activity.ladderGroup.saveImageMaterial(this.info.imageMaterial).then(res => {
          this.$message.success('保存成功')
        })
      }
    }
  }
</script>

