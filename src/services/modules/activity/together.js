import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 一起拼活动
  //获取全局配置
  const getActivityDetail = () => {
    return axios.get(cmsConfig.activity.together.getActivityDetail)
  }
  //全局配置
  const saveActivity = (param) => {
    return axios.post(cmsConfig.activity.together.saveActivity, param)
  }
  // 一起拼活动商品列表
  const getActivityProductByPage = (param) => {
    return axios.get(cmsConfig.activity.together.getActivityProductByPage, {params:param})
  }
  // 批量初审
  const batchFirstAuditPassByApplyNo = (param) => {
    return axios.post(cmsConfig.activity.together.batchFirstAuditPassByApplyNo, param)
  }
  // 删除
  const deleteByApplyNo = (param) => {
    return axios.post(cmsConfig.activity.together.deleteByApplyNo, param)
  }
  // 一起拼活动商品审核详情
  const getApplicationFormsByApplyNo = (param) => {
    return axios.get(cmsConfig.activity.together.getApplicationFormsByApplyNo, {params:param})
  }
  // 一起拼活动商品修改新平台优惠
  const updatePlatformDiscountByApplyNo = (param) => {
    return axios.post(cmsConfig.activity.together.updatePlatformDiscountByApplyNo, param)
  }
  // 一起拼活动商品初审
  const firstAuditByApplyNo = (param) => {
    return axios.post(cmsConfig.activity.together.firstAuditByApplyNo, param)
  }
  // 一起拼活动商品预选商品列表
  const getPreActivityProductByPage = (param) => {
    return axios.get(cmsConfig.activity.together.getPreActivityProductByPage, {params:param})
  }
  // 一起拼活动商品保存
  const batchSaveActivityProduct = (param) => {
    return axios.post(cmsConfig.activity.together.batchSaveActivityProduct, param)
  }
  // 一起拼活动导出
  const togGroupActivityExport = (param) => {
    return axios.get(cmsConfig.activity.together.togGroupActivityExport, {params:param})
  }
  // 一起拼活动导入
  const togetherImport = (param) => {
    return axios.post(cmsConfig.activity.together.togetherImport, param)
  }

  // 一起拼活动商品判断衍生品是否负毛利
  const judgeNegativeProfit = (param) => {
    return axios.post(cmsConfig.activity.together.judgeNegativeProfit, param)
  }
  // 一起拼活动商品批量初审拒绝接口
  const batchFirstAuditRejectByApplyNo = (param) => {
    return axios.post(cmsConfig.activity.together.batchFirstAuditRejectByApplyNo, param)
  }
  
export default {
  getActivityDetail,
  saveActivity,
  getActivityProductByPage,
  batchFirstAuditPassByApplyNo,
  deleteByApplyNo,
  getApplicationFormsByApplyNo,
  updatePlatformDiscountByApplyNo,
  firstAuditByApplyNo,
  getPreActivityProductByPage,
  batchSaveActivityProduct,
  togGroupActivityExport,
  togetherImport,
  judgeNegativeProfit,
  batchFirstAuditRejectByApplyNo
}
