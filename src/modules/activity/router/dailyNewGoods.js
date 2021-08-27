// 每日上新
const dailyNewGoods = () => import('../routes/dailyNewGoods')
// 每日上新详情（每日上新商品页）
const goods = () => import('../routes/dailyNewGoods/goods')

export default {
  path: '/dailyNewGoods',
  name: 'dailyNewGoods',
  meta: {
    pathName: '每日上新'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title: '每日上新'
      },
      component: dailyNewGoods
    }, {
      path: 'goods/:id/:date',
      meta:{
        pathName: '每日上新详情'
      },
      component: goods
    }
  ]
}
