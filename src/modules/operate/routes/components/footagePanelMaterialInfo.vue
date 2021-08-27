<template>
  <div>
    <common-show v-for="(e, idx) in groupList" :key="idx" :show-actions="false" :disabled="true" :info="e" :seq="idx+1"></common-show>
  </div>
</template>

<script>
	import commonShow from './commonShow'
  import { mapMutations } from 'vuex'
  export default {
    name: 'footagePanelMaterialInfo',
    props: {
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
