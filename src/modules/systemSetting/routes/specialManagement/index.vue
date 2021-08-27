<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="专题状态：">
          <el-select v-model="param.projectStatus" placeholder="请选择" clearable class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="草稿" :value="3"></el-option>
            <el-option label="生效中" :value="1"></el-option>
            <el-option label="已作废" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" label-width="0">
          <el-select v-model="searchType" placeholder="" class="labelSelect w150" @change="searchTypeChange">
            <el-option label="专题编号：" :value="1"></el-option>
            <el-option label="专题名称：" :value="2"></el-option>
          </el-select>

          <el-input class="w300" v-show="searchType === 1"  @input="$utils.onlyNum(param, 'projectId', param.projectId)" maxlength="40" v-model.trim="param.projectId" placeholder="请输入"></el-input>
          <el-input class="w300" maxlength="40" v-show="searchType === 2" v-model.trim="param.projectName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">专题列表</span>
        <router-link :to="{ path: '/specialManagement/add',append:true }" target="_blank">
            <el-button class="fr" size="small" type="primary">添加</el-button>
          </router-link>
      </div>
      <el-table :data="dataList" style="width: 100%" :default-expand-all="false">
        <el-table-column label="专题编号" prop="projectId"></el-table-column>
        <el-table-column label="专题名称" prop="projectName"></el-table-column>
        <el-table-column label="最后编辑时间" prop="operateTime"></el-table-column>
        <el-table-column label="最后编辑人" prop="operator"></el-table-column>
        <el-table-column label="专题状态" prop="operator">
          <template slot-scope="scope">
            <span v-if="scope.row.projectStatus == 1">生效中</span>
            <span v-if="scope.row.projectStatus == 2">已作废</span>
            <span v-if="scope.row.projectStatus == 3">草稿</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link
              class="font-blue ma-r-10"
              target="_blank"
              v-if="scope.row.projectStatus == 1 || scope.row.projectStatus == 3"
              :to="{ path: '/specialManagement/edit/edit/'+scope.row.projectId, append:true }"
            >编辑</router-link>
            <el-button
              @click="modifyStatus(scope.row.projectId, 1)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.projectStatus == 3"
            >启用</el-button>
            <el-button
              @click="modifyStatus(scope.row.projectId, 2)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.projectStatus == 1 || scope.row.projectStatus == 3"
            >作废</el-button>
            <el-button
              @click="modifyStatus(scope.row.projectId, 3)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.projectStatus == 3"
            >删除</el-button>

            <router-link
              class="font-blue ma-r-10"
              target="_blank"
              :to="{ path: '/specialManagement/copy/copy/'+scope.row.projectId, append:true }"
            >复制</router-link>

            <el-button
              @click="viewLinks(scope.row.projectId)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.projectStatus == 1"
            >查看链接</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change="getList "
          background
          :page-count="pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="专题链接跳转信息"
      :visible.sync="dialogVisible"
      @close="close"
      width="40%">
      <el-form label-width="150px" size="small">
        <el-form-item label="Android路由：">
          {{viewLinksInfo.projectAndroidRoute}}
        </el-form-item>
        <el-form-item label="IOS路由：">
          {{viewLinksInfo.projectIosRoute}}
        </el-form-item>
        <el-form-item label="小程序路由：">
          {{viewLinksInfo.projectMiniappRoute}}
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "specialManagement",
  data() {
    return {
      pages: 0,
      param: {
        pageNum: 1,
        pageSize: 20,
        projectId: '', // 专题编号
        projectName: '', // 专题名称
        projectStatus: '', // 专题状态,1-生效中2-已作废3-草稿,不传，则查全部
      },
      searchType: 1, // 专题搜索类型 ， 1专题编号，2专题名称
      dataList: [ // 列表数据
        // {
        //   projectId: '', // 专题编号
        //   projectName: '', // 专题名称
        //   projectStatus: '', // 专题状态,1-生效中2-已作废3-草稿,不传，则查全部
        //   operator: '', // 操作人
        //   operateTime: '' // 操作时间（格式：yyyy-MM-dd HH:mm:ss）
        // }
      ],
      dialogVisible: false, // 专题链接跳转信息弹窗
      viewLinksInfo: {
        projectIosRoute: '', // IOS跳转路由
        projectAndroidRoute: '', // 安卓跳转路由
        projectMiniappRoute: '', // 小程序跳转路由
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取数据
    getList(val) {
      this.param.pageNum = val || 1;
      console.log(2111, this.param)
      this.$service.systemSetting.specialManagement.queryByPage(this.param).then(res => {
        this.dataList = res.list;
        this.param.pageNum = res.pageNum;
        this.pages = res.pages;
      });
    },
    reset () {
      this.searchType = 1
      this.param = {
        pageNum: 1,
        pageSize: 20,
        projectId: '', // 专题编号
        projectName: '', // 专题名称
        projectStatus: '' // 专题状态,1-生效中2-已作废3-草稿,不传，则查全部
      }
    },
    modifyStatus (projectId, modifyStatus) {
      let str = ''
      if (modifyStatus === 1) {
        str = '确认启用该专题？'
      } else if (modifyStatus === 2) {
        str = '确认作废该专题？'
      } else if (modifyStatus === 3) {
        str = '确认删除该专题？'
      }
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.systemSetting.specialManagement.modifyStatus({
          projectId,
          modifyStatus
        }).then(res => {
          this.$message.success("操作成功");
          this.getList(1)
        });
      }).catch(() => {
        // 取消             
      });
    },
    searchTypeChange () {
      this.param.projectId = ''
      this.param.projectName = ''
    },
    viewLinks (projectId) {
      this.$service.systemSetting.specialManagement.queryProjectRouteById({projectId}).then(res => {
        this.dialogVisible = true; 
        this.viewLinksInfo = res || {}
      });
    },
    close () {
      this.dialogVisible = false;
      this.viewLinksInfo = {
        projectIosRoute: '', // IOS跳转路由
        projectAndroidRoute: '', // 安卓跳转路由
        projectMiniappRoute: '', // 小程序跳转路由
      }
    }
  },
};
</script>
<style scoped>
  .el-table .cell img{
    cursor: pointer;
  }
</style>

