import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 浮层相关
	// 配置浮层的跳转
	const saveFolating = (param) => {
	  return axios.post(cmsConfig.home.layer.saveFolating, param)
	}
	// 获取浮层配置详情
	const getFolatingDetail = (param) => {
	  return axios.get(cmsConfig.home.layer.getFolatingDetail, {params:param})
	}

export default {
  saveFolating,
  getFolatingDetail
}
