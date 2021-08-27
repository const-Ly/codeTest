// 浮层
const rule = () => import('../routes/rule')
const Add = () => import('../routes/rule/add')


export default {
  path: '/rule',
  meta: {
    pathName: '规则配置'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"规则配置"
      },
      component: rule
    },{
      path: 'add',
      meta:{
        pathName:"添加"
      },
      component: Add
    }
  ]
}
