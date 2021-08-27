<template>
  <div class="cms">
    <el-card class="box-card">
      <div class="clearfix">
        <span>模板授权（{{authorization.list.length}}条）</span>
        <el-button class="fr ma-l-20" style="opacity:0">此按钮不显示，存在仅为保持视觉UI一致</el-button>
      </div>
      <!-- 查询表单 -->
      <el-form :inline="true">
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
      <el-table :data="authorization.list" stripe style="width:100%">
        <el-table-column label="弹出授权时机" prop="opportunityDes"></el-table-column>
        <el-table-column label="模板标题">
          <template slot-scope="scope">{{templates(scope.row.templates)}}</template>
        </el-table-column>
        <el-table-column label="最后编辑人">
          <template slot-scope="scope">{{operate(scope.row.operator,scope.row.operateTime)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span
              class="font-blue"
              @click="edit(scope.row.opportunityDes,scope.row.opportunity)"
            >编 辑</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog title="编辑" :visible.sync="authorization.dialog.visible" width="600px">
      <el-form label-width="120px">
        <el-form-item label="弹出授权时机：">
          <span>{{authorization.dialog.param.opportunityDes}}</span>
        </el-form-item>
        <el-form-item label="弹出模板：">
          <div class="font-blue ma-b-20" style="height:32px;">
            <span v-if="local_list.length<3" @click="addTop">添 加</span>
          </div>
          <div v-for="(item,index) in local_list" v-bind:key="index" class="ma-b-20">
            <span>{{index+1}}.&nbsp;</span>
            <el-select placeholder="请输入" v-model="item.templateId">
              <el-option
                v-for="(item,index) in authorization.dialog.selectList"
                v-bind:key="index"
                :value="item.templateId"
                :label="select(item.title,item.id)"
              ></el-option>
            </el-select>
              <span
                class="font-blue ma-l-10"
                v-if="local_list.length<3"
                @click="addRight(index)"
              >添 加</span>
              <span class="font-danger ma-l-10" @click="delRight(index)">删 除</span>
          </div>
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
        templateId: "",
        title: ""
      },
      local_list: []
    };
  },

  mounted() {
    this.getList({
      templateId: "",
      title: ""
    });
  },

  methods: {
    ...mapActions({
      getList: "appletsSubscribeMessages_authorization_getList",
      showDialog: "appletsSubscribeMessages_authorization_showDialog",
      closeDialog: "appletsSubscribeMessages_authorization_closeDialog",
      submitDialog: "appletsSubscribeMessages_authorization_submitDialog"
    }),
    // 搜索
    serach() {
      this.getList({
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
    // 模板标题拼接
    templates(templates) {
      if (templates === null || templates.length === 0) {
        return "--";
      } else {
        let arr = [];
        templates.forEach(element => {
          arr.push(element.title);
        });
        return arr.join("；");
      }
    },
    // 操作人和操作时间拼接
    operate(user, time) {
      if (user === null && time === null) {
        return "--";
      } else {
        return user + " " + time;
      }
    },
    // 编辑
    edit(des, opp) {
      this.showDialog({
        opportunityDes: des,
        opportunity: opp
      }).then(() => {
        // console.log(this.authorization.dialog.param.templates,"为啥给不到？？？")
        this.local_list = this.authorization.dialog.param.templates;
      });
    },
    // 弹层——下拉列表拼接
    select(title, id) {
      return `${title}（${id}）`;
    },
    // 弹层——顶部的添加
    addTop() {
      this.local_list.unshift({
        templateId: ""
      });
    },
    // 弹层——右侧的添加
    addRight(index) {
      const obj = {
        templateId: ""
      };
      this.local_list.splice(index + 1, 0, obj);
    },
    // 弹层——右侧的删除
    delRight(index) {
      this.local_list.splice(index, 1);
    },
    // 弹层——提交保存:1.是否全部有内容 2.是否重复
    submit(index) {
      // 是否有无效内容的校验
      const template_id_list = [];
      let bool = false;
      this.local_list.forEach(item => {
        if (item.templateId === "") {
          bool = true;
        } else {
          template_id_list.push(item.templateId);
        }
      });
      if (bool) {
        this.$message.warning("弹出模板数据异常，请重新选择");
        return false;
      }
      // 查重校验
      const template_id_set = new Set();
      template_id_list.forEach(item => {
        template_id_set.add(item);
      });
      if (template_id_list.length !== template_id_set.size) {
        this.$message.warning("同一授权时机所选择模板库信息不可重复");
        return false;
      }

      this.submitDialog({
        templates: template_id_list
      });
    }
  },

  computed: {
    ...mapState({
      authorization: state => state.appletsSubscribeMessages.authorization
    })
  }
};
</script>

<style scoped>
.dialog{
  display: flex;
  justify-content:center;
}
</style>