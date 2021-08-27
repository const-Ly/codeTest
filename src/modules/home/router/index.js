import Vue from 'vue'
import Router from 'vue-router'
import services from '@/services'

// 顶部浮层
import layer from './layer'
// M站首页弹层底图
import baseMap from './baseMap'
// 首页运营导航管理
import newOperatNav from './newOperatNav'
// 业务类型
import business from './business'
// 推送专题
import pushTopic from './pushTopic'
// 推荐运营位
import recommendOperate from './recommendOperate'
// 首页运营位
import homeOperate from './homeOperate'
// 公号投放推荐商品
import publicPutOn from './publicPutOn'
// 直播频道
import liveChannel from './liveChannel'
// 首页轮播
import homeBanner from './homeBanner'

Vue.use(Router)

const router = new Router({
  routes: [
    layer,
    baseMap,
    newOperatNav,
    business,
    pushTopic,
    recommendOperate,
    homeOperate,
    publicPutOn,
    liveChannel,
    homeBanner
  ]
})

// router.beforeResolve((to, from, next) => {
//	document.title = to.meta.title || to.meta.pathName
//	next()
// })

router.beforeEach((to, from, next) => {
  // 如果想去的页面，设置了meta.notAuth  就不会鉴权
  if (to.matched.some(record => record.meta.notAuth)) {
    next()
  } else {
    // 鉴权
    services.auth().then(res => {
      next()
    }, err => {
      next()
      // 跳转登录 路由
      // next({
      //   path: '/login',
      //   query: { redirect: to.fullPath }
      // })
      //跳转登录页面（非vue路由页面, 开发环境的webpack server不支持与非server环境的页面交互）
      window.location.href = 'http://cms.biyao.com/index.html?' + to.fullPath
    })
  }
})

export default router
