import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 数据恢复
  // 分页查询已恢复数据列表
  const queryRecDataBypage = (param) => {
    return axios.get(cmsConfig.system.recovery.queryRecDataBypage, {params:param})
  }
  // 恢复数据
  const oneKeyRecovery = (param) => {
    return axios.post(cmsConfig.system.recovery.oneKeyRecovery, param)
  }

export default {
  queryRecDataBypage,
  oneKeyRecovery
}
