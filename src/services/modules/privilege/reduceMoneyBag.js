import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'


// 获取立减金包主业务表
const getReduceMoneyBagList = (param) => {
	return axios.get(cmsConfig.privilege.reduceMoneyBag.getReduceMoneyBagList, {params:param})
}

// 添加立减金包
const addReduceMoneyBag = (param) => {
	return axios.post(cmsConfig.privilege.reduceMoneyBag.addReduceMoneyBag, param)
}

// 编辑立减金包
const editReduceMoneyBag = (param) => {
	return axios.post(cmsConfig.privilege.reduceMoneyBag.editReduceMoneyBag, param)
}

// 获取立减金包详情
const getReduceMoneyBagInfo = (param) => {
	return axios.get(cmsConfig.privilege.reduceMoneyBag.getReduceMoneyBagInfo, {params:param})
}

// 启用禁用立减金包
const changeReduceMoneyBagStatus = (param) => {
	return axios.post(cmsConfig.privilege.reduceMoneyBag.changeReduceMoneyBagStatus, param)
}

export default {
    getReduceMoneyBagList,
    addReduceMoneyBag,
    editReduceMoneyBag,
    getReduceMoneyBagInfo,
    changeReduceMoneyBagStatus
}