import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

	// 保存配置
	const saveConfig = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.deploy.saveConfig, param)
	}
	// 查询配置
	const queryConfig = (param) => {
	  return axios.get(cmsConfig.activity.faceScore.deploy.queryConfig,{params:param})
	}
	// 查询主题管理列表
	const queryTopicList = (param) => {
	  return axios.get(cmsConfig.activity.faceScore.motifManage.queryTopicList,{params:param})
	}
	// 查询主题序号列表
	const queryTopicSequenceList = (param) => {
	  return axios.get(cmsConfig.activity.faceScore.motifManage.queryTopicSequenceList,{params:param})
	}
	// 保存调整主题序号
	const saveTopicSequenceList = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.motifManage.saveTopicSequenceList, param)
	}
	// 新增主题
	const addTopic = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.motifManage.addTopic, param)
	}
	// 修改主题
	const updateTopic = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.motifManage.updateTopic, param)
	}
	// 查询主题详情
	const queryTopicById = (param) => {
	  return axios.get(cmsConfig.activity.faceScore.motifManage.queryTopicById,{params:param})
	}
	// 删除主题
	const deleteTopic = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.motifManage.deleteTopic, param)
	}
	// 查询模板管理列表
	const queryTemplateList = (param) => {
	  return axios.get(cmsConfig.activity.faceScore.templateManage.queryTemplateList,{params:param})
	}
	// 修改模板(用于编辑模板，设置精选非精选)
	const updateTemplate = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.templateManage.updateTemplate, param)
	}
	// 删除模板
	const deleteTemplate = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.templateManage.deleteTemplate, param)
	}
	// 添加模板
	const addTemplate = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.templateManage.addTemplate, param)
	}
	// 批量设置融合度
	const batchUpdateTemplate = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.templateManage.batchUpdateTemplate, param)
	}
	// 查询模板详情
	const queryTemplateById = (param) => {
	  return axios.get(cmsConfig.activity.faceScore.templateManage.queryTemplateById,{params:param})
	}
	// 查询素材管理
	const queryMatter = (param) => {
	  return axios.get(cmsConfig.activity.faceScore.materialManage.queryMatter,{params:param})
	}
	// 保存素材
	const saveMatter = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.materialManage.saveMatter, param)
	}
	// 融合图片
	const fuseImage = (param) => {
	  return axios.post(cmsConfig.activity.faceScore.templateManage.fuseImage, param)
	}

export default {
  saveConfig,
  queryConfig,
	queryTopicList,
	queryTopicSequenceList,
	saveTopicSequenceList,
	addTopic,
	queryTopicSequenceList,
	saveTopicSequenceList,
	addTopic,
	updateTopic,
	queryTopicById,
	deleteTopic,
	queryTemplateList,
	updateTemplate,
	deleteTemplate,
	addTemplate,
	batchUpdateTemplate,
	queryTemplateById,
	queryMatter,
	saveMatter,
	fuseImage
}
