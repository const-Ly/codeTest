<template>
   <div class="info">
     <table v-if="info">
        <tbody>
          <tr class="banner-name">
              <td>名称</td>
              <td>{{info.name}}</td>
          </tr>
          <tr class="banner-img">
              <td>图标</td>
              <td><img :src="info.imageUrl" style="width:20px;height:20px;"></td>
          </tr>
          <tr class="banner-jump">
              <td>跳转类型</td>
              <td>{{info.jumpTypeName}}</td>
          </tr>
          <tr class="jump-param-display-name">
              <td>专题名称</td>
              <td></td>
          </tr>
          <tr class="jump-selection-tags">
              <td>选择标签</td>
              <td></td>
          </tr>
          <tr class="banner-enableTime">
              <td>启用时间</td>
              <td>{{info.enableTime}}</td>
          </tr>
          <tr class="banner-disableTime">
              <td>禁用时间</td>
              <td>{{info.disableTime}}</td>
          </tr>
          <tr class="banner-sort">
              <td>导航排序</td>
              <td>{{info.sequence}}</td>
          </tr>
          <tr class="corner-icon">
              <td>角标图片</td>
              <td><img :src="info.superscriptUrl" style="width:20px;height:20px;"></td>
          </tr>
          <tr class="corner-switch">
              <td>角标开关</td>
              <td>{{info.jumpContent.customerIsShow}}</td>
          </tr>
          <tr class="banner-createBy">
              <td>创建者</td>
              <td>{{info.createBy}}</td>
          </tr>
          <tr class="banner-createTime">
              <td>创建时间</td>
              <td>{{info.createTime}}</td>
          </tr>
          <tr class="banner-updateBy">
              <td>修改者</td>
              <td>{{info.updateBy}}</td>
          </tr>
          <tr class="banner-updateTime">
              <td>修改时间</td>
              <td>{{info.updateTime}}</td>
          </tr>
        </tbody>
    </table>
   </div>
</template>

<script>
export default {
  data () {
    return {
      info: false,
      id: 0
    }
  },
  methods: {
    request () {
      let id = this.id
      this.$service.home.newOperatNav.logInfo({operationNavigationBarId: id}).then(res => {
        this.params = res
      })
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.request()
  }
}
</script>

<style>
.info {
  background: #fff;
}
.info table {
      width: 100%;
    border-collapse: collapse;
}
.info td {
    vertical-align: middle;
    font-size: 14px;
    font-weight: normal;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid #dfdfdf;
    height: 42px;
    max-width: 72px;
    padding: 0 38px;
    text-align: left;
}
.info td:first-child  {
  width: 135px;
  text-align: right;
}
</style>


