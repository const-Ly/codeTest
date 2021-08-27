<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="弹窗编号：">
          <el-input class="w300"
          @input="$utils.onlyNum(param, 'popWindowId', param.popWindowId)"
          maxlength="40"
          v-model.trim="param.popWindowId"
          placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="弹窗名称：">
          <el-input class="w300" maxlength="40" v-model.trim="param.popWindowName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="福利类型：">
          <el-select v-model="param.welfareType" placeholder="请选择" style="width: 300px;" clearable class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="纯路由" :value="0"></el-option>
            <el-option label="参团卡" :value="1"></el-option>
            <el-option label="全民拼卡" :value="2"></el-option>
            <el-option label="返现卡" :value="3"></el-option>
            <el-option label="买二返一卡" :value="4"></el-option>
            <el-option label="通用特权金" :value="5"></el-option>
            <el-option label="金币" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="弹窗状态：">
          <el-select v-model="param.status" placeholder="请选择" style="width: 300px;" clearable class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="生效中" :value="1"></el-option>
            <el-option label="已作废" :value="2"></el-option>
            <el-option label="草稿" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <router-link :to="{ path: '/popupManagement/add',append:true }" target="_blank">
            <el-button class="fr" size="small" type="primary">添加</el-button>
          </router-link>
      </div>
      <el-table :data="dataList" style="width: 100%" :default-expand-all="false">
        <el-table-column label="弹窗编号" prop="popWindowId"></el-table-column>
        <el-table-column label="弹窗名称" prop="popWindowName"></el-table-column>
        <el-table-column label="福利类型" prop="welfareTypeName"></el-table-column>
        <el-table-column label="弹窗图片">
          <template slot-scope="scope">
            <div
            v-for="(item, idx) in scope.row.popWindowList"
            :key="idx">
              <img-view :src="item"></img-view>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="弹窗状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">生效中</span>
            <span v-if="scope.row.status == 2">已作废</span>
            <span v-if="scope.row.status == 3">草稿</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" prop="operateTime"></el-table-column>
        <el-table-column label="操作人" prop="operator"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="modifyStatus(scope.row.popWindowId, true)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.status == 3"
            >启用</el-button>

            <el-button
              @click="modifyStatus(scope.row.popWindowId, false)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.status == 1"
            >禁用</el-button>

            <router-link
              class="font-blue ma-r-10"
              v-if="scope.row.status == 1 || scope.row.status == 3"
              :to="{ path: '/popupManagement/edit/'+scope.row.popWindowId, append:true }"
            >编辑</router-link>

            <router-link
              class="font-blue"
              v-if="scope.row.status == 1 || scope.row.status == 2"
              :to="{ path: '/popupManagement/details/details/'+scope.row.popWindowId, append:true }"
            >查看</router-link>
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
  name: "popupManagement",
  data() {
    return {
      pages: 0,
      param: {
        pageNum: 1,
        pageSize: 20,
        popWindowId: '', // 弹窗编号
        popWindowName: '', // 弹窗名称
        welfareType: '', // 福利类型 0-纯路由,1-参团卡,2-全民拼卡,3-返现卡,4-买二返一卡,5-通用特权金,6-金币,不传则查全部
        status: 1 // 弹窗状态 1-生效中,2-已作废,3-草稿,不传则查全部
      },
      dataList: [ // 列表数据
        // {
        //   popWindowId: '', // 弹窗id
        //   popWindowName: '', // 弹窗名称
        //   welfareType: '', // 福利类型 0-纯路由,1-参团卡,2-全民拼卡,3-返现卡,4-买二返一卡,5-通用特权金,6-金币
        //   welfareTypeName: '', // 福利类型名称
        //   userIdList: [], // 用户白名单集合(0-3个不重复的用户ID)
        //   popWindowList: [], // 弹窗图片集合
        //   status: '', // 弹窗状态1-生效中2-已作废3-草稿
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
      console.log(111, this.param)
      this.$service.systemSetting.popupManagement.queryByPage(this.param).then(res => {
        this.dataList = res.list;
        this.param.pageNum = res.pageNum;
        this.pages = res.pages;
      });
    },
    // enableStatus: true启用，false禁用
    modifyStatus (popWindowId, enableStatus) {
      if (!enableStatus) {
        this.$confirm('是否确认禁用该弹窗，禁止后会影响当前正在使用中的弹窗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.enableStatus(popWindowId, enableStatus)
        }).catch(() => {
          // 取消             
        });
      }else {
        this.enableStatus(popWindowId, enableStatus)
      }
    },
    enableStatus (popWindowId, enableStatus) {
      this.$service.systemSetting.popupManagement.modifyStatus({
        popWindowId,
        enableStatus
      }).then(res => {
        this.$message.success("操作成功");
        this.getList(1)
      });
    }
  },
};
</script>
<style scoped>
  .el-table .cell img{
    cursor: pointer;
  }
</style>

