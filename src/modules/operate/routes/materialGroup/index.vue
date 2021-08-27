<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="120px">
        <el-form-item label="素材组编号：">
          <el-input v-model.trim="param.groupId" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="素材编号：">
          <el-input v-model.trim="param.elementId" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="素材组名称：">
          <el-input v-model.trim="param.groupName" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="使用范围：">
          <el-input v-model.trim="param.scope" class="w200"></el-input>
        </el-form-item>
        <br />
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
      <div slot="header" class="clearfix">
        <span>素材组列表（查询出 {{ total }} 条）</span>
      </div>
      <!-- 表格数据 -->
      <el-table :data="list" style="width:100%">
        <el-table-column label="素材组编号">
          <template slot-scope="scope">
            <el-button @click="showInfo(scope.row.groupId)" type="text">{{ scope.row.groupId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="素材组名称" prop="name"></el-table-column>
        <el-table-column label="使用范围" prop="scope"></el-table-column>
        <el-table-column label="更新时间" prop="updateContentTime"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.groupId)" type="text">编辑</el-button>
			<file-upload @success="getList(param.pageIndex)" action="/material/import" :data="{groupId: scope.row.groupId}">
				<el-button slot="handle" type="text">导入</el-button>
			</file-upload>
            <el-button @click="exportData(scope.row.groupId)" type="text">导出</el-button>
            <router-link class="mar-l10" :to="{ path: 'materialGroup/log/'+ scope.row.groupId }">
              <span class="font-blue">日志</span>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination
          :current-page.sync="param.pageIndex"
          @current-change="getList"
          background
          :page-count="pages"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 弹框 -->
    <el-dialog :title="'素材组详情（素材组编号：'+ groupInfo.code +'）'" :visible.sync="infoAlert">
      <div class="alert-box">
        <material-info :groupInfo="groupInfo" :groupList="groupList" :flag="false"></material-info>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import materialInfo from '../components/materialInfo'
import FileUpload from '@/components/fileUpload'

export default {
  name: 'materialGroup',
  data () {
    return {
      param: {
        pageIndex: 1,
        pageSize: 20,
        groupId: '',
        elementId: '',
        groupName: '',
        scope: ''
      },
      total: 0,
      pages: 0,
      list: [],
      infoAlert: false,
      groupInfo: {},
      groupList: [],
    };
  },
  components: {
	materialInfo,
	FileUpload
  },
  methods: {
    getList(idx) {
      this.param.pageIndex = idx || 1;
      this.$service.operate.material.groupPageList(this.param).then((res) => {
        this.param.pageIndex = res.pageNum;
        this.pages = res.pages;
        this.total = res.total;
        this.list = res.list || [];
      });
    },
    showInfo(groupId) {
      this.$service.operate.material.detail({ groupId }).then((res) => {
        if (res) {
          this.groupInfo.code = res.code;
          this.groupInfo.name = res.name;
          this.groupInfo.scope = res.scope;
          this.groupInfo.desc = res.desc;
          this.groupList = res.group.map((item) => {
            if (item.conf.rule) {
              item.conf.rule =
                typeof item.conf.rule === "string"
                  ? JSON.parse(item.conf.rule)
                  : item.conf.rule;
              if (item.type === "01") {
                item.conf.data = +item.conf.data;
              }
            }
            return item;
          });
          this.infoAlert = true;
        }
      });
	},
	edit (id) { // 编辑
		window.open(`/app/operate/#/materialGroup/edit/${id}`)
	},
	exportData (groupId) { // 导出
		this.$service.operate.material.exportData({ groupId }).then((res) => {
			if (res) {
				window.open(res)
			}
		})
	}
  },
  mounted () {
    this.getList()
  }
};
</script>
<style type="text/css" scoped>
.btn {
  margin: 5px 5px 0 0;
}
.mar-l10 {
  margin-left: 10px;
}
</style>
