// 推送专题
const topic = () => import('../routes/pushTopic')
const edit = () => import('../routes/pushTopic/edit')
const log = () => import('../routes/pushTopic/log')

export default {
  path: '/pushTopic',
  name: 'pushTopic',
  meta: {
    pathName: '推送专题'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta: { title: '推送专题' },
      component: topic
    },
    {
      path: 'added',
      name: 'added',
      meta: { title: '添加专题', pathName: '添加专题' },
      component: edit
    },
    {
      path: 'edit/:id',
      name: 'edit',
      meta: { title: '编辑专题', pathName: '编辑专题' },
      component: edit
    },
    {
      path: 'log/:id',
      name: 'log',
      meta: { title: '日志', pathName: '日志' },
      component: log
    }
  ]
}
