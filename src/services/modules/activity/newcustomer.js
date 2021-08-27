import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 新手专享
  //新手专区配置查询
  const get = () => {
    return axios.get(cmsConfig.activity.newcustomer.get)
  }
  //新手专区配置修改
  const update = (param) => {
    return axios.post(cmsConfig.activity.newcustomer.update, param)
  }
  
export default {
  get,
  update
}
