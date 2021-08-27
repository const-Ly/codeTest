<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form ref="form" label-width="200px" size="small" class="input-normal">
        <el-form-item label="显示开关：">
          <el-radio-group v-model="param.displaySwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="礼包有效期（天）：">
          <el-input v-model="param.effectiveTime" v-only-num.string="param.effectiveTime" :max-len="2" class="w300"></el-input>
          <span class="ma-l-20 ma-t-20 font-dark0 ">1-30的整数</span>
        </el-form-item>
        <el-form-item label="企业购礼物领取有效期（天）：">
          <el-input v-model="param.toBEffectiveTime" v-only-num.string="param.toBEffectiveTime" :max-len="2" class="w300"></el-input>
          <span class="ma-l-20 ma-t-20 font-dark0 ">1-99的整数</span>
        </el-form-item>
        <el-form-item label="礼物赠言和封面：">
          <ul>
            <li v-for="(item,idx) in param.wordsAndCovers" :key="idx" class="ma-b-10">
              <div>
                <el-input v-model.trim="item.giftWords" :maxLength="20" class="w300"></el-input>
                <span class="ma-l-20 ma-t-20 font-dark0 ">礼物赠言限制1-20个字</span>
              </div>
              <div class="clearfix ma-t-20">
                <upload class="w100 fl" action="/image/uploadImage?width=-1&height=-1&fileSize=300" @success="item.coverImage = $event" :imageUrl="item.coverImage" :size="300"></upload>
                <span class="ma-l-20 ma-t-20 font-dark0 fl">封面图支持png/jpg格式，不超过300k</span>
              </div>
              <span v-if="param.wordsAndCovers.length>1" class="font font-danger ma-l-20" @click="delCont(param.wordsAndCovers,idx)">删除</span>
            </li>
          </ul>
          <el-button type="text" class="font font-blue" v-show="param.wordsAndCovers.length<10" @click="addCont(param.wordsAndCovers,{giftWords:'',coverImage:''})">再添加一条</el-button>
        </el-form-item>
        <el-form-item label="回复赠言：">
          <ul>
            <li v-for="(item,idx) in param.replyWords" :key="idx" class="ma-b-10">
              <el-input v-model.trim="param.replyWords[idx]" :maxLength="20" class="w300"></el-input>
              <span v-if="param.replyWords.length>1" class="font font-danger ma-l-20" @click="delCont(param.replyWords,idx)">删除</span>
            </li>
          </ul>
          <el-button type="text" class="font font-blue" v-show="param.replyWords.length<10" @click="addCont(param.replyWords,'')">再添加一条</el-button>
        </el-form-item>
        <el-form-item label="封面图压缩系数：">
          <el-input v-model="param.coverComparisonRule" v-only-num.string="param.coverComparisonRule" :max-len="3" class="w300"></el-input>
          <span class="ma-l-20 ma-t-20 font-dark0 ">1-100的整数</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveGiftConfig">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script type="text/javascript">
import upload from '@/components/upload'
export default {
  name: 'gift',
  data() {
    return {
      param: {
        displaySwitch: 0,
        effectiveTime: '',
        toBEffectiveTime: 45,
        wordsAndCovers: [{ giftWords: '', coverImage: '' }],
        replyWords: [''],
        coverComparisonRule: ''
      }
    }
  },
  components: {
    upload
  },
  methods: {
    getGiftConfig() {
      this.$service.activity.gift.getGiftConfig().then(res => {
        this.param = res
        // 必须初始化数组结构
        if (res.wordsAndCovers.length === 0) {
          this.param.wordsAndCovers = [{ giftWords: '', coverImage: '' }]
        }
        if (res.replyWords.length === 0) {
          this.param.replyWords = ['']
        }
      })
    },
    addCont(obj, cont) {
      obj.push(cont)
    },
    delCont(obj, idx) {
      obj.splice(idx, 1)
    },
    saveGiftConfig() {
      if (this.param.effectiveTime === '' || this.param.effectiveTime === null) {
        this.$message.warning("请输入礼包有效期（天）");
        return
      }
      if (this.param.effectiveTime < 1 || this.param.effectiveTime > 30) {
        this.$message.warning("礼包有效期（天）必须是1-30的整数");
        return
      }
      if (this.param.toBEffectiveTime === '' || this.param.toBEffectiveTime === null || this.param.toBEffectiveTime == 0) {
        this.$message.warning("请输入1-99的企业购礼物领取有效期（天）");
        return
      }
      for (let i = 0; i < this.param.wordsAndCovers.length; i++) {
        if (this.param.wordsAndCovers[i].giftWords === '' || this.param.wordsAndCovers[i].giftWords === null) {
          this.$message.warning("请输入礼物赠言");
          return
        }
        if (this.param.wordsAndCovers[i].coverImage === '' || this.param.wordsAndCovers[i].coverImage === null) {
          this.$message.warning("请上传封面");
          return
        }
      }
      for (let i = 0; i < this.param.replyWords.length; i++) {
        if (this.param.replyWords[i] === '' || this.param.replyWords[i] === null) {
          this.$message.warning("请输入回复赠言");
          return
        }
      }
      if (this.param.coverComparisonRule === '' || this.param.coverComparisonRule === null) {
        this.$message.warning("请输入封面图压缩系数");
        return
      }
      if (this.param.coverComparisonRule < 1 || this.param.coverComparisonRule > 100) {
        this.$message.warning("封面图压缩系数必须是1-100的整数");
        return
      }
      this.$service.activity.gift.saveGiftConfig(this.param).then(res => {
        this.$message.success("提交成功")
      })
    }
  },
  mounted() {
    this.getGiftConfig()
  }
}
</script>
<style type="text/css" scoped>
.ma-b-10 {
  margin-bottom: 10px;
}

.w120 {
  width: 120px;
}
</style>