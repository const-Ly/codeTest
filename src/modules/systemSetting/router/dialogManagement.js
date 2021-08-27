// 老弹窗管理列表页
const management = () => import('../routes/dialogManagement')
// 日志页
const log = () => import('../routes/dialogManagement/log')

/* 老客订单相关 */
// 父弹窗管理页
const oldGuestParentManagement = () => import('../routes/dialogManagement/oldGuest/parentManagement')
// 子弹窗管理页
const oldGuestChildManagement = () => import('../routes/dialogManagement/oldGuest/childManagement')
// 子弹窗添加
const oldGuestChildAdd = () => import('../routes/dialogManagement/oldGuest/childAdd')
// 子弹窗编辑
const oldGuestChildEdit = () => import('../routes/dialogManagement/oldGuest/childAdd')

/* 已付款 */
// 父弹窗管理页
const paidParentManagement = () => import('../routes/dialogManagement/paid/parentManagement')
// 子弹窗管理页
const paidChildManagement = () => import('../routes/dialogManagement/paid/childManagement')
// 子弹窗添加
const paidChildAdd = () => import('../routes/dialogManagement/paid/childAdd')
// 子弹窗编辑
const paidChildEdit = () => import('../routes/dialogManagement/paid/childAdd')

/* 首页新访客 */
// 父弹窗管理页
const newVisitorsParentManagement = () => import('../routes/dialogManagement/newVisitors/parentManagement')
// 子弹窗管理页
const newVisitorsChildManagement = () => import('../routes/dialogManagement/newVisitors/childManagement')
// 子弹窗添加
const newVisitorsChildAdd = () => import('../routes/dialogManagement/newVisitors/childAdd')
// 子弹窗编辑
const newVisitorsChildEdit = () => import('../routes/dialogManagement/newVisitors/childAdd')

/* 首页未注册老访客 */
// 父弹窗管理页
const unregOldGuestParentManagement = () => import('../routes/dialogManagement/unregisteredOldGuest/parentManagement')
// 子弹窗管理页
const unregOldGuestChildManagement = () => import('../routes/dialogManagement/unregisteredOldGuest/childManagement')
// 子弹窗添加
const unregOldGuestChildAdd = () => import('../routes/dialogManagement/unregisteredOldGuest/childAdd')
// 子弹窗编辑
const unregOldGuestChildEdit = () => import('../routes/dialogManagement/unregisteredOldGuest/childAdd')

/* 首页已注册老访客 */
// 父弹窗管理页
const regOldGuestParentManagement = () => import('../routes/dialogManagement/registeredOldGuest/parentManagement')
// 子弹窗管理页
const regOldGuestChildManagement = () => import('../routes/dialogManagement/registeredOldGuest/childManagement')
// 子弹窗添加
const regOldGuestChildAdd = () => import('../routes/dialogManagement/registeredOldGuest/childAdd')
// 子弹窗编辑
const regOldGuestChildEdit = () => import('../routes/dialogManagement/registeredOldGuest/childAdd')

