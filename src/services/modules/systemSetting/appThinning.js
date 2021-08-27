
import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

const getFileList = (params) => {
	return axios.get(cmsConfig.systemSetting.appThinning.getFileList, {params})
}

const fileUpload = (params) => {
	return axios.post(cmsConfig.systemSetting.appThinning.fileUpload, params)
}

const addFileRecord = (params) => {
	return axios.post(cmsConfig.systemSetting.appThinning.addFileRecord, params)
}

const deleteFileRecord = (params) => {
	return axios.post(cmsConfig.systemSetting.appThinning.deleteFileRecord, params)
}

const listVersionInfo = (params) => {
	return axios.get(cmsConfig.systemSetting.appThinning.listVersionInfo, {params})
}

const queryAppVersion = () => {
	return axios.get(cmsConfig.systemSetting.appThinning.queryAppVersion)
}

const saveAppVersionInfo = (params) => {
	return axios.post(cmsConfig.systemSetting.appThinning.saveAppVersionInfo, params)
}

const selectedFileRecordList = (params) => {
	return axios.get(cmsConfig.systemSetting.appThinning.selectedFileRecordList, {params})
}

const deleteAppVersionInfo = (params) => {
	return axios.post(cmsConfig.systemSetting.appThinning.deleteAppVersionInfo, params)
}

const batchSavaRelevance = (params) => {
	return axios.post(cmsConfig.systemSetting.appThinning.batchSavaRelevance, params)
}

export default {
  getFileList,
  fileUpload,
  addFileRecord,
  deleteFileRecord,
  listVersionInfo,
  queryAppVersion,
  saveAppVersionInfo,
  selectedFileRecordList,
  deleteAppVersionInfo,
  batchSavaRelevance,
}