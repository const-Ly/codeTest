import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'
// 弹窗管理
// 获取弹窗列表
const queryWindowList = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.queryWindowList, {params: param})
}
// 获取父弹窗详情（通用）
const queryParentNodeDetail = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.queryParentNodeDetail, {params: param})
}
// 保存 老客相关 父弹窗详情
const oldCustomerUpdateParentConfig = param => {
  return axios.post(cmsConfig.systemSetting.dialogManagement.oldCustomerUpdateParentConfig, param)
}
// 保存 已付款 父弹窗详情
const payedUpdateParentConfig = param => {
  return axios.post(cmsConfig.systemSetting.dialogManagement.payedUpdateParentConfig, param)
}
// 子弹窗-分页查询列表（通用）
const querySonNodeListByPage = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.querySonNodeListByPage, {params: param})
}
// 获取子弹窗详情（通用）
const querySonNodeDetail = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.querySonNodeDetail, {params: param})
}
// 保存 老客相关 子弹窗详情
const oldCustomerAddOrUpdateSonConfig = param => {
  return axios.post(cmsConfig.systemSetting.dialogManagement.oldCustomerAddOrUpdateSonConfig, param)
}
//  保存 已付款 子弹窗详情
const payedAddOrUpdateSonConfig = param => {
  return axios.post(cmsConfig.systemSetting.dialogManagement.payedAddOrUpdateSonConfig, param)
}
//  保存 新老访客 子弹窗详情
const visitorAddOrUpdateSonConfig = param => {
  return axios.post(cmsConfig.systemSetting.dialogManagement.visitorAddOrUpdateSonConfig, param)
}
// 获取日志列表
const queryLogsByPage = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.queryLogsByPage, {params: param})
}
//  获取日志 父弹窗详情（通用）
const queryParentLogDetail = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.queryParentLogDetail, {params: param})
}
//  获取日志 子弹窗详情（通用）
const querySonNodeLogDetail = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.querySonNodeLogDetail, {params: param})
}
//  添加/编辑老客子弹窗备选“显示位置”
const queryPopLocationList = param => {
  return axios.get(cmsConfig.systemSetting.dialogManagement.queryPopLocationList, {params: param})
}
//  保存 新访客 父弹窗详情
const visitorUpdateParentConfig = param => {
  return axios.post(cmsConfig.systemSetting.dialogManagement.visitorUpdateParentConfig, param)
}

export default {
  queryWindowList,
  queryParentNodeDetail,
  oldCustomerUpdateParentConfig,
  payedUpdateParentConfig,
  querySonNodeListByPage,
  querySonNodeDetail,
  oldCustomerAddOrUpdateSonConfig,
  payedAddOrUpdateSonConfig,
  visitorAddOrUpdateSonConfig,
  queryLogsByPage,
  queryParentLogDetail,
  querySonNodeLogDetail,
  queryPopLocationList,
  visitorUpdateParentConfig
}
