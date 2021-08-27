// 可抢金币
const robGoldConfig = () => import('../routes/robGoldConfig')



export default {
  path: '/robGoldConfig',
  name: 'robGoldConfig',
  meta: {
    pathName: '可抢金币'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"可抢金币"
      },
      component: robGoldConfig
    }
  ]
}
