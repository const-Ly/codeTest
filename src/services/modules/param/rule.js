import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 规则配置
  // 规则配置分页查询
  const getRuleConfigPageList = (param) => {
    return axios.get(cmsConfig.param.rule.getRuleConfigPageList, {params:param})
  }
  // 规则配置查看
  const detail = (param) => {
    return axios.get(cmsConfig.param.rule.detail, {params:param})
  }
  // 查看规则链接
  const ruleUrl = (param) => {
    return axios.get(cmsConfig.param.rule.ruleUrl, {params:param})
  }
  // 规则配置新增或修改
  const addOrUpdate = (param) => {
    return axios.post(cmsConfig.param.rule.addOrUpdate, param)
  }

export default {
  getRuleConfigPageList,
  detail,
  ruleUrl,
  addOrUpdate
}
