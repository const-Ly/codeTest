import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 地震预警列表分页查询
const getEQwarningsByPage = (param) => {
	return axios.post(cmsConfig.operate.earlyWarning.getEQwarningsByPage, param)
}

// 地震预警的重发和新增
const saveOrUpd = (param) => {
	return axios.post(cmsConfig.operate.earlyWarning.saveOrUpd, param)
}

// 地震预警信息详情
const getEQwarningDetail = (param) => {
	return axios.get(cmsConfig.operate.earlyWarning.getEQwarningDetail, {params:param})
}

// 地震预警白名单列表分页查询
const getWhiteListsByPage = (param) => {
	return axios.post(cmsConfig.operate.earlyWarning.getWhiteListsByPage, param)
}

// 地震预警白名单删除
const deleteWhiteList = (param) => {
	return axios.get(cmsConfig.operate.earlyWarning.deleteWhiteList, {params:param})
}

// 下载导入模板
const getWhiteListTemplate = (param) => {
	return axios.get(cmsConfig.operate.earlyWarning.getWhiteListTemplate, {params:param})
}

export default {
	getEQwarningsByPage,
	saveOrUpd,
	getEQwarningDetail,
	getWhiteListsByPage,
	deleteWhiteList,
	getWhiteListTemplate
}