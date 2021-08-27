// 新客特权金
const novice = () => import('../routes/novice')
const addPro = () => import('../routes/novice/addPro')


export default {
  path: '/novice',
  name: 'novice',
  meta: {
    pathName: '新手特权金'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"新手特权金"
      },
      component: novice
    },{
      path: 'add',
      meta:{
        pathName:"添加"
      },
      component: addPro
    }
  ]
}
