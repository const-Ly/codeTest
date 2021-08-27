import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 步数换特权金
  // 获取步数兑换特权金配置
  const stepsPrivilegeMoneyInfo = (param) => {
    return axios.get(cmsConfig.privilege.stepsPrivilege.stepsPrivilegeMoneyInfo, {params:param})
  }
  // 步数兑换特权金配置
  const stepsPrivilegeMoneySetting = (param) => {
    return axios.post(cmsConfig.privilege.stepsPrivilege.stepsPrivilegeMoneySetting, param)
  }

export default {
    stepsPrivilegeMoneyInfo,
    stepsPrivilegeMoneySetting
}
