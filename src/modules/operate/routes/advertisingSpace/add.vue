<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="150px" class="input-normal">
        <el-form-item v-if="isEdit" label="编号：">
          <span v-text="param.id"></span>
        </el-form-item>
        <el-form-item label="广告位置：" class="text-first">
          <el-radio-group v-model="param.position">
            <el-radio :label="1">朋友首页</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="轮播图：">
          <upload class="inline-block"
            action="/image/uploadImage?width=-1&height=-1&fileSize=300"
            :size='300'
            :image-url="param.imgUrl"
            @success="param.imgUrl = $event"></upload>
          <p class="font-info">支持jpg、png格式文件，文件小于300k</p>            
        </el-form-item>
        <el-form-item class="text-first" label="适用用户：">
          <el-checkbox-group v-model="customerTypeList" @change="customerTypeChange">
            <el-checkbox :label="1">新访客</el-checkbox>
            <el-checkbox :label="2">老访客</el-checkbox>
            <el-checkbox :label="3">老客</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="text-first" label="开始/结束时间：">
          <el-date-picker v-model="param.beginTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          —
          <el-date-picker v-model="param.endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="排序位置：" class="text-first">
          <el-select v-model="param.seq">
            <el-option v-for="(item, idx) in seqList" :label="item" :value="item" :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转类型：" class="text-first">
          <el-select v-model="param.jumpType" @change="param.jumpContent.jumpParam = ''">
            <el-option label="推荐商家" :value="47"></el-option>
            <el-option label="推荐大v" :value="48"></el-option>
            <el-option label="页面路由" :value="45"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text-first" label="显示终端：">
          <el-checkbox-group v-model="clientTypeList" @change="clientTypeChange">
            <el-checkbox :label="1">IOS</el-checkbox>
            <el-checkbox :label="2">Android</el-checkbox>
            <el-checkbox :label="3">小程序</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="text-first" label="商家ID：" v-show="param.jumpType === 47">
          <el-input
            v-model.trim="param.jumpContent.jumpParam"
            :maxLength="20"
            @input="$utils.onlyNum(param.jumpContent, 'jumpParam', param.jumpContent.jumpParam)"
            @blur="blur(47)"></el-input>
        </el-form-item>
        <el-form-item class="text-first" label="大V ID：" v-show="param.jumpType === 48">
          <el-input
            v-model.trim="param.jumpContent.jumpParam"
            :maxLength="20"
            @input="$utils.onlyNum(param.jumpContent, 'jumpParam', param.jumpContent.jumpParam)"
            @blur="blur(48)"></el-input>
        </el-form-item>
        <el-form-item class="text-first" label="IOS路由：" v-show="param.jumpType === 45 && param.clientType.iosFlag === 1">
          <el-input
            v-model.trim="param.jumpContent.routing.iosRouting"
            :maxLength="999"
            ></el-input>
        </el-form-item>
        <el-form-item class="text-first" label="Android路由：" v-show="param.jumpType === 45 && param.clientType.androidFlag === 1">
          <el-input
            v-model.trim="param.jumpContent.routing.androidRouting"
            :maxLength="999"
            ></el-input>
        </el-form-item>
        <el-form-item class="text-first" label="小程序路由：" v-show="param.jumpType === 45 && param.clientType.miniappFlag === 1">
          <el-input
            v-model.trim="param.jumpContent.routing.miniappRouting"
            :maxLength="999"
            ></el-input>
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
        isEdit: false, // 是否为编辑页
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
        },
        customerTypeList: [1, 2, 3], // 适用用户 1新访客、2老访客、3老客
        clientTypeList: [], // 显示终端 1 IOS、2 Android、3小程序
        seqList: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ]
      }
    },
    watch: {
      '$route.path': function () {
        let id = this.$route.params.id
        if (id) {
          this.param.id = id // 主键id-编号
          this.isEdit = true
          this.getInfo(id)
        }else{
          this.param.id = null
          this.isEdit = false
          this.param = {
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
          this.customerTypeList = [1, 2, 3] // 适用用户 1新访客、2老访客、3老客
          this.clientTypeList = [] // 显示终端 1 IOS、2 Android、3小程序
        }
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
    },
    methods:{
      getInfo (id) { // 获取数据回显
        this.$service.operate.advertisingSpace.info({id}).then(res => {
          this.param = res
          this.clientTypeList = []
          if (this.param.clientType.iosFlag === 1){
            this.clientTypeList.push(1)
          }
          if (this.param.clientType.androidFlag === 1){
            this.clientTypeList.push(2)
          }
          if (this.param.clientType.miniappFlag === 1){
            this.clientTypeList.push(3)
          }
          if (this.param.clientType.mFlag === 1){
            this.clientTypeList.push(4)
          }
          this.customerTypeList = []
          if (this.param.customerType.newVisitor === 1){
            this.customerTypeList.push(1)
          }
          if (this.param.customerType.oldVisitor === 1){
            this.customerTypeList.push(2)
          }
          if (this.param.customerType.customer === 1){
            this.customerTypeList.push(3)
          }
        })
      },
      blur (type) {
        let _jumpParam = this.param.jumpContent.jumpParam
        this.param.jumpContent.jumpParam = ''
        // 商家ID
        if(type === 47){
          if(_jumpParam === ''){
            return this.$message.warning('请输入商家ID')
          }
          this.$service.operate.advertisingSpace.getSupplierById({supplierId: _jumpParam}).then(res => {
            this.param.jumpContent.jumpParam = _jumpParam
          })
        }
        // 大V ID
        if(type === 48){
          if(_jumpParam === ''){
            return this.$message.warning('请输入大V ID')
          }
          this.$service.operate.advertisingSpace.getVerifiedInfoById({customerId: _jumpParam}).then(res => {
            this.param.jumpContent.jumpParam = _jumpParam
          })
        }
      },
      // 适用用户选中状态改变
      customerTypeChange () {
        let list = this.customerTypeList
        let cType = this.param.customerType
        cType.newVisitor = 0
        cType.oldVisitor = 0
        cType.customer = 0
        // 1新访客、2老访客、3老客
        for(let i=0; i<list.length; i++) {
          switch(list[i]) {
            case 1:
              cType.newVisitor = 1
              break
            case 2:
              cType.oldVisitor = 1
              break
            case 3:
              cType.customer = 1
              break
          } 
        }
      },
      // 显示终端选中状态改变
      clientTypeChange () {
        let list = this.clientTypeList
        let cType = this.param.clientType
        cType.iosFlag = 0
        cType.androidFlag = 0
        cType.miniappFlag = 0
        cType.mFlag = 0
        // 1 IOS、2 Android、3小程序
        for(let i=0; i<list.length; i++) {
          switch(list[i]) {
            case 1:
                cType.iosFlag = 1
                break
            case 2:
                cType.androidFlag = 1
                break
            case 3:
                cType.miniappFlag = 1
                break
            case 4:
                cType.mFlag = 1
                break
          } 
        }
      },
      submit () { // 保存
        this.$utils.testForm([
          // 跳转类型选中页面路由，轮播图为空
          {test: this.param.jumpType === 45 && !this.param.imgUrl, fun: _ => this.$message.warning('请上传轮播图')},
          // 适用用户无选中项
          {test: this.customerTypeList.length <= 0, fun: _ => this.$message.warning('请至少选择一种适用用户')},
          // 开始/结束时间为空
          {test: !this.param.beginTime || !this.param.endTime,
            fun: _ => this.$message.warning('请选择开始/结束时间')},
          // 开始<结束时间
          {test: new Date(this.param.endTime).getTime()
              <= new Date(this.param.beginTime).getTime(),
            fun: _ => this.$message.warning('结束时间必须大于开始时间')},
          // 排序位置为空
          {test: !this.param.seq, fun: _ => this.$message.warning('请选择排序位置')},
          // 跳转类型为空
          {test: !this.param.jumpType, fun: _ => this.$message.warning('请选择跳转类型')},
          // 显示终端无选中项
          {test: this.clientTypeList.length <= 0, fun: _ => this.$message.warning('请至少选择一种终端类型！')},
          // 跳转类型为推荐商家，商家ID为空
          {test: this.param.jumpType === 47 && this.param.jumpContent.jumpParam === '', fun: _ => this.$message.warning('请输入商家ID')},
          // 跳转类型为推荐大V，大V ID为空
          {test: this.param.jumpType === 48 && this.param.jumpContent.jumpParam === '', fun: _ => this.$message.warning('请输入大VID')},
          // 跳转类型为页面路由 且 显示终端勾选IOS，IOS路由为空
          {test: 
            this.param.jumpType === 45 && 
            this.param.clientType.iosFlag === 1 &&
            this.param.jumpContent.routing.iosRouting === ''
            , fun: _ => this.$message.warning('请输入IOS路由')},
          // 跳转类型为页面路由 且 显示终端勾选android，android路由为空
          {test: 
            this.param.jumpType === 45 && 
            this.param.clientType.androidFlag === 1 &&
            this.param.jumpContent.routing.androidRouting === ''
            , fun: _ => this.$message.warning('请输入Android路由')},
          // 跳转类型为页面路由 且 显示终端勾选IOS，IOS路由为空
          {test: 
            this.param.jumpType === 45 && 
            this.param.clientType.miniappFlag === 1 &&
            this.param.jumpContent.routing.miniappRouting === ''
            , fun: _ => this.$message.warning('请输入小程序路由')},
				], _ => {
          
          if (this.$route.params.id) {
            this.$service.operate.advertisingSpace.update(this.param).then(res => {
              res && this.$message.success('提交保存成功')
            })
          } else {
            this.$service.operate.advertisingSpace.add(this.param).then(res => {
              this.$router.push(`edit/${res}`)
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
