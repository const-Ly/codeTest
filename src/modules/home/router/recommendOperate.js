// 推送专题
const index = () => import('../routes/recommendOperate')
const add = () => import('../routes/recommendOperate/add')

export default {
  path: '/recommendOperate',
  name: 'recommendOperate',
  meta: {
    pathName: '推荐运营位'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta: { title: '推荐运营位' },
      component: index
    },
    {
      path: 'add',
      meta: { title: '推荐运营位', pathName: '添加' },
      component: add
    },
    {
      path: 'edit/:id',
      meta: { title: '推荐运营位', pathName: '编辑' },
      component: add
    }
  ]
}
