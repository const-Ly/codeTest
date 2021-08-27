import axios from 'axios'
import  { cmsConfig } from '@/services/apiConfig'

// 道具卡

// 道具卡列表
const getCardsByPage = (param) => {
  return axios.get(cmsConfig.privilege.itemCard.getCardsByPage, {params:param})
}
// 启用|禁用的状态修改
const changeCardStatus = (param) => {
  return axios.post(cmsConfig.privilege.itemCard.changeCardStatus, param)
}
// 获取道具卡详情
const getCardInfo = (param) => {
  return axios.get(cmsConfig.privilege.itemCard.getCardInfo, {params:param})
}
// 增加道具卡
const addCard = (param) => {
  return axios.post(cmsConfig.privilege.itemCard.addCard, param)
}
// 编辑道具卡
const editCard = (param) => {
  return axios.post(cmsConfig.privilege.itemCard.editCard, param)
}
export default {
  getCardsByPage,
  changeCardStatus,
  getCardInfo,
  addCard,
  editCard
}
