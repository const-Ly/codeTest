import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'
// 弹窗管理
// 获取弹窗配置项列表
const queryAllConfig = (param) => {
	return axios.get(cmsConfig.systemSetting.dialogManagementOld.queryAllConfig, {params:param})
}
// 修改弹窗配置
const updateConfig = (param) => {
	return axios.post(cmsConfig.systemSetting.dialogManagementOld.updateConfig, param)
}
// 获取日志列表
const logs = (param) => {
	return axios.post(cmsConfig.systemSetting.dialogManagementOld.logs, param)
}
// 获取弹窗日志详情
const logsDetail = (param) => {
	return axios.get(cmsConfig.systemSetting.dialogManagementOld.logsDetail, {params:param})
}
// 获取弹窗配置详情
const getDetail = (param) => {
	return axios.get(cmsConfig.systemSetting.dialogManagementOld.queryConfig, {params:param})
}
// 获取老客订单相关 详情
const queryOldCustomerConfig = (param) => {
	return axios.get(cmsConfig.systemSetting.dialogManagementOld.queryOldCustomerConfig, {params:param})
}
// 修改老客订单相关 配置
const updateOldCustomerConfig = (param) => {
	return axios.post(cmsConfig.systemSetting.dialogManagementOld.updateOldCustomerConfig, param)
}
// 获取老客订单相关日志详情
const queryOldCustomerDetail = (param) => {
	return axios.get(cmsConfig.systemSetting.dialogManagementOld.queryOldCustomerDetail, {params:param})
}

export default {
	queryAllConfig,
	updateConfig,
	logs,
	getDetail,
	logsDetail,
	queryOldCustomerConfig,
	updateOldCustomerConfig,
	queryOldCustomerDetail
}
