<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form label-width="150px" class="input-normal">
        <el-form-item v-show="type == 2" label="编号：">
          <span>{{param.id}}</span>
        </el-form-item>
        <el-form-item class="text-first" label="模块位置：">
          <el-radio-group v-model="param.modelPosition">
            <el-radio :label="1">首页活动入口-1</el-radio>
            <el-radio :label="2">首页活动入口-2</el-radio>
          </el-radio-group>
          <p class="font-info">首页活动入口-1为首页icon上方位置展示，首页活动入口-2为首页icon下方位置展示</p>
        </el-form-item>
        <el-form-item class="text-first" label="触发登录：">
          <el-checkbox-group v-model="param.loginType">
            <el-checkbox :label="1">登录</el-checkbox>
            <el-checkbox :label="2">不登录</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="text-first" label="适用用户：">
          <el-checkbox-group v-model="param.userType">
            <el-checkbox :label="1">登录-新访客</el-checkbox>
            <el-checkbox :label="2">登录-老访客</el-checkbox>
            <el-checkbox :label="3">未登录-新访客</el-checkbox>
            <el-checkbox :label="4">未登录-老访客</el-checkbox>
            <el-checkbox :label="5">老客</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="活动类型：">
          <el-radio-group v-model="param.activityType">
            <el-radio :label="1">无特殊定义</el-radio>
            <el-radio :label="2">必要朋友</el-radio>
            <el-radio :label="3">抢福利</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="text-first" label="变量字色：" v-if="param.activityType === 2 || param.activityType === 3">
          <el-color-picker v-model="param.variableColor"></el-color-picker>
        </el-form-item>
        <el-form-item class="text-first" label="运营图片：">
          <upload
            action="/image/uploadImage?width=-1&height=-1&fileSize=300"
            :size='300'
            :image-url="param.operationImgUrl"
                @success="param.operationImgUrl=$event"></upload>
          <p class="font-info">注意图片尺寸，支持jpg、png格式文件，文件小于300k</p>
        </el-form-item>
        <el-form-item class="text-first" label="开始/结束时间：">
          <el-date-picker v-model="param.startDate"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          —
          <el-date-picker v-model="param.endDate"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item class="text-first" label="终端类型：">
          <el-radio-group v-model="param.clientType">
            <el-radio :label="1">IOS</el-radio>
            <el-radio :label="2">Android</el-radio>
            <el-radio :label="4">小程序</el-radio>
            <el-radio :label="3">M站</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.clientType === 1" label="IOS版本：">
          <el-select v-model="param.iosVersionInfo.versionNumFrom">
            <el-option v-for="(item, idx) in iosVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
          —
          <el-select v-model="param.iosVersionInfo.versionNumTo">
            <el-option v-for="(item, idx) in iosVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.clientType === 1" label="IOS路由地址：">
          <el-input v-model.trim="param.iosRoute" :maxLength="999"></el-input>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.clientType === 2" label="Android版本：">
          <el-select v-model="param.androidVersionInfo.versionNumFrom">
            <el-option v-for="(item, idx) in androidVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
          —
          <el-select v-model="param.androidVersionInfo.versionNumTo">
            <el-option v-for="(item, idx) in androidVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.clientType === 2" label="Android路由地址：">
          <el-input v-model.trim="param.androidRoute" :maxLength="999"></el-input>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.clientType === 4" label="小程序路由地址：">
          <el-input v-model.trim="param.miniappRoute" :maxLength="999"></el-input>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.clientType === 3" label="M站链接：">
          <el-input v-model.trim="param.pcmRoute" :maxLength="999"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" class="sub-btn" @click="submit">提交保存</el-button>
          <el-button class="sub-btn" @click="closed">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  import upload from '@/components/upload'
  export default {
    name: 'homeOperateApp',
    data () {
      return {
        type: this.$route.params.type, // 页面类型，空：添加，1复制，2编辑
        fromVersionNumIOS: 148, // 初始版本 IOS
        fromVersionNumAndroid: 287, // 初始版本 Android
        param: {
          modelPosition: 1, // 模块位置: 1：首页活动入口-1；2：首页活动入口-2
          loginType: [1,2], // 触发登录：1 - 登录； 2 - 未登录
          userType: [1, 2, 3, 4, 5], // 适用用户：1 - 登录新访客； 2 - 登录老访客；3 - 未登录-新访客；4 - 未登录-老访客；5 - 老客
          activityType: 1, // 活动类型, 1-无特殊定义；2-必要朋友；3-抢福利
          variableColor: '#000000', // 变量字色
          operationImgUrl: '', // 运营图片
          startDate: '', // 开始时间
          endDate: '', // 结束时间
          clientType: 1, // 终端类型: 1-ios；2-安卓；3-M站；4-小程序
          iosVersionInfo: { // IOS版本
            versionNumFrom: '', // 起始版本num序号
            versionNumTo: '' // 终止版本num序号
          },
          iosRoute: '', // IOS路由地址
          androidVersionInfo: { // android版本
            versionNumFrom: '', // 起始版本num序号
            versionNumTo: '' // 终止版本num序号
          },
          androidRoute: '', // android路由地址
          miniappRoute: '', // 小程序跳转路由
          pcmRoute: '', // M站跳转链接
        },
        iosVersionList: [], // ios版本list
        androidVersionList: [] // 安卓版本list
      }
    },
    components:{ upload },
    mounted () {
      if (this.$route.params.type == 1 || this.$route.params.type == 2) {
        this.getInfo(this.$route.params.id)
      }
      this.getIosVersion()
      this.getAndroidVersion()
    },
    watch: {
      '$route.path': function (newVal, oldVal) {
        this.getInfo(this.$route.params.id)
        this.type = 2
        this.getIosVersion()
        this.getAndroidVersion()
      } 
    },
    methods:{
      getInfo (id) { // 获取数据回显
        this.$service.home.homeOperate.queryById({id}).then(res => {
          this.param = res
          this.param.variableColor = this.param.variableColor || '#000000'
        })
      },
      getIosVersion () { // 获取ios版本
        this.$service.common.queryAppVersionByPlatform({
          platform: 1,
          fromVersionNum: this.fromVersionNumIOS
        }).then(res => {
          this.iosVersionList = res || []
        })
      },
      getAndroidVersion () { // 获取Android版本
        this.$service.common.queryAppVersionByPlatform({
          platform: 2,
          fromVersionNum: this.fromVersionNumAndroid
        }).then(res => {
          this.androidVersionList = res || []
        })
      },
      submit () { // 保存
        this.$utils.testForm([
          // 校验触发登录
          {test: this.param.loginType.length <= 0, fun: _ => this.$message.warning('请至少选择一种触发登录条件')},
          // 校验适用用户
          {test: this.param.userType.length <= 0, fun: _ => this.$message.warning('请至少选择一种适用用户')},
          // 校验变量字色
          {
            test: (this.param.activityType === 2 || this.param.activityType === 3) && !this.param.variableColor, 
            fun: _ => this.$message.warning('请选择变量字体颜色色值')},
          // 校验运营图片
          { test: !this.param.operationImgUrl, fun: _ => this.$message.warning('请上传运营图片')},
          // 校验开始/结束时间 空值
          {
            test: !this.param.startDate || !this.param.endDate,
            fun: _ => this.$message.warning('请选择开始/结束时间')},
          // 校验开始/结束时间 前后比对
          {
            test: new Date(this.param.endDate).getTime()
              <= new Date(this.param.startDate).getTime(),
            fun: _ => this.$message.warning('结束时间必须大于开始时间')},
          // 校验IOS前版本为空
          {
            test: this.param.clientType === 1 && !this.param.iosVersionInfo.versionNumFrom,
            fun: _ => this.$message.warning('请选择IOS版本')},
          // 校验IOS版本 前不大于后
          {
            test: this.param.clientType === 1 && 
            this.param.iosVersionInfo.versionNumFrom && 
            this.param.iosVersionInfo.versionNumTo && 
            this.param.iosVersionInfo.versionNumFrom > this.param.iosVersionInfo.versionNumTo,
            fun: _ => this.$message.warning('所选版本号前版本号不可大于后版本号')},
          // 校验IOS路由地址
          {
            test: this.param.clientType === 1 && !this.param.iosRoute,
            fun: _ => this.$message.warning('请输入IOS路由地址')},
          // 校验Android前版本为空
          {
            test: this.param.clientType === 2 && !this.param.androidVersionInfo.versionNumFrom,
            fun: _ => this.$message.warning('请选择Android版本')},
          // 校验Android版本 前不大于后
          {
            test: this.param.clientType === 2 && 
            this.param.androidVersionInfo.versionNumFrom && 
            this.param.androidVersionInfo.versionNumTo && 
            this.param.androidVersionInfo.versionNumFrom > this.param.androidVersionInfo.versionNumTo,
            fun: _ => this.$message.warning('所选版本号前版本号不可大于后版本号')},
          // 校验Android路由地址
          {
            test: this.param.clientType === 2 && !this.param.androidRoute,
            fun: _ => this.$message.warning('请输入Android路由地址')},
          // 校验小程序路由地址
          {
            test: this.param.clientType === 4 && !this.param.miniappRoute,
            fun: _ => this.$message.warning('请输入小程序路由地址')},
          // 校验M站链接
          {
            test: this.param.clientType === 3 && !this.param.pcmRoute,
            fun: _ => this.$message.warning('请输入M站链接')}
				], _ => {
          // 编辑页面
          if (this.type == 2) {
            this.$service.home.homeOperate.update(this.param).then(res => {
              // 编辑页面不用跳转
              // this.$router.push({ path: `/homeOperate/edit/2/${this.$route.params.id}` })
            })
          // 添加、复制页面
          } else {
            this.param.id = this.type == 1 ? null : this.type
            this.$service.home.homeOperate.add(this.param).then(res => {
              this.$router.push({ path: `/homeOperate/edit/2/${res}` })
            })
          }
				})
      },
      closed () {
        window.close()
      }
    }
  }
</script>
<style scoped>
  .input-normal {width:800px; }
</style>
