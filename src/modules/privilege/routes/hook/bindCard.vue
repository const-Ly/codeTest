<template>
  <div class="cms">
    <el-card>
      <div class="card-header">
        <div>
          <span>项目名称：{{details.projectName}}</span>
          <span>场景名称：{{details.sceneName}}</span>
        </div>
        <div class="btn-group">
          <el-button @click="goBack">返回</el-button>
          <el-button type="primary" @click="bindCard">添加关联</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="mar">
      <el-table :data="list" style="width:100%">
        <el-table-column label="道具批次" prop="id"></el-table-column>
        <el-table-column label="道具类型" prop="type">
          <template slot-scope="scope">{{opts.type[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="道具卡状态" prop="type">
          <template slot-scope="scope">{{opts.status[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="关联人" prop="operator"></el-table-column>
        <el-table-column label="有效时间" width="140">
          <template
            slot-scope="scope"
          >{{scope.row.startEffectTime | date2str}} - {{scope.row.endEffectTime | date2str}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template
            slot-scope="scope"
          >{{opts.relateStatus[scope.row.relateStatus]}}{{scope.row.relateStatus == 3 ? `（${scope.row.disuseBy}）` : ''}}</template>
        </el-table-column>
        <el-table-column label="操作" prop="id">
          <template slot-scope="scope">
            <template v-if="scope.row.relateStatus === 0 || scope.row.relateStatus === 1">
              <span class="font-blue" @click="invaildCard(scope.row.sceneCardId)">作废</span>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="total>page.pageSize">
        <el-pagination
          :current-page.sync="page.pageNum"
          :page-size="page.pageSize"
          @current-change="getList"
          background
          :total="total"
          :pager-count="5"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog title="添加关联" :visible.sync="isShowBind" width="800px" @close="bindDialogClose">
      <div class="effect-time">
        <span>关联生效时间：</span>
        <el-date-picker
          v-model="bindParams.effectTime"
          type="datetimerange"
          :editable="false"
          format="yyyy-MM-dd HH:mm"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="onTimeChange"
        ></el-date-picker>
      </div>
      <div class="search">
        <span>道具类型：</span>
        <el-select
          v-model="searchParams.type"
          placeholder="请选择"
          style="width: 120px;margin-right: 16px"
        >
          <el-option label="全部" value></el-option>
          <el-option label="全民拼卡" :value="1"></el-option>
          <el-option label="参团卡" :value="2"></el-option>
          <el-option label="抽奖卡" :value="3"></el-option>
          <el-option label="金币" :value="4"></el-option>
          <el-option label="立减金" :value="6"></el-option>
          <el-option label="买二反一卡" :value="8"></el-option>
          <el-option label="超级回馈卡" :value="7"></el-option>
          <el-option label="保护罩" :value="9"></el-option>
        </el-select>
        <el-input
          placeholder="道具批次"
          v-model="searchParams.id"
          :clearable="true"
          style="width: 240px;margin-right: 16px"
        ></el-input>
        <el-button type="primary" @click="getCardList(1)">搜索</el-button>
      </div>

      <el-table :data="cardList" border size="small">
        <el-table-column label width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="bindParams.propsCardId">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="道具批次" prop="id"></el-table-column>
        <el-table-column label="道具类型" prop="type">
          <template slot-scope="scope">{{opts.type[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="有效期">
          <template slot-scope="scope">
            <template v-if="scope.row.type === 4">
              <span>--</span>
            </template>
            <template v-else>
              <template v-if="scope.row.periodStrategy === 1">{{scope.row.periodDays}}天</template>
              <template v-else>{{scope.row.periodHours}}小时{{scope.row.periodMinutes | numFormat}}分</template>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="剩余数量">
          <template slot-scope="scope">
            <template v-if="scope.row.type === 4">
              <span>--</span>
            </template>
            <template v-else>
              <template v-if="scope.row.limitStatus">{{scope.row.remainAmount}}</template>
              <template v-else>不限量</template>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="最后操作" prop="operator"></el-table-column>
      </el-table>
      <!--分页信息 -->
      <div class="align-center ma-t-20" v-if="cardTotal>cardPage.pageSize">
        <el-pagination
          :current-page.sync="cardPage.pageNum"
          :page-size="cardPage.pageSize"
          @current-change="getCardList"
          :total="cardTotal"
          background
          :pager-count="5"
          layout="prev, pager, next"
        ></el-pagination>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmitBind">确认关联</el-button>
        <el-button @click="bindDialogClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "bindCard",
  data() {
    return {
      id: this.$route.params.id,
      opts: {
        status: ['草稿', '生效中', '已结束'],
        type: [
          '',
          '全民拼卡',
          '参团卡',
          '抽奖卡',
          '金币',
          '',
          '立减金',
          '超级回馈卡',
          '买二反一卡',
          '保护罩'
        ],
        relateStatus: ['待生效', '生效中', '已过期', '已作废', '已失效']
      },
      list: [],
      cardList: [],
      details: {},
      page: {
        pageNum: 1,
        pageSize: 20
      },
      total: 201,
      isShowBind: false,
      bindParams: {
        propsCardId: '',
        effectTime: []
      },
      searchParams: {
        id: '',
        type: ''
      },
      cardPage: {
        pageNum: 1,
        pageSize: 20
      },
      cardTotal: 331
    };
  },
  mounted() {
    this.getDetail();
    this.getList();
  },
  methods: {
    onTimeChange(val) {
      if (val && val.length > 1) {
        if (new Date(val[1]).getTime() <= new Date(val[0]).getTime()) {
          this.bindParams.effectTime = [];
          this.$message.warning('结束时间必须大于开始时间');
        }
      }
    },
    getDetail() {
      this.$service.privilege.hook
        .getSceneDetail({ sceneId: this.id })
        .then(res => {
          this.details = res;
        });
    },
    getList(index = 1) {
      const params = {
        pageNum: index,
        pageSize: this.page.pageSize,
        sceneId: this.id
      };
      this.$service.privilege.hook.getRefPropsByPage(params).then(res => {
        this.total = res.total;
        this.list = res.list;
        this.page.pageNum = res.pageNum;
      });
    },
    getCardList(index = 1) {
      this.bindParams.propsCardId = '';
      const params = {
        pageNum: index,
        pageSize: this.cardPage.pageSize
      };
      if (this.searchParams.id) {
        params.id = this.searchParams.id;
      }
      if (this.searchParams.type) {
        params.type = this.searchParams.type;
      }
      this.$service.privilege.hook.propsPageList(params).then(res => {
        this.cardTotal = res.total;
        this.cardList = res.list;
        this.cardPage.pageNum = res.pageNum;
      });
    },
    invaildCard(sceneCardId) {
      this.$confirm('你确认作废该场景与该道具的关联？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$service.privilege.hook
          .removePropsRelation({ sceneCardId })
          .then(res => {
            this.getList();
          });
      });
    },
    bindCard() {
      this.isShowBind = true;
      this.getCardList();
    },
    bindDialogClose() {
      this.isShowBind = false;
      this.bindParams.propsCardId = '';
      this.bindParams.effectTime = [];
      setTimeout(()=>{
        this.searchParams.id = '';
        this.searchParams.type = '';
      },300)
    },
    onSubmitBind() {
      const params = {
        sceneId: this.id,
        projectId: this.details.projectId,
        sceneIdentify: this.details.sceneIdentify
      };
      const effectTime = this.bindParams.effectTime;
      if (Array.isArray(effectTime) && effectTime.length > 1 && effectTime[0]) {
        params.startEffectTime = effectTime[0];
      } else {
        this.$message.warning('请选择关联生效时间');
        return false;
      }
      if (Array.isArray(effectTime) && effectTime.length > 1 && effectTime[1]) {
        params.endEffectTime = effectTime[1];
      } else {
        this.$message.warning('请选择关联生效时间');
        return false;
      }
      if (this.bindParams.propsCardId) {
        params.propsCardId = this.bindParams.propsCardId;
      } else {
        this.$message.warning('请关联一个生效中的道具卡');
        return false;
      }
      this.$service.privilege.hook.savePropsRelation(params).then(res => {
        this.$message.success('关联成功');
        this.bindDialogClose();
        this.getList();
      });
    },
    goBack() {
      this.$router.back();
    }
  },
  filters: {
    numFormat(v) {
      return v > 9 ? v : '0' + v;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.fullPath === '/hook') {
      this.$store.commit('setProjectId', this.details.projectId);
    }
    next();
  }
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header span {
  padding-right: 20px;
}
.card-header .btn-group {
  width: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.mar {
  margin-top: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.join-txt {
  padding: 0 5px;
}
.search {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 0 20px;
}
.search .el-input {
  margin-right: 10px;
}
</style>
