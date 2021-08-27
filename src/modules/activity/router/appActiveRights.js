// 权益配置
const rightsDeploy = () => import('../routes/appActiveRights/rightsDeploy')
// 项目挂接
const projectMount = () => import('../routes/appActiveRights/projectMount')


export default {
  path: '/appActiveRights',
  name: 'appActiveRights',
  meta: {
    pathName: 'APP激活权益金 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"APP激活权益金 "
      },
      redirect:'/appActiveRights/rightsDeploy'
    },{
      path: 'rightsDeploy',
      meta:{
      	pathName:"权益配置"
      },
      component: rightsDeploy
    },{
      path: 'projectMount',
      meta:{
      	pathName:"项目挂接"
      },
      component: projectMount
    }
  ]
}
