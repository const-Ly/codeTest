import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 模板库分页列表，GET
const getTemplateLibraryList = (param) => {
	return axios.get(cmsConfig.operate.appletsSubscribeMessages.getTemplateLibraryList, {params:param})
}

// 新增模板库模板，POST
const addTemplateLibraryList = (param) => {
	return axios.post(cmsConfig.operate.appletsSubscribeMessages.addTemplateLibraryList, param)
}

// 编辑模板库模板，POST
const updateTemplateLibraryList = (param) => {
	return axios.post(cmsConfig.operate.appletsSubscribeMessages.updateTemplateLibraryList, param)
}

// 获取模板库模板详情，GET
const infoTemplateLibraryList = (param) => {
	return axios.get(cmsConfig.operate.appletsSubscribeMessages.infoTemplateLibraryList, {params:param})
}

// 启用、禁用模板库模板，POST
const changeStatusTemplateLibraryList = (param) => {
	return axios.post(cmsConfig.operate.appletsSubscribeMessages.changeStatusTemplateLibraryList, param)
}

// 模板授权列表，GET
const getAuthorizationList = (param) => {
	return axios.get(cmsConfig.operate.appletsSubscribeMessages.getAuthorizationList, {params:param})
}
// 编辑模板授权，POST
const updateAuthorizationList = (param) => {
	return axios.post(cmsConfig.operate.appletsSubscribeMessages.updateAuthorizationList, param)
}
// 获取模板授权详情，GET
const infoAuthorizationList = (param) => {
	return axios.get(cmsConfig.operate.appletsSubscribeMessages.infoAuthorizationList, {params:param})
}
// 获取模板授权下拉列表，GET
const selectAuthorizationList = (param) => {
	return axios.get(cmsConfig.operate.appletsSubscribeMessages.selectAuthorizationList, {params:param})
}

export default {
    getTemplateLibraryList,
    addTemplateLibraryList,
    updateTemplateLibraryList,
    infoTemplateLibraryList,
    changeStatusTemplateLibraryList,
    getAuthorizationList,
    updateAuthorizationList,
    infoAuthorizationList,
    selectAuthorizationList
}