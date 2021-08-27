
// 助力权益列表
const boosterPrivilege = () => import('../routes/boosterPrivilege')
// // 添加助力权益
const boosterPrivilegeAdd = () => import('../routes/boosterPrivilege/add')
// // 查看助力权益
const boosterPrivilegeDetail = () => import('../routes/boosterPrivilege/detail')
export default {
  path: '/boosterPrivilege',
  name: 'boosterPrivilege',
  meta: {
    pathName: '助力权益列表'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"助力权益列表"
      },
      component: boosterPrivilege
    },
    {
      path: 'add',
      meta:{
        pathName: '添加助力权益'
      },
      component: boosterPrivilegeAdd
    },
    {
      path: 'detail/:id',
      meta:{
        pathName: '查看助力权益'
      },
      component: boosterPrivilegeDetail
    }
  ]
}