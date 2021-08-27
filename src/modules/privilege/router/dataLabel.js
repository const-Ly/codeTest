// 新客特任务
const dataLabel = () => import('../routes/dataLabel')



export default {
  path: '/dataLabel',
  name: 'dataLabel',
  meta: {
    pathName: '关联数据标签'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"关联数据标签"
      },
      component: dataLabel
    }
  ]
}
