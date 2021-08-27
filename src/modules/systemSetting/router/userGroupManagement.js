// 用户组管理
const userGroupList = () => import('../routes/userGroupManagement/index')
const add = () => import('../routes/userGroupManagement/add')
const log = () => import('../routes/userGroupManagement/log')
const relation = () => import('../routes/userGroupManagement/relation')

export default {
  path: '/userGroupManagement',
  name: 'userGroupManagement',
  meta: {
    pathName: '用户组'
  },
  component: {
    render: h => h('router-view', '')
  },
  children: [{
    path: '/userGroupManagement',
    meta: {
      title: ''
    },
    redirect: '/userGroupManagement/index'
  }, {
    path: '/userGroupManagement/index',
    meta: {
      pathName: ''
    },
    component: userGroupList
  }, {
    path: '/userGroupManagement/add/:type',
    meta: {
      pathName: '添加'
    },
    component: add
  }, {
    path: '/userGroupManagement/edit/:type/:id',
    meta: {
      pathName: '编辑'
    },
    component: add
  }, {
    path: '/userGroupManagement/log/:id',
    meta: {
      pathName: '日志'
    },
    component: log
  }, {
    path: '/userGroupManagement/relation/:id',
    meta: {
      pathName: '关联弹窗'
    },
    component: relation
  }]
}
