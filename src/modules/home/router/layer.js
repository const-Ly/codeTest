// 浮层
const layer = () => import('../routes/layer')



export default {
  path: '/layer',
  name: 'layer',
  meta: {
    pathName: '顶部浮层'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"顶部浮层"
      },
      component: layer
    }
  ]
}
