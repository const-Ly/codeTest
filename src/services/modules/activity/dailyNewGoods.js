import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

	// 每日上新
	// 查询每日上新活动列表
	const list = (param) => {
	  return axios.get(cmsConfig.activity.dailyNewGoods.list, {params:param})
	}
	// 获取每日上新商品列表
	const goodsList = (param) => {
	  return axios.get(cmsConfig.activity.dailyNewGoods.goodsList, {params:param})
	}
	// 获取指定日期的上新商家列表
	const getSupplierInfo = (param) => {
	  return axios.get(cmsConfig.activity.dailyNewGoods.getSupplierInfo, {params:param})
	}
	// 保存每日上新商品手工排时
	const arrangeTimeManual = (param) => {
		return axios.post(cmsConfig.activity.dailyNewGoods.arrangeTimeManual,param)
	}
	
export default {
  list,
	goodsList,
	getSupplierInfo,
	arrangeTimeManual
}
