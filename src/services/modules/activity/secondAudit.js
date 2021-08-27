import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 活动提报二审相关
	// 获取二审审批单列表
	const getSecondAuditFormByPage = (param) => {
	  return axios.get(cmsConfig.activity.secondAudit.getSecondAuditFormByPage, {params:param})
	}
	// 导出
	const exportActivitySkuByApplyNos = (param) => {
	  return axios.get(cmsConfig.activity.secondAudit.exportActivitySkuByApplyNos, {params:param})
	}
	// 二审单条审批
	const auditApplicationFormsByApplyNo = (param) => {
	  return axios.post(cmsConfig.activity.secondAudit.auditApplicationFormsByApplyNo, param)
	}
	// 批量审批
	const batchAuditPassByApplyNo = (param) => {
	  return axios.post(cmsConfig.activity.secondAudit.batchAuditPassByApplyNo, param)
	}
	// 获取二审的审核详情
	const getApplicationFormDetailByApplyNo = (param) => {
	  return axios.get(cmsConfig.activity.secondAudit.getApplicationFormDetailByApplyNo, {params:param})
	}
	
export default {
  getSecondAuditFormByPage,
  exportActivitySkuByApplyNos,
  auditApplicationFormsByApplyNo,
  batchAuditPassByApplyNo,
  getApplicationFormDetailByApplyNo
}
