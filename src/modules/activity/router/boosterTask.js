
// 好友助力任务
const boosterTask = () => import('../routes/boosterTask')
// 助力任务——日志
const boosterTaskLogs = () => import('../routes/boosterTask/logs')
// 助力任务——添加
const boosterTaskAdd = () => import('../routes/boosterTask/add')
// 助力任务——详情
const boosterTaskDetail = () => import('../routes/boosterTask/detail')
// 助力任务——修改
const boosterTaskModify = () => import('../routes/boosterTask/modify')

export default {
  path: '/boosterTask',
  meta: {
    pathName: '好友助力任务'
  },
  name: 'boosterTask',
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"好友助力任务"
      },
      component: boosterTask
    },
    {
      path: 'add',
      meta:{
      	pathName: '添加助力任务'
      },
      component: boosterTaskAdd
    },
    {
      path: 'logs',
      meta: {
        pathName: '操作日志'
      },
      component: boosterTaskLogs
    },
    {
      path: 'detail/:id',
      meta: {
        pathName: '查看助力任务'
      },
      component: boosterTaskDetail
    },
    {
      path: 'modify/:id',
      meta: {
        pathName: '修改助力任务'
      },
      component: boosterTaskModify
    }
  ]
}
