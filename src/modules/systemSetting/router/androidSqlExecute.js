// app下载页配置
const androidSqlExecute = () => import('../routes/androidSqlExecute')


export default {
  path: '/androidSqlExecute',
  meta: {
    pathName: '安卓版本SQL执行'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      meta:{
      	title:"安卓版本SQL执行"
      },
      component: androidSqlExecute
    }
  ]
}