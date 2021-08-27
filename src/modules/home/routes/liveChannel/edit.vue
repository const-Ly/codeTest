<template>
  <div class="cms">
    <el-card>
      <el-form
        label-width="200px"
        style="width:800px"
        :model="local.jumpContent"
        :rules="rules"
        ref="ruleForm"
        :disabled="$route.meta.type === 'detail'"
      >
        <el-form-item v-show="$route.meta.type !== 'add'" label="编号：">{{
          local.id
        }}</el-form-item>
        <el-form-item label="运营图：">
          <img-view v-if="$route.meta.type === 'detail'" :src="local.imgUrl"></img-view>
          <upload
            v-else
            class="inline-block"
            action="/image/uploadImage?width=-1&height=-1&fileSize=300"
            :size="300"
            :image-url="local.imgUrl"
            @success="local.imgUrl = $event;"
          ></upload>
          <div style="color:#909399" v-show="$route.meta.type !== 'detail'">
            支持jpg、png格式文件，文件小于300k；跳转类型为直播间时，此图片为非必传
          </div>
        </el-form-item>
        <el-form-item class="text-label" label="开始/结束时间：">
          <el-date-picker
            v-model="local.beginTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择开始时间"
          ></el-date-picker>
          <span>—</span>
          <el-date-picker
            v-model="local.endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="text-label" label="排序位置：">
          <el-select placeholder="请选择" v-model="local.seq">
            <el-option label="第1条" :value="1"></el-option>
            <el-option label="第2条" :value="2"></el-option>
            <el-option label="第3条" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text-label" label="跳转类型：">
          <el-select placeholder="请选择" v-model="local.jumpType">
            <el-option label="直播间" :value="46"></el-option>
            <el-option label="页面路由" :value="45"></el-option>
          </el-select>
          <template v-if="$route.meta.type !== 'detail'">
            <div style="color:#909399;margin-top:10px">
              跳转类型为直播间时，显示终端类型至少勾选一项
            </div>
            <div style="color:#909399">
              跳转类型为页面路由时，显示终端类型非必选
            </div>
          </template>
        </el-form-item>
        <el-form-item label="显示终端：">
          <el-checkbox
            v-model="local.clientType.iosFlag"
            :true-label="1"
            :false-label="0"
            >IOS</el-checkbox
          >
          <el-checkbox
            v-model="local.clientType.androidFlag"
            :true-label="1"
            :false-label="0"
            >Android</el-checkbox
          >
          <el-checkbox
            v-model="local.clientType.miniappFlag"
            :true-label="1"
            :false-label="0"
            >小程序</el-checkbox
          >
          <el-checkbox
            v-model="local.clientType.mFlag"
            :true-label="1"
            :false-label="0"
            >M站</el-checkbox
          >
        </el-form-item>
        <el-form-item
          v-show="local.jumpType === 45 && local.clientType.iosFlag"
          class="text-label"
          label="IOS路由地址："
        >
          <span v-if="$route.meta.type === 'detail'">{{
            local.jumpContent.routing.iosRouting
          }}</span>
          <el-input
            v-else
            v-model.trim="local.jumpContent.routing.iosRouting"
            :maxLength="999"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="local.jumpType === 45 && local.clientType.androidFlag"
          class="text-label"
          label="Android路由地址："
        >
          <span v-if="$route.meta.type === 'detail'">{{
            local.jumpContent.routing.androidRouting
          }}</span>
          <el-input
            v-else
            v-model.trim="local.jumpContent.routing.androidRouting"
            :maxLength="999"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="local.jumpType === 45 && local.clientType.miniappFlag"
          class="text-label"
          label="小程序路由地址："
        >
          <span v-if="$route.meta.type === 'detail'">{{
            local.jumpContent.routing.miniappRouting
          }}</span>
          <el-input
            v-else
            v-model.trim="local.jumpContent.routing.miniappRouting"
            :maxLength="999"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="local.jumpType === 45 && local.clientType.mFlag"
          class="text-label"
          label="M站："
        >
          <span v-if="$route.meta.type === 'detail'">{{
            local.jumpContent.routing.mRouting
          }}</span>
          <el-input
            v-else
            v-model.trim="local.jumpContent.routing.mRouting"
            :maxLength="999"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="local.jumpType === 46"
          class="text-label"
          label="直播间ID："
          prop="jumpParam"
        >
          <span v-if="$route.meta.type === 'detail'">{{
            local.jumpContent.jumpParam
          }}</span>
          <el-input
            v-else
            v-model.trim="local.jumpContent.jumpParam"
            v-only-num.string="local.jumpContent.jumpParam"
            maxlength="20"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <template v-if="$route.meta.type === 'detail'">
          <el-form-item label="创建者：">{{ local.createBy }}</el-form-item>
          <el-form-item label="创建时间：">{{ local.createTime }}</el-form-item>
          <el-form-item label="修改者：">{{ local.updateBy }}</el-form-item>
          <el-form-item label="更新时间：">{{ local.updateTime }}</el-form-item>
        </template>
      </el-form>
      <el-form label-width="200px" style="width:800px">
        <el-form-item style="margin-top: 32px;">
          <el-button
            v-if="$route.meta.type !== 'detail'"
            type="primary"
            @click="onSubmit"
            >提交保存</el-button
          >
          <el-button :disabled="false" @click="closePage">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Upload from '@/components/upload'
