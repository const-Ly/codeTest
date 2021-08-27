import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'


const getPrivateCoffeeHome = (param) => {
  return axios.get(cmsConfig.activity.cafe.getPrivateCoffeeHome,{params:param})
}
const saveOrUpdateMaterial = (param) => {
  return axios.post(cmsConfig.activity.cafe.saveOrUpdateMaterial,param)
}
const saveOrUpdateQrCodeLconnection = (param) => {
  return axios.post(cmsConfig.activity.cafe.saveOrUpdateQrCodeLconnection,param)
}
const saveOrUpdateGuideURL = (param) => {
  return axios.post(cmsConfig.activity.cafe.saveOrUpdateGuideURL,param)
}
const saveOrUpdPcConfig = (param) => {
  return axios.post(cmsConfig.activity.cafe.saveOrUpdPcConfig,param)
}
// “海报图案”模块 素材的修改和保存
const saveOrUpdatePosterImg = (param) => {
  return axios.post(cmsConfig.activity.cafe.saveOrUpdatePosterImg,param)
}
// 分页查询"已添加"的推荐咖啡列表
const queryAddedListByPage = (param) => {
  return axios.post(cmsConfig.activity.cafe.queryAddedListByPage,param)
}
//分页查询"未添加"的推荐咖啡列表
const queryUnAddedListByPage = (param) => {
  return axios.post(cmsConfig.activity.cafe.queryUnAddedListByPage,param)
}
//在“添加”弹窗中勾选“未添加”的咖啡，提交保存
const addCoffeeList = (param) => {
  return axios.post(cmsConfig.activity.cafe.addCoffeeList,param)
}
//确认删除时调用
const deleteCoffee = (param) => {
  return axios.post(cmsConfig.activity.cafe.deleteCoffee,param)
}


export default {
  getPrivateCoffeeHome,
  saveOrUpdateMaterial,
  saveOrUpdateQrCodeLconnection,
  saveOrUpdateGuideURL,
  saveOrUpdPcConfig,
  saveOrUpdatePosterImg,
  queryAddedListByPage,
  queryUnAddedListByPage,
  addCoffeeList,
  deleteCoffee
}
