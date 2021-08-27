import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'


// 获取广告位管理列表
const pageList = (param) => {
	return axios.get(cmsConfig.operate.advertisingSpace.pageList, {params:param})
}
// 校验商家ID
// const getSupplierById = (param) => {
// 	return axios.post(cmsConfig.operate.advertisingSpace.getSupplierById, param)
// }
const getSupplierById = (param) => {
	return axios.get(cmsConfig.operate.advertisingSpace.getSupplierById, {params:param})
}
// 校验大V ID
// const getVerifiedInfoById = (param) => {
// 	return axios.post(cmsConfig.operate.advertisingSpace.getVerifiedInfoById, param)
// }
const getVerifiedInfoById = (param) => {
	return axios.get(cmsConfig.operate.advertisingSpace.getVerifiedInfoById, {params:param})
}
// 添加广告位
const add = (param) => {
	return axios.post(cmsConfig.operate.advertisingSpace.add, param)
}
// 编辑广告位
const update = (param) => {
	return axios.post(cmsConfig.operate.advertisingSpace.update, param)
}
// 广告位详情
const info = (param) => {
	return axios.get(cmsConfig.operate.advertisingSpace.info, {params:param})
}

export default {
	pageList,
	getSupplierById,
	getVerifiedInfoById,
	add,
	update,
	info
}