import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 轮播图列表
  const list = (param) => {
    return axios.get(cmsConfig.customized.slides.list, {params: param})
  }
  // 修改轮播图
  const edit = (param) => {
    return axios.post(cmsConfig.customized.slides.edit, param)
  }
  // 获取spu商品
  const getSpu = (param) => {
    return axios.get(cmsConfig.customized.slides.getSpu, {params: param})
  }

   // 获取店铺列表
   const shopList = (param) => {
    return axios.get(cmsConfig.customized.slides.shopList, {params: param})
  }
  // 排序
  const sort = (param) => {
    return axios.post(cmsConfig.customized.slides.sort, param)
  }
  // 删除轮播图
  const deletel = (param) => {
    return axios.post(cmsConfig.customized.slides.delete, param)
  }
  // 轮播详情
  const detail = (param) => {
    return axios.get(cmsConfig.customized.slides.detail, {params: param})
  }

export default {
  list,
  edit,
  getSpu,
  shopList,
  sort,
  deletel,
  detail
}
