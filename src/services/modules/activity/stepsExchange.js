import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 步数换
	// 获取步数换配置信息
	const stepsSettingInfo = (param) => {
	  return axios.get(cmsConfig.activity.stepsExchange.stepsSettingInfo, {params:param})
	}
	// 步数换全局配置
	const stepsSetting = (param) => {
	  return axios.post(cmsConfig.activity.stepsExchange.stepsSetting, param)
    }
    // 登录奖励配置
	const loginAwardSetting = (param) => {
        return axios.post(cmsConfig.activity.stepsExchange.loginAwardSetting, param)
    }
    // 首次邀请配置
	const newbieTaskSetting = (param) => {
        return axios.post(cmsConfig.activity.stepsExchange.newbieTaskSetting, param)
    }
    // 日常任务—邀请好友配置
	const inviteFriendsSetting = (param) => {
        return axios.post(cmsConfig.activity.stepsExchange.inviteFriendsSetting, param)
    }
    // 日常任务—挑战
	const challengeSetting = (param) => {
        return axios.post(cmsConfig.activity.stepsExchange.challengeSetting, param)
    }
    // 分享素材
	const sharingMaterialSetting = (param) => {
        return axios.post(cmsConfig.activity.stepsExchange.sharingMaterialSetting, param)
    }
	
export default {
    stepsSettingInfo,
    stepsSetting,
    loginAwardSetting,
    newbieTaskSetting,
    inviteFriendsSetting,
    challengeSetting,
    sharingMaterialSetting
}
