<template>
  <div class="cms">
    <el-card class="box-card">
    	<div slot="header" class="clearfix">
        <span class="line-32">全局配置</span>
      </div>
      <el-form ref="form" label-width="400px" size="small" class="input-normal">
        <el-form-item label="清空90天用户限制：">
        	<el-button type="warning" @click="emptyRestrict">清空</el-button>
        </el-form-item>
        <el-form-item label="挂接文案（支持动态变量特权金面额{tqjme}）：">
        	<el-input v-model.trim="param.hangUpCopy" :maxLength="40" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="非挂接文案（支持动态变量特权金面额{tqjme}）：">
        	<el-input v-model.trim="param.noHangUpCopy" :maxLength="40" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="弹层按钮文案：">
        	<el-input v-model.trim="param.buttonCopy" :maxLength="15" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveMaterial">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">特权金注册登录弹层配置</span>
      </div>
      <el-form label-width="400px" size="small">
        <el-form-item label="按用户开关：">
          <el-radio-group v-model="entranceConfigDto.userSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="未登录弹层图：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="entranceConfigDto.unLoginMaskUrl" @success="entranceConfigDto.unLoginMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="已登录弹层图：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="entranceConfigDto.loginMaskUrl" @success="entranceConfigDto.loginMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="savePrivilegeMaskConfig(1)">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">特权金按次弹层配置</span>
      </div>
      <el-form label-width="400px" size="small">
        <el-form-item label="按次弹层开关：">
          <el-radio-group v-model="accordNumConfigDto.numSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="弹层关闭按钮控制：">
          <el-radio-group v-model="accordNumConfigDto.numDialogCloseSwitch">
            <el-radio :label="1">生效</el-radio>
            <el-radio :label="0">不生效</el-radio>
          </el-radio-group>
          <div class="font-info">生效为点击关闭按钮则弹层关闭；不生效则为点击进入弹窗下一级页面。</div>
        </el-form-item>
        <el-form-item label="第一次弹层图：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="accordNumConfigDto.firstMaskUrl" @success="accordNumConfigDto.firstMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="第二次弹层图：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="accordNumConfigDto.secondMaskUrl" @success="accordNumConfigDto.secondMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="第三次弹层图：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="accordNumConfigDto.thirdMaskUrl" @success="accordNumConfigDto.thirdMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="savePrivilegeMaskConfig(2)">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">弹层跳转图配置</span>
      </div>
      <el-form label-width="400px" size="small">
        <el-form-item label="领取成功弹层：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="dialogJumpConfigDto.getSuccessMaskUrl" @success="dialogJumpConfigDto.getSuccessMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="返回拦截弹层：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="dialogJumpConfigDto.returnInterceptMaskUrl" @success="dialogJumpConfigDto.returnInterceptMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="savePrivilegeMaskConfig(3)">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">特权金商品详情页弹层</span>
      </div>
      <el-form label-width="400px" size="small">
        <el-form-item label="商品详情页弹层图：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="productDetailConfigDto.productDetailPageMaskUrl" @success="productDetailConfigDto.productDetailPageMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="编辑器已登录弹层：">
          <upload  class="inline-block" action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :imageUrl="productDetailConfigDto.editorYetFlipLayerMaskUrl" @success="productDetailConfigDto.editorYetFlipLayerMaskUrl = $event" ></upload>
          <div class="font-info">建议图片宽度610px，格式jpg，png，不大于300k</div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="savePrivilegeMaskConfig(4)">提交保存</el-button>
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
      param:{},
      entranceConfigDto: {  // 特权金注册登录弹层
        userSwitch: 0,
        unLoginMaskUrl:'',
        loginMaskUrl:''
      },
      accordNumConfigDto: {    // 特权金按次弹层配置
        numSwitch:0,
        numDialogCloseSwitch:0,
        firstMaskUrl:'',
        secondMaskUrl:'',
        thirdMaskUrl:''
      },
      dialogJumpConfigDto: {    // 弹层跳转图配置
        getSuccessMaskUrl:'',
        returnInterceptMaskUrl:''
      },
      productDetailConfigDto: {
        productDetailPageMaskUrl: null,
        editorYetFlipLayerMaskUrl: null
      }
    }
  },
  methods:{
	    getMaterial() {
	      this.$service.privilege.material.getIndexBottomCopy().then(res => {
	      	this.param = res
	      })
	    },
	  	saveMaterial() {
	  		let self = this
	  		if(!self.param.hangUpCopy){
	  			self.$message.warning('请输入挂接文案（支持动态变量特权金面额{tqjme}）')
	  			return false
	  		}
	  		if(!self.param.noHangUpCopy){
	  			self.$message.warning('请输入非挂接文案（支持动态变量特权金面额{tqjme}）')
	  			return false
	  		}
	  		if(!self.param.buttonCopy){
	  			self.$message.warning('请输入弹层按钮文案')
	  			return false
	  		}
        self.$service.privilege.material.saveIndexBottomCopy(self.param).then(res => {
          self.$message.success('提交保存成功')
       	})
      },
      // 清空90天用户限制数据
	  	emptyRestrict() {
	  		this.$confirm('确定清空90天用户限制数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.$service.privilege.material.updateNoShareLimitStartTime().then(res => {
	          this.$message.success('清空成功')
	       	})
        })
      },
      // 获取特权金素材配置详情
      getLayerInfo () {
        this.$service.privilege.material.getPrivilegeMaskConfig().then(res => {
          res && (this.entranceConfigDto = res.entranceConfigDto)
          res && (this.accordNumConfigDto = res.accordNumConfigDto)
          res && (this.dialogJumpConfigDto = res.dialogJumpConfigDto)
          res && (this.productDetailConfigDto = res.productDetailConfigDto)
        })
      },
      // 保存特权金注册登录弹层配置信息
      savePrivilegeMaskConfig (type) {
        // type: 1.特权金注册登录弹层   2.特权金按次弹层配置   3.弹层跳转图配置
        let param = null
        switch(type){
          case 1:
            if(!this.entranceConfigDto.unLoginMaskUrl){
              this.$message.warning('请上传未登录弹层图')
              return false
            }
            if(!this.entranceConfigDto.loginMaskUrl){
              this.$message.warning('请上传已登录弹层图')
              return false
            }
            param = {entranceConfigDto: this.entranceConfigDto,operType:1}
            break
          case 2:
            param = {accordNumConfigDto: this.accordNumConfigDto,operType:2}
            break
          case 3:
            param = {dialogJumpConfigDto: this.dialogJumpConfigDto,operType:3}
            break
          case 4:
            param = {productDetailConfigDto: this.productDetailConfigDto,operType:4}
            break
        }
        this.$service.privilege.material.savePrivilegeMaskConfig(param).then(res => {
          res && (this.$message.success('提交保存成功'))
        })
      },
    },
    components:{Upload},
    mounted () {
      this.getMaterial()
      this.getLayerInfo()
    }
  }
</script>
<style type="text/css" scoped>
</style>
