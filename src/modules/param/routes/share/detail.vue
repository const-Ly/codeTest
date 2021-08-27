<template>
  <div>
    <el-card class="box-card">
      <div class="tip-txt" v-html="configDetail.sharePageParamDesc"></div>
    </el-card>
    <el-card class="ma-t-20">
      <el-collapse>
        <el-collapse-item v-for="(item,idx) in configDetail.shareConfigDtoList" :key="idx" :title="(idx+1) +'、'+ item.shareChannelName" :name="idx+1">
          <div class="option-box">
            <div class="option-list clearfix">
              <div class="option-label"><span class="font-danger ma-r-10">*</span>分享开关：</div>
              <div class="option-val">
                 <el-radio-group v-model="item.enable">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div v-for="(e,i) in item.shareConfigParamList" :key="i">
              <div :class="{'my-card':item.isComplex===1}">
                <div class="my-card-btn">
                  <i @click="addModel(item)" v-if="item.isComplex===1 && item.shareConfigParamList.length<num && i+1===item.shareConfigParamList.length" class="btn-add el-icon-circle-plus-outline"></i>
                  <i @click="delModel(item, i)" v-if="item.isComplex===1 && item.shareConfigParamList.length>1" class="btn-del el-icon-delete"></i>
                </div>
                <div class="option-list clearfix" v-if="item.shareChannelId === 3">
                  <div class="option-label"><span class="font-danger ma-r-10">*</span>二维码类型：</div>
                  <div class="option-val">
                    <el-radio-group v-model="e.shareType">
                      <el-radio :label="1">二维码</el-radio>
                      <el-radio :label="2">小程序</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="option-list clearfix" v-if="[4,5,6].indexOf(item.shareChannelId)>-1">
                  <div class="option-label"><span class="font-danger ma-r-10">*</span>分享标题：</div>
                  <div class="option-val">
                    <el-input v-model.trim="e.title" size="small" class="w400" maxlength="80" placeholder="请输入分享标题"></el-input>
                  </div>
                </div>
                <div class="option-list clearfix" v-if="[1,2,3,4,6,7].indexOf(item.shareChannelId)>-1">
                  <div class="option-label"><span class="font-danger ma-r-10" v-if="item.shareChannelId !== 6 && item.shareChannelId !== 4">*</span>
                    {{item.shareChannelId === 1?"口令内容":item.shareChannelId===7?"短信内容":[2,3].indexOf(item.shareChannelId)>-1?"文案描述":"分享描述"}}：
                  </div>
                  <div class="option-val">
                    <el-input v-model.trim="e.copy[0]" size="small" class="w400" :maxlength="item.shareChannelId===1?100:item.shareChannelId===2?40:item.shareChannelId===7?140:80" placeholder="请输入分享描述"></el-input>
                  </div>
                </div>
                <div class="option-list clearfix" v-if="item.shareChannelId === 3">
                  <div class="option-label"><span class="font-danger ma-r-10">*</span>文案描述：</div>
                  <div class="option-val">
                    <el-input v-model.trim="e.copy[1]" size="small" class="w400" maxlength="80" placeholder="请输入分享描述"></el-input>
                  </div>
                </div>
                <div class="option-list clearfix" v-if="[3,4,5,6].indexOf(item.shareChannelId)>-1">
                  <div class="option-label">{{item.shareChannelId===3 ?"长图图片":"分享图片"}}：</div>
                  <div class="option-val">
                    <upload action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300" :size='300' :image-url="e.imageUrl" @success="handleRightsImgeUrl($event,e)" ></upload>
                  </div>
                  <div class="option-tip">图片非必填项，若未上传根据系统前端规则显示，若上传成功则获取上传的图片，图片需为jpg/png格式，大小不超过300k，规格不限制，但建议为方形图片。</div>
                </div>
              </div>
            </div>
            <div class="option-list clearfix">
              <div class="option-val mar-t12">
                <div class="option-label">&nbsp;</div>
                <el-button type="primary" size="small" @click="handleSave(item)">提交保存</el-button>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script type="text/javascript">
  import Upload from '@/components/upload'
  // 说明:各类型枚举值：shareChannelId
  // 1、口令          2、当面扫码            3、长图
  // 4、微信          5、朋友圈              6、企业微信
  // 7、短信          8、复制链接            9、其他
  export default {
    name: 'share',
    data () {
      return {
        sharePageId:this.$route.params.id,
        num: 10,    // 模块最大数量
        configDetail:{
          sharePageParamDesc: "",
          shareConfigDtoList:[]
        }
      }
    },
    components:{Upload},
    mounted () {
      let ele, self = this
      this.$service.param.share.getShareConfigByPageId({sharePageId:this.sharePageId}).then( res => {
        ele = document.querySelectorAll('.el-breadcrumb__inner')
        ele[ele.length-1].innerHTML = res.sharePageName
        document.title = res.sharePageName
        self.configDetail.sharePageParamDesc = res.sharePageParamDesc.replace(/\n/g,'<div></div>')
        self.configDetail.shareConfigDtoList = res.shareConfigDtoList
      })
    },
    methods:{
      // 保存配置
      handleSave (data) {
        let param, self = this
        if(self.testItem(data)){
          param = JSON.parse(JSON.stringify(data))
          param.sharePageId = self.sharePageId
          self.$service.param.share.saveShareConfig(param).then(res => {
            self.$message.success("保存成功")
          })
        }
      },
      // 校验必填项
      testItem (data) {
        let i, sl = data.shareConfigParamList
        for (i=0; i<sl.length; ++i) {
          // 校验分享标题
          if([4,5,6].indexOf(data.shareChannelId)> -1 && sl[i].title === ""){ // 企业微信，朋友圈，微信好友
            this.$message.warning("请输入有效的分享标题");return false;
          }
          // 校验分享描述
          if(data.shareChannelId === 2 && sl[i].copy[0]===""){// 当面扫码
            this.$message.warning("请输入1-40字文案描述");return false;
          }
          if(data.shareChannelId === 1 && sl[i].copy[0]===""){// 口令
            this.$message.warning("请输入1-100字口令内容");return false;
          }
          if(data.shareChannelId === 7 && sl[i].copy[0]===""){// 短信内容
            this.$message.warning("请输入1-140字短信内容");return false;
          }
          if(data.shareChannelId === 3 && (sl[i].copy[0]==="" || sl[i].copy[1]==="")){// 长图
            this.$message.warning("请输入1-80字文案描述");return false;
          }
        }
        return true
      },
      // 上传图片成功后……
      handleRightsImgeUrl (url,data) {
        data.imageUrl = url
      },
      // 增加模块
      addModel (item) {
        item.shareConfigParamList.push({
          'title':'',
          'copy':[],
          'imageUrl':'',
          'shareType':0,
          'sharePageId':null
        })
      },
      // 删除模块
      delModel (item, i) {
        this.$confirm('确定删除？', '', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          item.shareConfigParamList.splice(i, 1)
        }).catch(() => {})
      }
    }
  }
</script>


<style type="text/css" scoped>
  .tip-txt {
    border:1px solid #e6a23c;
    color:#e6b9b3;
    background-color: #fdf6ec;
    line-height:2;
    padding-left: 20px;
    margin-bottom: 10px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .option-box {
    padding:20px 0;
  }
  .option-list {
    margin-top: 10px;
  }
  .option-label {
    float:left;
    width:120px;
    text-align: right;
    margin-right: 10px;
  }
  .option-val,.option-tip {
    float: left;
  }
  .option-tip {
    width:400px;
    margin-left: 20px;
  }
  .mar-t12 {
    margin-top: 12px;
  }
  .my-card {
    position: relative;
    margin-top: 12px;
    padding: 20px 0;
    width: 820px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .my-card-btn {
    position: absolute;
    right: 15px;
  }
  .btn-del, .btn-add {
    font-size: 24px;
    color: #409EFF;
    cursor: pointer;
  }
</style>
