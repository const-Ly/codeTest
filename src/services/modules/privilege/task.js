import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 特权金任务
  // 任务列表
  const getTaskByPage = (param) => {
    return axios.get(cmsConfig.privilege.task.getTaskByPage, {params:param})
  }
  // 特权金任务开启、关闭
  const switchTask = (param) => {
    return axios.post(cmsConfig.privilege.task.switchTask, param)
  }
  // 特权金任务添加/修改
  const saveTask = (param) => {
    return axios.post(cmsConfig.privilege.task.saveTask, param)
  }
  // 特权金任务查看
  const getTaskDetail = (param) => {
    return axios.get(cmsConfig.privilege.task.getTaskDetail, {params:param})
  }

export default {
  getTaskByPage,
  switchTask,
  saveTask,
  getTaskDetail
}
