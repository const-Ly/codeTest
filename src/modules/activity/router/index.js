import Vue from 'vue'
import Router from 'vue-router'
import services from '@/services'

// 好友助力任务
import boosterTask from './boosterTask'
// 助力权益列表
import boosterPrivilege from './boosterPrivilege'
// 调用助力设置
import boosterConfig from './boosterConfig'
// app激活权益金
import appActiveRights from './appActiveRights'

//一起拼活动
import together from './together'
// 活动商品
import activityProduct from './activityProduct'
// 商家提报审核
import merchantsAudit from './merchantsAudit'
// 活动提报二审
import secondAudit from './secondAudit'

// 步数换
import stepsExchange from './stepsExchange'
//抽奖
import luckDraw from './luckDraw'
// 一起拼运营位
import togetherOperation from './togetherOperation'
// 抢返现
import cashback from './cashback'
// 咖啡馆
import cafe from './cafe'
// 颜值
import faceScore from './faceScore'
// 阶梯团
import ladderGroup from './ladderGroup'
// 新手专享
import newcustomer from './newcustomer'
// 配置管理
import deployManage from './deployManage'
// 彩蛋配置
import eggs from './eggs'
// 礼物
import gift from './gift'
// 每日上新
import dailyNewGoods from './dailyNewGoods'
// 梦工厂商品池
import dreamWorksPool from './dreamWorksPool'



Vue.use(Router)

const router = new Router({
  routes: [
    boosterTask,
    boosterPrivilege,
    boosterConfig,
    appActiveRights,
    luckDraw,
    together,
    merchantsAudit,
    stepsExchange,
    secondAudit,
    activityProduct,
    togetherOperation,
    faceScore,
    ladderGroup,
    cashback,
    cafe,
    newcustomer,
    deployManage,
    eggs,
    gift,
    dailyNewGoods,
    dreamWorksPool
  ]
})

// router.beforeResolve((to, from, next) => {
//	document.title = to.meta.title || to.meta.pathName
//	next()
// })

router.beforeEach((to, from, next) => {
  //给指定的页面添加刷新拦截提示
  if(to.path.indexOf('/luckDrawList/add_') > -1 || to.path.indexOf('/luckDrawList/edit_')>-1){//在 【创建/编辑】抽奖活动的时候移除刷新拦截提示
    window.onbeforeunload  = function(ev) {
      ev = ev || window.event;
      ev.returnValue = '刷新页面可能造成已保存的信息丢失';
      return "刷新页面可能造成已保存的信息丢失";
    }
  }else{
    window.onbeforeunload = null;
  }

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
