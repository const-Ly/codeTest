
// 步数换设置
const stepsExchange = () => import('../routes/stepsExchange')


export default {
  path: '/stepsExchange',
  name: 'stepsExchange',
  meta: {
    pathName: '步数换'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"步数换"
      },
      component: stepsExchange
    }
  ]
}