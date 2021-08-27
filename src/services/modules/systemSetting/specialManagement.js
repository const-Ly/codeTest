import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'
// 分页查询
const queryByPage = (param) => {
	return axios.post(cmsConfig.systemSetting.specialManagement.queryByPage,param)
  }
  
// 启用和作废、删除
const modifyStatus = (param) => {
	return axios.post(cmsConfig.systemSetting.specialManagement.modifyStatus,param)
}
// 保存
const create = (param) => {
	return axios.post(cmsConfig.systemSetting.specialManagement.create, param)
}
// 编辑
const update = (param) => {
	return axios.post(cmsConfig.systemSetting.specialManagement.update, param)
}
// 查看详情或复制时的查询
const queryById = (param) => {
	return axios.get(cmsConfig.systemSetting.specialManagement.queryById, {params:param})
}
// 标签商品选择框
const queryTagByPage = (param) => {
	return axios.post(cmsConfig.systemSetting.specialManagement.queryTagByPage, param)
}
// 跳转信息为商品时弹框选择商品
const queryProductByPage = (param) => {
	return axios.post(cmsConfig.systemSetting.specialManagement.queryProductByPage, param)
}
// 跳转信息为商家时弹框选择商品
const querySupplierByPage = (param) => {
	return axios.post(cmsConfig.systemSetting.specialManagement.querySupplierByPage, param)
}
// 查看专题链接
const queryProjectRouteById = (param) => {
	return axios.get(cmsConfig.systemSetting.specialManagement.queryProjectRouteById, {params:param})
}


export default {
	queryByPage,
	modifyStatus,
	create,
	update,
	queryById,
	queryTagByPage,
	queryProductByPage,
	querySupplierByPage,
	queryProjectRouteById,
}
