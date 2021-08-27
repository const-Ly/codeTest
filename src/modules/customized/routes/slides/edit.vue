<template>
  <div class="edit">
    <el-form label-width="260px" size="small">
      <el-form-item label="轮播图名称：">
        <el-input type="text" v-model="editSlides.name" :maxlength="10" class="input-w300"></el-input>
        <span><i>*</i> 限10个字</span>
      </el-form-item>
      <el-form-item label="轮播图：">
        <upload class="upload" action="/image/uploadImage?width=750&height=385&fileSize=300"
            :data="editSlides"
            @success="handleImage"
            :size="300"
            :width="100"
						:imageUrl="editSlides.bannerUrl"
            :height="100"
						:sort="1"></upload>
        <span><i>*</i> 图片尺寸750*385px，支持jgp、png格式文件，文件小于300k</span>
      </el-form-item>
      <el-form-item label="跳转类型：">
        <select @change="changeJumpType" v-model="editSlides.jumpType">
          <option value="undefined">请选择跳转类型</option>
          <option value="37">定制商品编辑器页</option>
          <option value="38">定制店铺页</option>
        </select>
      </el-form-item>
      <el-form-item v-if="editSlides.jumpType == 38" label="选择店铺：">
        <span>{{shopContent.name}}</span>&nbsp; <a href="javascript:;" class="primary" @click="dialogStateChange">选择店铺</a>
      </el-form-item>
      <el-form-item v-if="editSlides.jumpType == 37" label="请选择商品：">
        <el-input type="text" v-model="goodsContent.id" @input="changeSku" class="input-w200"></el-input> <el-button @click="searchSku">搜索</el-button>
        <div v-show="OskuObj.spuName" @click="selectedSku(OskuObj)" class="searchSku">{{OskuObj.spuName}}</div>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input type="text" v-model="editSlides.sequence" v-only-num="editSlides.sequence" :max-len="2" class="input-w300"></el-input>
        <span><i>*</i> 1-99的整数</span>
      </el-form-item>
      <div class="buts">
        <el-button size="small" @click="$router.back(-1)">返回</el-button>
        <el-button size="small" @click="save">提交保存</el-button>
      </div>
    </el-form>  

    <el-dialog
      title="选择店铺"
      :visible.sync="editDialog"
      width="680px">
      <div class="dia-content">
        <el-form label-width="100px" size="small" class="inline">
          <el-form-item label="店铺名称：">
            <el-input type="text" v-model="pageList.shopName" class="input-w200"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称：">
            <el-input type="text" v-model="pageList.nickname" class="input-w200"></el-input>
          </el-form-item>
          <el-form-item label="用户手机号：">
            <el-input type="text" v-only-num="pageList.mobile" :max-len=11 v-model="pageList.mobile" class="input-w200"></el-input>
          </el-form-item>
          <el-form-item label="操作：">
            <el-button @click="checkList">查询</el-button>
            <el-button @click="clearInput">清空</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="shopList.list" border>
          <el-table-column prop="shopName" label="店铺名称"></el-table-column>
          <el-table-column prop="nickname" label="用户昵称"></el-table-column>
          <el-table-column prop="mobile" label="用户手机号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a href="javascript:;" @click="selectedShop(scope.row)">选择</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination"
          :current-page="shopList.pageNum"
          background
          @current-change="sizeChange"
          layout="prev, pager, next"
          :page-count="shopList.pages">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>  
</template>

