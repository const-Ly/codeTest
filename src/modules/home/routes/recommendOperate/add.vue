<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="150px" class="input-normal">
        <el-form-item v-if="isEdit" label="编号：">
          <span v-text="param.id"></span>
        </el-form-item>
        <el-form-item class="text-first" label="活动ID：">
          <el-input
            v-model.trim="param.activityId"
            :maxLength="20"
            @input="$utils.onlyNL(param, 'activityId', param.activityId)"></el-input>
        </el-form-item>
        <el-form-item label="显示位置：">
          <el-radio-group v-model="param.displayPosition">
            <el-radio :label="1">首页Feed流</el-radio>
            <el-radio :label="2">首页tab分类页</el-radio>
            <el-radio :label="3">单类目中间页</el-radio>
            <el-radio :label="4">个人中心feed流</el-radio>
            <el-radio :label="5">购物车feed流</el-radio>
            <el-radio :label="6">订单feed流</el-radio>
          </el-radio-group>
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
            <el-checkbox :label="6">梦工厂用户</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="text-first" label="推荐海报（单排）：">
          <ul class="clearfix">
	          <li v-for="(item, idx) in param.singleRowPosterList" :key="idx" class="w100 fl align-center ma-r-20">
            	<upload class="inline-block"
                action="/image/uploadImage?width=-1&height=-1&fileSize=160"
                :size='160'
                :image-url="item.imgUrl"
                @success="item.imgUrl = $event"></upload>
            	<span class="font font-danger"
                v-show="param.singleRowPosterList.length>1"
                @click="delCont(param.singleRowPosterList, idx)">删除</span>
	          </li>
	         </ul>
	        <el-button type="text" class="font font-blue"
            v-show="param.singleRowPosterList.length<10" 
            @click="addCont(param.singleRowPosterList)">再添加一张</el-button>
          <div class="font-info line-50">单排为横行一个商品的图片用途，注意图片尺寸，支持jpg、png格式文件，文件小于160k</div>
        </el-form-item>
        <el-form-item class="text-first" label="推荐海报（双排）：">
          <ul class="clearfix">
	          <li v-for="(item, idx) in param.doubleRowPosterList" :key="idx" class="w100 fl align-center ma-r-20">
            	<upload class="inline-block"
                action="/image/uploadImage?width=-1&height=-1&fileSize=160"
                :size='160'
                :image-url="item.imgUrl"
                @success="item.imgUrl = $event"></upload>
            	<span class="font font-danger"
                v-show="param.doubleRowPosterList.length>1"
                @click="delCont(param.doubleRowPosterList, idx)">删除</span>
	          </li>
	         </ul>
	        <el-button type="text" class="font font-blue"
            v-show="param.doubleRowPosterList.length<10" 
            @click="addCont(param.doubleRowPosterList)">再添加一张</el-button>
          <div class="font-info line-50">双排为横行两个商品的图片用途，注意图片尺寸，支持jpg、png格式文件，文件小于160k</div>
        </el-form-item>
        <el-form-item class="text-first" label="启禁用时间：">
          <el-date-picker v-model="param.startDate"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          —
          <el-date-picker v-model="param.endDate"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item class="text-first" label="展示位置：">
          <el-input placeholder="请输入"
            :maxLength="3"
            v-model.trim="param.sortNum"
            v-only-num.string="param.sortNum"></el-input>
        </el-form-item>
        <el-form-item class="text-first" label="终端类型：">
          <el-checkbox v-model="param.iosFlag" :true-label="1" :false-label="0">IOS</el-checkbox>
          <el-checkbox v-model="param.androidFlag" :true-label="1" :false-label="0">Android</el-checkbox>
          <el-checkbox v-model="param.miniappFlag" :true-label="1" :false-label="0">小程序</el-checkbox>
          <el-checkbox v-model="param.pcmFlag" :true-label="1" :false-label="0">M站</el-checkbox>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.iosFlag === 1" label="IOS版本：">
          <el-select v-model="param.iosVersionInfo.versionNumFrom">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item,idx) in iosVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
          —
          <el-select v-model="param.iosVersionInfo.versionNumTo">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item,idx) in iosVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.iosFlag === 1" label="IOS路由地址：">
          <el-input v-model.trim="param.iosRoute" :maxLength="1000"></el-input>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.androidFlag === 1" label="Android版本：">
          <el-select v-model="param.androidVersionInfo.versionNumFrom">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item,idx) in androidVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
          —
          <el-select v-model="param.androidVersionInfo.versionNumTo">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item,idx) in androidVersionList"
              :label="item.appVersion"
              :value="item.versionNum"
              :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.androidFlag === 1" label="Android路由地址：">
          <el-input v-model.trim="param.androidRoute" :maxLength="1000"></el-input>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.miniappFlag === 1" label="小程序路由地址：">
          <el-input v-model.trim="param.miniappRoute" :maxLength="1000"></el-input>
        </el-form-item>
        <el-form-item class="text-first" v-show="param.pcmFlag === 1" label="M站链接：">
          <el-input v-model.trim="param.pcmRoute" :maxLength="1000"></el-input>
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
    name: 'recommendOperateAdd',
    data () {
      return {
        isEdit: false, // 是否编辑
        fromVersionNumIOS: 145, // 初始版本 IOS
        fromVersionNumAndroid: 283, // 初始版本 Android
        param: {
          activityId: '', // 活动Id
          displayPosition: 1, // 显示位置
          loginType: [1, 2], // 适用登录类型
          userType: [1, 2, 3, 4, 5, 6], // 适用用户类型
          singleRowPosterList: [ // 单排海报图案集合
            {imgUrl: ''}
          ],
          doubleRowPosterList: [ // 双排海报图案集合
            {imgUrl: ''}
          ],
          startDate: '', //启禁用开始时间
          endDate: '', // 启禁用结束时间
          sortNum: '', // 展示位置排序号
          pcmFlag: 0, // 是否支持M站 0-不支持（默认）；1-支持
          miniappFlag: 0, // 是否支持小程序
          androidFlag: 0, // 是否支持android
          iosFlag: 0, // 是否支持ios
          iosRoute: '', // ios跳转路由
          androidRoute: '', // 安卓跳转路由
          miniappRoute: '', // 小程序跳转路由
          pcmRoute: '', // M站跳转链接
          iosVersionInfo: {}, // ios版本信息
          androidVersionInfo: {} // 安卓版本信息
        },
        iosVersionList: [], // ios版本list
        androidVersionList: [] // 安卓版本list
      }
    },
    components:{ upload },
    mounted () {
      let id = this.$route.params.id
      if (id) {
        this.param.id = id // 主键id-编号
        this.isEdit = true
        this.getInfo(id)
      }
      this.getIosVersion()
      this.getAndroidVersion()
    },
    methods:{
      getInfo (id) { // 获取数据回显
        this.$service.home.recommendOperate.get({id}).then(res => {
          this.param = res
        })
      },
      addCont (obj) { // 添加一张图片
	    	obj.splice(0, 0, {imgUrl: ''})
      },
      delCont (obj, idx) { // 删除一张图片
     		obj.splice(idx, 1)
      },
      getIosVersion () { // 获取ios版本
        this.$service.home.recommendOperate.queryAppVersionByPlatform({
          platform: 1,
          fromVersionNum: this.fromVersionNumIOS
        }).then(res => {
          this.iosVersionList = res || []
        })
      },
      getAndroidVersion () { // 获取Android版本
        this.$service.home.recommendOperate.queryAppVersionByPlatform({
          platform: 2,
          fromVersionNum: this.fromVersionNumAndroid
        }).then(res => {
          this.androidVersionList = res || []
        })
      },
      submit () { // 保存
        this.$utils.testForm([
          // 校验活动ID
          {test: !this.param.activityId, fun: _ => this.$message.warning('请输入1-20字，英文数字活动ID')},
          // 校验触发登录
          {test: this.param.loginType.length <= 0, fun: _ => this.$message.warning('请至少选择一种触发登录条件')},
          // 校验适用用户
          {test: this.param.userType.length <= 0, fun: _ => this.$message.warning('请至少选择一种适用用户')},
          // 校验推荐海报（单排）
          {
            test: !this.param.singleRowPosterList.every(v => v.imgUrl),
            fun: _ => this.$message.warning('请上传推荐海报（单排）')},
          // 校验推荐海报（双排）
          {
            test: !this.param.doubleRowPosterList.every(v => v.imgUrl),
            fun: _ => this.$message.warning('请上传推荐海报（双排）')},
          // 校验启禁用时间(空值)
          {
            test: !this.param.startDate || !this.param.endDate,
            fun: _ => this.$message.warning('请选择启禁用时间')},
          // 校验启禁用时间(前后值)
          {
            test: new Date(this.param.endDate).getTime()
              <= new Date(this.param.startDate).getTime(),
            fun: _ => this.$message.warning('禁用时间必须大于启用时间')},
          // 校验显示位置
          {
            test: !this.param.sortNum,
            fun: _ => this.$message.warning('请输入显示位置')},
          // 校验终端类型
          {
            test: this.param.pcmFlag
              + this.param.miniappFlag
              + this.param.androidFlag
              + this.param.iosFlag === 0,
            fun: _ => this.$message.warning('请选择终端类型')},
          // 校验IOS版本
          {
            test: this.param.iosFlag === 1 &&
              !((this.param.iosVersionInfo.versionNumFrom
              && this.param.iosVersionInfo.versionNumFrom
              <= this.param.iosVersionInfo.versionNumTo)
              || (this.param.iosVersionInfo.versionNumFrom && !this.param.iosVersionInfo.versionNumTo)),
            fun: _ => this.$message.warning('请选择正确的IOS版本')},
          // 校验IOS路由地址
          {
            test: this.param.iosFlag === 1 && !this.param.iosRoute,
            fun: _ => this.$message.warning('请输入IOS路由地址')},
          // 校验Android版本
          {
            test: this.param.androidFlag === 1 &&
              !((this.param.androidVersionInfo.versionNumFrom
              && this.param.androidVersionInfo.versionNumFrom
              <= this.param.androidVersionInfo.versionNumTo)
              || (this.param.androidVersionInfo.versionNumFrom && !this.param.androidVersionInfo.versionNumTo)),
            fun: _ => this.$message.warning('请选择正确的Android版本')},
          // 校验Android路由地址
          {
            test: this.param.androidFlag === 1 && !this.param.androidRoute,
            fun: _ => this.$message.warning('请输入Android路由地址')},
          // 校验小程序路由地址
          {
            test: this.param.miniappFlag === 1 && !this.param.miniappRoute,
            fun: _ => this.$message.warning('请输入小程序路由地址')},
          // 校验M站链接
          {
            test: this.param.pcmFlag === 1 && !this.param.pcmRoute,
            fun: _ => this.$message.warning('请输入M站链接')}
				], _ => {
          // 添加版本名称
          let i = 0
          for (i = 0; i < this.iosVersionList.length; i++) {
            if (this.iosVersionList[i].versionNum == this.param.iosVersionInfo.versionNumFrom) {
              this.param.iosVersionInfo.versionFrom = this.iosVersionList[i].appVersion
            }
            if (this.iosVersionList[i].versionNum == this.param.iosVersionInfo.versionNumTo) {
              this.param.iosVersionInfo.versionTo = this.iosVersionList[i].appVersion
            }
          }
          for (i = 0; i < this.androidVersionList.length; i++) {
            if (this.androidVersionList[i].versionNum == this.param.androidVersionInfo.versionNumFrom) {
              this.param.androidVersionInfo.versionFrom = this.androidVersionList[i].appVersion
            }
            if (this.androidVersionList[i].versionNum == this.param.androidVersionInfo.versionNumTo) {
              this.param.androidVersionInfo.versionTo = this.androidVersionList[i].appVersion
            }
          }
          if (this.param.id) {
            this.$service.home.recommendOperate.update(this.param).then(res => {
              res && this.$message.success('提交保存成功')
            })
          } else {
            this.$service.home.recommendOperate.add(this.param).then(res => {
              res && window.close()
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
  .el-radio{ line-height: 32px;}
</style>
