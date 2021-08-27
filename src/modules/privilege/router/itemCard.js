// 新客特权金
const itemCardList = () => import('../routes/itemCard')
const itemCardEdit = () => import('../routes/itemCard/edit')


export default {
  path: '/itemCard',
  name: 'itemCard',
  meta: {
    pathName: '道具卡'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title: '道具卡'
      },
      component: itemCardList
    }, {
      path: 'add',
      meta:{
        type: 'add',
        pathName: '添加'
      },
      component: itemCardEdit
    }, {
      path: 'edit/:id',
      meta:{
        type: 'edit',
        pathName: '编辑'
      },
      component: itemCardEdit
    }, {
      path: 'details/:id',
      meta:{
        type: 'detail',
        pathName: '查看'
      },
      component: itemCardEdit
    }
  ]
}
