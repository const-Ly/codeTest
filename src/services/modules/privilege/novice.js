import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 新手特权金
  // 新手特权金活动商品列表
  const getActivityProductByPage = (param) => {
    return axios.get(cmsConfig.privilege.novice.getActivityProductByPage, {params:param})
  }
  // 新手特权金活动商品批量初审通过
  const batchFirstAuditPassByApplyNo = (param) => {
    return axios.post(cmsConfig.privilege.novice.batchFirstAuditPassByApplyNo, param)
  }
  // 新手特权金活动商品删除
  const deleteByApplyNo = (param) => {
    return axios.post(cmsConfig.privilege.novice.deleteByApplyNo, param)
  }
  // 新手特权金活动商品审核详情
  const getApplicationFormsByApplyNo = (param) => {
    return axios.get(cmsConfig.privilege.novice.getApplicationFormsByApplyNo, {params:param})
  }
  // 新手特权金活动商品修改新平台优惠
  const updatePlatformDiscountByApplyNo = (param) => {
    return axios.post(cmsConfig.privilege.novice.updatePlatformDiscountByApplyNo, param)
  }
  // 新手特权金活动商品初审
  const firstAuditByApplyNo = (param) => {
    return axios.post(cmsConfig.privilege.novice.firstAuditByApplyNo, param)
  }
  // 新手特权金活动商品预选商品列表
  const getPreActivityProductByPage = (param) => {
    return axios.get(cmsConfig.privilege.novice.getPreActivityProductByPage, {params:param})
  }
  // 新手特权金活动商品保存
  const batchSaveActivityProduct = (param) => {
    return axios.post(cmsConfig.privilege.novice.batchSaveActivityProduct, param)
  }
  // 导出
  const _export = (param) => {
    return axios.get(cmsConfig.privilege.novice.export, {params:param})
  }

  // 新手特权金活动商品判断是否负毛利
  const judgeNegativeProfit = (param) => {
    return axios.post(cmsConfig.privilege.novice.judgeNegativeProfit, param)
  }
  // 新手特权金活动商品批量初审拒绝接口
  const batchFirstAuditRejectByApplyNo = (param) => {
    return axios.post(cmsConfig.privilege.novice.batchFirstAuditRejectByApplyNo, param)
  }
export default {
  getActivityProductByPage,
  batchFirstAuditPassByApplyNo,
  deleteByApplyNo,
  getApplicationFormsByApplyNo,
  updatePlatformDiscountByApplyNo,
  firstAuditByApplyNo,
  getPreActivityProductByPage,
  batchSaveActivityProduct,
  _export,
  judgeNegativeProfit,
  batchFirstAuditRejectByApplyNo
}
