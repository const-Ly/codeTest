import list from '../routes/liveChannel'
import edit from '../routes/liveChannel/edit'

export default {
  path: '/liveChannel',
  name: 'liveChannel',
  meta: {
    pathName: '直播频道'
  },
  component: { render: h => h('router-view', '') },
  children: [
    {
      path: '',
      meta: {
        title: '直播频道'
      },
      component: list
    }, {
      path: '/liveChannel/add',
      meta: {
        type: 'add',
        pathName: '添加'
      },
      component: edit
    }, {
      path: '/liveChannel/edit/:id',
      meta: {
        type: 'edit',
        pathName: '编辑'
      },
      component: edit
    }, {
      path: '/liveChannel/details/:id',
      meta: {
        type: 'detail',
        pathName: '查看'
      },
      component: edit
    }
  ]
}
