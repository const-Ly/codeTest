// 顶部引导下载栏
const topGuideDownload = () => import('../routes/mManagement/topGuideDownload')


export default {
  path: '/mManagement',
  name: 'mManagement',
  meta: {
    pathName: 'M站管理 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"M站管理"
      },
      redirect:'/mManagement/topGuideDownload'
    },{
      path: 'topGuideDownload',
      meta:{
        pathName:"顶部引导下载栏"
      },
      component: topGuideDownload
    }
  ]
}