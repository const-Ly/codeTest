<template>
  <div class="cms">
    <el-card class="box-card">
      <div class="clearfix">
        <span>消息模板库（{{templateLibrary.total}}条）</span>
        <el-button class="fr ma-l-20" type="primary" @click="showDialog({type:`添加`})">添加</el-button>
      </div>
      <!-- 查询表单 -->
      <el-form :inline="true">
        <el-form-item label="状态">
          <el-select v-model="local_search.status" style="width: 120px;">
            <el-option label="全部" value></el-option>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板ID">
          <el-input class="w400" maxlength="100" v-model.trim="local_search.templateId"></el-input>
        </el-form-item>
        <el-form-item label="模板标题">
          <el-input class="w400" maxlength="40" v-model.trim="local_search.title"></el-input>
        </el-form-item>

        <el-button type="primary" @click="serach">查 询</el-button>

        <el-button type="primary" plain @click="clear">清 空</el-button>
      </el-form>
      <!-- 模板库分页列表 -->
      <el-table :data="templateLibrary.list" stripe style="width:100%">
        <el-table-column label="编号" prop="id" width="200"></el-table-column>
        <el-table-column label="模板ID" prop="templateId" width="400"></el-table-column>
        <el-table-column label="模板标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status">启用</span>
            <span v-else style="color:#F56C6C;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="最后编辑人">
          <template slot-scope="scope">{{scope.row.operator}}&nbsp;{{scope.row.operateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span class="font-blue" @click="showDialog({ type: `编辑`, id: scope.row.id })">编 辑</span>
            <span>|</span>
            <span
              class="font-blue"
              @click="confirm({id:scope.row.id,status:scope.row.status?0:1})"
            >{{scope.row.status?"禁用":"启用"}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="cms-pagination" v-if="templateLibrary.pages>0">
        <el-pagination
          :current-page.sync="templateLibrary.param.pageNum"
          @current-change=" getList "
          background
          :page-count="templateLibrary.pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      :title="templateLibrary.dialog.type"
      :visible.sync="templateLibrary.dialog.visible"
      width="30%"
    >
      <el-form label-width="100px">
        <el-form-item label="编号：" v-if="templateLibrary.dialog.type===`编辑`">
          <span>{{templateLibrary.dialog.param.id}}</span>
        </el-form-item>
        <el-form-item label="模板ID：" class="text-label">
          <span
            v-if="templateLibrary.dialog.type===`编辑`"
          >{{templateLibrary.dialog.param.templateId}}</span>
          <el-input
            v-else
            type="textarea"
            maxlength="100"
            :rows="2"
            v-model.trim="templateLibrary.dialog.param.templateId"
          ></el-input>
        </el-form-item>
        <el-form-item label="模板标题：" class="text-label">
          <el-input maxlength="30" v-model.trim="templateLibrary.dialog.param.title"></el-input>
        </el-form-item>
        <el-form-item label="模板状态：" class="text-label">
          <el-select
            v-model="templateLibrary.dialog.param.status"
            placeholder="请选择"
            style="width: 120px;"
          >
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <div class="ma-t-20 align-center">
          <el-button type="primary" @click="submit">提交保存</el-button>
          <el-button type="primary" plain @click="closeDialog">返回</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 此页面使用了vuex作状态提升和逻辑分离，具体路径见 "../../store/appletsSubscribeMessages"
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      local_search: {
        status: "",
        templateId: "",
        title: ""
      }
    };
  },

  mounted() {
    this.getList({
      pageNum: 1,
      id: "",
      templateId: "",
      title: "",
      status: ""
    });
  },

  methods: {
    ...mapActions({
      getList: "appletsSubscribeMessages_templateLibrary_getList",
      showDialog: "appletsSubscribeMessages_templateLibrary_showDialog",
      submitDialog: "appletsSubscribeMessages_templateLibrary_submitDialog",
      closeDialog: "appletsSubscribeMessages_templateLibrary_closeDialog",
      changeStatus: "appletsSubscribeMessages_templateLibrary_changeStatus"
    }),
    // 搜索
    serach() {
      this.getList({
        pageNum: 1,
        status: this.local_search.status,
        templateId: this.local_search.templateId,
        title: this.local_search.title
      });
    },
    // 清空搜索项
    clear() {
      for (let attr in this.local_search) {
        this.local_search[attr] = "";
      }
    },
    // 二次确认
    confirm(obj) {
      this.$confirm(`确认${obj.status ? "启用" : "禁用"}该模板吗？`, "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否"
      }).then(() => {
        this.changeStatus(obj);
      });
    },
    // 模板库弹层提交
    submit() {
      if (!this.templateLibrary.dialog.param.templateId) {
        this.$message.warning("请输入模板ID");
        return false;
      }
      if (!this.templateLibrary.dialog.param.title) {
        this.$message.warning("请输入模板标题");
        return false;
      }
      if (this.templateLibrary.dialog.param.status === "") {
        this.$message.warning("请选择模板状态");
        return false;
      }
      this.submitDialog();
    }
  },

  computed: {
    ...mapState({
      templateLibrary: state => state.appletsSubscribeMessages.templateLibrary
    })
  }
};
</script>

<style scoped>
</style>