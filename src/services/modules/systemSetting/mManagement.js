import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'
// M站管理
// 获取M站引导下载栏图片
const getMFloat = (param) => {
	return axios.get(cmsConfig.systemSetting.mManagement.getMFloat, {params:param})
}
// 修改（保存）M站引导下载栏的图片配置
const updateMFloat = (param) => {
	return axios.post(cmsConfig.systemSetting.mManagement.updateMFloat, param)
}



export default {
	getMFloat,
  updateMFloat
}
