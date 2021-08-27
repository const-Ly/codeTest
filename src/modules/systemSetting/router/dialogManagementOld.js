const management = () => import('../routes/dialogManagementOld')
const newVisitorEdit = () => import('../routes/dialogManagementOld/newVisitorEdit')
const oldNoLoginVisitorEdit = () => import('../routes/dialogManagementOld/oldNoLoginVisitorEdit')
const oldLoginVisitorEdit = () => import('../routes/dialogManagementOld/oldLoginVisitorEdit')
// 老客订单相关 编辑页
const oldClientsOrder = () => import('../routes/dialogManagementOld/oldClientsOrder')
// 日志页
const log = () => import('../routes/dialogManagementOld/log')


export default {
  path: '/dialogManagementOld',
  meta: {
    pathName: '旧弹窗管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta: {
      	title: '旧弹窗管理'
      },
      component: management
    },
    {
      path: 'log/:id/:name',
      meta: {
        title: '日志',
        pathName: '日志'
      },
      component: log
    },
    {
      path: 'oldClientsOrder',
      meta:{
        title: '老客订单相关',
        pathName: '老客订单相关'
      },
      component: oldClientsOrder
    },
    {
      path: 'newVisitorEdit',
      meta:{
        title: '首页新访客',
        pathName: '首页新访客'
      },
      component: newVisitorEdit
    },
    {
      path: 'oldNoLoginVisitorEdit',
      meta: {
        title: '首页未注册老访客',
        pathName: '首页未注册老访客'
      },
      component: oldNoLoginVisitorEdit
    },
    {
      path: 'oldLoginVisitorEdit',
      meta: {
        title: '首页已注册老访客',
        pathName: '首页已注册老访客'
      },
      component: oldLoginVisitorEdit
    }
  ]
}