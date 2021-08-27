
// 页面配置
const pageDeploy = () => import('../routes/faceScore/pageDeploy')
// 参数配置
const paramDeploy = () => import('../routes/faceScore/paramDeploy')
// 颜值配置
const faceScoreDeploy = () => import('../routes/faceScore/faceScoreDeploy')
// 主题管理
const motifManage = () => import('../routes/faceScore/motifManage')
const addMotif = () => import('../routes/faceScore/motifManage/addMotif')
const editMotif = () => import('../routes/faceScore/motifManage/editMotif')
// 模板管理
const templateManage = () => import('../routes/faceScore/templateManage')
const addTemplate = () => import('../routes/faceScore/templateManage/addTemplate')
const editTemplate = () => import('../routes/faceScore/templateManage/editTemplate')
// 素材管理
const materialManage = () => import('../routes/faceScore/materialManage')


export default {
  path: '/faceScore',
  name: 'faceScore',
  meta: {
    pathName: '颜值 '
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
        title:"颜值"
      },
      redirect:'/faceScore/pageDeploy'
    },{
      path: 'pageDeploy',
      meta:{
      	pathName:"页面配置"
      },
      component: pageDeploy
    },{
      path: 'paramDeploy',
      meta:{
      	pathName:"参数配置"
      },
      component: paramDeploy
    },{
      path: 'faceScoreDeploy',
      meta:{
      	pathName:"颜值配置"
      },
      component: faceScoreDeploy
    },{
      path: 'materialManage',
      meta:{
      	pathName:"素材管理"
      },
      component: materialManage
    },{
      path: 'motifManage',
      meta:{
        pathName:"主题管理"
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:"主题管理"
          },
          component: motifManage
        },{
          path: 'addMotif',
          meta:{
            pathName:"添加主题"
          },
          component: addMotif
        },{
          path: 'editMotif/:id',
          meta:{
            pathName:"编辑主题"
          },
          component: editMotif
        }
      ]
    },{
      path: 'templateManage',
      meta:{
        pathName:"模板管理"
      },
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: '',
          meta:{
            title:"模板管理"
          },
          component: templateManage
        },{
          path: 'addTemplate',
          meta:{
            pathName:"添加模板"
          },
          component: addTemplate
        },{
          path: 'editTemplate/:id',
          meta:{
            pathName:"编辑模板"
          },
          component: editTemplate
        }
      ]
    }
  ]
}
