// 津贴设置
const setAllowance = () => import('../routes/setAllowance')



export default {
  path: '/setAllowance',
  name: 'setAllowance',
  meta: {
    pathName: '津贴设置'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"津贴设置"
      },
      component: setAllowance
    }
  ]
}
