<template>
  <div class="log">
    <el-table :data="params.list" border style="width: 100%">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span>{{scope.row.operateName}}</span>
        </template>  
      </el-table-column>
      <el-table-column prop="id" label="内容">
        <template slot-scope="scope">
          <span class="check" @click="checked(scope.row.detail)">查看</span>
        </template>  
      </el-table-column>
      <el-table-column prop="operator" label="操作人"></el-table-column>
      <el-table-column label="操作时间"  prop="operateTime"></el-table-column>
    </el-table>
    <el-pagination :current-page.sync="params.pageNum" :page-count="params.pages" @current-change="getList" background layout="prev, pager, next"></el-pagination>

    <el-dialog title="查看" width="600px" :visible.sync="dialogTableVisible">
      <div class="detail" v-if="detail">
          <ul v-if="detail.name">
              <li>名称</li>
              <li>{{detail.name}}</li>
          </ul>
          <ul v-if="detail.imageUrl">
              <li>图标</li>
              <li><img :src="detail.imageUrl" style="width:20px;height:20px;margin-top: 5px"></li>
          </ul>
          <ul v-if="detail.jumpTypeName">
              <li>跳转类型</li>
              <li>{{detail.jumpTypeName}}</li>
          </ul>
          <ul v-if="detail.jumpContent && detail.jumpContent.jumpParam">
              <li>跳转参数</li>
              <li>{{detail.jumpContent.jumpParam}}</li>
          </ul>
          <ul v-if="detail.jumpContent && detail.jumpContent.jumpParamDisplayName">
              <li>跳转参数名称</li>
              <li>{{detail.jumpContent.jumpParamDisplayName}}</li>
          </ul>
          <ul v-if="detail.businessTypeName">
              <li>业务类型</li>
              <li>{{detail.businessTypeName}}</li>
          </ul>
          <ul v-if="detail.enableTime">
              <li>启用时间</li>
              <li>{{detail.enableTime}}</li>
          </ul>
          <ul v-if="detail.disableTime">
              <li>禁用时间</li>
              <li>{{detail.disableTime}}</li>
          </ul>
          <ul v-if="detail.sequence">
              <li>导航排序</li>
              <li>{{detail.sequence}}</li>
          </ul>
          <ul v-if="detail.superscriptUrl">
              <li>角标图片</li>
              <li><img :src="detail.superscriptUrl" style="width:20px;height:20px;margin-top: 5px"></li>
          </ul>
          <ul v-if="detail.jumpContent && detail.jumpContent.customerIsShow">
              <li>角标开关</li>
              <li>{{detail.jumpContent.customerIsShow}}</li>
          </ul>
          <ul v-if="detail.clientTypeDes">
              <li>终端类型</li>
              <li>{{detail.clientTypeDes}}</li>
          </ul>
          <ul v-if="detail.iosVersionInfo">
              <li>iOS版本</li>
              <li>{{detail.iosVersionInfo.versionFrom}} -- {{detail.iosVersionInfo.versionTo}}</li>
          </ul>
          <ul v-if="detail.androidVersionInfo">
              <li>Android版本</li>
              <li>{{detail.androidVersionInfo.versionFrom}} -- {{detail.androidVersionInfo.versionTo}}</li>
          </ul>
          <ul v-if="detail.jumpContent && detail.jumpContent.routing">
              <li>iOS路由地址</li>
              <li :title="detail.jumpContent.routing.iosRouting">{{detail.jumpContent.routing.iosRouting}}</li>
          </ul>
          <ul v-if="detail.jumpContent && detail.jumpContent.routing">
              <li>Android路由地址</li>
              <li :title="detail.jumpContent.routing.androidRouting">{{detail.jumpContent.routing.androidRouting}}</li>
          </ul>
          <ul v-if="detail.jumpContent && detail.jumpContent.routing">
              <li>小程序路由地址</li>
              <li :title="detail.jumpContent.routing.miniappRouting">{{detail.jumpContent.routing.miniappRouting}}</li>
          </ul>
          <ul v-if="detail.jumpContent && detail.jumpContent.routing">
              <li>M站路由地址</li>
              <li :title="detail.jumpContent.routing.mRouting">{{detail.jumpContent.routing.mRouting}}</li>
          </ul>
          <ul v-if="detail.customerTypeDes">
              <li>用户类型</li>
              <li>{{detail.customerTypeDes}}</li>
          </ul>
          <ul v-if="detail.createBy">
              <li>创建者</li>
              <li>{{detail.createBy}}</li>
          </ul>
          <ul v-if="detail.createTime">
              <li>创建时间</li>
              <li>{{detail.createTime}}</li>
          </ul>
          <ul v-if="detail.updateBy">
              <li>修改者</li>
              <li>{{detail.updateBy}}</li>
          </ul>
          <ul v-if="detail.updateTime">
              <li>修改时间</li>
              <li>{{detail.updateTime}}</li>
          </ul>
       </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogTableVisible: false,
      detail: false,
      pageNum: 1,
      pageSize: 20,
      navId: 0,
      params: {}
    }
  },
  methods: {
    checked (detail) {
      this.detail = JSON.parse(detail)
      this.dialogTableVisible = true
    },
    setParam () {
      return {
        pageIndex: this.params.pageNum,
        pageSize: this.pageSize,
        navId: this.navId
      }
    },
    getList () {
      this.navId = this.$route.query.id
      let param = this.setParam()
      this.$service.home.newOperatNav.logList(param).then(res => {
        this.params = res
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>
.log {
  background: #fff;
}
.detail ul {
  border-bottom: 1px #eee solid;
}
.detail li {
  vertical-align: middle;
  font-size: 14px;
  font-weight: normal;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 30px;
  text-align: left;
  max-width: 300px;
  line-height: 30px;
  display: inline-block;
}
.detail ul li:first-child  {
  width: 120px;
  padding-right: 10px;
  padding-left: 38px;
  text-align: right;
  border-right: 1px solid #eee;
}
.detail ul li:last-child {
  padding-left: 10px;
}
.check {
  cursor: pointer;
}
</style>
