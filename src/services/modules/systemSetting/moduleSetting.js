import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'
// 组件设置
// 获取组件设置
const homeList = (param) => {
	return axios.get(cmsConfig.systemSetting.moduleSetting.homeList, {params:param})
}
// 保存全局配置
const globalConfig = (param) => {
	return axios.post(cmsConfig.systemSetting.moduleSetting.globalConfig, param)
}
// 保存其它组件模块
const configMaterials = (param) => {
	return axios.post(cmsConfig.systemSetting.moduleSetting.configMaterials, param)
}

export default {
	homeList,
	globalConfig,
	configMaterials
}
