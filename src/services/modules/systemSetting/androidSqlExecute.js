import axios from 'axios'
import {cmsConfig} from '@/services/apiConfig'

// 分页查询
const queryByPage = (param) => {
	return axios.get(cmsConfig.systemSetting.androidSqlExecute.queryByPage, {params:param})
}
// 增加sql
const add = (param) => {
	return axios.post(cmsConfig.systemSetting.androidSqlExecute.add, param)
}


export default {
	queryByPage,
	add,
}
