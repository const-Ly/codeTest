import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 关联数据列表
  // 获取数据列表
  const getList = (param) => {
    return axios.get(cmsConfig.privilege.dataLabel.getList, {params:param})
  }
  // 切换标签状态
  const changeStatus = (param) => {
    return axios.post(cmsConfig.privilege.dataLabel.changeStatus, param)
  }
  // 新增 / 编辑关联数据标签
  const addOrUpdate = (param) => {
    return axios.post(cmsConfig.privilege.dataLabel.addOrUpdate, param)
  }
  // 根据id获取数据标签，接收id，拼接链接
  const info = (param) => {
    return axios.get(cmsConfig.privilege.dataLabel.info + param.id, {})
  }

export default {
  getList,
  changeStatus,
  addOrUpdate,
  info
}
