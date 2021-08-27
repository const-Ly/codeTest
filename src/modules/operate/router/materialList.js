// 素材组管理
const materialList = () => import('../routes/materialList')
const log = () => import('../routes/materialList/log')
const edit = () => import('../routes/materialList/edit')

export default {
  path: '/materialList',
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        pathName: '素材组管理'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:'素材组管理'
          },
          component: materialList
        }, {
          path: 'log/:id',
          meta:{
            title: '日志',
            pathName: '日志'           
          },
          component: log
        }, {
          path: 'edit/:id',
          meta:{
            title: '管理',
            pathName: '管理'           
          },
          component: edit
        }, {
          path: 'add',
          meta:{
            title: '添加',
            pathName: '添加'           
          },
          component: edit
        }
      ]
    }
  ]
}