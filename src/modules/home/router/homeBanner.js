import list from '../routes/homeBanner'
import edit from '../routes/homeBanner/edit'

export default {
  path: '/homeBanner',
  name: 'homeBanner',
  meta: {
    pathName: '首页轮播'
  },
  component: { render: h => h('router-view', '') },
  children: [
    {
      path: '',
      meta: {
        title: '首页轮播'
      },
      component: list
    }, {
      path: '/homeBanner/add',
      meta: {
        type: 'add',
        pathName: '添加'
      },
      component: edit
    }, {
      path: '/homeBanner/edit/:id',
      meta: {
        type: 'edit',
        pathName: '编辑'
      },
      component: edit
    }, {
      path: '/homeBanner/details/:id',
      meta: {
        type: 'detail',
        pathName: '查看'
      },
      component: edit
    }
  ]
}
