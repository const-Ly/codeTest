<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="状态：">
          <el-select v-model="param.status" placeholder="请选择" style="width: 300px;" clearable class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="生效中" :value="1"></el-option>
            <el-option label="已作废" :value="2"></el-option>
            <el-option label="草稿" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组编号：">
          <el-input class="w300"
          @input="$utils.onlyNum(param, 'userGroupId', param.userGroupId)" maxlength="40" v-model.trim="param.userGroupId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="组名称：">
          <el-input class="w300" maxlength="40" v-model.trim="param.userGroupName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">用户组</span>
        <router-link :to="{ path: '/userGroupManagement/add/add',append:true }" target="_blank">
          <el-button class="fr" size="small" type="primary">添加组</el-button>
        </router-link>
      </div>
      <el-table :data="dataList" style="width: 100%" :default-expand-all="false">
        <el-table-column label="组编号" prop="userGroupId"></el-table-column>
        <el-table-column label="组名称" prop="userGroupName"></el-table-column>
        <el-table-column label="预估人数">
          <template slot-scope="scope">
              {{scope.row.peopleNum | placeholder}}
          </template>
        </el-table-column>
        <el-table-column label="优先级" prop="priority"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">生效中</span>
            <span v-if="scope.row.status == 2">已作废</span>
            <span v-if="scope.row.status == 0">草稿</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="operateTime"></el-table-column>
        <el-table-column label="操作人" prop="operator"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="modifyStatus(scope.row.userGroupId, true)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.status == 0"
            >启用</el-button>

            <el-button
              @click="modifyStatus(scope.row.userGroupId, false)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.status == 1"
            >作废</el-button>

            <router-link
              class="font-blue ma-r-10"
              target="_blank"
              :to="{ path: '/userGroupManagement/edit/edit/'+scope.row.userGroupId, append:true }"
            >管理组</router-link>

            <router-link
              class="font-blue ma-r-10"
              target="_blank"
              :to="{ path: '/userGroupManagement/log/'+scope.row.userGroupId, append:true }"
            >日志</router-link>

            <span style="display: inline-block;" v-if="scope.row.status != 0">
              <router-link
                class="font-blue"
                target="_blank"
                :to="{ path: '/userGroupManagement/relation/'+scope.row.userGroupId, append:true }"
              >关联弹窗（{{scope.row.relationPopNum}}）</router-link>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageNum"
          @current-change="getList"
          background
          :page-count="pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "userGroupManagement",
  data() {
    return {
      pages: 0,
      param: {
        pageNum: 1,
        pageSize: 20,
        userGroupId: '', // 用户组编号
        userGroupName: '', // 用户组名称
        status: '', // 用户组状态0-草稿，1-生效中，2-已作废; 不填代表全部
      },
      dataList: [ // 列表数据
        // {
        //   userGroupId: '', // 用户组编号
        //   userGroupName: '', // 用户组名称
        //   peopleNum: '', // 用户组人数
        //   priority: '', // 优先级
        //   status: '', // 状态（0-草稿，1-生效中，2-已作废;）
        //   relationPopNum: '', // 有效关联弹窗数量
        //   operator: '', // 操作人
        //   operateTime: '' // 操作时间（格式：yyyy-MM-dd HH:mm:ss）
        // }
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取数据
    getList(val) {
      this.param.pageNum = val || 1;
      this.$service.systemSetting.userGroupManagement.queryByPage(this.param).then(res => {
        this.dataList = res.list;
        this.param.pageNum = res.pageNum;
        this.pages = res.pages;
      });
    },
    reset () {
      this.param = {
        pageNum: 1,
        pageSize: 20,
        userGroupId: '', 
        userGroupName: '', 
        status: ''
      }
    },
    modifyStatus (userGroupId, enableStatus) {
      let str = enableStatus ? '你是否确定启用该用户组？' : '是否确定作废该用户组？'

      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.systemSetting.userGroupManagement.modifyStatus({
          userGroupId,
          enableStatus
        }).then(res => {
          this.$message.success("操作成功");
          this.getList(1)
        });
      }).catch(() => {
        // 取消             
      });
    }
  },
};
</script>
<style scoped>
</style>

