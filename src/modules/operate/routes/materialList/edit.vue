<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row class="tac">
        <div :class="['w120', 'fixed', isMenuTop ? 'top' : '']">
          <div active-text-color="#303133" class="el-menu-vertical-demo el-menu">
            <el-tooltip effect="dark" content="双击添加" placement="right"><el-button type="primary" plain @dblclick.native="addConf('01')">单选开关</el-button></el-tooltip>
            <el-tooltip effect="dark" content="双击添加" placement="right"><el-button type="primary" plain @dblclick.native="addConf('02')">单行文本</el-button></el-tooltip>
            <el-tooltip effect="dark" content="双击添加" placement="right"><el-button type="primary" plain @dblclick.native="addConf('03')">多行文本</el-button></el-tooltip>
            <el-tooltip effect="dark" content="双击添加" placement="right"><el-button type="primary" plain @dblclick.native="addConf('04')">整数</el-button></el-tooltip>
            <el-tooltip effect="dark" content="双击添加" placement="right"><el-button type="primary" plain @dblclick.native="addConf('05')">小数</el-button></el-tooltip>
            <el-tooltip effect="dark" content="双击添加" placement="right"><el-button type="primary" plain @dblclick.native="addConf('06')">图片</el-button></el-tooltip>
          </div>
        </div>
        
        <div id="materialRight" class="material-right-wrap">
          <div class="material-right">
            <div class="material-edit">
              <div class="box-card m-l-30">
                <div @click="toggleGroup" class="clearfix material-title">
                  <h4 class="break-word">{{material.name}}{{ material.code ? ` (素材组编号：${material.code})` : '' }}</h4>
                  <p class="break-word">{{material.scope}}</p>
                  <p class="break-word">{{material.desc}}</p>
                </div>
                <div class="material-content">
                  <el-alert title="提示：双击左侧素材元件，添加对应类型素材" class="alert" :closable="false"></el-alert>
                  <common-show class="common-show" :can-edit="idx >= groupLen" :ref="'show'+idx" v-for="(list,idx) in material.group" :key="idx" :info="list"
                    @click.native="handleClick(list)" @sort="handleSort($event,idx)" @del="material.group.splice(idx, 1)">
                  </common-show>
                </div>
                
              </div>
            </div>
            <div class="w400">
              <div id="materialConfig" :class="['w400', 'fixed', isMenuTop ? 'top' : '']">
                <el-card v-if="materialGroupState">
                  <h4>素材组属性</h4>
                  <div class="m-t-10" v-if="material.code">
                    <span class="material-group-label">素材组编号：</span>
                    {{ material.code }}
                  </div>
                  <div class="m-t-10">
                    <span class="material-group-label">素材组名称：</span>
                    <el-input class="w200" v-model="material.name" :maxlength="40"></el-input>
                  </div>
                  <div class="m-t-10">
                    <span class="material-group-label">使用范围：</span>
                    <el-input class="w200" v-model="material.scope" :maxlength="40"></el-input>
                  </div>
                  <div class="ma-tb-10 m-t-10">
                    <span class="material-group-label">页面描述：</span>
                    <el-input class="w200 align-top" :rows="4" type="textarea" :maxlength="400" v-model="material.desc"></el-input>
                  </div>
                </el-card>
                <div v-if="showConf">
                  <common-conf :info="itemInfo"></common-conf>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog title="素材组详情" :visible.sync="infoAlert" @close="updateFormReadonlyRole(false)">
          <div class="alert-box">
            <material-info :groupInfo="material" :groupList="material.group" :flag="true"></material-info>
          </div>
        </el-dialog>
      </el-row>
    </el-card>
    <div class="btn-fixed">
      <el-button @click="saveMateral" type="primary">提交保存</el-button>
      <el-button @click="preview" type="primary" class="preview">预览</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import commonShow  from '../components/commonShow.vue'
