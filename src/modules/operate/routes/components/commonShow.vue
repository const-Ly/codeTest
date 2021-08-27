<template>
  <div :class="['showCell', (showActions && canEdit) ?'active':'']">
    <span class="cell-icon el-icon-arrow-up" @click.stop="$emit('sort',-1)"></span>
    <span class="cell-icon el-icon-arrow-down" @click.stop="$emit('sort',1)"></span>
    <span class="cell-icon el-icon-close" @click.stop="$emit('del')"></span>
    <el-card>
      <p><b>
        <span class="font-danger" v-if="info.conf.rule.required">*</span>
        <span v-if="seq !== -1">{{seq}}.</span>
        {{ info.title }}
        <span v-if="info.code !== ''">(素材编号：{{info.code}})</span>
      </b></p>
      <p class="font-info ma-tb-10">{{ info.desc }}</p>
      <component :is="renderComp(info.type).componentShow" :info="info" ref="child" :disabled="disabled"></component>
    </el-card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  /* 中间展示区 */
  import commonShow from './commonShow'
  import RadioShow from './RadioShow'
  import InputShow from './InputShow'
  import TextareaShow from './TextareaShow'
  import IntegerShow from './IntegerShow'
  import DecimalShow from './DecimalShow'
  import ImageShow from './ImageShow'

  export default {
    name: 'common-show',
    props:{
      info:{
        type: Object,
        default: () => ({})
      },
      showActions: {
        type:Boolean,
        default: true
      },
      canEdit: {
        type:Boolean,
        default: true
      },
      disabled: {
        type:Boolean,
        default: true
      },
      seq: {
        type:Number,
        default: -1
      }
    },
    computed:{
      ...mapGetters(['formMapList'])
    },
    components: {
      commonShow, InputShow, RadioShow, TextareaShow, IntegerShow, DecimalShow, ImageShow
    },
    methods: {
      renderComp (type) {
        return this.formMapList.filter(item => item.type === type)[0]
      },
      checkParams () {
        return this.$refs.child.checkParams()
      }
    }
  }
</script>
<style >
  .showCell { position: relative; border:1px solid transparent;}
  .cell-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    margin-left: -15px;
    font-size: 15px;
    line-height: 20px;
    color: #18e5ec;
    display: none;
    background-color: #fff;
    border:1px solid #18e5ec;
    border-radius: 50%;
    z-index: 1000;
    cursor: pointer;
  }
  .cell-icon.el-icon-arrow-up {left:50%;top:-10px;}
  .cell-icon.el-icon-arrow-down {left:50%;bottom:-10px;}
  .cell-icon.el-icon-close {right:-10px;top:-10px;}
  .showCell.active:hover { border:1px dashed #18e5ec; }
  .showCell.active:hover .cell-icon {display: block;}
</style>
