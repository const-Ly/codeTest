import axios from 'axios'
import {cmsConfig} from './apiConfig'
import login from './modules/login'

// 公共接口
import common from './modules/common'
// 活动管理菜单
import activity from './modules/activity'
// 系统管理菜单
import system from './modules/system'
// 首页管理菜单
import home from './modules/home'
// 特权金菜单
import privilege from './modules/privilege'
// 参数设置菜单
import param from './modules/param'
// 前端管理
import systemSetting from './modules/systemSetting'
// 定制管理
import customized from './modules/customized'
// 运营市场管理
import operate from './modules/operate'

import './httpConfig' // 定制请求和相应拦截器
// globel request
const getMenus = () => {
  return axios.get(cmsConfig.menus)
}
const auth = () => {
  return axios.get(cmsConfig.auth)
}

export default {
  getMenus,
  auth,
  login,
  common,
  activity,
  home,
  privilege,
  param,
  systemSetting,
  customized,
  operate,
  system
}
