// app下载页配置
const material = () => import('../routes/material')


export default {
  path: '/material',
  meta: {
    pathName: '素材管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"素材管理"
      },
      component: material
    }
  ]
}