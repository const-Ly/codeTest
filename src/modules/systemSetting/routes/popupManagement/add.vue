<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form
      :model="param"
      :disabled="type == 'details'"
      label-width="170px"
      size="small">
        <el-form-item label="弹窗编号：" v-show="param.popWindowId">
          <p>{{param.popWindowId}}</p>
        </el-form-item>
        <el-form-item label="弹窗名称：">
          <el-input
            class="w300"
            maxlength="40"
            v-model.trim="param.popName"
            placeholder="请输入"
            @input="limitCEN(param, 'popName', param.popName)">
          </el-input>
          <p
            class="font-info"
            v-if="type != 'details'"
          >注：仅用于后端展示使用，必填</p>
        </el-form-item>
        <el-form-item label="福利类型：">
          <el-select
            v-model="param.welfareType"
            placeholder="请选择"
            clearable
            class="w300"
            @change="welfareChange"
            >
            <el-option label="纯路由" :value="0"></el-option>
            <el-option label="参团卡" :value="1"></el-option>
            <el-option label="全民拼卡" :value="2"></el-option>
            <el-option label="返现卡" :value="3"></el-option>
            <el-option label="买二返一卡" :value="4"></el-option>
            <el-option label="通用特权金" :value="5"></el-option>
            <el-option label="金币" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="白名单：">
          <div v-if="type != 'details'">
            <div
              class="ma-b-10"
              v-for="(item, idx) in param.userIdList"
              :key="idx">
              <el-input
                class="w300 ma-r-10"
                maxlength="40"
                @input="$utils.onlyNum(param.userIdList, idx, param.userIdList[idx])" v-model.trim="param.userIdList[idx]"
                placeholder="请输入"
              ></el-input>
              <span
              class="font-blue"
              @click="delUserId(idx)">
                删除
              </span>
            </div>
            <span
              v-show="param.userIdList.length < 3"
              class="font-blue"
              @click="addUserId"
            >添加</span>
          </div>
          <div v-else>
            <span
              v-for="(item, idx) in param.userIdList"
              :key="idx">
              {{item}}
              <span v-if="idx<param.userIdList.length-1">,</span>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="渠道ID：">
          <el-input
            class="w300"
            maxlength="40"
            @input="$utils.onlyNL(param, 'channelId', param.channelId)"
            v-model.trim="param.channelId"
            placeholder="请输入">
          </el-input>
          <p
          class="font-info"
          v-if="type != 'details'">
            注：用于数据统计，必填
          </p>
        </el-form-item>
        <el-form-item label="关闭按钮：">
          <el-radio-group
            v-model="param.closeButtonStatus"
          >
						<el-radio :label="1">生效</el-radio>
						<el-radio :label="0">不生效</el-radio>
					</el-radio-group>
          <p
          class="font-info"
          v-if="type != 'details'">
            注：关闭按钮不生效，点击关闭按钮同点击弹窗
          </p>
        </el-form-item>
        <el-form-item label="弹窗位置：">
          <p>首页</p>
        </el-form-item>
        <el-form-item label="弹窗图片：">
          <div
            class="w200 inline-block"
            v-for="(item, idx) in param.popWindowList"
            :key="idx"
          >
            <upload
              action="/image/uploadImage?width=-1&height=-1&fileSize=300"
              :size='300'
              :image-url="item"
              :accept="'image/jpg,image/jpeg,image/png,image/gif'"
              :type="imgTypeList"
              :disabled="type == 'details'"
              errorMessage="请确认图片格式或大小"
              @success="setPopWindowList(param.popWindowList, idx, $event)"></upload>
            <p
              class="font-info"
              v-show="param.popWindowList.length == 2 && idx == 0"
            >用户已有此福利</p>
            <p
              class="font-info"
              v-show="param.popWindowList.length == 2 && idx == 1"
            >用户无此福利</p>
          </div>
          <p
          class="font-info"
          v-if="type != 'details'">
            注：图片支持jpg、png、gif格式文件，小于300k
          </p>
        </el-form-item>
        <el-form-item label="终端配置：">
          <ul class="w300">
            <li>
              <span>小程序跳转链接</span>
              <el-input
                type="textarea"
                autosize
                placeholder="请输入小程序链接"
                maxlength="999"
                v-model.trim="param.miniAppJumpUrl">
              </el-input>
            </li>
            <li>
              <span>Android跳转链接</span>
              <el-input
                type="textarea"
                autosize
                placeholder="请输入Android链接"
                maxlength="999"
                v-model.trim="param.androidJumpUrl">
              </el-input>
            </li>
            <li>
              <span>iOS跳转链接</span>
              <el-input
                type="textarea"
                autosize
                placeholder="请输入iOS链接"
                maxlength="999"
                v-model.trim="param.iosJumpUrl">
              </el-input>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label=" " v-if="type != 'details'">
          <el-button
            @click="save"
            
            type="primary"
            size="small"
          >提交保存</el-button>
          <el-button
            @click="pageClose"
            size="small"
          >关闭</el-button>
        </el-form-item>
      </el-form>
      <el-button
      style="margin-left:170px;"
        v-if="type === 'details'"
        @click="pageClose"
        size="small"
      >关闭</el-button>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import Upload from '@/components/upload'
