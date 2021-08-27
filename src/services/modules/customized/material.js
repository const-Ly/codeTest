import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

/**
 * 
  getMaterial
  my
  product
  productChannel
  newCustomer
 *  */

  // 获取素材
  const getMaterial = (param) => {
    return axios.get(cmsConfig.customized.material.getMaterial, {params: param})
  }
  // 我的定制商品
  const my = (param) => {
    return axios.post(cmsConfig.customized.material.my, param)
  }
  // 分享定制商品
  const product = (param) => {
    return axios.post(cmsConfig.customized.material.product, param)
  }

   // 定制商品频道
   const productChannel = (param) => {
    return axios.post(cmsConfig.customized.material.productChannel, param)
  }
  // 新手配置
  const newCustomer = (param) => {
    return axios.post(cmsConfig.customized.material.newCustomer, param)
  }
export default {
  getMaterial,
  my,
  product,
  productChannel,
  newCustomer
}
