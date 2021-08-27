<template>
  <el-select
    v-model="val"
    filterable
    remote
    :remote-method="remoteMethod"
    clearable
    @focus="initMethod"
    @change="onValChange"
    :loading="loading"
    placeholder="请选择"
  >
    <el-option
      v-for="item in options"
      :key="item.customerId"
      :label="item.nickName"
      :value="item.customerId"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'DVLenovoSearch',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      options: [],
      val: '',
      loading: false
    }
  },

  methods: {
    remoteMethod (query) {
      this.loading = true
      let param = {
        nickName: query || '',
        userType: 1
      }
      this.$service.common.searchDVListByName(param).then(res => {
        this.options = res
        this.loading = false
      })
    },
    initMethod () {
      if (!this.value) {
        this.remoteMethod()
      }
    },
    onValChange () {
      this.$emit('input', this.val)
    }
  },

  watch: {
    value (v) {
      if (!v && v !== this.val) {
        this.val = v
      }
    }
  },
}
</script>

<style scoped></style>
