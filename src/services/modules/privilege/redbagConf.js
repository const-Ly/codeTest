import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 红包配置及素材
  // 查询特权金红包配置接口
  const query = (param) => {
    return axios.get(cmsConfig.privilege.redbagConf.query, {params:param})
  }
  // 保存特权金红包全局配置接口
  const globalConfig = (param) => {
    return axios.post(cmsConfig.privilege.redbagConf.globalConfig, param)
  }
   // 保存特权金红包基本配置接口
  const baseInfoConfig = (param) => {
    return axios.post(cmsConfig.privilege.redbagConf.baseInfoConfig, param)
  }
   // 保存红包小程序分享素材接口
  const miniAppShareMaterial = (param) => {
    return axios.post(cmsConfig.privilege.redbagConf.miniAppShareMaterial, param)
  }
   // 保存红包图片和文案接口
  const textAndImgMaterial = (param) => {
    return axios.post(cmsConfig.privilege.redbagConf.textAndImgMaterial, param)
  }
   // 保存特权金红包挂接分享控件顶部素材接口
  const topBarShareMaterial = (param) => {
    return axios.post(cmsConfig.privilege.redbagConf.topBarShareMaterial, param)
  }

export default {
  query,
  globalConfig,
  baseInfoConfig,
  miniAppShareMaterial,
  textAndImgMaterial,
  topBarShareMaterial
}
