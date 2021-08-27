import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

  // 保存分享方式的排序
  const searchSku = (param) => {
    return axios.get(cmsConfig.param.search.searchSku, {params: param})
  }

export default {
  searchSku
}
