// 顶部引导下载栏
const moduleSetting = () => import('../routes/moduleSetting')


export default {
  path: '/moduleSetting',
  meta: {
    pathName: ''
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        pathName:'组件配置'
      },
      component: moduleSetting
    }
  ]
}