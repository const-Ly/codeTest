<template>
  <div>
    <div class="areaTitleC">
      <div class="areaTitleCText">{{title}}</div>
      <div v-if='!isdisabled' class="areaTitleCAction" @click="addLabel()">+添加</div>
    </div>
    <!-- 逻辑区域盒子 -->
    <div class="logicBox" :style="{paddingLeft:data.length <= 1?'0px':'30px'}">
      <div v-if="data.length > 1" class="logicLineB"></div>
      <div
        v-if="data.length > 1 && !isdisabled"
        class="logicTextB"
        @click="changeLogic()"
      >
        <div v-if="logic === 'AND'">且</div>
        <div v-if="logic === 'OR'">或</div>
      </div>
      <div v-if="data.length > 1 && isdisabled" class="logicTextA">
        <div v-if="logic === 'AND'">且</div>
        <div v-if="logic === 'OR'">或</div>
      </div>
      <!-- 循环条件 -->
      <div
        v-for="(item, index) in data"
        :key="index"
        style="margin: 10px 0px; overflow: hidden"
      >
        <!-- 该条件为二级条件 -->
        <div v-if="item.ruleFlag !== null">
          <!-- 逻辑区域盒子 -->
          <div class="logicBox">
            <div class="logicLineB"></div>
            <div
              v-if="!isdisabled"
              class="logicTextB"
              @click="changeLogic(index)"
            >
              <div v-if="data[index].ruleFlag === 'AND'">且</div>
              <div v-if="data[index].ruleFlag === 'OR'">或</div>
            </div>
            <div v-if="isdisabled" class="logicTextA">
              <div v-if="data[index].ruleFlag === 'AND'">且</div>
              <div v-if="data[index].ruleFlag === 'OR'">或</div>
            </div>
            <!-- 循环二级条件 -->
            <div
              v-for="(itm, idx) in item.ruleList"
              :key="idx"
              style="margin: 10px 0px; overflow: hidden"
            >
              <!-- 序号 -->
              <div
                style="
                  background: #c8e0f8;
                  width: 20px;
                  height: 20px;
                  font-size: 13px;
                  color: #222;
                  text-align: center;
                  line-height: 20px;
                  float: left;
                "
              >
                {{ itm.index }}
              </div>
              <!-- 内容区域 -->
              <label-items
                :data='itm'
                :idx='idx'
                :index='index'
                :disabled='isdisabled'
                @levelChangeAct='levelChange'
                @getLabelOneAct='getLabelOne'
                @getLabelTwoAct='getLabelTwo'
                @getLabelThreeAct='getLabelThree'
                @getAreaLabelProAct='getAreaLabelPro'
                @getAreaLabelCitAct='getAreaLabelCit'
                @getAreaLabelConAct='getAreaLabelCon'
                @getValueENUMAct='getValueENUM'
                @getValueGOODSAct='getValueGOODS'
                ></label-items>
              <!-- 操作区域 -->
              <div
                v-if='!isdisabled'
                style="
                  float: right;
                  margin-right: 10px;
                  color: #feae3f;
                  font-size: 14px;
                "
                @click="delLabelIn(index, idx)"
              >
                -删除
              </div>
              <div
                v-if="idx < 1 && !isdisabled"
                style="
                  float: right;
                  margin-right: 10px;
                  color: #2e8def;
                  font-size: 14px;
                "
                @click="addLabelIn(index)"
              >
                +添加
              </div>
            </div>
          </div>
        </div>
        <!-- 该条件为一级条件 -->
        <div v-else style="overflow: hidden">
          <!-- 序号 -->
          <div
            style="
              background: #c8e0f8;
              width: 20px;
              height: 20px;
              font-size: 13px;
              color: #222;
              text-align: center;
              line-height: 20px;
              float: left;
            "
          >
            {{ item.index }}
          </div>
          <!-- 内容区域 -->
          <label-items
            :data='item'
            :index='index'
            :disabled='isdisabled'
            @levelChangeAct='levelChange'
            @getLabelOneAct='getLabelOne'
            @getLabelTwoAct='getLabelTwo'
            @getLabelThreeAct='getLabelThree'
            @getAreaLabelProAct='getAreaLabelPro'
            @getAreaLabelCitAct='getAreaLabelCit'
            @getAreaLabelConAct='getAreaLabelCon'
            @getValueENUMAct='getValueENUM'
            @getValueGOODSAct='getValueGOODS'
            ></label-items>
          <!-- 操作区域 -->
          <div
            v-if='!isdisabled'
            style="
              float: right;
              margin-right: 10px;
              color: #feae3f;
              font-size: 14px;
            "
            @click="delLabel(index)"
          >
            -删除
          </div>
          <div
            v-if='!isdisabled'
            style="
              float: right;
              margin-right: 10px;
              color: #2e8def;
              font-size: 14px;
            "
            @click="addLabelMore(index)"
          >
            +添加
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import labelItems from './labelItems'
export default {
  // props: {
  //   title: {
  //     type: String,
  //     default: ''
  //   },
  //   logic: {
  //     type: String,
  //     default: ''
  //   },
  //   data: {
  //     type: Array,
  //     default: () => []
  //   },
  //   isdisabled: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  props: ['title', 'logic', 'data', 'isdisabled'],
  name: 'labelArea',
  components: {
    labelItems
  },
  data () {
    return {

    }
  },
  mounted () {
    // console.log(this.logic, this.data)
  },
  methods: {
    // 添加一级条件
    addLabel () {
      this.$emit('addLabelAct')
    },
    // 修改逻辑关系
    changeLogic (index = null) {
      // index为null时说明切换的是大区域逻辑 有具体数值时切换的是内部二级条件逻辑
      this.$emit('changeLogicAct', index)
    },
    // 删除二级条件
    // 该标签位置 二级条件位置
    delLabelIn (index, idx) {
      this.$emit('delLabelInAct', index, idx)
    },
    // 添加二级条件
    // 该标签位置
    addLabelIn (index) {
      this.$emit('addLabelInAct', index)
    },
    // 删除一级条件
    // 该标签位置
    delLabel (index) {
      this.$emit('delLabelAct', index)
    },
    // 把一个一级条件变成两个二级条件
    // 该标签位置
    addLabelMore (index) {
      this.$emit('addLabelMoreAct', index)
    },
    levelChange (id, labIdx, index, idx) {
      // console.log('选中项：', id, '\r\n标签位置：', labIdx, '\r\n条件一级位置：', index, '\r\n条件二级位置：', idx)
      this.$emit('levelChangeAct', id, labIdx, index, idx)
    },
    // 派发接口调用事件
    getLabelOne (labelId, index, idx, labelIdx) {
      this.$emit('getLabelOneAct', labelId, index, idx, labelIdx)
    },
    getLabelTwo (labelId, index, idx, labelIdx) {
      this.$emit('getLabelTwoAct', labelId, index, idx, labelIdx)
    },
    getLabelThree (type, index, idx, labelIdx) {
      this.$emit('getLabelThreeAct', type, index, idx, labelIdx)
    },
    getValueENUM (label, index, idx, labelIdx) {
      this.$emit('getValueENUMAct', label, index, idx, labelIdx)
    },
    getValueGOODS (query, index, idx, labelIdx) {
      this.$emit('getValueGOODSAct', query, index, idx, labelIdx)
    },
    getAreaLabelPro (index, idx, labelIdx) {
      this.$emit('getAreaLabelProAct', index, idx, labelIdx)
    },
    getAreaLabelCit (id, index, idx, labelIdx) {
      this.$emit('getAreaLabelCitAct', id, index, idx, labelIdx)
    },
    getAreaLabelCon (id, index, idx, labelIdx) {
      this.$emit('getAreaLabelConAct', id, index, idx, labelIdx)
    }
  }
}
</script>
<style scoped>
.areaTitleC{
  padding: 0px 10px;
  margin: 15px 0px;
  background: #f7f7f7;
  border: 1px solid #e6e6e6;
  height: 40px;
  line-height: 40px;
}
.areaTitleCText{
  color: #222;
  font-size: 14px;
  line-height: 40px;
  float: left;
}
.areaTitleCAction{
  color: #2e8def;
  font-size: 14px;
  line-height: 40px;
  float: right;
}
/* 逻辑区域外层盒子 */
.logicBox{
  position: relative;
  padding-left: 30px;
}
/*  */
.logicLineA{
  position: absolute;
  height: 100%;
  left: 10px;
  top: 0px;
  background: #ccc;
  width: 1px;
}
.logicTextA{
  position: absolute;
  height: 20px;
  width: 20px;
  left: 0px;
  top: 50%;
  margin-top: -10px;
  background:#f5f5f5;
  color: #666;
  text-align: center;
  line-height: 20px;
}
/*  */
.logicLineB{
  position: absolute;
  height: 100%;
  left: 10px;
  top: 0px;
  background: #ccc;
  width: 1px;
}
.logicTextB{
  position: absolute;
  height: 20px;
  width: 20px;
  left: 0px;
  top: 50%;
  margin-top: -10px;
  background: #2e8def;
  color: #fff;
  text-align: center;
  line-height: 20px;
}
</style>
