// 素材组
const materialGroup = () => import('../routes/materialGroup')
const log = () => import('../routes/materialGroup/log')
const edit = () => import('../routes/materialGroup/edit')


export default {
  path: '/materialGroup',
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        pathName: '素材组'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:'素材组'
          },
          component: materialGroup
        }, {
          path: 'edit/:id',
          meta:{
            title: '编辑',
            pathName: '编辑'
          },
          component: edit
        }, {
          path: 'log/:id',
          meta:{
            title: '日志',
            pathName: '日志'
          },
          component: log
        }
      ]
    }
  ]
}