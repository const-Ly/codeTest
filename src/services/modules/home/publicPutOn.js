import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'


// 获取公号投放推荐商品主业务表
const getPublicPutOnList = (param) => {
	return axios.get(cmsConfig.home.publicPutOn.getPublicPutOnList, {params:param})
}

// 添加公号投放推荐商品
const addPublicPutOn = (param) => {
	return axios.post(cmsConfig.home.publicPutOn.addPublicPutOn, param)
}

// 编辑公号投放推荐商品
const editPublicPutOn = (param) => {
	return axios.post(cmsConfig.home.publicPutOn.editPublicPutOn, param)
}

// 获取公号投放推荐商品详情
const getPublicPutOnInfo = (param) => {
	return axios.get(cmsConfig.home.publicPutOn.getPublicPutOnInfo, {params:param})
}


export default {
    getPublicPutOnList,
    addPublicPutOn,
    editPublicPutOn,
    getPublicPutOnInfo
}