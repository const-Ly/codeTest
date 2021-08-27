// 活动商品
const activityProduct = () => import('../routes/activityProduct')


export default {
  path: '/activityProduct',
  name: 'activityProduct',
  meta: {
    pathName: '活动商品'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"活动商品"
      },
      component: activityProduct
    }
  ]
}
