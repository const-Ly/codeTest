import publicPutOnList from '../routes/publicPutOn'
import publicPutOnEdit from '../routes/publicPutOn/edit'

export default {
    path: '/publicPutOn',
    name: 'publicPutOn',
    meta: {
      pathName: '公号投放推荐商品'
    },
    component: {render: h => h('router-view', '')},
    children: [
      {
        path: '',
        meta:{
          title: '公号投放推荐商品'
        },
        component: publicPutOnList
      }, {
        path: '/publicPutOn/add',
        meta:{
          type: 'add',
          pathName: '添加'
        },
        component: publicPutOnEdit
      }, {
        path: '/publicPutOn/edit/:id',
        meta:{
          type: 'edit',
          pathName: '编辑'
        },
        component: publicPutOnEdit
      }, {
        path: '/publicPutOn/details/:id',
        meta:{
          type: 'detail',
          pathName: '查看'
        },
        component: publicPutOnEdit
      }
    ]
  }