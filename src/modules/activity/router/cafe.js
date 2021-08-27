
// 素材管理
const materialManage = () => import('../routes/cafe/materialManage')
// 推荐咖啡
import recommend from '../routes/cafe/recommend'

export default {
  path: '/cafe',
  meta: {
    pathName: '咖啡馆'
  },
  name: 'cafe',
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"咖啡馆"
      },
      redirect:'/cafe/materialManage'
    },
    {
      path: 'materialManage',
      meta:{
        pathName: '素材管理'
      },
      component: materialManage
    },
    {
      path: 'recommend',
      meta:{
        pathName: '推荐咖啡'
      },
      component: recommend
    }
  ]
}
