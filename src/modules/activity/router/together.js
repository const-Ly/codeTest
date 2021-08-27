// 一起拼活动
const together = () => import('../routes/together')
// 一起拼活动添加商品
const addPro = () => import('../routes/together/addPro')

export default {
  path: '/together',
  name: 'together',
  meta: {
    pathName: '一起拼活动'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"一起拼活动"
      },
      component: together
    },{
      path: 'add',
      meta:{
      	pathName:"添加"
      },
      component: addPro
    }
  ]
}
