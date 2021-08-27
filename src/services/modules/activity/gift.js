import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 一起拼活动
  //获取礼物功能配置项
  const getGiftConfig = () => {
    return axios.get(cmsConfig.activity.gift.getGiftConfig)
  }
  //保存礼物配置
  const saveGiftConfig = (param) => {
    return axios.post(cmsConfig.activity.gift.saveGiftConfig, param)
  }
  
export default {
  getGiftConfig,
  saveGiftConfig
}