export default {
  data () {
    return {
      local: {
        id: '',
        imgUrl: '',
        beginTime: '',
        endTime: '',
        seq: '',
        jumpType: '',
        clientType: {},
        jumpContent: {
          jumpParam: '',
          routing: {
            iosRouting: '',
            androidRouting: '',
            miniappRouting: '',
            mRouting: ''
          }
        }
      },
      rules: {
        jumpParam: [{ validator: this.checkLiveId, trigger: 'blur' }]
      }
    }
  },
  components: {
    Upload
  },
  methods: {
    getInfo (id) {
      this.$service.home.liveChannel.infoLiveChannel({ id: id }).then(res => {
        this.local = res
      })
    },
    onSubmit () {
      // 运营图为空校验
      if (this.local.jumpType === 45 && !this.local.imgUrl) {
        this.$message.warning('跳转类型为页面路由，请上传运营图片')
        return
      }
      // 开始时间为空校验
      if (!this.local.beginTime) {
        this.$message.warning('请输入开始时间')
        return
      }
      // 结束时间为空校验
      if (!this.local.endTime) {
        this.$message.warning('请输入结束时间')
        return
      }
      // 开始时间与结束时间的校验
      if (this.local.beginTime >= this.local.endTime) {
        this.$message.warning('结束时间必须大于开始时间')
        return
      }
      // 排序位置为空校验
      if (!this.local.seq) {
        this.$message.warning('请选择排序位置')
        return
      }
      // 跳转类型为空校验
      if (!this.local.jumpType) {
        this.$message.warning('请选择跳转类型')
        return
      }
      // 显示终端为空校验
      if (
        this.local.jumpType === 46 &&
        !Object.values(this.local.clientType).some(item => item === 1)
      ) {
        this.$message.warning('请至少选择一种终端类型！')
        return
      }
      // 一系列跳转路由为空的校验
      if (
        this.local.jumpType === 45 &&
        this.local.clientType.iosFlag &&
        !this.local.jumpContent.routing.iosRouting
      ) {
        this.$message.warning('请输入IOS路由地址')
        return
      }
      if (
        this.local.jumpType === 45 &&
        this.local.clientType.androidFlag &&
        !this.local.jumpContent.routing.androidRouting
      ) {
        this.$message.warning('请输入Android路由地址')
        return
      }
      if (
        this.local.jumpType === 45 &&
        this.local.clientType.miniappFlag &&
        !this.local.jumpContent.routing.miniappRouting
      ) {
        this.$message.warning('请输入小程序路由地址')
        return
      }
      if (
        this.local.jumpType === 45 &&
        this.local.clientType.mFlag &&
        !this.local.jumpContent.routing.mRouting
      ) {
        this.$message.warning('请输入M站地址')
        return
      }
      // 直播间ID为空的校验
      if (this.local.jumpType === 46 && !this.local.jumpContent.jumpParam) {
        this.$message.warning('请输入直播间ID')
        return
      }
      // 跳转类型为页面路由时直接请求；直播间时进行 validate 操作再判断是否请求
      if (this.local.jumpType === 45) {
        this.apiManage()
      } else {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 直播间ID校验通过,请求接口
            this.apiManage()
          }
        })
      }
    },
    // 对无需传递的路由地址参数进行过滤
    filterParam () {
      const params = JSON.parse(JSON.stringify(this.local))
      if (this.local.jumpType === 45) {
        // 跳转类型为页面路由时
        params.jumpContent.jumpParam = ''
        if (!params.clientType.iosFlag) {
          params.jumpContent.routing.iosRouting = ''
        }
        if (!params.clientType.androidFlag) {
          params.jumpContent.routing.androidRouting = ''
        }
        if (!params.clientType.miniappFlag) {
          params.jumpContent.routing.miniappRouting = ''
        }
        if (!params.clientType.mFlag) {
          params.jumpContent.routing.mRouting = ''
        }
      } else {
        // 跳转类型为直播间时
        params.jumpContent.routing = {
          iosRouting: '',
          androidRouting: '',
          miniappRouting: '',
          mRouting: ''
        }
      }
      return params
    },
    // 提交时接口相关处理逻辑
    apiManage () {
      const params = this.filterParam()
      if (this.$route.meta.type === 'add') {
        this.$service.home.liveChannel.addLiveChannel(params).then(res => {
          this.$router.replace('/liveChannel/edit/' + res)
        })
      } else {
        this.$service.home.liveChannel.editLiveChannel(params).then(res => {
          this.closePage()
        })
      }
    },
    // 直播间ID校验
    checkLiveId (rule, value, callback) {
      if (this.local.jumpType === 46 && value) {
        this.$service.common.checkLiveId({ liveId: value }).then(res => {
          if (!res.isSuccess) {
            return callback(new Error(res.msg))
          } else {
            return callback()
          }
        })
      }
    },
    closePage () {
      window.close()
    }
  },
  mounted () {
    this.$route.meta.type !== 'add' && this.getInfo(this.$route.params.id)
  },
  watch: {
    '$route.path': function () {
      this.getInfo(this.$route.params.id)
    }
  }
}
</script>

<style scoped></style>
