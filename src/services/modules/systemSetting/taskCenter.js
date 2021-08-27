import axios from 'axios'
import {
  cmsConfig
} from '@/services/apiConfig'
// 任务中心

// 获取app 版本号
const queryAppVersion = (param) => {
  return axios.get(cmsConfig.systemSetting.taskCenter.queryAppVersion, {
    params: param
  })
}

// 获取任务列表
const getTaskList = (param) => {
  return axios.get(cmsConfig.systemSetting.taskCenter.getTaskList, {
    params: param
  })
}

// 保存任务
const saveTask = (param) => {
  return axios.post(cmsConfig.systemSetting.taskCenter.saveTask, param)
}

// 编辑任务
const editTask = (param) => {
  return axios.get(cmsConfig.systemSetting.taskCenter.editTask, {
    params: param
  })
}

// 任务列表查询
const searchTaskList = (param) => {
  return axios.post(cmsConfig.systemSetting.taskCenter.searchTaskList, param)
}

// 启用/禁用
const changeEnableStatus = (param) => {
  return axios.post(cmsConfig.systemSetting.taskCenter.changeEnableStatus, param)
}

// 保存任务设置
const saveGlobalConfig = (param) => {
  return axios.post(cmsConfig.systemSetting.taskCenter.saveGlobalConfig, param)
}
// 获取任务设置
const getGlobalConfig = (param) => {
  return axios.get(cmsConfig.systemSetting.taskCenter.getGlobalConfig, {
    params: param
  })
}

// 获取任务日志列表
const getLogList = (param) => {
  return axios.get(cmsConfig.systemSetting.taskCenter.taskCenterLogList, {
    params: param
  })
}

// 获取任务日志详情
const getLogDetails = (param) => {
  return axios.get(cmsConfig.systemSetting.taskCenter.taskCenterLogDetails, {
    params: param
  })
}

// 根据场景标识查询奖励类型
const getRewardTypesByScene = (param) => {
  return axios.get(cmsConfig.systemSetting.taskCenter.getRewardTypesByScene, {
    params: param
  })
}

// 保存兑换设置
const saveGlobalExchangeConfig = (param) => {
  return axios.post(cmsConfig.systemSetting.taskCenter.saveGlobalExchangeConfig, param)
}

// 保存签到特殊奖励设置
const saveGlobalSignInRewardConfig = (param) => {
  return axios.post(cmsConfig.systemSetting.taskCenter.saveGlobalSignInRewardConfig, param)
}

// 获取所有任务设置模块的配置
const getAllModelTaskConfig = (param) => {
  return axios.post(cmsConfig.systemSetting.taskCenter.getAllModelTaskConfig, param)
}

export default {
  queryAppVersion,
  getTaskList,
  saveTask,
  searchTaskList,
  editTask,
  changeEnableStatus,
  saveGlobalConfig,
  getGlobalConfig,
  getLogList,
  getLogDetails,
  getRewardTypesByScene,
  saveGlobalExchangeConfig,
  saveGlobalSignInRewardConfig,
  getAllModelTaskConfig
}