export default {
  name: "add",
  data() {
    return {
      type: this.$route.params.type, // 'edit'编辑，'details'查看
      param: {
        popWindowId: this.$route.params.id,
        popName: '', // 弹窗名称
        welfareType: 0, // 福利类型：0-纯路由，1-参团卡，2-全民拼卡，3-返现卡，4-买二返一卡，5-通用特权金，6-金币
        userIdList: [''], // 用户白名单集合(0-3个不重复的用户ID)
        channelId: '', // 渠道ID
        closeButtonStatus: 1, // 关闭按钮是否生效（0：不生效，1：生效）
        popLocation: 1, // 弹窗位置（1-首页）
        popWindowList: [''], // 弹窗图片集合
        iosJumpUrl: '', // IOS跳转连接
        androidJumpUrl: '', // Android跳转连接
        miniAppJumpUrl: '' // 小程序跳转连接
      },
      imgTypeList: [".jpg",".jpeg",".png",".gif"]
    };
  },
  components:{Upload},
  mounted() {
    if(this.type === 'edit' || this.type ==='details') {
      this.getDetails()
    }
  },
  methods: {
    getDetails () {
      this.$service.systemSetting.popupManagement.getDetails({popWindowId:this.param.popWindowId}).then(res => {
        this.param = res || {}
      });
    },
    welfareChange () {
      this.param.popWindowList = ['']
      setTimeout(()=> {
        if (this.param.welfareType == 0) {
        this.param.popWindowList = ['']
        }else {
          this.param.popWindowList = ['', '']
        }
      }, 0)
    },
    addUserId () {
      this.param.userIdList.push('')
    },
    delUserId (idx) {
      this.param.userIdList.splice(idx, 1)
    },
    setPopWindowList (obj, idx, url) {
      this.$set(obj, idx, url)
    },
    save () {
      if(!this.param.popName) {
        return this.$message.warning("请输入弹窗名称");
      }
      if(!this.param.channelId) {
        return this.$message.warning("请输入渠道ID");
      }
      if(!this.param.popWindowList[0]) {
        return this.$message.warning("请上传弹窗图片");
      }
      if(this.param.popWindowList.length == 2 && !this.param.popWindowList[1]) {
        return this.$message.warning("请上传弹窗图片");
      }
      if(!this.param.iosJumpUrl && !this.param.androidJumpUrl && !this.param.miniAppJumpUrl) {
        return this.$message.warning("请至少填写1个终端配置");
      }

      if(this.type === 'edit') {
        this.$service.systemSetting.popupManagement.update(this.param).then(res => {
          this.$message.success("提交保存成功");
          this.$router.push({path: '/popupManagement'})
        });
      }
      else if(this.type === 'add') {
        this.$service.systemSetting.popupManagement.creat(this.param).then(res => {
          this.$message.success("提交保存成功");
          this.$router.push({path: '/popupManagement'})
        });
      }
    },
    pageClose () {
      this.$router.push({path: '/popupManagement'})
    },
    // 限制中英文数字
    limitCEN (obj, key, str) {
      setTimeout(() => {
        if (obj instanceof Array) {
          obj.splice(key, 1, obj[key].replace( /[^\u4e00-\u9fa5^a-z^A-Z^0-9]/g, ''))
        } else {
          obj[key] = str.replace( /[^\u4e00-\u9fa5^a-z^A-Z^0-9]/g, '')
        }
      }, 1)
    }
  },
};
</script>
<style scoped>
</style>

