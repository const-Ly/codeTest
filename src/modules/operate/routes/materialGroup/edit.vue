<template>
  <div class="cms">
    <el-card>
      <common-show
        :disabled="false"
        :ref="'show'+idx"
        v-for="(e, idx) in data.group"
        :key="idx"
        :show-actions="false"
        :info="e"
      ></common-show>
      <p class="mar-t20">
        <el-button type="primary" @click="edit">提交保存</el-button>
      </p>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from 'vuex'
import commonShow from '../components/commonShow'

export default {
  name: 'edit',
  data () {
    return {
      data: {
        code: this.$route.params.id,
        name: '', // 名称
        scope: '', // 范围
        desc: '', // 描述
        group: []
      }
    }
  },
  components: {
    commonShow
  },
  methods: {
    ...mapMutations(['updateFormReadonlyRole']),
    getData (idx) {
      document.getElementsByClassName('el-breadcrumb__inner')[2].innerHTML =
        this.data.name + '（素材组编号：' + this.data.code + '）'
      this.$service.operate.material
        .detail({ groupId: this.data.code })
        .then((res) => {
          if (res) {
            this.data = res
            this.data.group = res.group.map((item) => {
              item.conf.rule =
                typeof item.conf.rule === 'string'
                  ? JSON.parse(item.conf.rule)
                  : item.conf.rule
              if (item.type === '01') {
                item.conf.data = +item.conf.data
              }
              return item
            })
            document.getElementsByClassName(
              'el-breadcrumb__inner'
            )[2].innerHTML =
              this.data.name + '（素材组编号：' + this.data.code + '）'
          }
        })
    },
    checkParams () {
      for (let i = 0, len = this.data.group.length; i < len; i++) {
        if (!this.$refs['show' + i][0].checkParams()) return false
      }
      return true
    },
    reParam () {
      let param = {
        code: this.data.code || null,
        name: this.data.name,
        scope: this.data.scope,
        desc: this.data.desc,
        group: []
      }
      this.data.group.forEach((res) => {
        let obj = {}
        for (let key in res) {
          if (key === 'conf') {
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
    edit () {
      if (this.checkParams()) {
        let param = this.reParam()
        this.$service.operate.material.contentSave(param).then((res) => {
          res && this.$message.success('保存成功')
        })
      }
    }
  },
  mounted () {
    this.updateFormReadonlyRole(false)
    this.getData()
  }
}
</script>

<style type="text/css" scoped>
.btn {
  margin: 5px 5px 0 0;
}
</style>
