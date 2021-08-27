import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

//  津贴设置
   // 保存津贴前端类目的配置
  const saveOrUpdateFirstCategory = (param) => {
    return axios.post(cmsConfig.privilege.setAllowance.saveOrUpdateFirstCategory, param)
  }
  // 查询 津贴前端类目的配置
  const queryAllFirstCategory = (param) => {
    return axios.get(cmsConfig.privilege.setAllowance.queryAllFirstCategory, {params:param})
  }
   // 保存津贴阶梯配置
  const saveOrUpdateLadderConfig = (param) => {
    return axios.post(cmsConfig.privilege.setAllowance.saveOrUpdateLadderConfig, param)
  }
  // 查询津贴阶梯配置
  const queryAllLadderConfig = (param) => {
    return axios.get(cmsConfig.privilege.setAllowance.queryAllLadderConfig, {params:param})
  }


export default {
  saveOrUpdateFirstCategory,
  queryAllFirstCategory,
  saveOrUpdateLadderConfig,
  queryAllLadderConfig

}
