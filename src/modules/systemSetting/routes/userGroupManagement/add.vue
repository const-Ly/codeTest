<template>
  <div class="cms">
    <el-card v-if="!disabled" class="box-card">
      <span v-if="!$route.params.id">用户组添加</span>
      <span v-if="$route.params.id">用户组编辑</span>
    </el-card>
    <!-- 组名称 -->
    <div class="areaA">
      <div class="areaTitleAB">组名称：</div>
      <div class="areaInputAB">
        <div v-if="!disabled || !disabledS">
          <el-input
            type="text"
            placeholder="请输入内容"
            maxlength="40"
            show-word-limit
            v-model="dataAll.userGroupName"
          >
          </el-input>
        </div>
        <div v-if="disabled && disabledS">
          <el-input
            disabled
            type="text"
            placeholder="请输入内容"
            maxlength="40"
            show-word-limit
            v-model="dataAll.userGroupName"
          >
          </el-input>
        </div>
      </div>
    </div>
    <!-- 优先级 -->
    <div class="areaB">
      <div class="areaTitleAB">优先级：</div>
      <div class="areaInputAB">
        <div v-if="!disabled || !disabledS">
          <el-input
            type="text"
            placeholder="请输入内容"
            maxlength="6"
            show-word-limit
            v-model.trim="dataAll.priority"
            @input="$utils.onlyNum(dataAll, 'priority', dataAll.priority)"
          >
          </el-input>
        </div>
        <div v-if="disabled && disabledS">
          <el-input
            disabled
            type="text"
            placeholder="请输入内容"
            v-model="dataAll.priority"
          >
          </el-input>
        </div>
        <div class="areaBInputTips">数字越大越优先</div>
      </div>
    </div>
    <!-- 逻辑区域盒子 -->
    <div class="logicBox">
      <div class="logicLineA"></div>
      <div class="logicTextA">且</div>
      <!-- 老客固定属性 -->
      <div class="areaTitleC">老客固定属性</div>
      <div v-for="(item, index) in fixed" :key="index" style="margin: 10px 0px;display: flex;">
        <!-- 序号 -->
        <div style="background: #c8e0f8;width:20px;height:20px;font-size:13px;color:#222;text-align:center;line-height:20px;">
          {{index+1}}
        </div>
        <!-- 内容 -->
        <div>
          <el-select v-model='fixDataA[0].code' disabled placeholder="请选择">
            <el-option
              v-for="item in fixDataA"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model='fixDataB[0].code' disabled placeholder="请选择">
            <el-option
              v-for="item in fixDataB"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model='fixDataC[0].code' disabled placeholder="请选择">
            <el-option
              v-for="item in fixDataC"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 逻辑区域盒子 -->
      <div class="logicBox">
        <!-- 逻辑部分样式 -->
        <div class="logicLineB"></div>
        <div v-if="!disabled" class="logicTextB" @click="changeLogic('both')">
          <div v-if="bothLogic === 'AND'">且</div>
          <div v-if="bothLogic === 'OR'">或</div>
        </div>
        <div v-if="disabled" class="logicTextA">
          <div v-if="bothLogic === 'AND'">且</div>
          <div v-if="bothLogic === 'OR'">或</div>
        </div>
        <!-- 基本信息区域 -->
        <label-area
          :isdisabled='disabled'
          :title='"基本信息"'
          :logic='informationLogic'
          :data='information'
          @addLabelAct='addLabelInformation'
          @changeLogicAct='changeLogicInformation'
          @delLabelInAct='delLabelInInformation'
          @addLabelInAct='addLabelInInformation'
          @delLabelAct='delLabelInformation'
          @addLabelMoreAct='addLabelMoreInformation'
          @levelChangeAct='informationLevelChange'
          @getLabelOneAct='informationGetLabelOne'
          @getLabelTwoAct='informationGetLabelTwo'
          @getLabelThreeAct='informationGetLabelThree'
          @getAreaLabelProAct='informationGetAreaLabelPro'
          @getAreaLabelCitAct='informationGetAreaLabelCit'
          @getAreaLabelConAct='informationGetAreaLabelCon'
          @getValueENUMAct='informationGetValueENUM'
          @getValueGOODSAct='informationGetValueGOODS'></label-area>
        <!-- 行为标签区域 -->
        <label-area
          :isdisabled='disabled'
          :title='"行为标签"'
          :logic='actionLogic'
          :data='action'
          @addLabelAct='addLabelAction'
          @changeLogicAct='changeLogicAction'
          @delLabelInAct='delLabelInAction'
          @addLabelInAct='addLabelInAction'
          @delLabelAct='delLabelAction'
          @addLabelMoreAct='addLabelMoreAction'
          @levelChangeAct='actionLevelChange'
          @getLabelOneAct='actionGetLabelOne'
          @getLabelTwoAct='actionGetLabelTwo'
          @getLabelThreeAct='actionGetLabelThree'
          @getAreaLabelProAct='actionGetAreaLabelPro'
          @getAreaLabelCitAct='actionGetAreaLabelCit'
          @getAreaLabelConAct='actionGetAreaLabelCon'
          @getValueENUMAct='actionGetValueENUM'
          @getValueGOODSAct='actionGetValueGOODS'></label-area>
      </div>
    </div>
    <!-- 保存和关闭 -->
    <div v-if="!disabled || !disabledS" style="display: flex;justify-content: center;margin-top:50px;">
      <el-button type="primary" @click="save">保存草稿</el-button>
      <el-button @click="goBack">关闭</el-button>
    </div>
    <!-- <br/>
    <br/>
    基本信息：{{information}}
    <br/>
    <br/>
    行为标签：{{action}}
    <br/>
    <br/>
    数据上传：{{ruleJson}} -->
  </div>
</template>

