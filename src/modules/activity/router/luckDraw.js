
// 抽奖列表
const luckDrawList = () => import('../routes/luckDraw/luckDrawList')
const addOne = () => import('../routes/luckDraw/luckDrawList/addOne')
const addTwo = () => import('../routes/luckDraw/luckDrawList/addTwo')
const editOne = () => import('../routes/luckDraw/luckDrawList/editOne')
const editTwo = () => import('../routes/luckDraw/luckDrawList/editTwo')
const viewOne = () => import('../routes/luckDraw/luckDrawList/viewOne')
const viewTwo = () => import('../routes/luckDraw/luckDrawList/viewTwo')
const luckResult = () => import('../routes/luckDraw/luckDrawList/result')
// 平台奖品
const platPrize = () => import('../routes/luckDraw/platPrize')
const addPrize = () => import('../routes/luckDraw/platPrize/addPrize')
const editPrize = () => import('../routes/luckDraw/platPrize/editPrize')
// 个人抽奖
const personalLuck = () => import('../routes/luckDraw/personalLuck')
const personalLuckResult = () => import('../routes/luckDraw/personalLuck/result')
// 抽奖素材
const luckMaterial = () => import('../routes/luckDraw/luckMaterial')


export default {
  path: '/luckDraw',
  name: 'luckDraw',
  meta: {
    pathName: '抽奖 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"抽奖"
      },
      redirect:'/luckDraw/luckDrawList'
    },{
      path: 'luckDrawList',
      meta:{
      	pathName:"抽奖列表"
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:"抽奖列表"
          },
          component: luckDrawList
        },{
          path: 'add_one',
          meta:{
            pathName:"添加抽奖"
          },
          component: addOne
        },{
          path: 'add_two',
          meta:{
            pathName:"添加抽奖"
          },
          component: addTwo
        },{
          path: 'edit_one/:id',
          meta:{
            pathName:"编辑抽奖"
          },
          component: editOne
        },{
          path: 'edit_two/:id',
          meta:{
            pathName:"编辑抽奖"
          },
          component: editTwo
        },{
          path: 'view_one/:id',
          meta:{
            pathName:"查看抽奖"
          },
          component: viewOne
        },{
          path: 'view_two/:id',
          meta:{
            pathName:"查看抽奖"
          },
          component: viewTwo
        },{
          path: 'result/:id',
          meta:{
            pathName:"开奖结果"
          },
          component: luckResult
        }
      ]
    },{
      path: 'platPrize',
      meta:{
        pathName:"平台奖品"
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:"平台奖品"
          },
          component: platPrize
        },{
          path: 'add',
          meta:{
            pathName:"添加奖品"
          },
          component: addPrize
        },{
          path: 'edit/:id',
          meta:{
            pathName:"编辑奖品"
          },
          component: editPrize
        }
      ]
    },{
      path: 'personalLuck',
      meta:{
        pathName:"个人抽奖"
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:"个人抽奖"
          },
          component: personalLuck
        },{
          path: 'result/:id',
          meta:{
            pathName:"开奖结果"
          },
          component: personalLuckResult
        }
      ]
    },{
      path: 'luckMaterial',
      meta:{
        pathName:"抽奖素材"
      },
      component: luckMaterial
    }
  ]
}
