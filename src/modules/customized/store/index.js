// import Vuex from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    breadcrumbBtn: {},
    loadingTime: 0,
    loading: false,
    loadingText: '正在加载...'
  },
  getters: {
    menuName: () => '定制管理',
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
  },
  actions: {

  }
})

// 方便 axios 调用
Vue.prototype.$store = store

export default store
