// 活动提报二审
const merchantsAudit = () => import('../routes/merchantsAudit')


export default {
  path: '/merchantsAudit',
  name: 'merchantsAudit',
  meta: {
    pathName: '商家提报审核 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"商家提报审核"
      },
      component: merchantsAudit
    }
  ]
}
