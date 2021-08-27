// import Vuex from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

import demo from './modules/demo'
// 特权金道具卡添加，回馈卡
import rewardsCardRightsGroup from './modules/itemCard/rewardsCardRightsGroup'
// 特权金，立减金包
import reduceMoneyBag from './modules/reduceMoneyBag'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    demo,
    rewardsCardRightsGroup,
    reduceMoneyBag
  },
  state: {
    loadingTime: 0,
    loading: false,
    loadingText: '正在加载...',
    textCont: 'store 存储的 text',
    breadcrumbBtn: {},
    projectId: ''
  },
  getters: {
    menuName: () => '特权金',
    textCont: state => state.textCont,
    breadcrumbBtn: state => state.breadcrumbBtn
  },
  mutations: {
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
    },
    setProjectId (state, id) {
      state.projectId = id
    }
  },
  actions: {

  }
})

// 方便 axios 调用
Vue.prototype.$store = store

export default store
