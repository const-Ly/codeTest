
// 彩蛋配置
const eggs = () => import('../routes/eggs')

export default {
  path: '/eggs',
  meta: {
    pathName: '彩蛋配置'
  },
  name: 'eggs',
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"彩蛋配置"
      },
      component: eggs
    }
  ]
}