export default {
  path: '/dialogManagement',
  meta: {
    pathName: '老弹窗管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '/dialogManagement',
      meta: {
        title: '老弹窗管理'
      },
      component: management
    },
    {
      path: 'log',
      meta: {
        title: '日志',
        pathName: '日志'
      },
      component: log
    },

    /* 下方参数 popCode为父弹窗枚举，sonPopCode为子弹窗枚举 */
    /* 老客订单相关 */
    {
      path: 'oldGuest/parentManagement/:popCode',
      meta: {
        title: '老客订单相关',
        pathName: '老客订单相关'
      },
      component: oldGuestParentManagement
    },
    {
      path: 'oldGuest/childManagement/:sonPopCode',
      meta: {
        title: '添加',
        pathName: '添加'
      },
      component: oldGuestChildManagement
    },
    {
      path: '',
      meta: {
        title: '老客订单--子弹窗名称',
        pathName: '老客订单--子弹窗名称'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: 'oldGuest/childAdd/:sonPopCode',
          meta: {
            title: '添加',
            pathName: '添加'
          },
          component: oldGuestChildAdd
        },
        {
          path: 'oldGuest/childEdit/:sonPopCode/:id',
          meta: {
            title: '编辑',
            pathName: '编辑'
          },
          component: oldGuestChildEdit
        }
      ]
    },
    /* 已付款 */
    {
      path: 'paid/parentManagement/:popCode',
      meta: {
        title: '已付款',
        pathName: '已付款'
      },
      component: paidParentManagement
    },
    {
      path: 'paid/childManagement/:sonPopCode',
      meta: {
        title: '子弹窗名称',
        pathName: '子弹窗名称'
      },
      component: paidChildManagement
    },
    {
      path: '',
      meta: {
        title: '已付款--子弹窗名称',
        pathName: '已付款--子弹窗名称'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: 'paid/childAdd/:sonPopCode',
          meta: {
            title: '添加',
            pathName: '添加'
          },
          component: paidChildAdd
        },
        {
          path: 'paid/childEdit/:sonPopCode/:id',
          meta: {
            title: '编辑',
            pathName: '编辑'
          },
          component: paidChildEdit
        }
      ]
    },
    /* 首页新访客 */
    {
      path: 'newVisitors/parentManagement/:popCode',
      meta: {
        title: '首页新访客',
        pathName: '首页新访客'
      },
      component: newVisitorsParentManagement
    },
    {
      path: 'newVisitors/childManagement/:sonPopCode',
      meta: {
        title: '子弹窗名称',
        pathName: '子弹窗名称'
      },
      component: newVisitorsChildManagement
    },
    {
      path: '',
      meta: {
        title: '首页新访客--子弹窗名称',
        pathName: '首页新访客--子弹窗名称'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: 'newVisitors/childAdd/:sonPopCode',
          meta: {
            title: '添加',
            pathName: '添加'
          },
          component: newVisitorsChildAdd
        },
        {
          path: 'newVisitors/childEdit/:sonPopCode/:id',
          meta: {
            title: '编辑',
            pathName: '编辑'
          },
          component: newVisitorsChildEdit
        }
      ]
    },
    /* 首页未注册老访客 */
    {
      path: 'unregisteredOldGuest/parentManagement/:popCode',
      meta: {
        title: '首页未注册老访客',
        pathName: '首页未注册老访客'
      },
      component: unregOldGuestParentManagement
    },
    {
      path: 'unregisteredOldGuest/childManagement/:sonPopCode',
      meta: {
        title: '子弹窗名称',
        pathName: '子弹窗名称'
      },
      component: unregOldGuestChildManagement
    },
    {
      path: '',
      meta: {
        title: '首页未注册老访客--子弹窗名称',
        pathName: '首页未注册老访客--子弹窗名称'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: 'unregisteredOldGuest/childAdd/:sonPopCode',
          meta: {
            title: '添加',
            pathName: '添加'
          },
          component: unregOldGuestChildAdd
        },
        {
          path: 'unregisteredOldGuest/childEdit/:sonPopCode/:id',
          meta: {
            title: '编辑',
            pathName: '编辑'
          },
          component: unregOldGuestChildEdit
        }
      ]
    },
    /* 首页已注册老访客 */
    {
      path: 'registeredOldGuest/parentManagement/:popCode',
      meta: {
        title: '首页已注册老访客',
        pathName: '首页已注册老访客'
      },
      component: regOldGuestParentManagement
    },
    {
      path: 'registeredOldGuest/childManagement/:sonPopCode',
      meta: {
        title: '子弹窗名称',
        pathName: '子弹窗名称'
      },
      component: regOldGuestChildManagement
    },
    {
      path: '',
      meta: {
        title: '首页已注册老访客--子弹窗名称',
        pathName: '首页已注册老访客--子弹窗名称'
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: 'registeredOldGuest/childAdd/:sonPopCode',
          meta: {
            title: '添加',
            pathName: '添加'
          },
          component: regOldGuestChildAdd
        },
        {
          path: 'registeredOldGuest/childEdit/:sonPopCode/:id',
          meta: {
            title: '编辑',
            pathName: '编辑'
          },
          component: regOldGuestChildEdit
        }
      ]
    }
  ]
}