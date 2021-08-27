import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// app引导下载相关
	// 获取权益配置
	const getAppRights = (param) => {
	  return axios.get(cmsConfig.activity.appActiveRights.getAppRights, {params:param})
	}
	// 权益配置保存
	const saveAppRights = (param) => {
	  return axios.post(cmsConfig.activity.appActiveRights.saveAppRights, param)
	}
	// 获取项目列表和场景列表
	const getProjectAndScene = (param) => {
	  return axios.get(cmsConfig.activity.appActiveRights.getProjectAndScene, {params:param})
	}
	// 添加项目
	const addProject = (param) => {
	  return axios.get(cmsConfig.activity.appActiveRights.addProject, {params:param})
	}
	// 添加场景
	const addScene = (param) => {
	  return axios.post(cmsConfig.activity.appActiveRights.addScene, param)
	}
	// 开启关闭场景
	const switchScene = (param) => {
	  return axios.post(cmsConfig.activity.appActiveRights.switchScene, param)
	}
	// 保存更新弹层
	const saveSceneMask = (param) => {
	  return axios.post(cmsConfig.activity.appActiveRights.saveSceneMask, param)
	}
	// 获取弹层
	const getSceneMask = (param) => {
	  return axios.get(cmsConfig.activity.appActiveRights.getSceneMask, {params:param})
	}
	
export default {
  getAppRights,
  saveAppRights,
  getProjectAndScene,
  addProject,
  addScene,
  switchScene,
  saveSceneMask,
  getSceneMask
}
