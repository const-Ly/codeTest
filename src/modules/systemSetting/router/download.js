// app下载页配置
const download = () => import('../routes/download')


export default {
  path: '/download',
  meta: {
    pathName: 'App下载页面静态化'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"App下载页面静态化"
      },
      component: download
    }
  ]
}