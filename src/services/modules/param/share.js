import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 分享设置
  // 获取某个页面的配置详情
  const getShareConfigByPageId = (param) => {
    return axios.get(cmsConfig.param.share.getShareConfigByPageId, {params:param})
  }
  // 保存某个页面具体分享方式的配置
  const saveShareConfig = (param) => {
    return axios.post(cmsConfig.param.share.saveShareConfig, param)
  }
  // 分享配置信息
  const getSharePageList = (param) => {
    return axios.get(cmsConfig.param.share.getSharePageList, {params:param})
  }
  // 获取分享方式的配置详情
  const getShareChannelList = (param) => {
    return axios.get(cmsConfig.param.share.getShareChannelList, {params:param})
  }
  // 修改分享方式的前端展示名称
  const updateShareChannelDisplayName = (param) => {
    return axios.post(cmsConfig.param.share.updateShareChannelDisplayName, param)
  }
  // 校验分享方式前端名称是否重复
  const validateChannelDisplayNameRepeat = (param) => {
    return axios.post(cmsConfig.param.share.validateChannelDisplayNameRepeat, param)
  }
  // 保存分享方式的排序
  const saveShareChannelSequence = (param) => {
    return axios.post(cmsConfig.param.share.saveShareChannelSequence, param)
  }

export default {
  getShareConfigByPageId,
  saveShareConfig,
  getSharePageList,
  getShareChannelList,
  updateShareChannelDisplayName,
  validateChannelDisplayNameRepeat,
  saveShareChannelSequence
}
