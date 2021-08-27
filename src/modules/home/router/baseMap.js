// M站首页弹层底图
const baseMap = () => import('../routes/baseMap')



export default {
  path: '/baseMap',
  name: 'baseMap',
  meta: {
    pathName: 'M站下载弹层'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"M站下载弹层"
      },
      component: baseMap
    }
  ]
}
