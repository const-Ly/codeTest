import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'


  // 查询可抢金币配置
  const queryConfig = (param) => {
    return axios.get(cmsConfig.privilege.robGoldConfig.queryConfig, {params:param})
  }
  // 保存可抢金币配置
  const addOrUpdate = (param) => {
    return axios.post(cmsConfig.privilege.robGoldConfig.addOrUpdate, param)
  }
export default {
  queryConfig,
  addOrUpdate
}
