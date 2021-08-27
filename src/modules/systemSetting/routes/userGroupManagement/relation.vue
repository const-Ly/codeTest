<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="关联状态：">
          <el-select v-model="param.relateStatus" placeholder="请选择" style="width: 300px;" clearable class="w300">
            <el-option label="全部" value=""></el-option>
            <el-option label="待开始" :value="1"></el-option>
            <el-option label="生效中" :value="2"></el-option>
            <el-option label="已过期" :value="3"></el-option>
            <el-option label="已失效" :value="4"></el-option>
            <el-option label="已作废" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="弹窗名称：">
          <el-input class="w300" maxlength="40" v-model.trim="param.popWindowName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="弹窗编号：">
          <el-input class="w300" @input="$utils.onlyNum(param, 'popWindowId', param.popWindowId)" maxlength="40" v-model.trim="param.popWindowId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span class="line-32">组编号：{{userGroupInfo.userGroupId}}</span>
        <el-button
        class="fr"
        size="small"
        v-if="userGroupInfo.status != 2"
        @click="dialogVisible = true; getPopupList(1)"
        type="primary">
          添加关联
        </el-button>
      </div>
      <el-table :data="dataList" style="width: 100%" :default-expand-all="false">
        <el-table-column label="弹窗编号" prop="popWindowId">
          <template slot-scope="scope">
            <router-link
              class="font-blue"
              :to="{ path: '/popupManagement/details/details/'+scope.row.popWindowId, append:true }"
            >{{scope.row.popWindowId}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="福利类型" prop="welfareTypeName"></el-table-column>
        <el-table-column label="轮巡序号" prop="turingNum"></el-table-column>
        <el-table-column label="关联人">
          <template slot-scope="scope">
              {{scope.row.operator}}（{{scope.row.operateTime}}）
          </template>
        </el-table-column>
        <el-table-column label="关联时间">
          <template slot-scope="scope">
              {{scope.row.relateStartTime}}-{{scope.row.relateEndTime}}
          </template>
        </el-table-column>
        <el-table-column label="关联状态">
          <template slot-scope="scope">
            <span v-if="scope.row.relateStatus == 1">待开始</span>
            <span v-if="scope.row.relateStatus == 2">生效中</span>
            <span v-if="scope.row.relateStatus == 3">已过期</span>
            <span v-if="scope.row.relateStatus == 4">已失效</span>
            <span v-if="scope.row.relateStatus == 5">已作废</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="cancel(scope.row.relateId)"
              class="ma-r-10"
              type="text"
              size="small"
              v-if="scope.row.relateStatus == 1 || scope.row.relateStatus == 2"
            >作废</el-button>
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
    <el-dialog
      @close="relateClose"
      title="添加关联"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="弹窗名称：">
          <el-input class="w300" maxlength="40" v-model.trim="popup.param.popWindowName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="弹窗编号：">
          <el-input class="w300" @input="$utils.onlyNum(popup.param, 'popWindowId', popup.param.popWindowId)" maxlength="40" v-model.trim="popup.param.popWindowId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getPopupList(1)">查询</el-button>
          <el-button @click="resetPopup">清空</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="popup.list" style="width: 100%" :default-expand-all="false">
        <el-table-column label="" width="80" align="right">
          <template slot-scope="scope">
            <el-radio :label="scope.row.popWindowId" v-model="popup.save.popWindowId" @change.native="popup.save.popWindowId = scope.row.popWindowId">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="弹窗编号" prop="popWindowId">
          <template slot-scope="scope">
            <router-link
              class="font-blue"
              target="_blank"
              :to="{ path: '/popupManagement/details/details/' + scope.row.popWindowId, append:true }"
            >{{scope.row.popWindowId}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="弹窗名称" prop="popWindowName"></el-table-column>
        <el-table-column label="福利类型" prop="welfareTypeName"></el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="popup.pages>0">
        <el-pagination
          style="text-align: right;"
          :current-page.sync="popup.param.pageNum"
          @current-change="getPopupList"
          background
          :page-count="popup.pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
      <el-form
      :inline="true"
      label-width="150px"
      size="small"
      class="pad-tb-20">
        <el-form-item label="关联时间：">
          <el-date-picker
            v-model = "popup.relateTime"
            type="datetimerange"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="轮巡序号：">
          <el-input class="w300"  @input="$utils.onlyNum(popup.save, 'turingNum', popup.save.turingNum)" maxlength="6" v-model.trim="popup.save.turingNum" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div class="align-center">
        <el-button type="primary" @click="save">确定</el-button>
        <el-button @click="dialogVisible = false; relateClose()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "relation",
  data() {
    return {
      pages: 0,
      param: {
        userGroupId: this.$route.params.id,
        pageNum: 1,
        pageSize: 20,
        popWindowId: '', // 弹窗编号
        popWindowName: '', // 弹窗名称
        relateStatus: '', // 关联状态1-待开始2-生效中3-已过期4-已失效5-已作废，不传，则查全部
      },
      dataList: [ // 列表数据
        // {
        //   relateId: '', // 用户组和弹窗的关联唯一编号
        //   popWindowId: '', // 弹窗唯一编号
        //   popWindowName: '', // 弹窗名称
        //   welfareType: '', // 福利类型，0-纯路由1-参团卡2-全民拼卡3-返现卡4-买二返一卡5-通用特权金6-金币
        //   welfareTypeName: '', // 福利类型名称
        //   turingNum: '', // 轮询序号
        //   relateStatus: '', // 关联状态1-待开始2-生效中3-已过期4-已失效5-已作废
        //   relateStartTime: '', // 关联开始时间（格式：yyyy-MM-dd HH:mm:ss）
        //   relateEndTime: '', // 关联结束时间
        //   operator: '', // 操作人
        //   operateTime: '' // 操作时间
        // }
      ],
      userGroupInfo: {
        userGroupId: '', // 用户组编号
        userGroupName: '', // 用户组名称
        peopleNum: '', // 用户组人数
        priority: '', // 优先级
        status: '', // 状态（0-草稿，1-生效中，2-已作废;）
        relationPopNum: '', // 有效关联弹窗数量
        operateTime: '' // 操作时间
      },
      dialogVisible: false,
      popup:{
        param: {
          pageNum: 1,
          pageSize: 20,
          popWindowId: '', // 弹窗编号
          popWindowName: '', // 弹窗名称
          status: 1 // 1-生效中2-已作废3-草稿不传，则查全部
        },
        pages: 0,
        list: [
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
        relateTime: [], // 关联时间
        save: {
          userGroupId: this.$route.params.id,
          popWindowId: '', // 弹窗唯一编号
          turingNum: '', // 轮询序号
          relateStartTime: '', // 关联开始时间
          relateEndTime: '' // 关联结束时间
        }

      }
    };
  },
  mounted() {
    this.getUserGroupInfo();
    this.getList();
  },
  methods: {
    // 获取数据
    getList(val) {
      this.param.pageNum = val || 1;
      this.$service.systemSetting.userGroupManagement.getRelationList(this.param).then(res => {
        this.dataList = res.list;
        this.param.pageNum = res.pageNum;
        this.pages = res.pages;
      });
    },
    // 获取添加弹窗数据
    getPopupList(val) {
      this.popup.param.pageNum = val || 1;
      this.$service.systemSetting.popupManagement.queryByPage(this.popup.param).then(res => {
        this.popup.list = res.list;
        this.popup.param.pageNum = res.pageNum;
        this.popup.pages = res.pages;
      });
    },
    reset () {
      this.param = {
        userGroupId: this.$route.params.id,
        pageNum: 1,
        pageSize: 20,
        popWindowId: '', 
        popWindowName: '', 
        relateStatus: ''
      }
    },
    resetPopup () {
      this.popup.param = {
        pageNum: 1,
        pageSize: 20,
        popWindowId: '', 
        popWindowName: ''
      }
    },
    getUserGroupInfo () {
      this.$service.systemSetting.userGroupManagement.getUserGroupInfo({id: this.$route.params.id}).then(res => {
        this.userGroupInfo = res || {}
      });
    },
    cancel (relateId) {
      this.$confirm('你确认作废本用户组关联的该弹窗吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.systemSetting.userGroupManagement.cancel({relateId}).then(res => {
          this.$message.success("操作成功");
          this.getList(1)
        });
      }).catch(() => {
        // 取消             
      });
    },
    relateClose () {
      this.popup.relateTime = []
      this.popup.param = {
        pageNum: 1,
        pageSize: 20,
        popWindowId: '', // 弹窗编号
        popWindowName: '', // 弹窗名称
        relateStatus: 2 // 关联状态1-待开始2-生效中3-已过期4-已失效5-已作废，不传，则查全部
      }
      this.popup.save = {
        userGroupId: this.$route.params.id,
        popWindowId: '', // 弹窗唯一编号
        turingNum: '', // 轮询序号
        relateStartTime: '', // 关联开始时间
        relateEndTime: '' // 关联结束时间
      }
    },
    save () {
      if (!this.popup.save.popWindowId) {
        return this.$message.warning('请选择弹窗');
      }
      if (this.popup.relateTime.length < 2) {
        return this.$message.warning('请选择关联时间');
      }
      // 关联时间 开始时间<当前时间，或 开始时间>=结束时间
      if (
        new Date(this.popup.relateTime[0]).getTime() < new Date().getTime() ||
        new Date(this.popup.relateTime[0]).getTime() >= new Date(this.popup.relateTime[1]).getTime()
      ) {
        return this.$message.warning('开始时间必须大于当前时间，结束时间必须大于开始时间');
      }
      if (this.popup.save.turingNum === '') {
        return this.$message.warning('请输入0-999999轮巡序号');
      }
      this.popup.save.relateStartTime = this.popup.relateTime[0]
      this.popup.save.relateEndTime = this.popup.relateTime[1]
      this.$service.systemSetting.userGroupManagement.relatePopCreate(this.popup.save).then(res => {
        this.$message.success("提交保存成功");
        this.getList(1)
        this.dialogVisible = false;
      });
    }
  },
};
</script>
<style scoped>
  .pad-tb-20{
    padding: 20px 0;
  }
</style>

