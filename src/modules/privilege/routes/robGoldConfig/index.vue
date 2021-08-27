<template>
  <div class="cms">
    <el-card>
      <el-form :inline="true" v-for="(item, idx) in robGoldConfigList" :key="idx" size="small">
        <el-form-item label-width="0" class="w30">
          <span class="sign">*</span>{{idx+1}}.
        </el-form-item>
        <el-form-item label="金币范围：" label-width="100px">
          <el-input class="w100" v-model="item.goldNumStart" @input="$utils.onlyNum(item, 'goldNumStart', item.goldNumStart)" maxlength="8"></el-input>
          -
          <el-input class="w100" v-model="item.goldNumEnd" @input="$utils.onlyNum(item, 'goldNumEnd', item.goldNumEnd)" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="可抢比例（%）：" label-width="150px">
          <el-input class="w100" v-model="item.robRatio" @input="$utils.onlyNum(item, 'robRatio', item.robRatio)" maxlength="3"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button v-show="robGoldConfigList.length<20" type="primary" @click="add(idx)">添加</el-button>
          <el-button v-show="robGoldConfigList.length>1" type="primary" @click="del(idx)">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="save">提交保存</el-button>
      <el-button @click="goBack">返回</el-button>
    </el-card>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'robGoldConfig',
    data () {
     return {
      robGoldConfigList:[{
        goldNumStart: '',
        goldNumEnd: '',
        robRatio: ''
      }]
     }
    },
    mounted(){
      this.getInfo()
    },
    methods:{
      getInfo () {
        this.$service.privilege.robGoldConfig.queryConfig().then(res => {
          this.robGoldConfigList = res.robGoldConfigList.length<1 ? [{goldNumStart: '', goldNumEnd: '', robRatio: ''}] : res.robGoldConfigList
        })
      },
      add (idx) {
        this.robGoldConfigList.splice(idx+1, 0, {goldNumStart: '', goldNumEnd: '', robRatio: ''})
      },
      del (idx) {
        this.robGoldConfigList.splice(idx, 1)
      },
      save () {
        for (let i=0; i<this.robGoldConfigList.length; i++) {
          let item = this.robGoldConfigList[i]
          if (item.goldNumStart === '' || item.goldNumEnd === '') {
            return this.$message.warning(`请输入第${i+1}条，金币范围`)
          }
          if (parseInt(item.goldNumStart) > parseInt(item.goldNumEnd)) {
            return this.$message.warning(`请输入第${i+1}条，金币范围，前不可大于后`)
          }
          if (item.robRatio === '' || item.robRatio > 100) {
            return this.$message.warning(`请输入第${i+1}条，可抢比例范围（%）0-100`)
          }
        }
        this.$service.privilege.robGoldConfig.addOrUpdate({'robGoldConfigList': this.robGoldConfigList}).then(res => {
          this.$message.success('提交保存成功')
        })
      },
      goBack() {
        this.$router.back()
      }
    }
  }
</script>

<style type="text/css" scoped>
  .w30{ width: 30px;}
  .sign{ color: red; vertical-align: middle;}
</style>
