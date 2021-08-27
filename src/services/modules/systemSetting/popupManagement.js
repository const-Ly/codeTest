import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 获取弹窗管理列表
const queryByPage = (param) => {
	return axios.get(cmsConfig.systemSetting.popupManagement.queryByPage, {params:param})
}

// 弹窗启用和禁用
const modifyStatus = (param) => {
	return axios.post(cmsConfig.systemSetting.popupManagement.modifyStatus, param)
}

// 添加弹窗
const creat = (param) => {
	return axios.post(cmsConfig.systemSetting.popupManagement.creat, param)
}

// 编辑弹窗
const update = (param) => {
	return axios.post(cmsConfig.systemSetting.popupManagement.update, param)
}

// 获取弹窗详情
const getDetails = (param) => {
	return axios.get(cmsConfig.systemSetting.popupManagement.getDetails, {params:param})
}

export default {
	queryByPage,
	modifyStatus,
	creat,
	update,
	getDetails
}
