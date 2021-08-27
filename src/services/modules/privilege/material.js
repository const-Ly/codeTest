import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 特权金素材
  // 清空90天用户限制
  const updateNoShareLimitStartTime = (param) => {
    return axios.post(cmsConfig.privilege.material.updateNoShareLimitStartTime, param)
  }
  // 获取文案的配置信息
  const getIndexBottomCopy = (param) => {
    return axios.get(cmsConfig.privilege.material.getIndexBottomCopy, {params:param})
  }
  // 修改文案配置
  const saveIndexBottomCopy = (param) => {
    return axios.post(cmsConfig.privilege.material.saveIndexBottomCopy, param)
  }
  // 获取特权金素材配置详情
  const getPrivilegeMaskConfig = (param) => {
    return axios.get(cmsConfig.privilege.material.getPrivilegeMaskConfig, {params:param})
  }
  // 修改特权金素材配置
  const savePrivilegeMaskConfig = (param) => {
    return axios.post(cmsConfig.privilege.material.savePrivilegeMaskConfig, param)
  }

export default {
	updateNoShareLimitStartTime,
	getIndexBottomCopy,
	saveIndexBottomCopy,
  getPrivilegeMaskConfig,
  savePrivilegeMaskConfig
}
