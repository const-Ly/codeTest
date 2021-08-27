<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="150px" class="input-normal">
        <el-form-item label="编号：">{{ param.id }}</el-form-item>
        <el-form-item label="广告位置：">
          <span v-show="param.position === 1">朋友首页</span>
        </el-form-item>
        <el-form-item label="轮播图：">
          <img-enlarge :src="param.imgUrl"></img-enlarge>
        </el-form-item>
        <el-form-item label="适用用户：">
          <span v-if="param.customerType.newVisitor === 1"> 新访客 </span>
          <span v-if="param.customerType.oldVisitor === 1"> 老访客 </span>
          <span v-if="param.customerType.customer === 1"> 老客 </span>
        </el-form-item>
        <el-form-item label="开始/结束时间：">
          <span>{{ param.beginTime }}</span>
          -
          <span>{{ param.endTime }}</span>
        </el-form-item>
        <el-form-item label="排序位置：">{{ param.seq }}</el-form-item>
        <el-form-item label="跳转类型：">
          <span v-if="param.jumpType === 47">推荐商家</span>
          <span v-if="param.jumpType === 48">推荐大v</span>
          <span v-if="param.jumpType === 45">页面路由</span>
        </el-form-item>
        <el-form-item label="显示终端：">
          <span v-if="param.clientType.iosFlag === 1"> IOS </span>
          <span v-if="param.clientType.androidFlag === 1"> Android </span>
          <span v-if="param.clientType.miniappFlag === 1"> 小程序 </span>
        </el-form-item>
        <el-form-item label="商家ID：" v-show="param.jumpType === 47">
          {{ param.jumpContent.jumpParam }}
        </el-form-item>
        <el-form-item label="大V ID：" v-show="param.jumpType === 48">
          {{ param.jumpContent.jumpParam }}
        </el-form-item>
        <el-form-item label="IOS路由：" v-show="param.jumpType === 45 && param.clientType.iosFlag === 1">
          {{ param.jumpContent.routing.iosRouting }}
        </el-form-item>
        <el-form-item label="Android路由：" v-show="param.jumpType === 45 && param.clientType.androidFlag === 1">
          {{ param.jumpContent.routing.androidRouting }}
        </el-form-item>
        <el-form-item label="小程序路由：" v-show="param.jumpType === 45 && param.clientType.miniappFlag === 1">
          {{ param.jumpContent.routing.miniappRouting }}
        </el-form-item>
        <el-form-item label="创建者：">{{ param.createBy }}</el-form-item>
        <el-form-item label="创建时间：">{{ param.createTime }}</el-form-item>
        <el-form-item label="修改者：">{{ param.updateBy }}</el-form-item>
        <el-form-item label="更新时间：">{{ param.updateTime }}</el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  import ImgEnlarge from '@/components/imgEnlarge'
  export default {
    name: 'details',
    data () {
      return {
        param: {
          position: 1,
          imgUrl: '',
          seq: '',
          beginTime: '',
          endTime: '',
          clientType: { // 显示终端 1=勾选0=不勾选
            iosFlag: 0,
            androidFlag: 0,
            miniappFlag: 0,
            mFlag: 0
          },
          customerType: { // 适用用户 1=勾选0=不勾选
            newVisitor: 1, // 新访客
            oldVisitor: 1, // 老访客
            customer:  1 // 老客
          },
          jumpType: '', // 跳转类型，路由： 45,推荐商家47,推荐大V 48
          jumpContent: { // 跳转参数信息及路由信息
            jumpParam: '', // jumpType=47时，该字段必填，为商家IDjumpType=48时，该字段必填，为大VID
            routing: { // 跳转路由
              iosRouting: '',
              androidRouting: '',
              miniappRouting: '',
              mRouting: ''
            }
          }
        }
      }
    },
    mounted () {
      this.getInfo(this.$route.params.id)
    },
    components:{ ImgEnlarge },
    methods:{
      getInfo (id) {
        this.$service.operate.advertisingSpace.info({id}).then(res => {
          this.param = res
        })
      }
    }
  }
</script>
<style scoped>
  .input-normal {width:800px; }
</style>
