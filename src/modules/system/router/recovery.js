// 恢复数据
const recovery = () => import('../routes/recovery')



export default {
  path: '/recovery',
  name: 'recovery',
  meta: {
    pathName: '恢复数据'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"恢复数据"
      },
      component: recovery
    }
  ]
}
