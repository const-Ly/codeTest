import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 获取app下载页更新时间
const getUpdateTime = (param) => {
	return axios.get(cmsConfig.systemSetting.download.getUpdateTime, {params:param})
}
// 更新app下载页
const updateAndroid = (param) => {
	return axios.post(cmsConfig.systemSetting.download.updateAndroid, param)
}

export default {
	getUpdateTime,
  updateAndroid
}
