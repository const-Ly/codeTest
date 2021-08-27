// 浮层
const business = () => import('../routes/newOperatNav/businessType')

export default {
  path: '/businessType',
  name: 'businessType',
  meta: {
    title: "业务类型配置",
    pathName: '业务类型配置'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '/',
      meta: {
        title: "业务类型配置"
      },
      component: business
    }
  ]
}