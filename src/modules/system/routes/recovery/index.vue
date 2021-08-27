<template>
  <div class="cms">
    <el-card class="box-card">
      <el-form :inline="true" label-width="150px" size="small">
        <el-form-item label="涉及菜单：">
          <el-select v-model="param.bakMenuId" class="w200" placeholder="请选择">
            <el-option label="素材组" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="涉及数据">
          <el-input v-model.trim="param.bakModel" class="w200" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="数据编号">
          <el-input v-model.trim="param.bakId" class="w200" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="恢复编号">
          <el-input v-model.trim="param.recId" class="w200" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card ma-t-10">
    	<div slot="header" class="clearfix">
        <span>数据恢复（{{total}}条）</span>
        <el-button class="fr" type="primary" size="small" @click="openDialogRecovery">恢复</el-button>
      </div>
    	<el-table :data="list" style="width:100%"  :default-expand-all="false">
		    <el-table-column label="恢复编号" prop="recId"></el-table-column>
		    <el-table-column label="涉及菜单" prop="bakMenuName"></el-table-column>
		    <el-table-column label="涉及数据" prop="bakModel"></el-table-column>
		    <el-table-column label="数据编号" prop="bakId"></el-table-column>
		    <el-table-column label="恢复人" prop="operateBy"></el-table-column>
		    <el-table-column label="恢复时间" prop="operateTime"></el-table-column>
		    <el-table-column label="恢复结果">
          <template slot-scope="scope">
           <span v-if="scope.row.recResult === 1">成功</span>
           <span v-else>失败</span>
          </template>
        </el-table-column>
	    </el-table>
      <div class="cms-pagination" v-if="pages>0">
        <el-pagination :current-page.sync="param.pageNum" @current-change="getList($event)" :page-count="pages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
    <el-dialog title="恢复" :visible.sync="dialogRecovery" @close="closeDialogRecovery">
      <p class="hint">警告：此数据牵涉直接备份恢复数据库，存在一定得风险，如非必要，请勿操作，在CMS内仅支持恢复12小时以内备份的数据</p>
      <el-form :inline="true" label-width="100px" size="small">
        <el-form-item label="涉及菜单：">
          <el-select v-model="recovery.bakMenuId" class="w200" placeholder="请选择">
            <el-option label="素材组" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="涉及数据">
          <el-input v-model.trim="recovery.bakModel" class="w200" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="getRecoveryList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="recoveryList" style="width:100%">
		    <el-table-column label="数据编号" prop="bakId"></el-table-column>
		    <el-table-column label="涉及菜单" prop="bakMenuName"></el-table-column>
		    <el-table-column label="涉及数据" prop="bakModel"></el-table-column>
		    <el-table-column label="备份人" prop="operateBy"></el-table-column>
		    <el-table-column label="备份时间" prop="operateTime"></el-table-column>
		    <el-table-column label="操作">
          <template slot-scope="scope">
           <span @click="handleRecovery(scope.row.bakId)" class="font-blue">恢复</span>
          </template>
        </el-table-column>
	    </el-table>
      <div class="cms-pagination" v-if="recoveryPages>0">
        <el-pagination :current-page.sync="recovery.pageNum" @current-change="getRecoveryList($event)" :page-count="recoveryPages" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    	name: 'recovery',
      data() {
        return {
	        pages: 0,
	        total: 0,
	        list: [], // 已恢复列表
          param: {
	          bakMenuId: '', // 涉及菜单ID（1-素材组）
	          bakModel: '', // 涉及数据
            bakId: '', // 数据编号
            recId: '', // 恢复编号
	          pageSize: 20,
	          pageNum: 1
          },
          dialogRecovery: false,
          recovery: { // 待恢复信息
	          bakMenuId: '', // 涉及菜单ID（1-素材组）
            bakModel: '', // 涉及数据
            timeLimitStatus: 1, // 是否限制仅查询近12小时 0-不限制；1-限制仅查12小时。此处需限制
	          pageSize: 20,
	          pageNum: 1
          },
          recoveryPages: 0,
          recoveryList: [] // 待恢复列表
        }
      },
      methods:{
        // 获取已恢复列表
        getList(val) {
          this.param.pageNum = val || 1
          this.$service.system.recovery.queryRecDataBypage(this.param).then(res => {
            this.pages = res.pages
            this.total = res.total
            this.list = res.list
          })
        },
        // 打开弹窗
        openDialogRecovery () {
          this.dialogRecovery = true
          this.getRecoveryList()
        },
        // 重置弹窗
        closeDialogRecovery () {
          this.dialogRecovery = false
          this.recovery.bakMenuId = '' // 涉及菜单ID（1-素材组）
          this.recovery.bakModel = '' // 涉及数据
          this.getList(1)
        },
        // 获取待恢复列表
        getRecoveryList(val) {
          this.recovery.pageNum = val || 1
          this.$service.system.backups.queryBakDataBypage(this.recovery).then(res => {
            this.recoveryPages = res.pages
            this.recoveryList = res.list
          })
        },
        // 恢复数据
        handleRecovery (id) {
          this.$service.system.recovery.oneKeyRecovery({bakId: id}).then(res => {
            this.$message.success("恢复成功")
            this.closeDialogRecovery()
          })
        }
      },
      mounted () {
        this.getList()
      }
  }
</script>

<style scoped>
  .hint{ color: red; font-size: 16px; font-weight: bold; margin-bottom: 30px;}
</style>