import commonConf  from '../components/commonConf.vue'
import materialInfo  from '../components/materialInfo'
export default {
  name: 'material-edit',
  data(){
    return {
      infoAlert: false,
      editState: 1,
      showConf: false,
      materialGroupState: true,
      itemInfo: {},
      groupLen: 0,
      material: {
        name: '',
        scope: '',
        desc: '',
        group: []
      },
      isMenuTop: false
    }
  },
  components: {
    commonShow, commonConf, materialInfo
  },
  props:{
    info:{
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapMutations(['updateFormReadonlyRole']),
    init() {
      let id = this.$route.params.id
      if(id !== undefined) {
        this.editState = 2
        this.request(id)
      } else {
        this.editState = 1
        this.material.name = '素材组名称'
        this.material.scope = '使用范围'
        this.material.desc = ''
        this.material.group = []
      }
      
    },
    preview() {
      this.infoAlert = true
      this.updateFormReadonlyRole(true)
    },
    renderComp (type) {
      return this.formMapList.filter(item => item.type === type)[0]
    },
    request(id){
      this.$service.operate.material.detail({groupId: id}).then(res => {
        if(res) {
          this.material = res;
          this.material.group = res.group.map(item => {
            item.conf.rule = typeof item.conf.rule === 'string' ? JSON.parse(item.conf.rule) : item.conf.rule;
            if (item.type === '01') {
              item.conf.data = +item.conf.data;
            }
            return item;
          })
        }
        this.groupLen = this.material.group.length
      })
    },
    toggleGroup() {
      this.materialGroupState = true
      this.showConf = false
    },
    handleClick(list) {
      this.itemInfo = list
      this.showConf = true
      this.materialGroupState = false
    },
    handleSort(dir, idx) {
      if(idx === this.groupLen && dir < 0) {
        return
      }
      this.$utils.handleSort(idx,this.material.group, dir)
    },
    addConf(type) {
      const { initStr } = this.renderComp(type)
      let rel = this.$utils.deepCopy(initStr)
      this.material.group.push(rel)
    },
    reParam() {
      let material = this.material
      let param = {
        code: material.code || null,
        name: material.name,
        scope: material.scope, 
        desc: material.desc,
        group: [] 
      }
      material.group.forEach(res => {
        let obj = {}
        for(let key in res) {
          if(key == 'conf') {
            obj[key] = {
              data: res[key].data + '',
              rule: JSON.stringify(res[key].rule)
            }
          } else {
            obj[key] = res[key]
          }
        }
        param.group.push(obj)
      })
      return param
    },
    saveMateral() {
      let apiStr = this.editState === 1 ? 'save' : 'update' 
      let param = this.reParam()
      if(param.group.length < 1) {
        this.$message.warning('请至少添加一个素材元件')
        return
      } else if(param.group.length > 99) {
        this.$message.warning('同一素材组最多包含99条素材')
        return
      }
      this.$service.operate.material[apiStr](param).then(res => {
        this.$router.push({path: '/materialList'})
      }) 
    },
    initScroll() {
      window.addEventListener('scroll', _ => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 60) {
          this.isMenuTop = true
        } else {
          this.isMenuTop = false
        }
      });
    }
  },
  watch: {
    $route() {
      this.init()
    }
  },
  computed:{
    ...mapGetters(['formMapList'])
  },
  mounted() {
    this.updateFormReadonlyRole(false)
    this.init()
    this.initScroll()
  },
  destroyed () {
    window.removeEventListener('scroll', _ => {})
  }
};
</script>

<style scoped>
.el-menu {
  min-height: 500px;
  height: 100%;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  border-right: none;
}
.el-menu-item {
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  list-style: none;
  height: auto !important;
  line-height: 40px!important;
  transition: border-color .3s,background-color .3s,color .3s;
  box-sizing: border-box;
}
.el-menu-item span {
  user-select: none;
}
.el-menu-item * {
    vertical-align: middle;
}
.tac {
  display: flex;
}
.material-right-wrap {
  width: 100%;
  padding-left: 120px;
}
.material-right {
  flex-grow: 1;
  display: flex;
  padding-bottom: 50px;
  position: relative;
  border-left: solid 1px #e6e6e6;
}
.material-right .save-btn {
  position: fixed;
  left: 30px;
  bottom: 0px;
}
.material-edit {
  flex-grow: 1;
}
.el-menu-vertical-demo {
  min-height: 500px;
}
.box-card {
  min-height: 500px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: .3s;
  border-radius: 4px;
  overflow: hidden;
}
.el-alert {
  background: #409eff; 
  opacity: .8;
  color: #fff;
  margin-bottom: 20px;
}
.common-show {
  margin-top: 10px;
}
.w120 {
  width: 120px;
}
.m-t-10 {
  margin-top: 20px;
}
.el-card__header {
  background: #eee;
}
.material-title {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
.material-title h3 {
  font-size: 14px;
  color: #666;
}
.material-title p {
  font-size: 12px;
  margin-top: 5px;
  color: #999;
}
.material-content {
  padding: 15px;
}
.el-menu-vertical-demo span {
  user-select: none; 
}
.w400 {
  width: 400px;
  flex-shrink: 0;
}
.break-word, .common-show p {
  word-break: break-all;
}
.el-button.preview {
  margin-left: 115px;
}
.material-group-label {
  display: inline-block;
  width: 90px;
}
.el-button {
  display: block;
  margin-left: 15px;
  margin-top: 10px;
  width: 80px;
}
.el-button:focus {
  color: #409EFF;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.el-button:hover {
  color: #ecf5ff;
  background: #409EFF;
  border-color: #409EFF;
}

/* 左右下 浮动 */
.wrap {
  position: relative;
  padding-bottom: 50px;
}
.fixed {
  position: fixed;
}
.fixed.top {
  top: 60px;
}
.btn-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}
.btn-fixed .el-button {
  margin-top: 0;
}

</style>

