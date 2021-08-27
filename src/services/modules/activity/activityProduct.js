import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 活动商品相关
	// 获取活动商品列表
	const getActivityProductByPage = (param) => {
	  return axios.get(cmsConfig.activity.activityProduct.getActivityProductByPage, {params:param})
	}
	// 导出
	const activityProductexport = (param) => {
	  return axios.get(cmsConfig.activity.activityProduct.activityProductexport, {params:param})
	}
	
export default {
  getActivityProductByPage,
  activityProductexport
}
