import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 保存素材
const save = (param) => {
	return axios.post(cmsConfig.operate.material.save, param)
}
// 修改素材
const update = (param) => {
	return axios.post(cmsConfig.operate.material.update, param)
}
// 导出素材
const exportData = (param) => {
	return axios.get(cmsConfig.operate.material.exportData, { params: param })
}
// 保存素材内容
const contentSave = (param) => {
	return axios.post(cmsConfig.operate.material.contentSave, param)
}
// 素材组列表查询
const groupPageList = (param) => {
	return axios.get(cmsConfig.operate.material.groupPageList, { params: param })
}
// 通过素材组编码 获取详情
const detail = (param) => {
	return axios.get(cmsConfig.operate.material.detail, { params: param })
}
// 素材组操作日志查询
const groupLog = (param) => {
	return axios.get(cmsConfig.operate.material.groupLog, { params: param })
}
// 素材内容操作日志查询
const contentLog = (param) => {
	return axios.get(cmsConfig.operate.material.contentLog, { params: param })
}
// 通过日志id 查询素材组操作快照信息
const groupSnapshot = (param) => {
	return axios.get(cmsConfig.operate.material.groupSnapshot, { params: param })
}
// 通过日志id 查询素材内容操作快照信息
const contentSnapshot = (param) => {
	return axios.get(cmsConfig.operate.material.contentSnapshot, { params: param })
}

export default {
  save,
  update,
	exportData,
	contentSave,
	groupPageList,
	detail,
	groupLog,
	contentLog,
	groupSnapshot,
	contentSnapshot
}
