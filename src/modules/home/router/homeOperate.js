// 首页运营位
const index = () => import('../routes/homeOperate')
const add = () => import('../routes/homeOperate/add')

export default {
  path: '/homeOperate',
  name: 'homeOperate',
  meta: {
    pathName: '首页运营位'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta: { title: '首页运营位' },
      component: index
    },
    {
      path: 'add',
      meta: { title: '添加', pathName: '添加' },
      component: add
    },
    {
      path: 'copy/:type/:id',
      meta: { title: '复制', pathName: '复制' },
      component: add
    },
    {
      path: 'edit/:type/:id',
      meta: { title: '编辑', pathName: '编辑' },
      component: add
    }
  ]
}
