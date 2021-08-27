// 新客特任务
const hook = () => import('../routes/hook')
const list = () => import('../routes/hook/list')
const bindCard = () => import('../routes/hook/bindCard')



export default {
  path: '/hook',
  name: 'hook',
  meta: {
    pathName: '挂接模块'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"挂接模块"
      },
      component: hook
    }, {
      path: 'list/:id',
      meta:{
        pathName:"已关联任务"
      },
      component: list
    }, {
      path: 'card/:id',
      meta:{
        pathName: '已关联道具'
      },
      component: bindCard
    }
  ]
}
