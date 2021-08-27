// 新客特任务
const task = () => import('../routes/task')
const action = () => import('../routes/task/action')
const view = () => import('../routes/task/view')



export default {
  path: '/task',
  name: 'task',
  meta: {
    pathName: '特权金任务'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"特权金任务"
      },
      component: task
    },{
      path: 'action',
      meta:{
        pathName:"添加"
      },
      component: action
    },{
      path: 'view/:id',
      meta:{
        pathName:"查看"
      },
      component: view
    }
  ]
}
