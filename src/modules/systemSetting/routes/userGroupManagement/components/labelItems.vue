<template>
  <div>
    <div style="float: left; display: flex">
      <div
        v-for="(labItm, labIdx) in data.labelList"
        :key="labIdx"
        style="overflow: hidden; display: flex"
      >
        <!-- 一级条件下拉框触发：所选项目、所属区域、当前label标签index、当前一级条件index -->
        <!-- 二级条件下拉框触发：所选项目、所属区域、当前label标签index、当前一级条件index、当前二级条件idx -->
        <!-- 该组件中只抛出所选项目 与 当前label标签位置是第几级 -->
        <!-- **********    两个标签    ********** -->
        <div v-if="!disabled && labIdx <= 1">
          <el-select
            @change="levelChange($event, labIdx, index, idx)"
            @visible-change="refresh($event, labIdx, index, idx)"
            v-model="labItm.labelIdEUI"
            placeholder="请选择"
          >
            <el-option
              v-for="item in labItm.labelList"
              :key="item.labelId"
              :label="item.label"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </div>
        <div v-if="disabled && labIdx <= 1">
          <el-select
            disabled
            @change="levelChange($event, labIdx, index, idx)"
            @visible-change="refresh($event, labIdx, index, idx)"
            v-model="labItm.labelIdEUI"
            placeholder="请选择"
          >
            <el-option
              v-for="item in labItm.labelList"
              :key="item.labelId"
              :label="item.label"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </div>
        <!-- **********  一个筛选条件  ********** -->
        <div v-if="!disabled && labIdx == 2">
          <el-select
            @change="levelChange($event, labIdx, index, idx)"
            @visible-change="refresh($event, labIdx, index, idx)"
            v-model="labItm.labelIdEUI"
            placeholder="请选择"
          >
            <el-option
              v-for="item in labItm.labelList"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <div v-if="disabled && labIdx == 2">
          <el-select
            disabled
            @change="levelChange($event, labIdx, index, idx)"
            @visible-change="refresh($event, labIdx, index, idx)"
            v-model="labItm.labelIdEUI"
            placeholder="请选择"
          >
            <el-option
              v-for="item in labItm.labelList"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <!-- **********    填写区域    ********** -->
        <!-- type为BOOL的填写区域不展示 value使用筛选结果是/否
        type为LOCATION的填写区域是三级单选框(省市区)组成 填写区域特殊处理
        condition为NULL的填写区域写死‘-’ value使用写死的值null -->
        <div style="display: flex;" v-if="labIdx == 3 && data.labelList[1].type !== 'BOOL' && data.labelList[1].type !== 'LOCATION'">
          <!-- 数字/时间 筛选条件为空 -->
          <div style="display: flex;" v-if="data.labelList[2].condition === 'NULL'">
            <el-input disabled placeholder="-"></el-input>
          </div>
          <!-- 单纯的数字填写框 -->
          <div style="display: flex;" v-if="data.labelList[2].condition !== 'NULL'&&data.labelList[1].type === 'NUMBER' && data.labelList[2].condition !== 'BETWEEN'">
            <div v-if="disabled">
              <el-input disabled v-model="data.labelList[3].value" placeholder="请输入内容"></el-input>
            </div>
            <div v-if="!disabled">
              <!-- <el-input v-model="data.labelList[3].value" placeholder="请输入内容"></el-input> -->
              <el-input v-model.trim="data.labelList[3].value" placeholder="请输入内容" @input="$utils.onlyNum(data.labelList[3], 'value', data.labelList[3].value)"></el-input>
            </div>
          </div>
          <!-- 框-框 -->
          <div style="display: flex;" v-if="data.labelList[2].condition !== 'NULL'&&data.labelList[1].type === 'NUMBER' && data.labelList[2].condition === 'BETWEEN'">
            <div v-if="disabled">
              <el-input disabled v-model="data.labelList[3].value[0]" placeholder="请输入内容"></el-input>
            </div>
            <div v-if="!disabled">
              <!-- <el-input v-model="data.labelList[3].value[0]" placeholder="请输入内容"></el-input> -->
              <el-input v-model.trim="data.labelList[3].value[0]" placeholder="请输入内容" @input="$utils.onlyNum(data.labelList[3].value, 0, data.labelList[3].value[0])"></el-input>
            </div>
            -
            <div v-if="disabled">
              <el-input disabled v-model="data.labelList[3].value[1]" placeholder="请输入内容"></el-input>
            </div>
            <div v-if="!disabled">
              <!-- <el-input v-model="data.labelList[3].value[1]" placeholder="请输入内容"></el-input> -->
              <el-input v-model.trim="data.labelList[3].value[1]" placeholder="请输入内容" @input="$utils.onlyNum(data.labelList[3].value, 1, data.labelList[3].value[1])"></el-input>
            </div>
          </div>
          <!-- 时间控件 -->
          <div style="display: flex;" v-if="data.labelList[2].condition !== 'NULL'&&data.labelList[1].type === 'DATE' && data.labelList[2].condition !== 'BETWEEN'">
            <div v-if="disabled">
              <el-date-picker
                disabled
                v-model="data.labelList[3].value"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div v-if="!disabled">
              <el-date-picker
                v-model="data.labelList[3].value"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
          <!-- 时间区间 -->
          <div style="display: flex;" v-if="data.labelList[2].condition !== 'NULL'&&data.labelList[1].type === 'DATE' && data.labelList[2].condition === 'BETWEEN'">
            <div v-if="disabled">
              <el-date-picker
                disabled
                v-model="data.labelList[3].value[0]"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div v-if="!disabled">
              <el-date-picker
                v-model="data.labelList[3].value[0]"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            -
            <div v-if="disabled">
              <el-date-picker
                disabled
                v-model="data.labelList[3].value[1]"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div v-if="!disabled">
              <el-date-picker
                v-model="data.labelList[3].value[1]"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
          <!-- 枚举相关 查询列表 下拉多选框 -->
          <div style="display: flex;" v-if="data.labelList[2].condition !== 'NULL'&&data.labelList[1].type === 'ENUM'&&(data.labelList[1].labelId === 200109||data.labelList[1].labelId === 200102||data.labelList[1].labelId === 300102)">
            <div v-if="!disabled">
              <el-select
                multiple
                v-model="data.labelList[3].value"
                @visible-change="valueRefreshENUM($event, 3, index, idx)"
                placeholder="请选择">
                <el-option
                  v-for="item in data.labelList[3].list"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div v-if="disabled">
              <el-select
                multiple
                disabled
                v-model="data.labelList[3].value"
                @visible-change="valueRefreshENUM($event, 3, index, idx)"
                placeholder="请选择">
                <el-option
                  v-for="item in data.labelList[3].list"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- 商品相关 远程查询列表 带模糊搜索功能 下拉多选框 -->
          <div style="display: flex;" v-if="data.labelList[2].condition !== 'NULL'&&data.labelList[1].type === 'ENUM'&&(data.labelList[1].labelId === 300110||data.labelList[1].labelId === 300202||data.labelList[1].labelId === 300203||data.labelList[1].labelId === 300204||data.labelList[1].labelId === 300302||data.labelList[1].labelId === 300303)">
            <div v-if="!disabled">
              <el-select
                multiple
                v-model="data.labelList[3].value"
                filterable
                remote
                reserve-keyword
                :remote-method="(query) => {getGoods(query, 3, index, idx)}"
                placeholder="请输入关键词"
                :loading="data.labelList[3].loading">
                <el-option
                  v-for="item in data.labelList[3].list"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productId">
                </el-option>
              </el-select>
            </div>
            <div v-if="disabled">
              <el-select
                multiple
                disabled
                v-model="data.labelList[3].value"
                filterable
                remote
                reserve-keyword
                :remote-method="(query) => {getGoods(query, 3, index, idx)}"
                placeholder="请输入关键词"
                :loading="data.labelList[3].loading">
                <el-option
                  v-for="item in data.labelList[3].list"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productId">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- **********  特殊的地域三级单选框  ********** -->
        <div style="display: flex;" v-if="labIdx >= 3 && data.labelList[1].type === 'LOCATION'">
          <div v-if="!disabled">
            <el-select
              @change="levelChange($event, labIdx, index, idx)"
              @visible-change="refresh($event, labIdx, index, idx)"
              v-model="labItm.labelIdEUI"
              placeholder="请选择"
            >
              <el-option
                v-for="item in labItm.areaList"
                :key="item.labelId"
                :label="item.label"
                :value="item.labelId"
              >
              </el-option>
            </el-select>
          </div>
          <div v-if="disabled">
            <el-select
              disabled
              @change="levelChange($event, labIdx, index, idx)"
              @visible-change="refresh($event, labIdx, index, idx)"
              v-model="labItm.labelIdEUI"
              placeholder="请选择"
            >
              <el-option
                v-for="item in labItm.areaList"
                :key="item.labelId"
                :label="item.label"
                :value="item.labelId"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    },
    idx: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  name: 'labelItems',
  components: {
  },
  data () {
    return {
      aaa: []
    }
  },
  methods: {
    // ****** 以下这个方法levelChange选中时触发调用 获取下一级项目框的数据 ******
    // 两级标签栏 和 一级筛选栏 点击切换选项时触发事件
    levelChange (id, labIdx, index, idx) {
      // console.log('labelchange')
      this.$emit('levelChangeAct', id, labIdx, index, idx)
    },
    // ****** 以下两个方法refresh valueRefreshENUM回显时触发调用 获取本级除回显项外的数据 ******
    // 两级标签栏 和 一级筛选栏 和 可能出现的地域填写栏 在回显状态下点击触发的事件（获取当前点击位置列表） 是否是回显的鉴别变量refresh 该变量在回显初始数据整理时添加
    refresh ($event, labIdx, index, idx) {
      if ($event && this.data.labelList[labIdx].refresh) {
        // console.log('refresh', $event, this.data.labelList[0].labelId, index, idx, labIdx)
        if (labIdx === 0) {
          this.$emit('getLabelOneAct', this.data.labelList[0].labelId, index, idx, 0)
        } else if (labIdx === 1) {
          this.$emit('getLabelTwoAct', this.data.labelList[0].labelId, index, idx, 1)
        } else if (labIdx === 2) {
          this.$emit('getLabelThreeAct', this.data.labelList[1].type, index, idx, 2)
        } else if (labIdx === 3 && this.data.labelList[1].type === 'LOCATION') {
          // 省级数据无需id
          this.$emit('getAreaLabelProAct', index, idx, 3)
        } else if (labIdx === 4 && this.data.labelList[1].type === 'LOCATION') {
          // 市级数据需省级id
          this.$emit('getAreaLabelCitAct', this.data.labelList[3].labelIdEUI, index, idx, 4)
        } else if (labIdx === 5 && this.data.labelList[1].type === 'LOCATION') {
          // 区级数据需市级id
          this.$emit('getAreaLabelConAct', this.data.labelList[4].labelIdEUI, index, idx, 5)
        }
      }
    },
    // 枚举类型填写框的列表值获取方法
    valueRefreshENUM ($event, labIdx, index, idx) {
      if ($event && this.data.labelList[labIdx].refresh) {
        // console.log('refresh', this.data.labelList[1].label, index, idx)
        if (this.data.labelList[1].labelId === 200109 || this.data.labelList[1].labelId === 200102 || this.data.labelList[1].labelId === 300102) {
          // 获取枚举接口
          this.$emit('getValueENUMAct', this.data.labelList[1].label, index, idx, 3)
        } else {
          // 获取商品接口
          // this.$emit('getValueGOODSAct', index, idx, 3)
        }
      }
    },
    // 远程搜索商品列表
    getGoods (query, labIdx, index, idx) {
      // console.log('getGoods', query, labIdx, index, idx)
      this.$emit('getValueGOODSAct', query, index, idx, 3)
    }
  }
}
</script>
<style scoped>
</style>
