// 新客特权金
const blacklist = () => import('../routes/blacklistSet')
const addPro = () => import('../routes/blacklistSet/addPro')
const history = () => import('../routes/blacklistSet/history')
const detail = () => import('../routes/blacklistSet/detail')



export default {
  path: '/blacklist',
  name: 'blacklist',
  meta: {
    pathName: '黑名单设置'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"黑名单设置"
      },
      component: blacklist
    },{
      path: 'addPro',
      meta:{
        pathName:"选择商品"
      },
      component: addPro
    },{
      path: 'logs',
      meta:{
        pathName:"操作日志"
      },
      component: history
    },{
      path: 'logs/:id',
      meta:{
        pathName:"日志详情"
      },
      component: detail
    }
  ]
}
