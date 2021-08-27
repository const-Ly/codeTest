
// 调用助力设置
const boosterConfig = () => import('../routes/boosterConfig')
// 查看场景任务
const boosterConfigInfo = () => import('../routes/boosterConfig/info')

export default {
  path: '/boosterConfig',
  meta: {
    pathName: '调用助力设置'
  },
  name: 'boosterConfig',
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta: {
        title: '调用助力设置'
      },
      component: boosterConfig
    },
    {
      path: 'info',
      meta:{
        pathName: '查看场景任务'
      },
      component: boosterConfigInfo
    }
  ]
}