import Vue from 'vue'
import Router from 'vue-router'
import services from '@/services'

// 黑名单设置
import blackList from './blackList'
// 新手特权金
import novice from './novice'
// 步数换特权金
import stepsPrivilege from './stepsPrivilege'
// 特权金任务
import task from './task.js'
// 挂接特权金
import hook from './hook.js'
// 特权金素材
import material from './material.js'
// 特权金红包配置及素材
import redbagConf from './redbagConf'
// 关联数据标签
import dataLabel from './dataLabel.js'
// 道具卡 
import itemCard from './itemCard.js'
// 立减金包
import reduceMoneyBag from './reduceMoneyBag.js'
// 可抢金币
import robGoldConfig from './robGoldConfig.js'
// 津贴设置
import setAllowance from './setAllowance.js'

Vue.use(Router)

const router = new Router({
  routes: [
    blackList,
    novice,
    stepsPrivilege,
    task,
    hook,
    material,
    redbagConf,
    dataLabel,
    itemCard,
    reduceMoneyBag,
    robGoldConfig,
    setAllowance
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
