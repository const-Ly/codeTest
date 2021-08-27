import Vue from 'vue'
import Router from 'vue-router'
import services from '@/services'

// 素材管理
import materialList from './materialList'
// 素材组
import materialGroup from './materialGroup'
// 地震预警
import earlyWarning from './earlyWarning'
// 小程序订阅号
import appletsSubscribeMessages from './appletsSubscribeMessages'
// 广告位管理
import advertisingSpace from './advertisingSpace'

Vue.use(Router)

const router = new Router({
  routes: [
    materialList,
    materialGroup,
    earlyWarning,
    appletsSubscribeMessages,
    advertisingSpace
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
