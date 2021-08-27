import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 黑白名单商品
  // 新客&老客黑名单商品列表查询
  const getBlacklistProductByPage = (param) => {
    return axios.get(cmsConfig.privilege.blacklist.getBlacklistProductByPage, {params:param})
  }
   // 新客&老客黑名单商品列表查询
  const batchRemoveBlacklistProduct = (param) => {
    return axios.post(cmsConfig.privilege.blacklist.batchRemoveBlacklistProduct, param)
  }
  // 黑名单操作日志列表的查询
  const getBlacklistProductLogByPage = (param) => {
    return axios.get(cmsConfig.privilege.blacklist.getBlacklistProductLogByPage, {params:param})
  }
  // 新客&老客黑名单日志详情查询
  const getBlacklistProductLogDetailByPage = (param) => {
    return axios.get(cmsConfig.privilege.blacklist.getBlacklistProductLogDetailByPage, {params:param})
  }
   // 新客&老客特权金商品池商品列表查询
  const getPrivilegeProductByPage = (param) => {
    return axios.get(cmsConfig.privilege.blacklist.getPrivilegeProductByPage, {params:param})
  }
   // 新客&老客特权金商品池商品导出[三个地方的导出都用这个接口]
  const exportPrivilegeProduct = (param) => {
    return axios.get(cmsConfig.privilege.blacklist.exportPrivilegeProduct, {params:param})
  }
   // 新客&老客添加/批量添加黑名单商品
  const batchAddBlacklistProduct = (param) => {
    return axios.post(cmsConfig.privilege.blacklist.batchAddBlacklistProduct, param)
  }


export default {
  getBlacklistProductByPage,
  batchRemoveBlacklistProduct,
  getBlacklistProductLogByPage,
  getBlacklistProductLogDetailByPage,
  getPrivilegeProductByPage,
  exportPrivilegeProduct,
  batchAddBlacklistProduct
}
