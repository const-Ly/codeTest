<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="涉及菜单：">
          <el-select v-model="param.bakMenuId" class="w200" placeholder="请选择">
            <el-option label="素材组" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据编号">
          <el-input v-model.trim="param.bakId" class="w200" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="涉及数据">
          <el-input v-model.trim="param.bakModel" class="w200" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span>备份数据（{{total}}条）</span>
        <el-button class="fr" type="primary" size="small" @click="openDialogBackups">备份</el-button>
      </div>
    	<el-table :data="list" style="width:100%"  :default-expand-all="false">
		    <el-table-column label="数据编号" prop="bakId"></el-table-column>
		    <el-table-column label="涉及菜单" prop="bakMenuName"></el-table-column>
		    <el-table-column label="涉及数据" prop="bakModel"></el-table-column>
		    <el-table-column label="备份人" prop="operateBy"></el-table-column>
		    <el-table-column label="备份时间" prop="operateTime"></el-table-column>
	    </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageNum" @current-change="getList($event)" :page-count="pages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
    <el-dialog title="备份" :visible.sync="dialogBackups" @close="closeDialogBackups">
      <p class="hint">警告：此数据牵涉直接备份恢复数据库，存在一定得风险，如非必要，请勿操作，在CMS内仅支持恢复12小时以内备份的数据</p>
      <el-form :inline="true" label-width="100px" size="small">
        <el-form-item label="涉及菜单：">
          <el-select v-model="backups.bakMenuId" class="w200" placeholder="请选择">
            <el-option label="素材组" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="涉及数据">
          <el-input v-model.trim="backups.bakModel" class="w200" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getBackupsList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="backupsList" style="width:100%">
		    <el-table-column label="涉及菜单" prop="bakMenuName"></el-table-column>
		    <el-table-column label="涉及数据" prop="bakModel"></el-table-column>
		    <el-table-column label="操作">
          <template slot-scope="scope">
           <span @click="handleBackups(scope.row)" class="font-blue">备份</span>
          </template>
        </el-table-column>
	    </el-table>
      <div class="cms-pagination" v-if="backupsPages>0">
        <el-pagination :current-page.sync="backups.pageNum" @current-change="getBackupsList($event)" :page-count="backupsPages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    	name: 'backups',
      data() {
        return {
	        pages: 0,
	        total: 0,
	        list: [], // 已备份列表
          param: {
	          bakMenuId: '', // 涉及菜单ID（1-素材组）
	          bakModel: '', // 涉及数据
	          bakId: '', // 数据编号
	          timeLimitStatus: 0, // 是否限制仅查询近12小时 0-不限制；1-限制仅查12小时。本页不限制
	          pageSize: 20,
	          pageNum: 1
          },
          dialogBackups: false,
          backups: { // 待备份信息
	          bakMenuId: '', // 涉及菜单ID（1-素材组）
	          bakModel: '', // 涉及数据
	          pageSize: 20,
	          pageNum: 1
          },
          backupsPages: 0,
          backupsList: [] // 待备份列表
        	
        }
      },
      methods:{
        // 获取已备份列表
        getList(val) {
          this.param.pageNum = val || 1
          this.$service.system.backups.queryBakDataBypage(this.param).then(res => {
            this.pages = res.pages
            this.total = res.total
            this.list = res.list
          })
        },
        // 打开弹窗
        openDialogBackups () {
          this.dialogBackups = true
          this.getBackupsList()
        },
        // 重置弹窗
        closeDialogBackups () {
          this.dialogBackups = false
          this.backups.bakMenuId = '' // 涉及菜单ID（1-素材组）
          this.backups.bakModel = '' // 涉及数据
          this.getList(1)
        },
        // 获取待备份列表
        getBackupsList(val) {
          this.backups.pageNum = val || 1
          this.$service.system.backups.queryWaitBakDataBypage(this.backups).then(res => {
            this.backupsPages = res.pages
            this.backupsList = res.list
          })
        },
        // 备份数据
        handleBackups (row) {
          this.$service.system.backups.oneKeyBackup({
            bakMenuId: row.bakMenuId,
            bakModel: row.bakModel
          }).then(res => {
            this.$message.success("备份成功")
            this.closeDialogBackups()
          })
        }
      },
      mounted () {
        this.getList()
      }
  }
</script>

<style scoped>
  .hint{ color: red; font-size: 18px; font-weight: bold; margin-bottom: 30px;}
</style>