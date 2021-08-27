// 新客特权金
const Config = () => import('../routes/redbagConf')


export default {
  path: '/redbagConf',
  name: 'redbagConf',
  meta: {
    pathName: '红包配置及素材'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"红包配置及素材"
      },
      component: Config
    }
  ]
}
