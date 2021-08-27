// 阶梯团活动列表
const list = () => import('../routes/ladderGroup/activity')
const add = () => import('../routes/ladderGroup/activity/add')
const edit = () => import('../routes/ladderGroup/activity/edit')
const view = () => import('../routes/ladderGroup/activity/view')
const secondInstance = () => import('../routes/ladderGroup/secondInstance')
const material = () => import('../routes/ladderGroup/material')


export default {
  path: '/ladderGroup',
  name: 'ladderGroup',
  meta: {
    pathName: '阶梯团'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: 'list',
      meta:{
      	pathName: '阶梯团活动'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title: '阶梯团活动'
          },
          component: list
        },{
          path: 'add',
          meta:{
            pathName: '添加'
          },
          component: add
        },{
          path: 'view/:id',
          meta:{
            pathName: '查看'
          },
          component: view
        },{
          path: 'edit/:id',
          meta:{
            pathName: '编辑'
          },
          component: edit
        }
      ]
    },{
      path: 'secondInstance',
      meta:{
        pathName: '阶梯团活动二审'
      },
      component: secondInstance
    },{
      path: 'material',
      meta:{
        pathName: '阶梯团配置素材'
      },
      component: material
    }
  ]
}
