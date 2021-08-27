import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'
const logout = (param) => {
  return axios.get(cmsConfig.login.logout,param)
}
export default {
  logout
}
