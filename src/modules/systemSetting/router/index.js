import Vue from 'vue'
import Router from 'vue-router'
import services from '@/services'

// App下载页面静态化
import download from './download'
// M站管理
import mManagement from './mManagement'
// 组件配置
import moduleSetting from './moduleSetting'
// 服务协议变更
import agreementCMS from './agreementCMS'
// App瘦身
import appThinning from './appThinning'
// 弹窗管理
import dialogManagement from './dialogManagement'
// 旧弹窗管理
import dialogManagementOld from './dialogManagementOld'
// 任务中心
import taskCenter from './taskCenter'
// 弹窗管理（新）
import popupManagement from './popupManagement'
// 用户组管理
import userGroupManagement from './userGroupManagement'
// 专题管理
import specialManagement from './specialManagement'

// 安卓版本SQL执行
import androidSqlExecute from './androidSqlExecute'

Vue.use(Router)

const router = new Router({
  routes: [
    download,
    mManagement,
    moduleSetting,
    agreementCMS,
    appThinning,
    dialogManagement,
    dialogManagementOld,
    taskCenter,
    androidSqlExecute,
    popupManagement,
    userGroupManagement,
    specialManagement
  ]
})

// router.beforeResolve((to, from, next) => {
// document.title = to.meta.title || to.meta.pathName
// next()
// })

router.beforeEach((to, from, next) => {
  // 给指定的页面添加刷新拦截提示
  if (to.path.indexOf('/luckDrawList/add_') > -1 || to.path.indexOf('/luckDrawList/edit_') > -1 || to.path.indexOf('/specialManagement/add') > -1) { // 在 【创建/编辑】抽奖活动的时候移除刷新拦截提示
    window.onbeforeunload = function (ev) {
      ev = ev || window.event
      ev.returnValue = '刷新页面可能造成已保存的信息丢失'
      return '刷新页面可能造成已保存的信息丢失'
    }
  } else {
    window.onbeforeunload = null
  }

  // 如果想去的页面，设置了meta.notAuth  就不会鉴权
  if (to.matched.some(record => record.meta.notAuth)) {
    next()
  } else {
    // 鉴权
    services.auth().then(res => {
      next()
    }, _ => {
      next()
      // 跳转登录页面（非vue路由页面, 开发环境的webpack server不支持与非server环境的页面交互）
      window.location.href = 'http://cms.biyao.com/index.html?' + to.fullPath
    })
  }
})

export default router
