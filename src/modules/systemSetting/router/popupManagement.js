// 弹窗管理列表页
const popupList = () => import('../routes/popupManagement/index')
// 添加
const add = () => import('../routes/popupManagement/add')


export default {
  path: '/popupManagement',
  meta: {
    pathName: '弹窗管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '/popupManagement',
      meta: {
        title: ''
      },
      redirect: '/popupManagement/index'
    }, {
      path: '/popupManagement/index',
      meta: {
        pathName: ''
      },
      component: popupList
    },{
    path: '/popupManagement/:type',
    meta: {
      pathName: '添加'
    },
    component: add
  }, {
    path: '/popupManagement/:type/:id',
    meta: {
      pathName: '编辑'
    },
    component: add
  }, {
    path: '/popupManagement/:type/details/:id',
    meta: {
      pathName: '查看'
    },
    component: add
  }]
}
