
// 抢返现活动
const activities = () => import('../routes/cashback/activities')
// 添加抢返现活动
const add = () => import('../routes/cashback/activities/add')
// 编辑抢返现活动
const edit = () => import('../routes/cashback/activities/edit')
// 查看抢返现活动
const detail = () => import('../routes/cashback/activities/detail')
// 抢返现素材
const material = () => import('../routes/cashback/material')



export default {
  path: '/cashback',
  name: 'cashback',
  meta: {
    pathName: '抢返现 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"抢返现"
      },
      redirect:'/cashback/activities'
    },{
      path: 'activities',
      meta:{
        pathName:"抢返现活动"
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:"抢返现活动"
          },
          component: activities
        },{
          path: 'add',
          meta:{
            pathName:"添加"
          },
          component: add
        },{
          path: 'edit/:id',
          meta:{
            pathName:"编辑"
          },
          component: edit
        },{
          path: 'detail/:id',
          meta:{
            pathName:"查看"
          },
          component: detail
        }
      ]
    },{
      path: 'material',
      meta:{
      	pathName:"抢返现素材"
      },
      component: material
    }
  ]
}
