import Vue from 'vue'
import Router from 'vue-router'
import services from '@/services'
 
// 备份数据
import backups from './backups'
// 恢复数据
import recovery from './recovery'

Vue.use(Router)

const router = new Router({
  routes: [
    backups,
    recovery
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
