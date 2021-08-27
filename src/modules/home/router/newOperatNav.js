// 浮层
const newOperatNav = () => import('../routes/newOperatNav')
const log = () => import('../routes/newOperatNav/log')

export default {
  path: '/newOperatNav',
  name: 'newOperatNav',
  meta: {
    pathName: '新运营导航管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '/',
      meta: {
        title: "新运营导航管理"
      },
      component: newOperatNav
    },
    {
      path: '/log',
      name: 'log',
      meta: {
        title: "运营导航日志",
        pathName: '运营导航日志'
      },
      component: log
    }
  ]
}
