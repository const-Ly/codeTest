
import axios from 'axios'
import { cmsConfig } from '@/services/apiConfig'

// 首页运营位列表
const list = (param) => (
  axios.get(cmsConfig.home.homeOperate.list, {params: param})
)
// 根据id查询 首页运营位详情
const queryById = (param) => (
  axios.get(cmsConfig.home.homeOperate.queryById, {params: param})
)

// 添加/复制 首页运营位
const add = (param) => (
  axios.post(cmsConfig.home.homeOperate.add, param)
)
// 编辑 首页运营位
const update = (param) => (
  axios.post(cmsConfig.home.homeOperate.update, param)
)

export default {
  list,
  queryById,
  add,
  update,
}
