import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

const detail = (param) => {
  return axios.get(cmsConfig.activity.luckDraw.detail,{params:param})
}

	//查询抽奖活动列表
	const getLotteryPage = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getLotteryPage, {params:param})
	}
	// 新增抽奖活动
	const addPlatformLottery = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.addPlatformLottery, param)
	}
	// 修改抽奖活动
	const updatePlatformLottery = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.updatePlatformLottery, param)
	}
	//查询商家奖品列表
	const getShopRewardList = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getShopRewardList, {params:param})
	}
	//查询平台奖品列表
	const getPlatformRewardList = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getPlatformRewardList, {params:param})
	}
	//编辑查看抽奖活动
	const editLottery = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.editLottery, {params:param})
	}
	// 置顶活动
	const stickLottery = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.stickLottery, param)
	}
	// 关闭抽奖
	const closeLottery = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.closeLottery, param)
	}
	// 查询抽奖活动结果
	const getLotteryResultByLotteryId = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getLotteryResultByLotteryId, {params:param})
	}
	// 分页查询开奖结果列表
	const getLotteryResultPage = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getLotteryResultPage, {params:param})
	}
	// 收货信息
	const getReceiveInfo = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getReceiveInfo, {params:param})
	}
	// 发货信息
	const saveDeliveryInfo = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.saveDeliveryInfo, param)
	}
	// 发奖情况
	const getAwardInfo = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getAwardInfo, {params:param})
	}
	// 查询平台奖品列表
	const getPlatformRewardPage = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getPlatformRewardPage, {params:param})
	}
	// 添加平台奖品
	const addPlatformReward = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.addPlatformReward, param)
	}
	// 编辑平台奖品
	const editPlatfromReward = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.editPlatfromReward, {params:param})
	}
	// 修改平台奖品
	const updatePlatformReward = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.updatePlatformReward, param)
	}
	// 查询个人抽奖活动列表
	const getPersonLotteryPage = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getPersonLotteryPage, {params:param})
	}
	// 查询个人抽奖活动开奖结果列表
	const getPersonLotteryResultPage = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.getPersonLotteryResultPage, {params:param})
	}
	// 保存平台抽奖素材
	const savePlatformLotteryMatter = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.savePlatformLotteryMatter, param)
	}
	// 保存个人抽奖默认标题及入口开关
	const savePersonLotteryTitle = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.savePersonLotteryTitle, param)
	}
	// 保存个人抽奖默认图及分享卡片
	const savePersonLotteryImage = (param) => {
	  return axios.post(cmsConfig.activity.luckDraw.savePersonLotteryImage, param)
	}
	// 查询个人抽奖素材
	const queryPersonLotteryMatter = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.queryPersonLotteryMatter, {params:param})
	}
	// 查询平台抽奖素材
	const queryPlatformLotteryMatter = (param) => {
	  return axios.get(cmsConfig.activity.luckDraw.queryPlatformLotteryMatter, {params:param})
	}
  // 获取图文详情
  const getRewardDescById = (param) => {
    return axios.get(cmsConfig.activity.luckDraw.getRewardDescById, {params:param})
  }

export default {
  detail,
  getLotteryPage,
  addPlatformLottery,
  updatePlatformLottery,
  getShopRewardList,
  getPlatformRewardList,
  editLottery,
  stickLottery,
  closeLottery,
  getLotteryResultByLotteryId,
  getLotteryResultPage,
  getReceiveInfo,
  saveDeliveryInfo,
  getAwardInfo,
  getPlatformRewardPage,
  addPlatformReward,
  editPlatfromReward,
  updatePlatformReward,
  getPersonLotteryPage,
  getPersonLotteryResultPage,
  savePlatformLotteryMatter,
  savePersonLotteryTitle,
  savePersonLotteryImage,
  queryPersonLotteryMatter,
  queryPlatformLotteryMatter,
  getRewardDescById
}
