import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 挂接任务
  // 任务列表
  const getProjectByPage = (param) => {
    return axios.get(cmsConfig.privilege.hook.getProjectByPage, {params:param})
  }
  // 挂接开关
  const switchScene = (param) => {
    return axios.post(cmsConfig.privilege.hook.switchScene, param)
  }
  //挂接特权金获取配置
  const getConfig = (param) => {
    return axios.get(cmsConfig.privilege.hook.getConfig, {params:param})
  }
  // 保存全局配置
  const saveConfig = (param) => {
    return axios.post(cmsConfig.privilege.hook.saveConfig, param)
  }
  // 挂接特权金添加项目
  const saveProject = (param) => {
    return axios.post(cmsConfig.privilege.hook.saveProject, param)
  }
  // 挂接特权金添加场景
  const saveScene = (param) => {
    return axios.post(cmsConfig.privilege.hook.saveScene, param)
  }
  // 根据场景id获取场景信息
  const getSceneDetail = (param) => {
    return axios.get(cmsConfig.privilege.hook.getSceneDetail, {params:param})
  }
  // 已关联任务列表
  const getRelationProjectByPage = (param) => {
    return axios.get(cmsConfig.privilege.hook.getRelationProjectByPage, {params:param})
  }
  // 关联任务添加
  const saveRelation = (param) => {
    return axios.post(cmsConfig.privilege.hook.saveRelation, param)
  }
   // 关联任务作废
  const cancelRelation = (param) => {
    return axios.post(cmsConfig.privilege.hook.cancelRelation, param)
  }
  // 获取可关联数据标签下拉列表
  const selectList = (param) => {
    return axios.get(cmsConfig.privilege.hook.selectList, {params:param})
  }
  // 道具卡开关
  const switchPropsStatus = (param) => {
    return axios.post(cmsConfig.privilege.hook.switchPropsStatus, param)
  }
  // 获取场景已关联道具卡
  const getRefPropsByPage = (param) => {
    return axios.post(cmsConfig.privilege.hook.getRefPropsByPage, param)
  }
  // 关联道具卡
  const savePropsRelation = (param) => {
    return axios.post(cmsConfig.privilege.hook.savePropsRelation, param)
  }
  // 作废道具卡关联关系
  const removePropsRelation = (param) => {
    return axios.post(cmsConfig.privilege.hook.removePropsRelation, param)
  }
  // 获取可选择道具卡分页查询结果
  const propsPageList = (param) => {
    return axios.get(cmsConfig.privilege.hook.propsPageList, {params:param})
  }
  // 道具卡关联页面和特权金挂接页面返回时，获取项目所在页数
  const getIndexByProjectId = (param) => {
    return axios.get(cmsConfig.privilege.hook.getIndexByProjectId, {params:param})
  }

export default {
 getProjectByPage,
 switchScene,
 getConfig,
 saveConfig,
 saveProject,
 saveScene,
 getSceneDetail,
 getRelationProjectByPage,
 saveRelation,
 cancelRelation,
 selectList,
 switchPropsStatus,
 getRefPropsByPage,
 savePropsRelation,
 removePropsRelation,
 propsPageList,
 getIndexByProjectId
}
