import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 数据备份
  // 分页查询已备份列表
  const queryBakDataBypage = (param) => {
    return axios.get(cmsConfig.system.backups.queryBakDataBypage, {params:param})
  }
  // 分页查询待备份列表
  const queryWaitBakDataBypage = (param) => {
    return axios.get(cmsConfig.system.backups.queryWaitBakDataBypage, {params:param})
  } 
  // 备份数据
  const oneKeyBackup = (param) => {
    return axios.post(cmsConfig.system.backups.oneKeyBackup, param)
  }

export default {
  queryBakDataBypage,
  queryWaitBakDataBypage,
  oneKeyBackup
}
