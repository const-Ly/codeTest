import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 阶梯团
  // 阶梯团活动搜索列表
  const activityList = (param) => {
    return axios.get(cmsConfig.activity.ladderGroup.activityList, {params:param})
  }
  //手动结束阶梯团活动
  const stopActivity = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.stopActivity, param)
  }
  // 阶梯团活动 初审/二审/审核单 弹层信息
  const verifyResultInfo = (param) => {
    return axios.get(cmsConfig.activity.ladderGroup.verifyResultInfo, {params:param})
  }
  // 阶梯团活动审核
  const verify = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.verify, param)
  }
  //新增阶梯团活动
  const addActivity = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.addActivity, param)
  }
   // 查询阶梯团可选择商品列表
  const productList = (param) => {
    return axios.get(cmsConfig.activity.ladderGroup.productList, {params:param})
  }
   // 查看阶梯团活动详情
  const activityInfo = (param) => {
    return axios.get(cmsConfig.activity.ladderGroup.activityInfo, {params:param})
  }
  // 查看某个活动的已选择商品列表
  const selectedList = (param) => {
    return axios.get(cmsConfig.activity.ladderGroup.selectedList, {params:param})
  }
  // 保存阶梯团活动审核单信息
  const updateVerifyTerm = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.updateVerifyTerm, param)
  }
  // 编辑阶梯团活动基础信息
  const updateActivity = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.updateActivity, param)
  }
  // 分页获取&搜索阶梯团活动二审列表
  const secondVerifyList = (param) => {
    return axios.get(cmsConfig.activity.ladderGroup.secondVerifyList, {params:param})
  }
  // 获取阶梯团活动基础页面文案、分享配置、图片素材
  const getConfig = (param) => {
    return axios.get(cmsConfig.activity.ladderGroup.getConfig, {params:param})
  }
  //保存阶梯团活动基础页面文案（新）
  const saveCopywriting = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.saveCopywriting, param)
  }
  //保存阶梯团活动分享配置
  const saveShareConfig = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.saveShareConfig, param)
  }
  //保存阶梯团活动图片素材
  const saveImageMaterial = (param) => {
    return axios.post(cmsConfig.activity.ladderGroup.saveImageMaterial, param)
  }
export default {
  activityList,
  stopActivity,
  verifyResultInfo,
  verify,
  addActivity,
  productList,
  activityInfo,
  selectedList,
  updateVerifyTerm,
  updateActivity,
  secondVerifyList,
  getConfig,
  saveCopywriting,
  saveShareConfig,
  saveImageMaterial
}
