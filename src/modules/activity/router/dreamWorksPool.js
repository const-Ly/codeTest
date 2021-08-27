// 梦工厂商品池
import dreamWorksPool from '../routes/dreamWorksPool'

export default {
  path: '/dreamWorksPool',
  name: 'dreamWorksPool',
  meta: {
    pathName: '梦工厂商品池'
  },
  component: { render: h => h('router-view', '') },
  children: [
    {
      path: '',
      meta: {
        title: '梦工厂商品池'
      },
      component: dreamWorksPool
    }
  ]
}
