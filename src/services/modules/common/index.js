/**
 * 放置一些公共接口
 */
import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 获取商家列表
const getAllSuppliers = (param) => {
  return axios.get(cmsConfig.common.getAllSuppliers, {params:param})
}
// 获取专题列表
const getOnlineTopicList = (param) => {
  return axios.get(cmsConfig.common.getOnlineTopicList, {params:param})
}
// 根据专题id获取专题详情
const getTopicDetail = (param) => {
  return axios.get(cmsConfig.common.getTopicDetail, {params:param})
}
// 获取后台三级类目（所有启用类目）
const getBackendCategoryTree = (param) => {
  return axios.get(cmsConfig.common.getBackendCategoryTree, {params:param})
}
// 根据suid查询有效的一起拼商品信息
const querySkuInfoById = (param) => {
  return axios.get(cmsConfig.common.querySkuInfoById, {params:param})
}
// 从SCM服务中查询所有有效的SCM信息
const queryAllSCMTagList = (param) => {
  return axios.get(cmsConfig.common.queryAllSCMTagList, {params:param})
}
// 获取推荐标签
const getAllProductTags = (param) => {
  return axios.get(cmsConfig.common.getAllProductTags, {params:param})
}

// 公海系统中业务类型为“每日抽奖”且状态为“启用”的 活动商品池名称
const queryProductPools = (param) => {
  return axios.get(cmsConfig.common.queryProductPools, {params:param})
}

// 根据SPUID获取可售商品信息
const searchProductById = (param) => {
  return axios.get(cmsConfig.common.searchProductById, {params:param})
}

// 查询App版本号列表
const queryAppVersionByPlatform = (param) => {
  return axios.get(cmsConfig.common.queryAppVersionByPlatform, {params:param})
}
// 查询App版本号列表
const checkLiveId = (param) => {
  return axios.get(cmsConfig.common.checkLiveId, {params:param})
}

// 模糊搜索大V信息(或企业定制)
const searchDVListByName = (param) => {
  return axios.get(cmsConfig.common.searchDVListByName, {params: param})
}

// 模糊搜索代理商信息
const searchChannelListByName = (param) => {
  return axios.get(cmsConfig.common.searchChannelListByName, {params: param})
}
// 获取一级类目
const getFrontendCategoryTree = (param) => {
  return axios.get(cmsConfig.common.getFrontendCategoryTree, {params: param})
}

export default {
  getAllSuppliers,
  getOnlineTopicList,
  getTopicDetail,
  getBackendCategoryTree,
  querySkuInfoById,
  queryAllSCMTagList,
  getAllProductTags,
  queryProductPools,
  searchProductById,
  queryAppVersionByPlatform,
  checkLiveId,
  searchDVListByName,
  searchChannelListByName,
  getFrontendCategoryTree
}
