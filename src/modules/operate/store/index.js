// import Vuex from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

import formConf from './formConf'

// 小程序订阅号
import appletsSubscribeMessages from './appletsSubscribeMessages'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    appletsSubscribeMessages
  },
  state: {
    loadingTime: 0,
    loading: false,
    loadingText: '正在加载...',
    textCont: 'store 存储的 text',
    breadcrumbBtn: {},
    fromConfReadonly: false
  },
  getters: {
    menuName: () => '运营市场管理',
    textCont: state => state.textCont,
    breadcrumbBtn: state => state.breadcrumbBtn,
    formMapList: () => ([ // 表单映射表
      { type: '01', name: '单选开关', componentShow: 'RadioShow', componentConf: 'RadioConf', initStr: formConf['01']},
      { type: '02', name: '单行文本', componentShow: 'InputShow', componentConf: 'InputConf', initStr: formConf['02'] },
      { type: '03', name: '多行文本', componentShow: 'TextareaShow', componentConf: 'TextareaConf', initStr: formConf['03'] },
      { type: '04', name: '整数', componentShow: 'IntegerShow', componentConf: 'IntegerConf', initStr: formConf['04'] },
      { type: '05', name: '小数', componentShow: 'DecimalShow', componentConf: 'DecimalConf', initStr: formConf['05'] },
      { type: '06', name: '图片', componentShow: 'ImageShow', componentConf: 'ImageConf', initStr: formConf['06'] },
    ]),
    fromConfReadonly: state => state.fromConfReadonly
  },
  mutations: {
    updateFormReadonlyRole (state, status) {
      state.fromConfReadonly = status
    },
    showLoading (state) {
      state.loadingText = '正在加载...'
      state.loading = true
    },
    importLoading (state) {
      state.loadingText = '数据导入中...'
      state.loading = true
    },
    hideLoading (state) {
      let endTime = new Date().getTime()
      let interval = 500 - (endTime - state.loadingTime)
      if (interval < 0) {
        state.loading = false
      } else {
        setTimeout(() => {
          state.loading = false
        }, interval)
      }
    },
    updateText (state, params) {
      state.textCont = params
    },
    updateBreadcrumbBtn (state, newBreadcrumbBtn) {
      state.breadcrumbBtn = newBreadcrumbBtn
    }
  },
  actions: {

  }
})

// 方便 axios 调用
Vue.prototype.$store = store

export default store