<script>
import upload from '@/components/upload'
export default {
  methods: {
    editInit() {
      if(this.$route.query.id) {
        document.title = '编辑轮播图';
        document.querySelectorAll('.el-breadcrumb__item span.el-breadcrumb__inner')[2].innerText = '编辑轮播图'
        // 详情数据
        this.request(this.$route.query.id);
        // 商店列表
        this.getShop()
      }
    },
    dialogStateChange() {
      this.sizeChange(1);
      this.editDialog = true;
    },
    changeJumpType() {
      this.goodsContent = {};
      this.shopContent = {};
      this.editSlides.jumpContent = {};
    },
    sizeChange(n) {
      this.pageList.pageIndex = n;
      this.clearInput();
      this.getShop();
    },
    clearInput() {
      this.pageList.shopName = '';
      this.pageList.nickname = '';
      this.pageList.mobile = '';
    },
    checkList() {
      this.pageList.pageIndex = 1;
      this.getShop();
    },
    getShop() {
      let page = this.pageList,
      param = {
        shopName: page.shopName.trim(),
        nickname: page.nickname.trim(),
        mobile: page.mobile,
        pageIndex: page.pageIndex,
        pageSize: page.pageSize
      }
      this.$service.customized.slides.shopList(param).then(res => {
        this.shopList = res;
      });
    },
    request(id) {
      this.$service.customized.slides.detail({id: id}).then(res => {
        if(res.jumpType == 37) {
          this.goodsContent = {
            id: res.jumpContent.name
          }
        } else if(res.jumpType == 38) {
          this.shopContent = res.jumpContent;
        }
        this.editSlides = res;
      })
    },
    selectedShop(item) {
      this.shopContent = {
        id: item.shopId,
        name: item.shopName
      }
      this.editSlides.jumpContent = this.shopContent;
      this.editDialog = false;
    },
    numValid(num, max) {
      if(num > 0 && num < max) {
        return true;
      } else {
        return false;
      }
    },
    changeSku() {
      this.OskuObj = {};
      this.editSlides.jumpContent = {};
    },
    searchSku() {
      this.$service.customized.slides.getSpu({spuId: this.goodsContent.id}).then( res => {
        this.OskuObj = res;
      })
    },
    selectedSku() {
      this.editSlides.jumpContent = {
        id: this.OskuObj.spuId,
        name: this.OskuObj.spuName
      }
      this.goodsContent.id = this.OskuObj.spuName;
      this.OskuObj = {};
    },
    handleImage(res) {
      this.editSlides.bannerUrl = res;
    },
    save() {
      let editSlides = this.editSlides;
      if(!editSlides.name || !this.numValid(editSlides.name.trim().length, 11)) {
        this.$message.warning('请输入1-10个字的轮播图名称！');return
      }
      if(!editSlides.bannerUrl || editSlides.bannerUrl.length < 5) {
        this.$message.warning('请上传轮播图片！');return
      }
      if(!editSlides.jumpType || editSlides.jumpType == 'undefined') {
        this.$message.warning('请选择跳转类型！');return;
      }
      if(!editSlides.jumpContent || !editSlides.jumpContent.id || editSlides.jumpContent.id === '' || editSlides.jumpContent.id === 0) {
        if(editSlides.jumpType == 37) {
          this.$message.warning('请选择商品！');
        } else if(editSlides.jumpType == 38){
          this.$message.warning('请选择店铺！');
        }
        return;
      }
      if(!this.numValid(editSlides.sequence, 100)) {
        this.$message.warning('请输入1-99的排序数字！');return
      }
      this.$service.customized.slides.edit(this.editSlides).then( res => {
        // this.$message.success('保存成功！');
        this.$router.push({ path: '/slides'});
      })
    }
  },
  mounted() {
    this.editInit()
  },
  data() {
    return {
      shopContent: {},
      goodsContent: {},
      spuId: '',
      OskuObj: {},
      pageList: {
        shopName: '',
        nickname: '',
        mobile: '',
        pageIndex: 1,
        pageSize: 20
      },
      shopList: {},
      editDialog:  false,
      editSlides: {
      }
    }
  },
  components: {
    upload
  }
}
</script>

<style>
.input-w200 {
  width: 200px;
}
.input-w300 {
  width: 200px;
}
.buts {
  margin-left: 300px;
}
.inline-block {
  display: inline-block;
}
.edit {
  background-color: #fff;
  padding-top: 30px;
  padding-bottom: 30px;
}
.searchSku {
  width: 260px;
  margin-top: 10px;
  padding: 3px;
  background: #ddd;
  cursor: pointer;
}
.inline .el-form-item {
  display: inline-block;
}
.pagination {
  margin-top: 10px
}
.el-form-item span>i{
  color: red;
}
</style>


