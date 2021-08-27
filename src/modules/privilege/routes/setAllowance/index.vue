<template>
  <div class="cms">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="line-32">筛选前端类目（津贴频道页若匹配到配置的前端类目，则配置的类目做特别展示）</span>
      </div>
      <ul>
        <li class="list" v-for="(item, idx) in categoryIdList" :key="idx">
          <span class="seq">{{idx+1}}</span>
          <el-select v-model="categoryIdList[idx]" placeholder="请选择">
            <el-option
              v-for="(key, index) in frontendCategoryTreeList"
              :key="index"
              :label="key.categoryName"
              :value="key.categoryId">
            </el-option>
          </el-select>
          <span class="del font-blue" @click="delCategory(idx)">删除</span>
        </li>
      </ul>
      <el-button class="ma-t-10" @click="addCategory" :disabled="categoryIdList.length>=5">添加</el-button><br>
      <el-button class="ma-t-10" type="primary" @click="saveOrUpdateFirstCategory">提交保存</el-button>
    </el-card>
    <el-card class="ma-t-20">
      <div slot="header" class="clearfix">
        <span class="line-32">津贴阶梯配置</span>
      </div>
      <ul>
        <li class="list" v-for="(item, idx) in configList" :key="idx">
          <span class="seq">{{idx+1}}</span>
          <span>津贴区间（元）</span>
          <el-input class="w100" v-model="item.allowanceStart" maxlength="5" @input="$utils.onlyNum(item, 'allowanceStart', item.allowanceStart)"></el-input>
          -
          <el-input class="w100" v-model="item.allowanceEnd" maxlength="5" @input="$utils.onlyNum(item, 'allowanceEnd', item.allowanceEnd)"></el-input>

          <span class="ma-l-20">有效期</span>
          <el-input class="w100" v-model="item.validPeriod" maxlength="3" @input="$utils.onlyNum(item, 'validPeriod', item.validPeriod)"></el-input>天
          <span class="del font-blue" @click="delConfig(idx)">删除</span>
          <p class="font-info ma-l-40 ma-t-10" v-show="idx === 0">津贴区间后包含，前不包含，不可与其他项重叠交叉</p>
        </li>
      </ul>
      <el-button class="ma-t-10" @click="addConfig" :disabled="configList.length>=10">添加</el-button><br>
      <el-button class="ma-t-10" type="primary" @click="saveOrUpdateLadderConfig">提交保存</el-button>
    </el-card>

  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'setAllowance',
    data () {
     return {
      frontendCategoryTreeList: [{ // 一级类目列表
         categoryId: '', // 前端类目id
         categoryName: '', // 前端类目名称
         parentCategoryId: '', //父级前端类目id
         level: 0 // 类目级别（1、2、3）
       }],
      categoryIdList: [], // 津贴前端类目选中的id集合
      configList: [] // 津贴阶梯配置集合
     }
    },
    methods:{
      // 获取一级类目列表
      getFrontendCategoryTree () {
        this.$service.common.getFrontendCategoryTree().then(res => {
          this.frontendCategoryTreeList = res || []
        })
      },
      // 获取津贴前端类目的配置列表
      queryAllFirstCategory () {
        this.$service.privilege.setAllowance.queryAllFirstCategory().then(res => {
          this.categoryIdList = res || []
        })
      },
      // 保存津贴前端类目的配置列表
      saveOrUpdateFirstCategory () {
        for(let i=0; i<this.categoryIdList.length; i++) {
          if(this.categoryIdList[i] === ''){
            return this.$message.warning("已添加数据不可为空")
          }
        }
        this.$service.privilege.setAllowance.saveOrUpdateFirstCategory({ categoryIdList: this.categoryIdList}).then(res => {
          this.$message.success("提交保存成功")
        })
      },
      // 删除津贴前端类目的配置
      delCategory (idx) {
        this.categoryIdList.splice(idx, 1)
      },
      // 添加津贴前端类目的配置
      addCategory () {
        this.categoryIdList.unshift('')
      },
      // 获取津贴阶梯配置
      queryAllLadderConfig () {
        this.$service.privilege.setAllowance.queryAllLadderConfig().then(res => {
          this.configList = res || []
        })
      },
      // 保存津贴阶梯配置
      saveOrUpdateLadderConfig () {
        for(let i=0; i<this.configList.length; i++) {
          let item = this.configList[i]
          if (item.allowanceStart ==='' || item.allowanceEnd === '') {
            return this.$message.warning("请输入津贴区间")
          }
          if (parseInt(item.allowanceStart) >= parseInt(item.allowanceEnd)) {
            return this.$message.warning("津贴区间后必须大于前")
          }
          if (item.validPeriod === '' || item.validPeriod == 0) {
            return this.$message.warning("请输入1-999的有效期")
          }
        }
        this.$service.privilege.setAllowance.saveOrUpdateLadderConfig({ configList: this.configList}).then(res => {
          this.$message.success("提交保存成功")
        })
      },
      // 删除津贴前端类目的配置
      delConfig (idx) {
        this.configList.splice(idx, 1)
      },
      // 添加津贴前端类目的配置
      addConfig () {
        this.configList.unshift(
          {
            allowanceStart: '', // 津贴区间最小值
            allowanceEnd: '', // 津贴区间最大值
            validPeriod: '' // 有效期
          }
        )
      },

    },
    mounted(){
      this.getFrontendCategoryTree()
      this.queryAllFirstCategory()
      this.queryAllLadderConfig()
    }
  }
</script>

<style type="text/css" scoped>
  .seq{
    display: inline-block;
    width: 30px;
  }
  .del{
    display: inline-block;
    width: 50px;
    margin-left: 20px;
  }
  .list{
    padding: 10px 0;
  }
  .ma-t-10{
    margin-top: 10px !important;
  }
</style>
