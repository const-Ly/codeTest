// 礼物
const gift = () => import('../routes/gift')

export default {
  path: '/gift',
  name: 'gift',
  meta: {
    pathName: '礼物'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"礼物"
      },
      component: gift
    }
  ]
}
