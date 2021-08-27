// 任务中心列表页
const taskCenterList = () => import('../routes/taskCenter/index')
// 任务中心添加
const taskCenterAdd = () => import('../routes/taskCenter/taskCenterAdd')
// 任务中心日志
const taskCenterLog = () => import('../routes/taskCenter/taskCenterLog')
// 任务中心 详情
const taskCenterLogDetails = () => import('../routes/taskCenter/taskCenterLogDetails')
// 任务中心设置
const setTask = () => import('../routes/taskCenter/setTask')

export default {
  path: '/taskCenter',
  name: 'taskCenter',
  meta: {
    pathName: '任务中心'
  },
  component: {
    render: h => h('router-view', '')
  },
  children: [{
    path: '',
    meta: {
      title: '任务中心'
    },
    redirect: '/taskCenter/index'
  }, {
    path: '/taskCenter/index',
    meta: {
      pathName: '列表'
    },
    component: taskCenterList
  }, {
    path: '/taskCenter/taskCenterAdd',
    meta: {
      pathName: '添加'
    },
    component: taskCenterAdd
  }, {
    path: '/taskCenter/taskCenterEdit/:editId',
    meta: {
      pathName: '编辑'
    },
    component: taskCenterAdd
  }, {
    path: '/taskCenter/setTask',
    meta: {
      pathName: '任务设置'
    },
    component: setTask
  }, {
    path: '/taskCenter/taskCenterLogDetails/:taskId',
    meta: {
      pathName: '日志详情'
    },
    component: taskCenterLogDetails
  }, {
    path: '/taskCenter/taskCenterLog/:taskId',
    meta: {
      pathName: '任务日志'
    },
    component: taskCenterLog
  }]
}
