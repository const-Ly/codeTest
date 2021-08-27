// 商家提报审核
const secondAudit = () => import('../routes/secondAudit')


export default {
  path: '/secondAudit',
  name: 'secondAudit',
  meta: {
    pathName: '活动提报二审 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"活动提报二审"
      },
      component: secondAudit
    }
  ]
}
