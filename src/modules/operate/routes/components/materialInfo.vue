<template>
  <div>
    <el-card class="alert-info mar-b15" v-if="flag">
      <p><b>{{ groupInfo.name }}（素材组编号：{{ groupInfo.code }}）</b></p>
      <p>{{ groupInfo.scope }}</p>
      <p>{{ groupInfo.desc }}</p>
    </el-card>
    <el-card class="alert-info mar-b15" v-else>
      <p>{{ groupInfo.scope }}</p>
      <p>{{ groupInfo.desc }}</p>
    </el-card>
    <common-show v-for="(e, idx) in groupList" :key="idx" :show-actions="false" :disabled="true" :info="e"></common-show>
  </div>
</template>

<script>
	import commonShow from './commonShow'
  import { mapMutations } from 'vuex'
  export default {
    props: {
      flag: {
        type: Boolean,
        default: true
      },
      groupInfo: {
        type: Object,
        default: {}
      },
      groupList: {
        type: Array,
        default: []
      }
    },
    methods: {
      ...mapMutations(['updateFormReadonlyRole']),
    },
    components:{
      commonShow
    },
    mounted() {
      this.updateFormReadonlyRole(true)
    }
  }
</script>

<style type="text/css" scoped>
	.mar-b15 {
		margin-bottom: 15px;
	}
	.alert-box .alert-info {
		background-color: #f2f2f2;
	}
	.alert-box .alert-info p {
		margin-top: 5px;
		line-height: 1.5;
	}
</style>
