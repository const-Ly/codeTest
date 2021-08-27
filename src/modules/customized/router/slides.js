
const slides = () => import('../routes/slides')
const edit = () => import('../routes/slides/edit')


export default {
  path: '/slides',
  meta: {
    pathName: '定制频道轮播图'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"定制频道轮播图"
      },
      component: slides
    },
    {
      path: 'edit',
      meta:{
        title:"新增轮播图",
        pathName: '新增轮播图'
      },
      component: edit
    }
  ]
}