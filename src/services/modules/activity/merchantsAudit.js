import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 商家审核相关
	// 获取商家提报审核列表
	const getApplicationFormsByPage = (param) => {
	  return axios.get(cmsConfig.activity.merchantsAudit.getApplicationFormsByPage, {params:param})
	}
	// 单条审核
	const auditApplicationFormsByApplyNo = (param) => {
	  return axios.post(cmsConfig.activity.merchantsAudit.auditApplicationFormsByApplyNo, param)
	}
	// 批量审核
	const batchAuditPassByApplyNo = (param) => {
	  return axios.post(cmsConfig.activity.merchantsAudit.batchAuditPassByApplyNo, param)
	}
	// 审核详情
	const getApplicationFormsByApplyNo = (param) => {
	  return axios.get(cmsConfig.activity.merchantsAudit.getApplicationFormsByApplyNo, {params:param})
	}
	
export default {
  getApplicationFormsByPage,
  auditApplicationFormsByApplyNo,
  batchAuditPassByApplyNo,
  getApplicationFormsByApplyNo
}
