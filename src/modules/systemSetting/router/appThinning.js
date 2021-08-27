// App瘦身
const appThinning = () => import('../routes/appThinning')
// 文件管理
const fileManagement = () => import('../routes/appThinning/fileManagement.vue')
// 版本管理
const versionManagement = () => import('../routes/appThinning/versionManagement.vue')

export default {
  path: '/appThinning',
  meta: {
    pathName: 'App瘦身'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title: 'App瘦身'
      },
      component: appThinning,
      redirect: '/appThinning/fileManagement'
    },
    {
      path: 'fileManagement',
      meta:{
        title: '文件管理',
        pathName: '文件管理'
      },
      component: fileManagement
    },
    {
      path: 'versionManagement',
      meta:{
        title: '版本管理',
        pathName: '版本管理'
      },
      component: versionManagement
    },
  ]
}