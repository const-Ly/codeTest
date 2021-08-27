// 特权金素材
const material = () => import('../routes/material')

export default {
  path: '/material',
  name: 'material',
  meta: {
    pathName: '特权金素材'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"特权金素材"
      },
      component: material
    }
  ]
}
