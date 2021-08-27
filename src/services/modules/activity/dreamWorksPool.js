import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

const getActivityProductByPage = (param) => {
  return axios.get(cmsConfig.activity.dreamWorksPool.getActivityProductByPage, {params: param})
}

const exportExcel = (param) => {
  return axios.get(cmsConfig.activity.dreamWorksPool.exportExcel, {params: param})
}

export default {
  getActivityProductByPage,
  exportExcel
}
