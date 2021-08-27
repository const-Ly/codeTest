import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

const list = (param) => {
  return axios.get(cmsConfig.activity.boosterConfig.list,{params:param})
}

const addProject = (param) => {
  return axios.post(cmsConfig.activity.boosterConfig.addProject,param)
}
const addScene = (param) => {
  return axios.post(cmsConfig.activity.boosterConfig.addScene,param)
}
const getProjectNameAndSceneName = (param) => {
  return axios.get(cmsConfig.activity.boosterConfig.getProjectNameAndSceneName,{params:param})
}
const tasksList = (param) => {
  return axios.get(cmsConfig.activity.boosterConfig.tasksList,{params:param})
}
const abolish = (param) => {
  return axios.get(cmsConfig.activity.boosterConfig.abolish,{params:param})
}
const gotoConnect = (param) => {
  return axios.post(cmsConfig.activity.boosterConfig.gotoConnect,param)
}
export default {
  list,
  addProject,
  addScene,
  getProjectNameAndSceneName,
  tasksList,
  abolish,
  gotoConnect
}
