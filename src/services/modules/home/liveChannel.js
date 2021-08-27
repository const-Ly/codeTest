import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 直播频道——获取主业务表
const getListLiveChannel = (param) => {
  return axios.get(cmsConfig.home.liveChannel.getListLiveChannel, { params: param })
}

// 直播频道-添加
const addLiveChannel = (param) => {
  return axios.post(cmsConfig.home.liveChannel.addLiveChannel, param)
}

// 直播频道- 编辑
const editLiveChannel = (param) => {
  return axios.post(cmsConfig.home.liveChannel.editLiveChannel, param)
}

// 直播频道-获取详情
const infoLiveChannel = (param) => {
  return axios.get(cmsConfig.home.liveChannel.infoLiveChannel, { params: param })
}

export default {
  getListLiveChannel,
  addLiveChannel,
  editLiveChannel,
  infoLiveChannel
}
