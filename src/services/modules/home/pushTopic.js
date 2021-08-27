
import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 专题列表
const topicList = (param) => (
  axios.get(cmsConfig.home.pushTopic.topicList, {params: param})
)
// 专题详情
const topicDetail = (param) => (
  axios.get(cmsConfig.home.pushTopic.topicDetail, {params: param})
)
// 标签列表
const labelList = (param) => (
  axios.get(cmsConfig.home.pushTopic.labelList, {params: param})
)
// 提交保存
const save = (param) => (
  axios.post(cmsConfig.home.pushTopic.save, param)
)
// 日志列表
const logList = (param) => (
  axios.get(cmsConfig.home.pushTopic.logList, {params: param})
)
// 日志详情
const logInfo = (param) => (
  axios.get(cmsConfig.home.pushTopic.logInfo, {params: param})
)

export default {
  topicList,
  topicDetail,
  labelList,
  save,
  logList,
  logInfo
}
