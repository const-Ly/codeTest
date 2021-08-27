// 新手专享
const newcustomer = () => import('../routes/newcustomer')


export default {
  path: '/newcustomer',
  name: 'newcustomer',
  meta: {
    pathName: '新手专享 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"新手专享"
      },
      component: newcustomer
    }
  ]
}
