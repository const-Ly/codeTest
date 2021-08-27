<template>
  <div class="ma-t-20">
    <el-card>
      <h4 class="ma-b-10">素材属性</h4>
      <div v-if="info.code">素材编号：{{ info.code }}</div>
      <div class="ma-tb-10">素材类型：{{ info.typeName }}</div>
      <div>
        素材名称：
        <span v-if="fromConfReadonly">{{ info.title }}</span>
        <el-input v-else class="w260" v-model="info.title" :maxlength="80"></el-input>
      </div>
      <div class="ma-tb-10">
        素材说明：
        <span v-if="fromConfReadonly">{{ info.desc }}</span>
        <el-input v-else class="w260 align-top" :rows="4" type="textarea" :maxlength="9999" v-model="info.desc"></el-input>
      </div>
      <component :is="renderComp(info.type).componentConf" :info="info.conf"></component>
    </el-card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  /* 右侧属性定义区域 */
  import commonConf from './commonConf'
  import RadioConf from './RadioConf'
  import InputConf from './InputConf'
  import TextareaConf from './TextareaConf'
  import IntegerConf from './IntegerConf'
  import DecimalConf from './DecimalConf'
  import ImageConf from './ImageConf'
  export default {
    name: 'common-conf',
    props:{
      info:{
        type: Object,
        default: () => ({})
      }
    },
    computed:{
      ...mapGetters(['formMapList','fromConfReadonly'])
    },
    components: {
      commonConf, RadioConf, InputConf, TextareaConf, IntegerConf, DecimalConf, ImageConf
    },
    methods: {
      renderComp (type) {
        return this.formMapList.filter(item => item.type === type)[0]
      }
    }
  }
</script>

<style>
.w260 {
  width: 260px;
}
</style>
