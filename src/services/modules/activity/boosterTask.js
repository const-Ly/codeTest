import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'
const addTask = (param) => {
  return axios.post(cmsConfig.activity.boosterTask.add,param)
}
const getDetails = (param) => {
  return axios.get(cmsConfig.activity.boosterTask.getDetails,{params:param})
}
const saveDetails = (param) => {
  return axios.post(cmsConfig.activity.boosterTask.saveDetails,param)
}
const log = (param) => {
  return axios.get(cmsConfig.activity.boosterTask.log,{params:param})
}
const list = (param) => {
  return axios.get(cmsConfig.activity.boosterTask.list,{params:param})
}
const taskDetail = (param) => {
  return axios.get(cmsConfig.activity.boosterTask.detail,{params:param})
}
const relates = (param) => {
  return axios.get(cmsConfig.activity.boosterTask.relates,{params:param})
}
export default {
  getDetails,
  saveDetails,
  log,
  list,
  addTask,
  taskDetail,
  relates
}
