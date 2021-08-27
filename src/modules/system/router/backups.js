// 备份数据
const backups = () => import('../routes/backups')


export default {
  path: '/backups',
  name: 'backups',
  meta: {
    pathName: '备份数据'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"备份数据"
      },
      component: backups
    }
  ]
}
