
// 活动类目配置
const activitieCategory = () => import('../routes/deployManage/activitieCategory')
// 活动类目批量配置
const activitieCategoryBatch = () => import('../routes/deployManage/activitieCategory/activitieCategoryBatch')
// 活动选品配置
const activitieSelection = () => import('../routes/deployManage/activitieSelection')



export default {
  path: '/deployManage',
  name: 'deployManage',
  meta: {
    pathName: '配置管理 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"配置管理"
      },
      redirect:'/deployManage/activitieCategory'
    },{
      path: 'activitieCategory',
      meta:{
        pathName:"活动类目配置"
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:"活动类目配置"
          },
          component: activitieCategory
        },{
          path: 'activitieCategoryBatch',
          meta:{
            pathName:"批量设置"
          },
          component: activitieCategoryBatch
        }
      ]
    },{
      path: 'activitieSelection',
      meta:{
      	pathName:"活动选品配置"
      },
      component: activitieSelection
    }
  ]
}
