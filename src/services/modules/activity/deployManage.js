import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 配置管理
  // 活动类目配置查询
  const getAllActivityCategoryList = (param) => {
    return axios.get(cmsConfig.activity.deployManage.getAllActivityCategoryList, {params:param})
  }
  // 三级类目日志查看
  const stopActivity = (param) => {
    return axios.get(cmsConfig.activity.deployManage.stopActivity, {params:param})
  }
  // 查询单个类目配置信息
  const getActivityCategoryById = (param) => {
    return axios.get(cmsConfig.activity.deployManage.getActivityCategoryById, {params:param})
  }
  // 保存类目配置
  const saveOrUpdActivityCategory = (param) => {
    return axios.post(cmsConfig.activity.deployManage.saveOrUpdActivityCategory, param)
  }
  // 查看活动选品配置
  const getActivityProductConfig = (param) => {
    return axios.get(cmsConfig.activity.deployManage.getActivityProductConfig, {params:param})
  }

export default {
  getAllActivityCategoryList,
  stopActivity,
  getActivityCategoryById,
  saveOrUpdActivityCategory,
  getActivityProductConfig
}
