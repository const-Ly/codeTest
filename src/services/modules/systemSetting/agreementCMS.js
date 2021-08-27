
import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 获取用户服务协议
const getServiceAgreement = (param) => {
	return axios.get(cmsConfig.systemSetting.agreementCMS.getServiceAgreement, {params:param})
}
// 保存用户服务协议
const saveServiceAgreement = (param) => {
	return axios.post(cmsConfig.systemSetting.agreementCMS.saveServiceAgreement, param)
}

// 获取必要隐私政策
const getPrivacyPolicyInfo = (param) => {
	return axios.get(cmsConfig.systemSetting.agreementCMS.getPrivacyPolicyInfo, {params:param})
}
// 保存必要隐私政策
const savePrivacyPolicy = (param) => {
	return axios.post(cmsConfig.systemSetting.agreementCMS.savePrivacyPolicy, param)
}

// 获取账号注销须知
const getAccountCancelNotice = (param) => {
	return axios.get(cmsConfig.systemSetting.agreementCMS.getAccountCancelNotice, {params:param})
}
// 保存账号注销须知
const saveAccountCancelNotice = (param) => {
	return axios.post(cmsConfig.systemSetting.agreementCMS.saveAccountCancelNotice, param)
}

// 获取协议生效弹窗
const getEffectiveMaskConfig = (param) => {
	return axios.get(cmsConfig.systemSetting.agreementCMS.getEffectiveMaskConfig, {params:param})
}
// 保存协议生效弹窗
const saveEffectiveMaskConfig = (param) => {
	return axios.post(cmsConfig.systemSetting.agreementCMS.saveEffectiveMaskConfig, param)
}

export default {
	getServiceAgreement,
  saveServiceAgreement,
  getPrivacyPolicyInfo,
  savePrivacyPolicy,
  getAccountCancelNotice,
  saveAccountCancelNotice,
  getEffectiveMaskConfig,
  saveEffectiveMaskConfig
}
