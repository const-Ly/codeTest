import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 首页轮播——获取主业务表
const getListHomeBanner = (param) => {
  return axios.get(cmsConfig.home.homeBanner.getListHomeBanner, { params: param })
}

// 首页轮播-添加
const addHomeBanner = (param) => {
  return axios.post(cmsConfig.home.homeBanner.addHomeBanner, param)
}

// 首页轮播- 编辑
const editHomeBanner = (param) => {
  return axios.post(cmsConfig.home.homeBanner.editHomeBanner, param)
}

// 首页轮播-获取详情
const infoHomeBanner = (param) => {
  return axios.get(cmsConfig.home.homeBanner.infoHomeBanner, { params: param })
}

export default {
  getListHomeBanner,
  addHomeBanner,
  editHomeBanner,
  infoHomeBanner
}
