import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 运营导航日志列表
const logList = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.logList, param)
}

// 运营导航日志详情
const logInfo = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.logInfo, param)
}

// 保存更新运营导航
const save = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.save, param)
}

// 运营导航列表
const pageList = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.pageList, param)
}

// 业务类型更新或添加
const businesSave = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.businesSave, param)
}

// 业务类型详情
const businesInfo = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.businesInfo, param)
}

// 版本信息
const appVersion = (param) => {
	return axios.get(cmsConfig.home.newOperatNav.appVersion, {params: param})
}

// 业务类型列表
const businessList = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.businessList, param)
}

// 业务类型删除 
const businessDel = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.businessDel, param)
}

// 业务更新
const businesUpdate = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.businesUpdate, param)
}

// 禁用启用
const changeStatus = (param) => {
	return axios.post(cmsConfig.home.newOperatNav.changeStatus, param)
}

export default {
	logList,
	logInfo,
	save,
	pageList,
	businesSave,
	businesInfo,
	appVersion,
	businessList,
	businessDel,
	businesUpdate,
	changeStatus
}
