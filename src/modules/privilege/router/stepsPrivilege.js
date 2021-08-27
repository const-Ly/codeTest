// 新客特权金
const stepsPrivilege = () => import('../routes/stepsPrivilege')


export default {
  path: '/stepsPrivilege',
  name: 'stepsPrivilege',
  meta: {
    pathName: '步数换特权金'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"步数换特权金"
      },
      component: stepsPrivilege
    }
  ]
}
