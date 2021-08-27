import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

const addRight = (param) => {
  return axios.post(cmsConfig.activity.boosterPrevilege.add,param)
}
const getRightsList = (param) => {
  return axios.get(cmsConfig.activity.boosterPrevilege.list,{params:param})
}
const copy = (param) => {
  return axios.post(cmsConfig.activity.boosterPrevilege.copy,param)
}
const getTaskList = (param) => {
  return axios.get(cmsConfig.activity.boosterPrevilege.getTaskList,{params:param})
}
const updateTotal = (param) => {
  return axios.post(cmsConfig.activity.boosterPrevilege.updateTotal,param)
}
const getRightsProductList = (param) => {
  return axios.get(cmsConfig.activity.boosterPrevilege.productList,{params:param})
}
const getRightDetail = (param) => {
  return axios.get(cmsConfig.activity.boosterPrevilege.detail,{params:param})
}
export default {
  addRight,
  getRightsList,
  copy,
  getTaskList,
  updateTotal,
  getRightsProductList,
  getRightDetail
}
