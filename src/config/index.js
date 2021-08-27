import Vue from 'vue'
import elementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import services from '@/services'
import utils from '@/utils'
// 复制粘贴插件
import VueClipboard from 'vue-clipboard2'
//查看大图组件
import imgView from '@/components/imgView'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
  // 富文本样式文件
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

// 引入自定义指令
import Directive from '@/utils/directive'
for(let key in Directive){
  Vue.directive(key,Directive[key]);
}
// 引入自定义过滤器
import Filter from '@/utils/filter'
for(let key in Filter){
  Vue.filter(key,Filter[key]);
}
// 引入自定义插件
import Plugin from '@/plugins'
for(let key in Plugin){
  Vue.use(Plugin[key])
}

import EditorConfig from './editor-config.js'

Vue.use(VueClipboard)
Vue.component(imgView.name, imgView)
Vue.prototype.$service = services
Vue.prototype.$utils = utils
Vue.prototype.qs = qs
Vue.prototype.axios = axios
Vue.use(elementUI, {size:'small'})
// 引入富文本编辑器
Vue.use(VueQuillEditor, EditorConfig)