<script type="text/javascript">
import labelArea from './components/labelArea'
export default {
  props: {
    disabled: {
      type: Boolean,
      // default: true
      default: false
    },
    // 组名称、优先级、保存按钮禁用特殊控制标示
    disabledS: {
      type: Boolean,
      // default: true
      default: false
    },
    logId: {
      type: Number,
      // default: 34
      default: null
    },
    isLog: {
      type: Boolean,
      // default: true
      default: false
    }
  },
  name: 'add',
  components: {
    labelArea
  },
  data () {
    return {
      dataAll: {}, // 数据总体 包含不可变的“且”
      // 老客固定属性渲染填充变量
      fixed: [1],
      fixDataA: [{code: 10, name: '用户身份'}],
      fixDataB: [{code: 1001, name: '老客'}],
      fixDataC: [{code: 100101, name: '是'}],
      // 数据存储 基本信息 行为标签
      information: [],
      action: [],
      informationPre: {},
      actionPre: {},
      // 逻辑变量
      informationLogic: null,
      actionLogic: null,
      bothLogic: 'AND',
      // 提交存储总对象
      ruleJson: null
      // 第四级填写框逻辑：
      // 1、第三级标签类型为数值，筛选条件为区间值时出现两个数值填写框，筛选条件为“为空”时出现不可选的“-”，其余筛选条件出现一个数值填写框；
      // 2、第三级标签类型为时间，筛选条件为区间值时出现两个时间填写控件，筛选条件为“为空”时出现不可选的“-”，其余筛选条件出现一个时间填写控件；
      // 3、第三级标签类型为枚举，且为商品相关的——
      // “最近一单购买商品”300110
      // “最后一次加购商品”300302  300303
      // “最近一天内浏览的商品”300202
      // “最近三天内浏览的商品”300203
      // “最近七天内浏览的商品”300204
      // 出现一个远程搜索多选框（200条）7.7
      // 4、第三级标签类型为枚举，且为——
      // “性别”200109 “注册来源” 200102  “用户首单渠道” 300102
      // 出现一个下拉多选框 5.13.2
      // 5、第三级标签类型为布尔，不出现第四级值输入功能
      // 此时的筛选条件是否单选框的值即是该标签的值
    }
  },
  watch: {
    // 测试使用 首次触发
    // logId: {
    //   immediate: true,
    //   handler: async function (ov, nv) {
    //     console.log('logId', ov, nv)
    //     this.dataAll = await this.queryLogById({logId: nv})
    //     this.disabled = true
    //     this.disabledS = true
    //     this.showOldData()
    //   }
    // }
    async logId (nv, ov) {
      if (this.logId && this.isLog) {
        this.dataAll = await this.queryLogById({logId: nv})
        this.disabled = true
        this.disabledS = true
        this.showOldData()
      }
    }
  },
  async mounted () {
    // 当作页面组件时用户组id  当作日志组件时是否禁用  当作日志组件时用户组id
    // console.log(this.$route.params.id, this.$route.params.type, this.disabled, this.disabledS, this.logId, this.isLog)
    if (this.$route.params.type === 'edit' && this.$route.params.id && this.isLog === false) {
      // 类型编辑 且 存在路由id 且 不是日志组件
      this.dataAll = await this.queryById({userGroupId: this.$route.params.id})
      // 编辑-禁选逻辑
      // 状态（0-草稿，1-生效中，2-已作废;）
      // 0 草稿允许全量编辑除组编号
      // 1 生效中只能编辑组名称、优先级
      // 2 已作废只能查看
      if (this.dataAll.status === 1) {
        this.disabled = true
      } else if (this.dataAll.status === 2) {
        this.disabled = true
        this.disabledS = true
      }
    } else if (this.logId && this.isLog) {
      // 存在路由id 且 是日志组件
      this.dataAll = await this.queryLogById({logId: this.logId})
      this.disabled = true
      this.disabledS = true
    } else {
      return
    }
    this.showOldData()
  },
  methods: {
    // 以下三个方法为回显时数据构造相关方法
    showOldData () {
      // 进入编辑逻辑
      // 取出三大块总体数据体
      let echo = this.dataAll.ruleJson
      // 构建逻辑 和 echo选中数据
      let data = []
      let informationEcho = []
      let actionEcho = []
      // 层级解析
      if (echo.ruleFlag) { // 此处的ruleFlag为三大块总体的固定的且逻辑
        // 第一层
        data = echo.ruleItems
        if (data[0].ruleFlag) { // 此处的ruleFlag为基本信息与行为标签的且/或逻辑
          // 第二层
          this.bothLogic = data[0].ruleFlag // 存储基本信息与行为标签的且/或逻辑
          data = data[0].ruleItems // 存储基本信息与行为标签合集
          // console.log(data)
          if (data[0].ruleFlag) { // 基本信息有多条
            this.informationLogic = data[0].ruleFlag
            informationEcho = data[0].ruleItems
          } else { // 基本信息只有一条
            this.informationLogic = null
            informationEcho = [data[0]]
          }
          if (data[1].ruleFlag) { // 行为标签有多条
            this.actionLogic = data[1].ruleFlag
            actionEcho = data[1].ruleItems
          } else { // 行为标签只有一条
            this.actionLogic = null
            actionEcho = [data[1]]
          }
        }
      }
      // 完成基本信息构建
      this.information = this.dataEcho(informationEcho)
      // 完成行为标签构建
      this.action = this.dataEcho(actionEcho)
      // 分别整理序号
      this.changeIndex(this.information)
      this.changeIndex(this.action)
    },
    dataEcho (data) {
      let echoItemTwoLevel = {}// 二级标签的缓存变量
      let echoItem = {}// 一级标签||二级标签的一行标签 缓存变量
      let echoLabelItem = {}// 每行标签节点内部的每项节点缓存变量
      let dataEcho = []// 要返回的构造后的数据整体
      for (let i = 0; i < data.length; i++) {
        if (data[i].ruleFlag) { // 构建二级标签
          echoItemTwoLevel = {}
          echoItemTwoLevel.ruleList = []
          echoItemTwoLevel.ruleFlag = data[i].ruleFlag
          for (let j = 0; j < data[i].ruleItems.length; j++) {
            // 创建节点缓存变量
            let dataIn = data[i].ruleItems[j]
            // 完成二级标签的一个子标签构建
            echoItemTwoLevel.ruleList.push(JSON.parse(JSON.stringify(this.dataEchoHandle(echoItem, echoLabelItem, dataIn))))
          }
          // 将构建好的一个二级标签推入初始化数组
          dataEcho.push(JSON.parse(JSON.stringify(echoItemTwoLevel)))
        } else { // 构建一级标签
          // 创建节点缓存变量
          let dataIn = data[i]
          // 将构建好的一个一级标签推入初始化数组
          dataEcho.push(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.dataEchoHandle(echoItem, echoLabelItem, dataIn))))))
        }
      }
      return dataEcho
    },
    dataEchoHandle (echoItem, echoLabelItem, dataIn) {
      echoItem.index = 0
      echoItem.ruleFlag = null
      echoItem.labelList = []
      // 构建第一级条件
      echoLabelItem = {}
      echoLabelItem.refresh = true
      echoLabelItem.labelList = [{
        labelId: dataIn.parentLabelId,
        label: dataIn.parentLabel
      }]
      echoLabelItem.labelId = dataIn.parentLabelId
      echoLabelItem.labelIdEUI = dataIn.parentLabelId
      echoLabelItem.label = dataIn.parentLabel
      echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      // 构建第二级条件
      echoLabelItem = {}
      echoLabelItem.refresh = true
      echoLabelItem.labelList = [{
        labelId: dataIn.labelId,
        label: dataIn.label,
        labelName: dataIn.labelName,
        type: dataIn.type
      }]
      echoLabelItem.labelId = dataIn.labelId
      echoLabelItem.labelIdEUI = dataIn.labelId
      echoLabelItem.type = dataIn.type
      echoLabelItem.label = dataIn.label
      echoLabelItem.labelName = dataIn.labelName
      echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      // 构建第三级条件
      echoLabelItem = {}
      echoLabelItem.refresh = true
      echoLabelItem.labelList = [{
        code: dataIn.condition,
        value: dataIn.conditionName
      }]
      echoLabelItem.condition = dataIn.condition
      echoLabelItem.conditionName = dataIn.conditionName
      echoLabelItem.labelIdEUI = dataIn.condition
      echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      // 构建第四级内容区
      echoLabelItem = {}
      if (dataIn.type === 'NUMBER' && dataIn.condition !== 'BETWEEN') {
        echoLabelItem.value = dataIn.value
        echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      } else if (dataIn.type === 'NUMBER' && dataIn.condition === 'BETWEEN') {
        echoLabelItem.value = [0, 0]
        echoLabelItem.value[0] = dataIn.value[0]
        echoLabelItem.value[1] = dataIn.value[1]
        echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      } else if (dataIn.type === 'DATE' && dataIn.condition !== 'BETWEEN') {
        echoLabelItem.value = dataIn.value
        echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      } else if (dataIn.type === 'DATE' && dataIn.condition === 'BETWEEN') {
        echoLabelItem.value = [0, 0]
        echoLabelItem.value[0] = dataIn.value[0]
        echoLabelItem.value[1] = dataIn.value[1]
        echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      } else if (dataIn.type === 'LOCATION') {
        // 至少省级必须有 直接渲染一条数据
        echoLabelItem = {}
        echoLabelItem.refresh = true
        echoLabelItem.areaList = [{
          labelId: dataIn.value.provinceId,
          label: dataIn.value.province
        }]
        echoLabelItem.labelIdEUI = dataIn.value.provinceId
        echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
        // 市级可能有 没有时 渲染空框等待点击加载列表数据
        if (dataIn.value.cityId && dataIn.value.city) {
          echoLabelItem = {}
          echoLabelItem.refresh = true
          echoLabelItem.areaList = [{
            labelId: dataIn.value.cityId,
            label: dataIn.value.city
          }]
          echoLabelItem.labelIdEUI = dataIn.value.cityId
          echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
        } else {
          echoLabelItem = {}
          echoLabelItem.refresh = true
          echoLabelItem.areaList = []
          echoLabelItem.labelIdEUI = null
          echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
        }
        // 区级可能有 没有时 有市级数据才渲染空框等待点击加载列表数据
        if (dataIn.value.countyId && dataIn.value.county) {
          echoLabelItem = {}
          echoLabelItem.refresh = true
          echoLabelItem.areaList = [{
            labelId: dataIn.value.countyId,
            label: dataIn.value.county
          }]
          echoLabelItem.labelIdEUI = dataIn.value.countyId
          echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
        } else if (dataIn.value.cityId && dataIn.value.city) {
          echoLabelItem = {}
          echoLabelItem.refresh = true
          echoLabelItem.areaList = []
          echoLabelItem.labelIdEUI = null
          echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
        }
      } else if (dataIn.type === 'ENUM' && (dataIn.labelId === 300110 || dataIn.labelId === 300202 || dataIn.labelId === 300203 || dataIn.labelId === 300204 || dataIn.labelId === 300302 || dataIn.labelId === 300303)) {
        echoLabelItem.list = []
        echoLabelItem.loading = false
        // 构建数组
        let valuePre = []
        for (let k = 0; k < dataIn.value.length; k++) {
          echoLabelItem.list.push({
            productId: dataIn.value[k].value,
            productName: dataIn.value[k].name
          })
          valuePre.push(dataIn.value[k].value)
        }
        // 重组value
        echoLabelItem.value = valuePre
        echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      } else if (dataIn.type === 'ENUM' && (dataIn.labelId === 200109 || dataIn.labelId === 200102 || dataIn.labelId === 300102)) {
        echoLabelItem.list = []
        // 构建值
        echoLabelItem.refresh = true
        // 构建数组
        let valuePre = []
        for (let k = 0; k < dataIn.value.length; k++) {
          echoLabelItem.list.push({
            code: dataIn.value[k].value,
            value: dataIn.value[k].name
          })
          valuePre.push(dataIn.value[k].value)
        }
        // 重组value
        echoLabelItem.value = valuePre
        echoItem.labelList.push(JSON.parse(JSON.stringify(echoLabelItem)))
      }
      return echoItem
    },
    // 以下方法是接口请求
    // 获取标签列表5.11
    queryTags (param) {
      // console.log('5.11 tags', param)
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.queryTags(param).then(res => {
          // console.log('res', param.type, res)
          if (res) {
            resolve(res)
          } else {
            if (param.type === 10 || param.type === 20 || param.type === 30) {
              resolve([{
                labelId: 3001,
                label: '购买/订单',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 2,
                type: 'NULL'// 非必须
                // labelList: [...]//非必须
              }, {
                labelId: 3002,
                label: '浏览',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 2,
                type: 'NULL'// 非必须
                // labelList: [...]//非必须
              }, {
                labelId: 3003,
                label: '加购',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 2,
                type: 'NULL'// 非必须
                // labelList: [...]//非必须
              }, {
                labelId: 3004,
                label: '社交',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 2,
                type: 'NULL'// 非必须
                // labelList: [...]//非必须
              }, {
                labelId: 3005,
                label: '消费',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 2,
                type: 'NULL'// 非必须
                // labelList: [...]//非必须
              }])
            } else {
              resolve([{
                labelId: 300101,
                label: '日期',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 3,
                type: 'DATE'
                // labelList: []//非必须
              }, {
                labelId: 300102,
                label: '数字',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 3,
                type: 'NUMBER'
                // labelList: []//非必须
              }, {
                labelId: 300103,
                label: '布尔',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 3,
                type: 'BOOL'
                // labelList: []//非必须
              }, {
                labelId: 300105,
                label: '性别',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 3,
                type: 'ENUM'
                // labelList: []//非必须
              }, {
                labelId: 300106,
                label: '最近1天内浏览的商品',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 3,
                type: 'ENUM'
                // labelList: []//非必须
              }, {
                labelId: 300107,
                label: '地域',
                labelName: 'touchuanLN',
                valueType: 'Boolean',
                level: 3,
                type: 'LOCATION'
                // labelList: []//非必须
              }])
            }
          }
        })
      })
    },
    // 获取筛选条件5.14
    queryConditionEnumsByType (param) {
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.queryConditionEnumsByType(param).then(res => {
          // console.log('res', param.type, res)
          if (res) {
            resolve(res)
          } else {
            resolve([{
              code: 'GTE',
              value: '大于等于'
            }, {
              code: 'LTE',
              value: '小于等于'
            }, {
              code: 'EQ',
              value: '等于'
            }, {
              code: 'NOTEQ',
              value: '不等于'
            }, {
              code: 'NULL',
              value: '为空'
            }, {
              code: 'NOTNULL',
              value: '不为空'
            }, {
              code: 'TRUE',
              value: '是'
            }, {
              code: 'FALSE',
              value: '否'
            }, {
              code: 'BETWEEN',
              value: '区间值'
            }, {
              code: 'ANYIN',
              value: '包括以下项中任意一项'
            }, {
              code: 'ALLIN',
              value: '包括以下项中全部'
            }, {
              code: 'NOTIN',
              value: '不包括以下任意一项'
            }])
          }
        })
      })
    },
    // 获取枚举5.13
    queryEnums (param) {
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.queryEnums(param).then(res => {
          // console.log('获取枚举5.13-res', param.enumType, res)
          if (res) {
            resolve(res)
          } else {
            if (param.enumType === 1) {
              resolve([{
                code: '0',
                value: '必要'
              }, {
                code: '1',
                value: 'cps'
              }, {
                code: '2',
                value: 'coffee'
              }, {
                code: '3',
                value: 'shunfeng'
              }])
            } else if (param.enumType === 2) {
              resolve([{
                code: '-1',
                value: '未知'
              }, {
                code: '0',
                value: '男'
              }, {
                code: '1',
                value: '女'
              }])
            } else if (param.enumType === 3) {
              resolve([{
                code: '0',
                value: '首单渠道枚举'
              }])
            }
          }
        })
      })
    },
    // 获取商品7.7
    queryProductByPage (query) {
      let param = {}
      param.productName = query
      param.pageNum = 1
      param.pageSize = 200
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.queryProductByPage(param).then(res => {
          // console.log('获取商品7.7-res', param, res)
          if (res) {
            resolve(res.list)
          } else {
            resolve([
              {
                productId: '0',
                productName: '商品1'
              }, {
                productId: '1',
                productName: '商品2'
              }, {
                productId: '2',
                productName: '商品3'
              }, {
                productId: '3',
                productName: '商品4'
              }, {
                productId: '4',
                productName: '商品5'
              }, {
                productId: '5',
                productName: '商品6'
              }, {
                productId: '6',
                productName: '商品7'
              }, {
                productId: '7',
                productName: '商品8'
              }
            ])
          }
        })
      })
    },
    // 获取地域5.12
    queryLocations (param) {
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.queryLocations(param).then(res => {
          // console.log('获取地域5.12-res', param.addressType, param.addressId, res)
          if (res) {
            resolve(res)
          } else {
            if (param.addressType === 1) {
              resolve([
                {
                  addressId: 'a1',
                  addressName: '省1'
                },
                {
                  addressId: 'a2',
                  addressName: '省2'
                }
              ])
            } else if (param.addressType === 2) {
              if (param.addressId === 'a1') {
                resolve([
                  {
                    addressId: 'a1b1',
                    addressName: '省1市1'
                  },
                  {
                    addressId: 'a1b2',
                    addressName: '省1市2'
                  }
                ])
              } else if (param.addressId === 'a2') {
                resolve([
                  {
                    addressId: 'a2b1',
                    addressName: '省2市1'
                  },
                  {
                    addressId: 'a2b2',
                    addressName: '省2市2'
                  }
                ])
              }
            } else if (param.addressType === 3) {
              if (param.addressId === 'a1b1') {
                resolve([
                  {
                    addressId: 'a1b1c1',
                    addressName: '省1市1区1'
                  },
                  {
                    addressId: 'a1b1c2',
                    addressName: '省1市1区2'
                  }
                ])
              } else if (param.addressId === 'a1b2') {
                resolve([
                  {
                    addressId: 'a1b2c1',
                    addressName: '省1市2区1'
                  },
                  {
                    addressId: 'a1b2c2',
                    addressName: '省1市2区2'
                  }
                ])
              } else if (param.addressId === 'a2b1') {
                resolve([
                  {
                    addressId: 'a2b1c1',
                    addressName: '省2市1区1'
                  },
                  {
                    addressId: 'a2b1c2',
                    addressName: '省2市1区2'
                  }
                ])
              } else if (param.addressId === 'a2b2') {
                resolve([
                  {
                    addressId: 'a2b2c1',
                    addressName: '省2市2区1'
                  },
                  {
                    addressId: 'a2b2c2',
                    addressName: '省2市2区2'
                  }
                ])
              }
            }
          }
        })
      })
    },
    // 获取用户组日志日志
    queryLogById (param) {
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.queryLogById(param).then(res => {
          // console.log('res', param, res)
          if (res) {
            resolve(res)
          }
        })
      })
    },
    // 获取用户组初始数据5.4
    // this.$service.systemSetting.userGroupManagement.queryById
    queryById (param) {
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.queryById(param).then(res => {
          // console.log('res', param, res)
          if (res) {
            resolve(res)
          } else {
            resolve({
              userGroupId: '666989',
              userGroupName: '111',
              priority: '662226',
              ruleJson: { "ruleFlag": "AND", "ruleItems": [ { "ruleFlag": "AND", "ruleItems": [ { "labelId": 200104, "label": "用户首次访问时间", "labelName": "firstVisitorTime", "parentLabelId": 2001, "parentLabel": "基本信息", "type": "DATE", "valueType": "LONG", "condition": "BETWEEN", "conditionName": "区间值（包括边缘值）", "value": [ 1614614400000, 1617120000000 ] }, { "labelId": 300201, "label": "最近一次访问时间", "labelName": "lastVisitTime", "parentLabelId": 3002, "parentLabel": "浏览", "type": "DATE", "valueType": "LONG", "condition": "GTE", "conditionName": "大于等于", "value": 1614700800000 }, { "parentLabel": "用户身份", "parentLabelId": "1001", "label": "老客", "labelId": 100101, "labelName": "isOldConsumer", "type": "BOOL", "condition": "TURE", "conditionName": "是", "valueType": "BOOLEAN", "value": true } ] } ] }
            })
          }
        })
      })
    },
    // 提交5.2
    // this.$service.systemSetting.userGroupManagement.create
    create (param) {
      console.log(param)
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.create(param).then(res => {
          // console.log('res', param, res)
          if (res.error && res.error.message) {
          } else {
            this.$message.success('创建成功')
            this.$router.push({path: '/userGroupManagement/index'})
          }
        })
      })
    },
    // 编辑提交5.3
    // this.$service.systemSetting.userGroupManagement.update
    update (param) {
      return new Promise((resolve, reject) => {
        this.$service.systemSetting.userGroupManagement.update(param).then(res => {
          // console.log('res', param, res)
          if (res.error && res.error.message) {
          } else {
            this.$message.success('编辑成功')
            this.$router.push({path: '/userGroupManagement/index'})
          }
        })
      })
    },
    // 以下方法是回显时补充当前选框列表的方法（因为回显时当前选框只回显了自己一条数据，需要补全当前选框列表内容）
    // 补全当前选框列表后，再点击本级选框不再掉用接口,这时点击选框下某条选项时触发的方法见下文“以下方法是点击下拉选项时修改后续内容的方法”
    // 而商品标签由于每次都需要远程模糊搜索,则需要每次都调用接口更新自身列表
    // 基本信息区域 子组件派发回的回显接口调用事件
    async informationGetLabelOne (labelId, index, idx, labelIdx) {
      // console.log('条件接口1refresh', labelId, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.information[index].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: 20})))
        this.information[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        this.information[index].ruleList[idx].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: 20})))
        this.information[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async informationGetLabelTwo (labelId, index, idx, labelIdx) {
      // console.log('条件接口2refresh', labelId, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.information[index].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: this.information[index].labelList[0].labelId})))
        this.information[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        this.information[index].ruleList[idx].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: this.information[index].ruleList[idx].labelList[0].labelId})))
        this.information[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async informationGetLabelThree (type, index, idx, labelIdx) {
      // console.log('条件接口3refresh', type, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.information[index].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryConditionEnumsByType({conditionType: this.information[index].labelList[1].type})))
        this.information[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        this.information[index].ruleList[idx].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryConditionEnumsByType({conditionType: this.information[index].ruleList[idx].labelList[1].type})))
        this.information[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async informationGetAreaLabelPro (index, idx, labelIdx) {
      // console.log('信息 省 refresh', index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 1})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.information[index].labelList[labelIdx].areaList = areaDate
        this.information[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 1})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.information[index].ruleList[idx].labelList[labelIdx].areaList = areaDate
        this.information[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async informationGetAreaLabelCit (id, index, idx, labelIdx) {
      // console.log('信息 市 refresh', index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 2, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.information[index].labelList[labelIdx].areaList = areaDate
        this.information[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 2, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.information[index].ruleList[idx].labelList[labelIdx].areaList = areaDate
        this.information[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async informationGetAreaLabelCon (id, index, idx, labelIdx) {
      // console.log('信息 区 refresh', index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 3, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.information[index].labelList[labelIdx].areaList = areaDate
        this.information[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 3, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.information[index].ruleList[idx].labelList[labelIdx].areaList = areaDate
        this.information[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async informationGetValueENUM (label, index, idx, labelIdx) {
      // console.log('枚举refresh', label, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let param = {}
        if (this.information[index].labelList[1].labelId === 200109) {
          param.enumType = 2
        } else if (this.information[index].labelList[1].labelId === 200102) {
          param.enumType = 1
        } else if (this.information[index].labelList[1].labelId === 300102) {
          param.enumType = 3
        }
        this.information[index].labelList[labelIdx].list = JSON.parse(JSON.stringify(await this.queryEnums(param)))
        this.information[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let param = {}
        if (this.information[index].ruleList[idx].labelList[1].labelId === 200109) {
          param.enumType = 2
        } else if (this.information[index].ruleList[idx].labelList[1].labelId === 200102) {
          param.enumType = 1
        } else if (this.information[index].ruleList[idx].labelList[1].labelId === 300102) {
          param.enumType = 3
        }
        this.information[index].ruleList[idx].labelList[labelIdx].list = JSON.parse(JSON.stringify(await this.queryEnums(param)))
        this.information[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async informationGetValueGOODS (query, index, idx, labelIdx) {
      // console.log('基本信息商品获取', query, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.information[index].labelList[labelIdx].loading = true
        // 旧数据存储
        let listOld = []
        for (let i = 0; i < this.information[index].labelList[labelIdx].value.length; i++) {
          for (let j = 0; j < this.information[index].labelList[labelIdx].list.length; j++) {
            if (this.information[index].labelList[labelIdx].value[i] === this.information[index].labelList[labelIdx].list[j].productId) {
              listOld.push(JSON.parse(JSON.stringify(this.information[index].labelList[labelIdx].list[j])))
            }
          }
        }
        // 新数据获取
        let listNew = JSON.parse(JSON.stringify(await this.queryProductByPage(query)))
        // 更新列表
        this.information[index].labelList[labelIdx].list = listOld.concat(listNew)
        //
        this.information[index].labelList[labelIdx].loading = false
      } else {
        // 二级
        this.information[index].ruleList[idx].labelList[labelIdx].loading = true
        // 旧数据存储
        let listOld = []
        for (let i = 0; i < this.information[index].ruleList[idx].labelList[labelIdx].value.length; i++) {
          for (let j = 0; j < this.information[index].ruleList[idx].labelList[labelIdx].list.length; j++) {
            if (this.information[index].ruleList[idx].labelList[labelIdx].value[i] === this.information[index].ruleList[idx].labelList[labelIdx].list[j].productId) {
              listOld.push(JSON.parse(JSON.stringify(this.information[index].ruleList[idx].labelList[labelIdx].list[j])))
            }
          }
        }
        // 新数据获取
        let listNew = JSON.parse(JSON.stringify(await this.queryProductByPage(query)))
        // 更新列表
        this.information[index].ruleList[idx].labelList[labelIdx].list = listOld.concat(listNew)
        //
        this.information[index].ruleList[idx].labelList[labelIdx].loading = false
      }
    },
    // 行为标签区域 子组件派发回的回显接口调用事件
    async actionGetLabelOne (labelId, index, idx, labelIdx) {
      // console.log('条件接口1refresh', labelId, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.action[index].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: 30})))
        this.action[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        this.action[index].ruleList[idx].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: 30})))
        this.action[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async actionGetLabelTwo (labelId, index, idx, labelIdx) {
      // console.log('条件接口2refresh', labelId, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.action[index].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: this.action[index].labelList[0].labelId})))
        this.action[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        this.action[index].ruleList[idx].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryTags({type: this.action[index].ruleList[idx].labelList[0].labelId})))
        this.action[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async actionGetLabelThree (type, index, idx, labelIdx) {
      // console.log('条件接口3refresh', type, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.action[index].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryConditionEnumsByType({conditionType: this.action[index].labelList[1].type})))
        this.action[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        this.action[index].ruleList[idx].labelList[labelIdx].labelList = JSON.parse(JSON.stringify(await this.queryConditionEnumsByType({conditionType: this.action[index].ruleList[idx].labelList[1].type})))
        this.action[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async actionGetAreaLabelPro (index, idx, labelIdx) {
      // console.log('信息 省 refresh', index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 1})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.action[index].labelList[labelIdx].areaList = areaDate
        this.action[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 1})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.action[index].ruleList[idx].labelList[labelIdx].areaList = areaDate
        this.action[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async actionGetAreaLabelCit (id, index, idx, labelIdx) {
      // console.log('信息 市 refresh', index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 2, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.action[index].labelList[labelIdx].areaList = areaDate
        this.action[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 2, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.action[index].ruleList[idx].labelList[labelIdx].areaList = areaDate
        this.action[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async actionGetAreaLabelCon (id, index, idx, labelIdx) {
      // console.log('信息 区 refresh', index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 3, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.action[index].labelList[labelIdx].areaList = areaDate
        this.action[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let areaDate = []
        let areaDataPre = JSON.parse(JSON.stringify(await this.queryLocations({addressType: 3, addressId: id})))
        for (let areaI = 0; areaI < areaDataPre.length; areaI++) {
          let areaDataPreEach = {}
          areaDataPreEach.label = areaDataPre[areaI].addressName
          areaDataPreEach.labelId = areaDataPre[areaI].addressId
          areaDate.push(areaDataPreEach)
        }
        this.action[index].ruleList[idx].labelList[labelIdx].areaList = areaDate
        this.action[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async actionGetValueENUM (label, index, idx, labelIdx) {
      // console.log('枚举refresh', label, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        let param = {}
        if (this.action[index].labelList[1].labelId === 200109) {
          param.enumType = 2
        } else if (this.action[index].labelList[1].labelId === 200102) {
          param.enumType = 1
        } else if (this.action[index].labelList[1].labelId === 300102) {
          param.enumType = 3
        }
        this.action[index].labelList[labelIdx].list = JSON.parse(JSON.stringify(await this.queryEnums(param)))
        this.action[index].labelList[labelIdx].refresh = false
      } else {
        // 二级
        let param = {}
        if (this.action[index].ruleList[idx].labelList[1].labelId === 200109) {
          param.enumType = 2
        } else if (this.action[index].ruleList[idx].labelList[1].labelId === 200102) {
          param.enumType = 1
        } else if (this.action[index].ruleList[idx].labelList[1].labelId === 300102) {
          param.enumType = 3
        }
        this.action[index].ruleList[idx].labelList[labelIdx].list = JSON.parse(JSON.stringify(await this.queryEnums(param)))
        this.action[index].ruleList[idx].labelList[labelIdx].refresh = false
      }
    },
    async actionGetValueGOODS (query, index, idx, labelIdx) {
      // console.log('行为标签商品获取', query, index, idx, labelIdx)
      if (idx === null) {
        // 一级
        this.action[index].labelList[labelIdx].loading = true
        // 旧数据存储
        let listOld = []
        for (let i = 0; i < this.action[index].labelList[labelIdx].value.length; i++) {
          for (let j = 0; j < this.action[index].labelList[labelIdx].list.length; j++) {
            if (this.action[index].labelList[labelIdx].value[i] === this.action[index].labelList[labelIdx].list[j].productId) {
              listOld.push(JSON.parse(JSON.stringify(this.action[index].labelList[labelIdx].list[j])))
            }
          }
        }
        // 新数据获取
        let listNew = JSON.parse(JSON.stringify(await this.queryProductByPage(query)))
        // 更新列表
        this.action[index].labelList[labelIdx].list = listOld.concat(listNew)
        //
        this.action[index].labelList[labelIdx].loading = false
      } else {
        // 二级
        this.action[index].ruleList[idx].labelList[labelIdx].loading = true
        // 旧数据存储
        let listOld = []
        for (let i = 0; i < this.action[index].ruleList[idx].labelList[labelIdx].value.length; i++) {
          for (let j = 0; j < this.action[index].ruleList[idx].labelList[labelIdx].list.length; j++) {
            if (this.action[index].ruleList[idx].labelList[labelIdx].value[i] === this.action[index].ruleList[idx].labelList[labelIdx].list[j].productId) {
              listOld.push(JSON.parse(JSON.stringify(this.action[index].ruleList[idx].labelList[labelIdx].list[j])))
            }
          }
        }
        // 新数据获取
        let listNew = JSON.parse(JSON.stringify(await this.queryProductByPage(query)))
        // 更新列表
        this.action[index].ruleList[idx].labelList[labelIdx].list = listOld.concat(listNew)
        //
        this.action[index].ruleList[idx].labelList[labelIdx].loading = false
      }
    },
    // 以下方法是对标签操作的方法（增加、删除标签；标签12级变换）
    // 基本信息区域 子组件派发回的标签操作事件
    addLabelInformation () {
      // console.log('基本信息区域 添加一级条件')
      // 添加第二个一级条件时，修改区域逻辑null -> AND
      if (this.information.length === 1) {
        this.informationLogic = 'AND'
      }
      this.addLabel(this.information, 20)
    },
    changeLogicInformation (index) {
      // console.log('基本信息区域 修改逻辑关系', index)
      this.changeLogic('information', this.information, index)
    },
    delLabelInInformation (index, idx) {
      // console.log('基本信息区域 删除二级条件', index, idx)
      this.delLabelIn(this.information, index, idx)
    },
    addLabelInInformation (index) {
      // console.log('基本信息区域 添加二级条件', index)
      this.addLabelIn(this.information, index, 20)
    },
    delLabelInformation (index) {
      // console.log('基本信息区域 删除一级条件', index)
      // 删除第二个一级条件时，修改区域逻辑为null
      if (this.information.length === 1) {
        this.informationLogic = null
      }
      this.delLabel(this.information, index)
    },
    addLabelMoreInformation (index) {
      // console.log('基本信息区域 把一个一级条件变成两个二级条件', index)
      this.addLabelMore(this.information, index, 20)
    },
    // 基本信息区域 子组件派发回的标签操作事件
    addLabelAction () {
      // console.log('行为标签区域 添加一级条件')
      // 添加第二个一级条件时，修改区域逻辑null -> AND
      if (this.action.length === 1) {
        this.actionLogic = 'AND'
      }
      this.addLabel(this.action, 30)
    },
    changeLogicAction (index) {
      // console.log('行为标签区域 修改逻辑关系', index)
      this.changeLogic('action', this.action, index)
    },
    delLabelInAction (index, idx) {
      // console.log('行为标签区域 删除二级条件', index, idx)
      this.delLabelIn(this.action, index, idx)
    },
    addLabelInAction (index) {
      // console.log('行为标签区域 添加二级条件', index)
      this.addLabelIn(this.action, index, 30)
    },
    delLabelAction (index) {
      // console.log('行为标签区域 删除一级条件', index)
      // 删除第二个一级条件时，修改区域逻辑为null
      if (this.action.length === 1) {
        this.actionLogic = null
      }
      this.delLabel(this.action, index)
    },
    addLabelMoreAction (index) {
      // console.log('行为标签区域 把一个一级条件变成两个二级条件', index)
      this.addLabelMore(this.action, index, 30)
    },
    // 标签操作执行方法
    async addLabel (data, labelId) {
      // 添加一级条件
      if (this.numMax(data)) {
        let item = {}
        // 序号
        item.index = 0
        // 是否有逻辑切换（单个一级条件没有）
        item.ruleFlag = null
        // 标签数组
        item.labelList = []
        // ******调取接口 由10 20 30获得第一标签属性
        let labelListItem = {}
        labelListItem.label = ''
        labelListItem.labelId = null
        labelListItem.labelIdEUI = null
        labelListItem.labelName = null
        labelListItem.labelList = await this.queryTags({type: labelId})
        item.labelList.push(JSON.parse(JSON.stringify(labelListItem)))
        // 一级标签添加
        data.push(JSON.parse(JSON.stringify(item)))
        // 序号检查
        this.changeIndex(data)
      } else {
        this.$message.warning('超过20个')
      }
    },
    async addLabelMore (data, index, labelId) {
      // 变二级条件
      if (this.numMax(data)) {
        // 二级条件基础容器
        let item = {}
        // 初始逻辑“且”
        item.ruleFlag = 'AND'
        // 二级条件容器
        item.ruleList = []
        // **担心存在浅拷贝问题 稳妥处理生成两个二级条件 未验证是否真的出现浅拷贝**
        // 保存原一级条件
        let itemFirst = {}
        itemFirst.index = 0
        itemFirst.ruleFlag = null
        itemFirst.labelList = JSON.parse(JSON.stringify(data[index].labelList))
        item.ruleList.push(JSON.parse(JSON.stringify(itemFirst)))
        // 身生成新二级条件
        let itemSecond = {}
        itemSecond.index = 0
        itemSecond.ruleFlag = null
        itemSecond.labelList = []
        // ******调取接口 由10 20 30获得第一标签属性
        let labelListItem = {}
        labelListItem.label = ''
        labelListItem.labelId = null
        labelListItem.labelIdEUI = null
        labelListItem.labelName = null
        labelListItem.labelList = await this.queryTags({type: labelId})
        itemSecond.labelList.push(JSON.parse(JSON.stringify(labelListItem)))
        item.ruleList.push(JSON.parse(JSON.stringify(itemSecond)))
        // 二级条件组加入条件列表
        data.splice(index, 1, item)
        this.changeIndex(data)
      } else {
        this.$message.warning('超过20个')
      }
    },
    async addLabelIn (data, index, labelId) {
      // 添加二级条件
      if (this.numMax(data)) {
        let item = {}
        item.index = 0
        item.ruleFlag = null
        item.labelList = []
        // 调取接口 由10 20 30获得第一标签属性
        let labelListItem = {}
        labelListItem.label = ''
        labelListItem.labelId = null
        labelListItem.labelIdEUI = null
        labelListItem.labelName = null
        labelListItem.labelList = await this.queryTags({type: labelId})
        item.labelList.push(JSON.parse(JSON.stringify(labelListItem)))
        data[index].ruleList.push(JSON.parse(JSON.stringify(item)))
        this.changeIndex(data)
      } else {
        this.$message.warning('超过20个')
      }
    },
    delLabel (data, index) {
      // 删除一级条件
      data.splice(index, 1)
      this.changeIndex(data)
    },
    delLabelIn (data, index, idx) {
      // 删除二级条件
      if (data[index].ruleList.length > 2) {
        data[index].ruleList.splice(idx, 1)
      } else {
        data[index].ruleList.splice(idx, 1)
        let item = data[index].ruleList[0]
        data.splice(index, 1, item)
      }
      this.changeIndex(data)
    },
    // 最大值判断
    numMax (data) {
      // 检测属性区域是否超出二十个
      let num = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].ruleFlag !== null) {
        // 存在二级条件
          for (let j = 0; j < data[i].ruleList.length; j++) {
            data[i].ruleList[j].index = num + 1
            num++
          }
        } else {
        // 不存在二级条件
          data[i].index = num + 1
          num++
        }
      }
      if (num < 20) return true
      else return false
    },
    // 序号整理
    changeIndex (data) {
      // 整理标签列表序号
      let num = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].ruleFlag !== null) {
        // 存在二级条件
          for (let j = 0; j < data[i].ruleList.length; j++) {
            data[i].ruleList[j].index = num + 1
            num++
          }
        } else {
        // 不存在二级条件
          data[i].index = num + 1
          num++
        }
      }
    },
    // 逻辑修改
    changeLogic (type = null, data = null, index = null) {
      // console.log('要修改逻辑的区域是', type, '\r\n是否有二级条件位置', index)
      if (index !== null) {
        // 说明修改的是某区域二级条件的逻辑
        if (data[index].ruleFlag === 'OR') {
          data[index].ruleFlag = 'AND'
        } else if (data[index].ruleFlag === 'AND') {
          data[index].ruleFlag = 'OR'
        }
      } else {
        // 说明修改的是某区域逻辑
        if (type === 'information') {
          if (this.informationLogic === 'OR') {
            this.informationLogic = 'AND'
          } else if (this.informationLogic === 'AND') {
            this.informationLogic = 'OR'
          }
        } else if (type === 'action') {
          if (this.actionLogic === 'OR') {
            this.actionLogic = 'AND'
          } else if (this.actionLogic === 'AND') {
            this.actionLogic = 'OR'
          }
        } else if (type === 'both') {
          if (this.bothLogic === 'OR') {
            this.bothLogic = 'AND'
          } else if (this.bothLogic === 'AND') {
            this.bothLogic = 'OR'
          }
        }
      }
    },
    // 以下方法是点击下拉选项时修改后续内容的方法
    // 明确发生标签变化的位置 基本信息区域
    informationLevelChange (id, labIdx, index, idx) {
      // console.log('in选中项：', id, '\r\n标签位置：', labIdx, '\r\n条件一级位置：', index, '\r\n条件二级位置：', idx)
      if (idx === null) {
        // 说明是一级条件的标签变动
        this.oneLevelChange(this.information, id, labIdx, index)
      } else {
        // 说明是二级条件的标签变动
        this.twoLevelChange(this.information, id, labIdx, index, idx)
      }
    },
    // 明确发生标签变化的位置 区域行为标签
    actionLevelChange (id, labIdx, index, idx) {
      // console.log('ac选中项：', id, '\r\n标签位置：', labIdx, '\r\n条件一级位置：', index, '\r\n条件二级位置：', idx)
      if (idx === null) {
        // 说明是一级条件的标签变动
        this.oneLevelChange(this.action, id, labIdx, index)
      } else {
        // 说明是二级条件的标签变动
        this.twoLevelChange(this.action, id, labIdx, index, idx)
      }
    },
    // 一级标签点击唤起后续填写内容
    oneLevelChange (data, id, labIdx, index) {
      // console.log('一级标签改动:', '\r\n当前点击labelid：', id, '\r\n当前点击label在该条标签中所处位置：', labIdx, '\r\n当前点击标签位置：', index)
      let labelArr = data[index].labelList
      this.levelChangeHandle(labelArr, id, labIdx)
    },
    // 二级标签点击唤起后续填写内容
    twoLevelChange (data, id, labIdx, index, idx) {
      // console.log('二级标签改动:', '\r\n当前点击labelid：', id, '\r\n当前点击label在该条标签中所处位置：', labIdx, '\r\n当前点击标签一级位置：', index, '\r\n当前点击标签二级位置：', idx)
      let labelArr = data[index].ruleList[idx].labelList
      this.levelChangeHandle(labelArr, id, labIdx)
    },
    async levelChangeHandle (labelArr, id, labIdx) {
      if (labIdx === 0) {
        // 点击一级标签框
        if (labelArr[labIdx].labelId === id) {
          // 说明点击了已选项
        } else {
          for (let i = 0; i < labelArr[labIdx].labelList.length; i++) {
            if (id === labelArr[labIdx].labelList[i].labelId) {
              // 点击其他选项 先清空后面的全部条件 再续上下一级的条件
              // 设置一级框选中信息
              labelArr[labIdx].labelId = id
              labelArr[labIdx].label = labelArr[labIdx].labelList[i].label
              // 清空后面全部条件
              labelArr.splice(1, labelArr.length - 1)
              // 添加二级框数据
              let labelListItem = {}
              labelListItem.label = ''
              labelListItem.labelId = null
              labelListItem.labelIdEUI = null
              labelListItem.type = ''
              labelListItem.labelList = await this.queryTags({type: labelArr[labIdx].labelId})
              labelArr.push(JSON.parse(JSON.stringify(labelListItem)))
            }
          }
        }
      } else if (labIdx === 1) {
        // 点击二级标签框
        if (labelArr[labIdx].labelId === id) {
          // 说明点击了已选项
        } else {
          for (let i = 0; i < labelArr[labIdx].labelList.length; i++) {
            if (id === labelArr[labIdx].labelList[i].labelId) {
              // 点击其他选项 先清空后面的全部条件 再续上下二级的条件
              // 设置二级框选中信息
              labelArr[labIdx].labelId = id
              labelArr[labIdx].type = labelArr[labIdx].labelList[i].type
              labelArr[labIdx].label = labelArr[labIdx].labelList[i].label
              labelArr[labIdx].labelName = labelArr[labIdx].labelList[i].labelName
              // 清空后面全部条件
              labelArr.splice(2, labelArr.length - 2)
              // 添加三级框数据
              let labelListItem = {}
              labelListItem.condition = ''
              labelListItem.conditionName = ''
              labelListItem.labelIdEUI = null
              labelListItem.labelList = await this.queryConditionEnumsByType({conditionType: labelArr[labIdx].type})
              labelArr.push(JSON.parse(JSON.stringify(labelListItem)))
            }
          }
        }
      } else if (labIdx === 2) {
        // 点击第三级筛选条件框
        if (labelArr[labIdx].condition === id) {
          // 说明点击了已选项
        } else {
          for (let i = 0; i < labelArr[labIdx].labelList.length; i++) {
            if (id === labelArr[labIdx].labelList[i].code) {
              // 设置三级框选中信息
              labelArr[labIdx].condition = id
              labelArr[labIdx].conditionName = labelArr[labIdx].labelList[i].value
              // 构建填写框容器
              if (labelArr[1].type === 'NUMBER' && labelArr[2].condition !== 'BETWEEN') {
                // console.log('数字单填')
                let dataSend = {}
                dataSend.value = ''
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              } else if (labelArr[1].type === 'NUMBER' && labelArr[2].condition === 'BETWEEN') {
                // console.log('数字区间')
                let dataSend = {}
                dataSend.value = ['', '']
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              } else if (labelArr[1].type === 'DATE' && labelArr[2].condition !== 'BETWEEN') {
                // console.log('时间单填')
                let dataSend = {}
                dataSend.value = ''
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              } else if (labelArr[1].type === 'DATE' && labelArr[2].condition === 'BETWEEN') {
                // console.log('时间区间')
                let dataSend = {}
                dataSend.value = ['', '']
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              } else if (labelArr[1].type === 'LOCATION') {
                // console.log('地域')
                let provinceData = {}
                // 省级地域数据获取和整理
                provinceData.areaList = []
                let provinceDataPre = await this.queryLocations({addressType: 1})
                for (let areaI = 0; areaI < provinceDataPre.length; areaI++) {
                  let provinceDataPreEach = {}
                  provinceDataPreEach.label = provinceDataPre[areaI].addressName
                  provinceDataPreEach.labelId = provinceDataPre[areaI].addressId
                  provinceData.areaList.push(provinceDataPreEach)
                }
                // 省级地域数据选中值存储变量构建
                provinceData.labelIdEUI = null
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(provinceData)
              } else if (labelArr[1].type === 'ENUM' && labelArr[1].labelId === 200109) {
                // console.log('性别枚举')
                let dataSend = {}
                dataSend.list = JSON.parse(JSON.stringify(await this.queryEnums({enumType: 2})))
                dataSend.value = []
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              } else if (labelArr[1].type === 'ENUM' && labelArr[1].labelId === 200102) {
                // console.log('注册来源枚举')
                let dataSend = {}
                dataSend.list = JSON.parse(JSON.stringify(await this.queryEnums({enumType: 1})))
                dataSend.value = []
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              } else if (labelArr[1].type === 'ENUM' && labelArr[1].labelId === 300102) {
                // console.log('首单渠道枚举')
                let dataSend = {}
                dataSend.list = JSON.parse(JSON.stringify(await this.queryEnums({enumType: 3})))
                dataSend.value = []
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              } else if (labelArr[1].type === 'ENUM' && (labelArr[1].labelId === 300110 || labelArr[1].labelId === 300202 || labelArr[1].labelId === 300203 || labelArr[1].labelId === 300204 || labelArr[1].labelId === 300302 || labelArr[1].labelId === 300303)) {
                // console.log('商品列表枚举')
                let dataSend = {}
                dataSend.list = []
                dataSend.value = []
                dataSend.loading = false
                labelArr.splice(3, labelArr.length - 3)
                labelArr.push(dataSend)
              }
            }
          }
        }
      } else if (labIdx === 3) {
        // 只有地域型标签才会出现 4、5、6 三个选择框（对应省、市、区）并且每个框都能触发事件levelChange
        if (labelArr[labIdx].value === id) {
          // 说明点击了已选项
        } else {
          // console.log('地域')
          let cityData = {}
          // 市级地域数据获取和整理
          cityData.areaList = []
          let cityDataPre = await this.queryLocations({addressType: 2, addressId: id})
          for (let areaI = 0; areaI < cityDataPre.length; areaI++) {
            let cityDataPreEach = {}
            cityDataPreEach.label = cityDataPre[areaI].addressName
            cityDataPreEach.labelId = cityDataPre[areaI].addressId
            cityData.areaList.push(cityDataPreEach)
          }
          // 市级地域数据选中值存储变量构建
          cityData.labelIdEUI = null
          labelArr.splice(4, labelArr.length - 4)
          labelArr.push(cityData)
        }
      } else if (labIdx === 4) {
        // 只有地域型标签才会出现 4、5、6 三个选择框（对应省、市、区）并且每个框都能触发事件levelChange
        if (labelArr[labIdx].value === id) {
          // 说明点击了已选项
        } else {
          // console.log('地域')
          let countyData = {}
          // 区级地域数据获取和整理
          countyData.areaList = []
          let countyDataPre = await this.queryLocations({addressType: 3, addressId: id})
          for (let areaI = 0; areaI < countyDataPre.length; areaI++) {
            let countyDataPreEach = {}
            countyDataPreEach.label = countyDataPre[areaI].addressName
            countyDataPreEach.labelId = countyDataPre[areaI].addressId
            countyData.areaList.push(countyDataPreEach)
          }
          // 区级地域数据选中值存储变量构建
          countyData.labelIdEUI = null
          labelArr.splice(5, labelArr.length - 5)
          labelArr.push(countyData)
        }
      }
    },
    // 以下方法为上传时的数据整理
    fixNullIn (dataArr, type) {
      let arrName = ''
      if (type === 1) {
        arrName = '基本信息'
      } else if (type === 2) {
        arrName = '行为标签'
      }
      if (!dataArr.labelList[0] || !dataArr.labelList[0].labelId) {
        this.$message.warning(arrName + dataArr.index + '不完整')
        return false
      }
      if (!dataArr.labelList[1] || !dataArr.labelList[1].labelId || !dataArr.labelList[1].type || !dataArr.labelList[1].label) {
        this.$message.warning(arrName + dataArr.index + '不完整')
        return false
      }
      if (!dataArr.labelList[2] || !dataArr.labelList[2].condition) {
        this.$message.warning(arrName + dataArr.index + '不完整')
        return false
      }
      if (dataArr.labelList[1].type === 'LOCATION') {
        if (dataArr.labelList[3].labelIdEUI === null) {
          this.$message.warning(arrName + dataArr.index + '不完整')
          return false
        }
      }
      if (dataArr.labelList[1].type !== 'BOOL' && dataArr.labelList[2].condition !== 'NULL' && dataArr.labelList[1].type !== 'LOCATION') {
        if (dataArr.labelList[1].type === 'ENUM' && dataArr.labelList[3].value.length === 0) {
          this.$message.warning(arrName + dataArr.index + '不完整')
          return false
        }
        if (!dataArr.labelList[3]) {
          this.$message.warning(arrName + dataArr.index + '不完整')
          return false
        }
        if (dataArr.labelList[1].type === 'DATE' && dataArr.labelList[2].condition === 'BETWEEN' && (dataArr.labelList[3].value[0] === '' || dataArr.labelList[3].value[1] === '' || dataArr.labelList[3].value[0] === 0 || dataArr.labelList[3].value[1] === 0 || dataArr.labelList[3].value[0] === null || dataArr.labelList[3].value[1] === null)) {
          this.$message.warning(arrName + dataArr.index + '不完整')
          return false
        }
        if (dataArr.labelList[1].type === 'DATE' && dataArr.labelList[2].condition !== 'BETWEEN' && (dataArr.labelList[3].value === '' || dataArr.labelList[3].value === 0 || dataArr.labelList[3].value === null)) {
          this.$message.warning(arrName + dataArr.index + '不完整')
          return false
        }
        if (dataArr.labelList[1].type === 'NUMBER' && dataArr.labelList[2].condition === 'BETWEEN' && (dataArr.labelList[3].value[0] === '' || dataArr.labelList[3].value[1] === '' || dataArr.labelList[3].value[0] === null || dataArr.labelList[3].value[1] === null)) {
          this.$message.warning(arrName + dataArr.index + '不完整')
          return false
        }
        if (dataArr.labelList[1].type === 'NUMBER' && dataArr.labelList[2].condition !== 'BETWEEN' && (dataArr.labelList[3].value === '' || dataArr.labelList[3].value === null)) {
          this.$message.warning(arrName + dataArr.index + '不完整')
          return false
        }
      }
      return true
    },
    async save () {
      // 空值检测
      // console.log(this.information.length, this.information.length)
      if (this.information.length === 0) {
        this.$message.warning('基本信息未填写')
        return
      }
      if (this.action.length === 0) {
        this.$message.warning('行为标签未填写')
        return
      }
      for (let i = 0; i < this.information.length; i++) {
        if (this.information[i].ruleFlag === null) {
          // 一级条件 遍历标签列表寻找空值
          let dataArr = this.information[i]
          if (!this.fixNullIn(dataArr, 1)) {
            return
          }
        } else {
          for (let j = 0; j < this.information[i].ruleList.length; j++) {
            // 二级条件 遍历标签列表寻找空值
            let dataArr = this.information[i].ruleList[j]
            if (!this.fixNullIn(dataArr, 1)) {
              return
            }
          }
        }
      }
      for (let i = 0; i < this.action.length; i++) {
        if (this.action[i].ruleFlag === null) {
          // 一级条件 遍历标签列表寻找空值
          let dataArr = this.action[i]
          if (!this.fixNullIn(dataArr, 2)) {
            return
          }
        } else {
          for (let j = 0; j < this.action[i].ruleList.length; j++) {
            // 二级条件 遍历标签列表寻找空值
            let dataArr = this.action[i].ruleList[j]
            if (!this.fixNullIn(dataArr, 2)) {
              return
            }
          }
        }
      }
      // console.log('通过空值检测')
      this.informationPre = {}
      this.actionPre = {}
      console.log(this.information, this.action, this.informationLogic, this.actionLogic)
      // 基本信息
      if (this.information.length > 1) {
        // 基本信息逻辑不为null 说明不止一条基本信息
        this.informationPre.ruleFlag = this.informationLogic
        this.informationPre = this.fixData(this.informationPre, this.information, 2)
      } else {
        // 基本信息逻辑为null 说明只有一条基本信息
        this.informationPre = this.fixData(this.informationPre, this.information, 1)
      }
      // 行为标签
      if (this.action.length > 1) {
        // 行为标签逻辑不为null 说明不止一条行为标签
        this.actionPre.ruleFlag = this.actionLogic
        this.actionPre = this.fixData(this.actionPre, this.action, 2)
      } else {
        // 行为标签逻辑为null 说明只有一条行为标签
        this.actionPre = this.fixData(this.actionPre, this.action, 1)
      }
      console.log('基本信息数据准备状态', JSON.stringify(this.informationPre))
      console.log('行为标签数据准备状态', JSON.stringify(this.actionPre))
      let bothPre = {}
      bothPre.ruleFlag = this.bothLogic
      bothPre.ruleItems = []
      bothPre.ruleItems.push(this.informationPre)
      bothPre.ruleItems.push(this.actionPre)
      this.ruleJson = {}
      this.ruleJson.ruleFlag = 'AND'
      this.ruleJson.ruleItems = []
      this.ruleJson.ruleItems.push(bothPre)
      // 老客固定属性
      this.ruleJson.ruleItems.push({
        'parentLabel': '用户身份',
        'parentLabelId': 1001,
        'label': '老客',
        'labelId': 100101,
        'labelName': 'isOldConsumer',
        'type': 'BOOL',
        'condition': 'TURE',
        'conditionName': '是',
        'valueType': 'BOOLEAN',
        'value': true
      })
      // console.log('数据上传状态', JSON.stringify(this.ruleJson))
      if (this.$route.params.type === 'edit' && this.$route.params.id && this.isLog === false) {
        await this.update({
          userGroupId: this.$route.params.id,
          userGroupName: this.dataAll.userGroupName,
          priority: this.dataAll.priority,
          ruleJson: this.ruleJson
        })
      } else {
        await this.create({
          userGroupName: this.dataAll.userGroupName,
          priority: this.dataAll.priority,
          ruleJson: this.ruleJson
        })
      }
    },
    // 上传时整理数据
    fixData (dataPre, data, type) {
      if (type === 2) { // 不止一条标签
        dataPre.ruleItems = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].ruleFlag !== null) { // 不止一条标签 有二级条件
            // 二级标签
            let dataPreItem = {}
            dataPreItem.ruleFlag = data[i].ruleFlag
            dataPreItem.ruleItems = []
            for (let j = 0; j < data[i].ruleList.length; j++) {
              // 二级标签数组
              let dataPreItemIn = {}
              let labelList = data[i].ruleList[j].labelList
              dataPreItem.ruleItems.push(this.fixDataHandle(dataPreItemIn, labelList))
            }
            dataPre.ruleItems.push(dataPreItem)
          } else { // 不止一条标签 无二级条件
            // 一级标签
            let dataPreItem = {}
            let labelList = data[i].labelList
            dataPre.ruleItems.push(this.fixDataHandle(dataPreItem, labelList))
          }
        }
      } else if (type === 1) { // 只有一条标签
        if (data[0].labelList) { // 只有一条标签 无二级条件
          let labelList = data[0].labelList
          let dataPreItem = {}
          dataPre = this.fixDataHandle(dataPreItem, labelList)
        } else { // 只有一条标签 有二级条件
          dataPre.ruleFlag = data[0].ruleFlag
          dataPre.ruleItems = []
          // 二级标签
          let dataPreItem = {}
          for (let j = 0; j < data[0].ruleList.length; j++) {
            // 二级标签数组
            let dataPreItemIn = {}
            let labelList = data[0].ruleList[j].labelList
            dataPreItem = (this.fixDataHandle(dataPreItemIn, labelList))
            dataPre.ruleItems.push(dataPreItem)
          }
        }
      }
      return dataPre
    },
    fixDataHandle (data, labelList) {
      data.labelId = labelList[1].labelId
      data.label = labelList[1].label
      data.labelName = labelList[1].labelName
      data.parentLabelId = labelList[0].labelId
      data.parentLabel = labelList[0].label
      data.type = labelList[1].type
      // 构造valueType
      if ((labelList[1].type === 'NUMBER' || labelList[1].type === 'DATE') && labelList[2].condition !== 'BETWEEN') {
        data.valueType = 'LONG'
      } else if ((labelList[1].type === 'NUMBER' || labelList[1].type === 'DATE') && labelList[2].condition === 'BETWEEN') {
        data.valueType = 'RANGE'
      } else if (labelList[1].type === 'LOCATION') {
        data.valueType = 'LOCATION'
      } else if (labelList[1].type === 'BOOL') {
        data.valueType = 'BOOLEAN'
      } else if (labelList[1].type === 'ENUM') {
        data.valueType = 'ARRAY'
      }
      data.condition = labelList[2].condition
      data.conditionName = labelList[2].conditionName
      // 类型不为布尔时，存在第四级填写框
      if (labelList[1].type !== 'BOOL') {
        if (labelList[2].condition === 'NULL') {
          data.value = null
        } else {
          if (labelList[1].type === 'LOCATION') {
            // 地域型标签整理
            data.value = {}
            // 遍历地域对象省级 找到对应id做name的存储
            if (labelList.length >= 4) {
              for (let provinceEach = 0; provinceEach < labelList[3].areaList.length; provinceEach++) {
                if (labelList[3].areaList[provinceEach].labelId === labelList[3].labelIdEUI) {
                  data.value.provinceId = labelList[3].areaList[provinceEach].labelId
                  data.value.province = labelList[3].areaList[provinceEach].label
                }
              }
            }
            // 遍历地域对象市级 找到对应id做name的存储
            if (labelList.length >= 5) {
              for (let cityEach = 0; cityEach < labelList[4].areaList.length; cityEach++) {
                if (labelList[4].areaList[cityEach].labelId === labelList[4].labelIdEUI) {
                  data.value.cityId = labelList[4].areaList[cityEach].labelId
                  data.value.city = labelList[4].areaList[cityEach].label
                }
              }
            }
            // 遍历地域对象区级 找到对应id做name的存储
            if (labelList.length >= 6) {
              for (let countyEach = 0; countyEach < labelList[5].areaList.length; countyEach++) {
                if (labelList[5].areaList[countyEach].labelId === labelList[5].labelIdEUI) {
                  data.value.countyId = labelList[5].areaList[countyEach].labelId
                  data.value.county = labelList[5].areaList[countyEach].label
                }
              }
            }
          } else if (labelList[1].type === 'ENUM') {
            let valuePre = []
            // 枚举
            for (let k = 0; k < labelList[3].value.length; k++) {
              // 遍历value
              let valueItem = {}
              valueItem.value = labelList[3].value[k]
              if (labelList[1].labelId === 200109 || labelList[1].labelId === 200102 || labelList[1].labelId === 300102) {
                // 枚举查询类的enum
                for (let l = 0; l < labelList[3].list.length; l++) {
                  // 遍历list
                  if (labelList[3].value[k] === labelList[3].list[l].code) {
                    // 匹配 name
                    valueItem.name = labelList[3].list[l].value
                  }
                }
              } else {
                // 商品类的enum
                for (let l = 0; l < labelList[3].list.length; l++) {
                  // 遍历list
                  if (labelList[3].value[k] === labelList[3].list[l].productId) {
                    // 匹配 name
                    valueItem.name = labelList[3].list[l].productName
                  }
                }
              }
              valuePre.push(valueItem)
            }
            data.value = valuePre
          } else if (labelList[1].type === 'DATE') {
            // date 的第四级
            if (labelList[2].condition === 'BETWEEN') {
              data.value = [new Date(labelList[3].value[0]).getTime(), new Date(labelList[3].value[1]).getTime()]
            } else {
              data.value = new Date(labelList[3].value).getTime()
            }
          } else {
            // number 的第四级
            data.value = labelList[3].value
          }
        }
      } else if (labelList[2].condition === 'TRUE') {
        data.value = true
      } else if (labelList[2].condition === 'FALSE') {
        data.value = false
      }
      return data
    },
    goBack () {
      this.$router.push({path: '/userGroupManagement/index'})
    }
  }
}
</script>
<style scoped>
.areaA{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 15px 0px;
}
.areaB{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 15px 0px;
}
.areaTitleAB{
  color: #222;
  font-size: 14px;
}
.areaABInputAB{
  width: 300px;
}
.areaBInputTips{
  color: #ccc;
  font-size: 14px;
  margin-top: 10px;
}
/* ************** */
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
