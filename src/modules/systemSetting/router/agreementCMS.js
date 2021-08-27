// 服务协议CMS
const agreementCMS = () => import('../routes/agreementCMS')
// 必要隐私政策
const privacyPolicy = () => import('../routes/agreementCMS/privacyPolicy')
// 用户服务协议 
const serviceAgreement = () => import('../routes/agreementCMS/serviceAgreement')
// 账号注销须知
const accountCancelNotice = () => import('../routes/agreementCMS/accountCancelNotice')
// 协议生效弹窗
const effectiveMaskConfig = () => import('../routes/agreementCMS/effectiveMaskConfig')

export default {
  path: '/agreementCMS',
  meta: {
    pathName: '用户协议'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"服务协议CMS"
      },
      component: agreementCMS,
      redirect: '/agreementCMS/privacyPolicy'
    },
    {
      path: 'privacyPolicy',
      meta:{
        title:"必要隐私",
        pathName: '必要隐私'
      },
      component: privacyPolicy
    },
    {
      path: 'serviceAgreement',
      meta:{
        title:"用户协议",
        pathName: '用户协议'
      },
      component: serviceAgreement
    },
    {
      path: 'accountCancelNotice',
      meta:{
        title:"账号注销",
        pathName: '账号注销'
      },
      component: accountCancelNotice
    },
    {
      path: 'effectiveMaskConfig',
      meta:{
        title:"协议生效",
        pathName: '协议生效'
      },
      component: effectiveMaskConfig
    },
  ]
}