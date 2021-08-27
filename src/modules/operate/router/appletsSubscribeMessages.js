// 小程序订阅号中转页面
import appletsSubscribeMessages from '../routes/appletsSubscribeMessages'
// 小程序订阅号→模板库
import templateLibrary from '../routes/appletsSubscribeMessages/templateLibrary'
// 小程序订阅号→模板授权
import authorization from '../routes/appletsSubscribeMessages/authorization'

export default {
    path: '/appletsSubscribeMessages',
    meta: {
      pathName: '小程序订阅号'
    },
    component: {
      render: h => h('router-view', '')
    },
    children: [{
        path: '',
        meta: {
          title: '小程序订阅号',
        },
        component: appletsSubscribeMessages,
        redirect: '/appletsSubscribeMessages/templateLibrary'
      },
      {
        path: 'templateLibrary',
        meta: {
          title: '模板库',
          pathName: '模板库'
        },
        component: templateLibrary,
      },
      {
        path: 'authorization',
        meta: {
          title: '模板授权',
          pathName: '模板授权'
        },
        component: authorization,
      },
    ]
  }