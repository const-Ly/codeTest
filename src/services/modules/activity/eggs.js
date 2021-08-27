import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'


const save = (param) => {
  return axios.post(cmsConfig.activity.eggs.save,param)
}
const query = (param) => {
  return axios.get(cmsConfig.activity.eggs.query,{params:param})
}
const loglist = (param) => {
  return axios.get(cmsConfig.activity.eggs.loglist,{params:param})
}
const logdetail = (param) => {
  return axios.get(cmsConfig.activity.eggs.logdetail,{params:param})
}

export default {
  save,
  query,
  loglist,
  logdetail
}
