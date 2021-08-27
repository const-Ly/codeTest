import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 获取用户组列表
const queryByPage = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.queryByPage, {params:param})
}

//  用户组-启用和作废
const modifyStatus = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.modifyStatus, param)
}

//  获取日志列表
const getLogList = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.getLogList, param)
}

//  获取日志详情
const queryLogById = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.queryLogById, {params:param})
}
//  获取关联弹窗列表
const getRelationList = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.getRelationList, param)
}

//  查询用户组基本信息
const getUserGroupInfo = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.getUserGroupInfo, {params:param})
}

//  关联弹窗-作废
const cancel = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.cancel, param)
}

//  关联弹窗-保存
const relatePopCreate = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.relatePopCreate, param)
}


// 用户组保存5.2
// this.$service.systemSetting.userGroupManagement.create
const create = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.create, param)
}
// 用户组编辑5.3
// this.$service.systemSetting.userGroupManagement.update
const update = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.update, param)
}
// 用户组查看详情5.4
// this.$service.systemSetting.userGroupManagement.queryById
const queryById = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.queryById, {params: param})
}
// 用户组查询标签5.11
// this.$service.systemSetting.userGroupManagement.queryTags
const queryTags = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.queryTags, {params: param})
}
// 用户组查询地域5.12
// this.$service.systemSetting.userGroupManagement.queryLocations
const queryLocations = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.queryLocations, {params: param})
}
// 用户组用户组枚举查询（注册来源、性别、首单渠道）5.13
// this.$service.systemSetting.userGroupManagement.queryEnums
const queryEnums = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.queryEnums, {params: param})
}
// 用户组数据类型筛选条件查询5.14
// this.$service.systemSetting.userGroupManagement.queryConditionEnumsByType
const queryConditionEnumsByType = (param) => {
  return axios.get(cmsConfig.systemSetting.userGroupManagement.queryConditionEnumsByType, {params: param})
}
// 用户组商品分页查询（商品相关）7.7
// this.$service.systemSetting.userGroupManagement.queryProductByPage
const queryProductByPage = (param) => {
  return axios.post(cmsConfig.systemSetting.userGroupManagement.queryProductByPage, param)
}

export default {
  queryByPage,
  modifyStatus,
  getLogList,
  getRelationList,
  getUserGroupInfo,
  relatePopCreate,
  cancel,
  create,
  update,
  queryById,
  queryLogById,
  queryTags,
  queryLocations,
  queryEnums,
  queryConditionEnumsByType,
  queryProductByPage
}
