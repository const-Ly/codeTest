// 专题管理
const specialList = () => import('../routes/specialManagement/index')
const add = () => import('../routes/specialManagement/dd')

export default {
  path: '/specialManagement',
  name: 'specialManagement',
  meta: {
    pathName: '专题管理'
  },
  component: {
    render: h => h('router-view', '')
  },
  children: [{
    path: '/specialManagement',
    meta: {
      title: ''
    },
    redirect: '/specialManagement/index'
  }, {
    path: '/specialManagement/index',
    meta: {
      pathName: ''
    },
    component: specialList
  }, {
    path: '/specialManagement/add',
    meta: {
      pathName: '添加'
    },
    component: add
  }, {
    path: '/specialManagement/edit/:type/:id',
    meta: {
      pathName: '编辑'
    },
    component: add
  }, {
    path: '/specialManagement/copy/:type/:id',
    meta: {
      pathName: '复制'
    },
    component: add
  }]
}
