<template>
  <div class="cms">
    <el-card class="box-card">
      <!-- 表单 Begin -->
      <el-form ref="form" label-width="180px" size="small" class="input-normal">
        <el-form-item label="抽奖活动名称：">{{ param.lotteryName }}</el-form-item>
        <el-form-item label="奖品来源：">{{ param.source === 0?"平台奖品":"商家奖品" }}</el-form-item>
        <el-form-item label="奖品数量：">{{ param.rewardNum }}</el-form-item>
        <el-form-item label="已选奖品：">
          <template v-if="param.source === 0">
            <div v-if="param.platformRewardId">
              {{ param.platformRewardName }}
              <el-button type="text" class="font font-blue" @click="dialogTableVisible= true">变更</el-button>
            </div>
            <el-button v-else type="text" class="font font-blue" @click="dialogTableVisible= true">请选择平台奖品</el-button>
          </template>
          <template v-else>
            <div v-if="param.shopRewardId">
              {{ param.shopRewardName }}
              <el-button type="text" class="font font-blue" @click="dialogTableVisible= true">变更</el-button>
              <a :href="'http://m.biyao.com/products/'+ checkedSuid +'.html'" target="_blank" class="font font-blue">查看</a>
            </div>
            <el-button v-else type="text" class="font font-blue" @click="dialogTableVisible= true">请选择商家奖品</el-button>
          </template>
        </el-form-item>
        <el-form-item label="导流模块：">
          <el-radio-group v-model="param.guide">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="体验金：" v-if="param.source === 1">
          <el-radio-group v-model="param.discountMoney">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂接APP激活权益金：">
          <el-radio-group v-model="param.hookAppActivateRightsGold">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂接助力：">
          <el-radio-group v-model="param.hookHelp">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂接特权金：">
          <el-radio-group v-model="param.hookPrivilege">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道页展示：">
          <el-radio-group v-model="param.channelPageShow">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="测试白名单：">
          <el-radio-group v-model="param.isWhiteList">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖品介绍：">
          <new-editor :content="param.rewardDesc" @change="param.rewardDesc = $event"></new-editor>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="save">提交保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-form label-width="20px" size="small" :inline="true">
        <el-form-item label="">
          <el-input class="w200" v-model.trim="proParam.productName" :placeholder="param.source === 0?'奖品名称':'商品名称'"></el-input>
          <el-input class="w200" v-model="proParam.suId" v-only-num.string="proParam.suId" placeholder="suid" v-if="param.source === 1" ></el-input>
          <el-button type="primary" @click="getList()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="proList"  border>
        <template v-if="param.source === 1">
          <el-table-column prop="productName" label="商品名称"></el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">{{ scope.row.specs | placeholder }}</template>
          </el-table-column>
          <el-table-column prop="suId" label="suid"></el-table-column>
        </template>
        <el-table-column prop="productName" label="奖品名称" v-else></el-table-column>
        <el-table-column prop="lockStore" label="锁定数量"></el-table-column>
        <el-table-column prop="availableStore" label="剩余数量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" disabled v-if="scope.row.availableStore < param.rewardNum">不可选</el-button>
            <el-button type="text" class="font-blue" v-else @click="choosePro(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination"  v-if="pages>0">
        <el-pagination :current-page.sync="proParam.pageIndex" @current-change="getList" :page-count="pages" background layout="prev, pager, next" ></el-pagination>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/javascript">
  import NewEditor from '@/components/newEditor'
  export default {
    name: 'addTwo',
    data () {
      return {
        param:JSON.parse(localStorage.getItem('lottery')), //从第一步带过来创建的信息
        //弹框相关
        checkedSuid:"",
        dialogTableVisible:false,
        proParam:{
          productName:'',
          suId:'',
          pageSize:20,
          pageIndex:1
        },
        pages:0,
        proList:[]
      }
    },
    components:{
      NewEditor
    },
    computed: {
      title () {
        return this.param.source === 0?"平台奖品":"商家奖品"
      },
      interface () {
        return this.param.source === 0?"getPlatformRewardPage":"getShopRewardList"
      }
    },
    mounted () {
      this.getList()
    },
    methods:{
      // 获取奖品列表  分商家和平台
      getList (pageNow) {
        this.proParam.pageIndex = pageNow || 1
        if(this.param.source === 0){
          delete this.proParam.suId
        }
        this.$service.activity.luckDraw[this.interface](this.proParam).then(res => {
          this.pages = res.pages
          this.proParam.pageIndex = res.pageNum
          this.proList = res.list
        })
      },
      // 选择奖品
      choosePro (row) {
        if(this.param.source === 1){ //商家奖品需要查询图文详情信息
          this.$service.activity.luckDraw.getRewardDescById({suId:row.suId}).then(res => {
            this.dialogTableVisible = false
            this.checkedSuid = row.suId
            this.param.shopRewardName = row.productName
            this.param.shopRewardId = row.rewardId
            this.param.rewardDesc = res
          })
        }else{
          this.dialogTableVisible = false
          this.param.platformRewardName = row.productName
          this.param.platformRewardId = row.rewardId
        }
      },
      //校验参数完整性
      checkParam () {
        if((this.param.source === 0 && this.param.platformRewardId === '') || (this.param.source === 1 && this.param.shopRewardId === '')){
          this.$message.warning("请选择奖品");return
        }
        if(this.param.rewardDesc === ''){
          this.$message.warning("请输入奖品介绍");return
        }
        return true
      },
      save () {
        if(this.checkParam()){
          this.$service.activity.luckDraw.addPlatformLottery(this.param).then(res => {
            this.$router.push('/luckDraw/luckDrawList')
          })
        }
      },
      goBack () {
        //返回上一步的时候需要记录上一步填写的信息
        localStorage.setItem('onlyAdd',true) //仅仅在添加活动第一步的时候存储，读取缓存信息
        this.$router.back()
      }
    }
  }
</script>
