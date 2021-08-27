// 浮层
const share = () => import('../routes/share')
const detail = () => import('../routes/share/detail')
const setShareInfo = () => import('../routes/share/setShareInfo')


export default {
  path: '/share',
  meta: {
    pathName: '分享配置'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"分享配置"
      },
      component: share
    },{
      path: 'detail/:id',
      meta:{
        pathName:" "
      },
      component: detail
    },{
      path: 'setShareInfo',
      meta:{
        pathName:"分享方式设置"
      },
      component: setShareInfo
    }
  ]
}
