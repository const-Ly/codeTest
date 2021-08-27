import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 抢返现
  // 查询 抢返现活动列表
  const activityPageList = (param) => {
    return axios.get(cmsConfig.activity.cashback.activityPageList, {params:param})
  }
  // 查询 抢返现活动 详情
  const activityDetail = (param) => {
    return axios.get(cmsConfig.activity.cashback.activityDetail, {params:param})
  }
  // 保存(新增或修改) 抢返现活动
  const addOrUpdate = (param) => {
    return axios.post(cmsConfig.activity.cashback.addOrUpdate, param)
  }
  // 结束抢返现活动
  const finish = (param) => {
    return axios.post(cmsConfig.activity.cashback.finish, param)
  }
  // 获取抢返现素材
  const getMaterial = (param) => {
    return axios.get(cmsConfig.activity.cashback.getMaterial, {params:param})
  }
  // 保存 抢返现频道介绍图
  const channelUpdate = (param) => {
    return axios.post(cmsConfig.activity.cashback.channelUpdate, param)
  }
  // 保存 分享素材
  const shareUpdate = (param) => {
    return axios.post(cmsConfig.activity.cashback.shareUpdate, param)
  }
  // 抢返现活动商品导出
  const exportProduct = (param) => {
    return axios.get(cmsConfig.activity.cashback.exportProduct, {params:param})
  }
  

export default {
  activityPageList,
  activityDetail,
  addOrUpdate,
  finish,
  getMaterial,
  channelUpdate,
  shareUpdate,
  exportProduct
}
