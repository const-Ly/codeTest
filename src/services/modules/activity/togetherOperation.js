import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 一起拼运营位
  // Banner图保存
  const batchSaveBannerConfig = (param) => {
    return axios.post(cmsConfig.activity.togetherOperation.batchSaveBannerConfig, param)
  }
  // Banner图查询
  const getBannerConfigList = (param) => {
    return axios.get(cmsConfig.activity.togetherOperation.getBannerConfigList, {params:param})
  }
  // 运营位1、2、3、频道页推荐信息查询
  const queryOperationsConfig = (param) => {
    return axios.get(cmsConfig.activity.togetherOperation.queryOperationsConfig, {params:param})
  }
  // 运营位1、2、3、频道页推荐信息保存
  const saveOperationsConfig = (param) => {
    return axios.post(cmsConfig.activity.togetherOperation.saveOperationsConfig, param)
  }

export default {
	batchSaveBannerConfig,
	getBannerConfigList,
	queryOperationsConfig,
	saveOperationsConfig
}
