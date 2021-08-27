// 广告位管理
import advertisingSpace from '../routes/advertisingSpace'
// 添加广告位
import add from '../routes/advertisingSpace/add'
// 广告位详情
import details from '../routes/advertisingSpace/details'

export default {
  path: '/advertisingSpace',
  name: 'advertisingSpace',
  meta: {
    pathName: '广告位管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta: { title: '广告位管理' },
      component: advertisingSpace
    },
    {
      path: 'add',
      meta: { title: '添加', pathName: '添加' },
      component: add
    },
    {
      path: 'edit/:id',
      meta: { title: '编辑', pathName: '编辑' },
      component: add
    },
    {
      path: 'details/:id',
      meta: { title: '查看', pathName: '查看' },
      component: details
    }
  ]
}
