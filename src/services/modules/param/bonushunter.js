import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'


const save = (param) => {
  return axios.post(cmsConfig.param.bonushunter.save,param)
}
const query = (param) => {
  return axios.get(cmsConfig.param.bonushunter.query,{params:param})
}
const loglist = (param) => {
  return axios.get(cmsConfig.param.bonushunter.loglist,{params:param})
}
const logdetail = (param) => {
  return axios.get(cmsConfig.param.bonushunter.logdetail,{params:param})
}

export default {
  save,
  query,
  loglist,
  logdetail
}
