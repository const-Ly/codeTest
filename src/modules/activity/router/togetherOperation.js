// 一起拼活动
const togetherOperation = () => import('../routes/togetherOperation')

export default {
  path: '/togetherOperation',
  name: 'togetherOperation',
  meta: {
    pathName: '一起拼运营位'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"一起拼运营位"
      },
      component: togetherOperation
    }
  ]
}
