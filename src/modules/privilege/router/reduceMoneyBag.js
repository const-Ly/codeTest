import reduceMoneyBagList from '../routes/reduceMoneyBag'
import reduceMoneyBagEdit from '../routes/reduceMoneyBag/edit'

export default {
    path: '/reduceMoneyBag',
    name: 'reduceMoneyBag',
    meta: {
      pathName: '立减金包'
    },
    component: {render: h => h('router-view', '')},
    children: [
      {
        path: '',
        meta:{
          title: '立减金包'
        },
        component: reduceMoneyBagList
      }, {
        path: '/reduceMoneyBag/add',
        meta:{
          type: 'add',
          pathName: '添加'
        },
        component: reduceMoneyBagEdit
      }, {
        path: '/reduceMoneyBag/edit/:id',
        meta:{
          type: 'edit',
          pathName: '编辑'
        },
        component: reduceMoneyBagEdit
      }, {
        path: '/reduceMoneyBag/details/:id',
        meta:{
          type: 'detail',
          pathName: '查看'
        },
        component: reduceMoneyBagEdit
      }
    ]
  }