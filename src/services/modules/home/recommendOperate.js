
import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 推荐运营位列表
const list = (param) => (
  axios.get(cmsConfig.home.recommendOperate.list, {params: param})
)
// 添加/编辑 推荐运营位
const add = (param) => (
  axios.post(cmsConfig.home.recommendOperate.add, param)
)
// 添加/编辑 推荐运营位
const update = (param) => (
  axios.post(cmsConfig.home.recommendOperate.update, param)
)
// 根据id查询 推荐运营位
const get = (param) => (
  axios.get(cmsConfig.home.recommendOperate.get, {params: param})
)
// 查询App版本号列表
const queryAppVersionByPlatform = (param) => (
  axios.get(cmsConfig.home.recommendOperate.queryAppVersionByPlatform, {params: param})
)

export default {
  list,
  add,
  update,
  get,
  queryAppVersionByPlatform
}
