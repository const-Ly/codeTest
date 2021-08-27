
// 防薅配置
const bonushunter = () => import('../routes/bonushunter')

export default {
  path: '/bonushunter',
  meta: {
    pathName: '防薅配置'
  },
  name: 'bonushunter',
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"防薅配置"
      },
      component: bonushunter
    }
  ]
}