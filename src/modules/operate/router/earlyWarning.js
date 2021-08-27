// 此文件为路由配置
import earlyWarning from '../routes/earlyWarning'
import edit from '../routes/earlyWarning/edit'
import whiteList from '../routes/earlyWarning/whiteList'

export default {
  path: '/earlyWarning',
  meta: {
    pathName: '地震预警'
  },
  component: {
    render: h => h('router-view', '')
  },
  children: [{
      path: '',
      meta: {
        title: '地震预警'
      },
      component: earlyWarning
    },
    {
      path: 'add',
      meta: {
        pathName: '添加预警',
        type: 'add'
      },
      component: edit
    },
    {
      path: 'edit/:id',
      meta: {
        pathName: '重发预警',
        type: 'edit'
      },
      component: edit
    },
    {
      path: 'whiteList',
      meta: {
        pathName: '管理白名单',
      },
      component: whiteList
    },
  ]
}
