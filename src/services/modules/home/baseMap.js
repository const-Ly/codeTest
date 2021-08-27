import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// M站首页弹层底图
  // 配置浮层的跳转
  const updateMaskByM = (param) => {
    return axios.post(cmsConfig.home.baseMap.updateMaskByM, param)
  }
  // 获取M站下载弹层底图
  const getMaskByM = (param) => {
    return axios.get(cmsConfig.home.baseMap.getMaskByM, {params:param})
  }

export default {
  updateMaskByM,
  getMaskByM
}
